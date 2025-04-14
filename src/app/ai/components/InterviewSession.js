"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSpeechToText } from '../utils/speechRecognition';
import { useSpeechSynthesis } from '../utils/speechSynthesis';
import { analyzeAnswer, analyzePartialAnswer } from '../utils/openRouterApi';
import LiveScoreDisplay from './LiveScoreDisplay';

const InterviewSession = ({ questions, onComplete, settings }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [interviewResults, setInterviewResults] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [liveAnalysis, setLiveAnalysis] = useState(null);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [voiceSettingsChanged, setVoiceSettingsChanged] = useState(false);
  const [voiceError, setVoiceError] = useState(null);
  
  // Voice settings state (initialized from props but can be changed)
  const [voiceEnabled, setVoiceEnabled] = useState(settings?.voiceEnabled ?? true);
  const [voiceRate, setVoiceRate] = useState(settings?.voiceRate ?? 1);
  const [selectedVoice, setSelectedVoice] = useState(settings?.selectedVoice ?? '');
  const [liveScoreEnabled, setLiveScoreEnabled] = useState(settings?.liveScoreEnabled ?? true);
  const [availableVoices, setAvailableVoices] = useState([]);
  
  // Speech recognition for the user's answers
  const { 
    transcript, 
    isListening, 
    startListening, 
    stopListening, 
    resetTranscript,
    hasRecognitionSupport 
  } = useSpeechToText();

  // Speech synthesis for reading questions
  const {
    speak,
    cancel: cancelSpeech,
    isSpeechSynthesisSupported,
    getVoices
  } = useSpeechSynthesis();
  
  // Refs for tracking
  const debounceTimeoutRef = useRef(null);
  const partialAnswerTimeoutRef = useRef(null);
  const lastAnalysisLengthRef = useRef(0);
  
  const currentQuestion = questions[currentQuestionIndex];  // Get available voices on component mount
  useEffect(() => {
    if (!isSpeechSynthesisSupported) return;

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          console.log(`🔊 Found ${voices.length} voices for speech synthesis`);
          setAvailableVoices(voices);
        }
      } catch (error) {
        console.error('🔊 Error loading voices:', error);
        setVoiceError('Failed to load voices. Please refresh the page or try a different browser.');
      }
    };
    
    // Initial load
    loadVoices();
    
    // Chrome requires this event for voices to be loaded
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [isSpeechSynthesisSupported, getVoices]);

  // Set default voice when availableVoices changes
  useEffect(() => {
    if (availableVoices.length > 0 && !selectedVoice) {
      // Try to find a female English voice as they often sound better for interviews
      const preferredVoice = availableVoices.find(voice => 
        voice.lang.includes('en') && voice.name.includes('Female')
      ) || availableVoices[0];
      
      setSelectedVoice(preferredVoice.name);
      console.log(`🔊 Set default voice: ${preferredVoice.name}`);
    }
  }, [availableVoices, selectedVoice]);

  // Log component mount and questions received
  useEffect(() => {
    console.log(`📝 Interview Session started with ${questions.length} questions`);
    console.log('🔍 Questions difficulty breakdown:', 
      questions.reduce((acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
      }, {})
    );
    
    console.log('🔊 Voice settings:', { voiceEnabled, voiceRate, selectedVoice });
    console.log('📊 Live score enabled:', liveScoreEnabled);
    
    return () => {
      console.log('📝 Interview Session component unmounted');
      // Clean up any pending operations
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (partialAnswerTimeoutRef.current) {
        clearTimeout(partialAnswerTimeoutRef.current);
      }
      if (isSpeechSynthesisSupported) {
        cancelSpeech();
      }
    };
  }, [questions, voiceEnabled, voiceRate, selectedVoice, liveScoreEnabled]);

  // Read the question aloud when it changes
  useEffect(() => {
    if (currentQuestion && voiceEnabled && isSpeechSynthesisSupported) {
      const questionText = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
      console.log(`🔊 Reading question aloud: ${questionText.substring(0, 50)}...`);
      
      // Get the selected voice object
      const voices = getVoices();
      const voiceObj = voices.find(v => v.name === selectedVoice) || voices[0];
      
      // Speak the question with the selected voice and rate
      speak(questionText, {
        voice: voiceObj,
        rate: voiceRate
      });
    }
    
    // Reset analysis for the new question
    setCurrentAnalysis(null);
    setLiveAnalysis(null);
    lastAnalysisLengthRef.current = 0;
    
  }, [currentQuestionIndex, currentQuestion, voiceEnabled, selectedVoice, voiceRate]);

  // Log when current question changes
  useEffect(() => {
    if (currentQuestion) {
      console.log(`❓ Current question (${currentQuestionIndex + 1}/${questions.length}):`, {
        question: currentQuestion.question.substring(0, 50) + '...',
        difficulty: currentQuestion.difficulty,
        answerLength: currentQuestion.answer.length
      });
    }
  }, [currentQuestionIndex, currentQuestion, questions.length]);

  // Handle countdown timer
  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        if (countdown === 30 || countdown === 10) {
          console.log(`⏱️ Time remaining: ${countdown - 1} seconds`);
          
          // Voice notification at 30 and 10 seconds
          if (voiceEnabled && isSpeechSynthesisSupported) {
            speak(`${countdown - 1} seconds remaining.`, { rate: voiceRate });
          }
        }
      }, 1000);
    } else if (countdown === 0) {
      console.log('⏱️ Time\'s up! Auto-submitting answer');
      
      // Voice notification for time's up
      if (voiceEnabled && isSpeechSynthesisSupported) {
        speak('Time\'s up! Your answer will be submitted now.', { rate: voiceRate });
      }
      
      handleSubmitAnswer();
    }
    return () => clearTimeout(timer);
  }, [countdown, voiceEnabled]);

  // Function to analyze partial answers in real-time
  const analyzePartialResponse = useCallback(async (text) => {
    // Skip analysis if disabled or text is too short
    if (!liveScoreEnabled || text.length < 20) return;
    
    // Only analyze if the text has changed significantly (at least 30 more characters)
    if (text.length - lastAnalysisLengthRef.current < 30) return;
    
    // Clear any pending analysis
    if (partialAnswerTimeoutRef.current) {
      clearTimeout(partialAnswerTimeoutRef.current);
    }
    
    // Debounce the analysis to avoid too many API calls
    partialAnswerTimeoutRef.current = setTimeout(async () => {
      console.log(`📊 Analyzing partial answer (${text.length} chars)`);
      
      try {
        const analysis = await analyzePartialAnswer(currentQuestion.question, text);
        if (analysis) {
          console.log(`📊 Live analysis: ${analysis.preliminaryScore}/10`);
          setLiveAnalysis(analysis);
          lastAnalysisLengthRef.current = text.length;
        }
      } catch (error) {
        console.error('❌ Error in partial answer analysis:', error);
      }
    }, 1500); // Wait 1.5 seconds to debounce
  }, [currentQuestion, liveScoreEnabled]);

  // Monitor transcript changes for live analysis
  useEffect(() => {
    if (isAnswering && transcript) {
      analyzePartialResponse(transcript);
    }
  }, [transcript, isAnswering, analyzePartialResponse]);

  // Log speech recognition transcript changes
  useEffect(() => {
    if (isAnswering && transcript && transcript.length > 0) {
      console.log(`🎤 Transcript updated (${transcript.length} chars)`);
    }
  }, [transcript, isAnswering]);
  const startAnswering = async () => {
    console.log('🎯 User started answering question', currentQuestionIndex + 1);
    
    // Stop reading the question if it's still speaking
    if (isSpeechSynthesisSupported) {
      cancelSpeech();
    }
    
    // Reset states before starting
    setIsAnswering(true);
    setLiveAnalysis(null);
    lastAnalysisLengthRef.current = 0;
    
    if (hasRecognitionSupport) {
      try {
        // Request microphone permission first
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Reset any previous transcript
        resetTranscript();
        
        // Start listening
        await startListening();
        console.log('🎤 Speech recognition activated successfully');
        
        // Start countdown only after successful voice activation
        setCountdown(120); // 2 minutes countdown
        console.log('⏱️ Timer started: 120 seconds');
      } catch (error) {
        console.error('🎤 Failed to start speech recognition:', error);
        setVoiceError('Please allow microphone access to use voice recording. Check your browser settings if the permission dialog doesn\'t appear.');
        setIsAnswering(false);
      }
    } else {
      console.log('🎤 Speech recognition not supported, using text input');
      setCountdown(120);
    }
  };
  const handleStopAnswering = async () => {
    console.log('✋ User stopped answering manually');
    
    try {
      if (hasRecognitionSupport) {
        await stopListening();
        console.log('🎤 Speech recognition stopped successfully');
      }
    } catch (error) {
      console.error('🎤 Error stopping speech recognition:', error);
    } finally {
      setIsAnswering(false);
      setCountdown(null);
      console.log('⏱️ Timer stopped at', countdown, 'seconds remaining');
      
      // Clear any pending analysis
      if (partialAnswerTimeoutRef.current) {
        clearTimeout(partialAnswerTimeoutRef.current);
        partialAnswerTimeoutRef.current = null;
      }
      
      // Clear any voice errors since we're stopping
      setVoiceError(null);
    }
  };

  const handleSubmitAnswer = async () => {
    handleStopAnswering();
    
    const answer = transcript || answers[currentQuestionIndex] || '';
    console.log(`📤 Submitting answer for question ${currentQuestionIndex + 1}:`, { 
      answerLength: answer.length,
      wordCount: answer.split(/\s+/).length
    });
    
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);

    setAnalysisLoading(true);
    console.log('🔍 Starting answer analysis');
    
    try {
      // Analyze the answer
      console.time(`⏱️ Analysis time for question ${currentQuestionIndex + 1}`);
      const analysis = await analyzeAnswer(currentQuestion.question, answer);
      console.timeEnd(`⏱️ Analysis time for question ${currentQuestionIndex + 1}`);
      
      console.log(`✅ Answer analysis complete for question ${currentQuestionIndex + 1}:`, {
        overallScore: analysis.overallScore,
        dimensions: Object.keys(analysis.dimensions).length
      });
      
      setCurrentAnalysis(analysis);
      
      // Voice feedback on the answer if enabled
      if (voiceEnabled && isSpeechSynthesisSupported) {
        const feedbackMessage = `Your answer received a score of ${analysis.overallScore} out of 10. ${analysis.assessment}`;
        speak(feedbackMessage, { rate: voiceRate });
      }
      
      // Record this question, answer, and analysis
      const result = {
        question: currentQuestion.question,
        expectedAnswer: currentQuestion.answer,
        userAnswer: answer,
        analysis
      };
      
      setInterviewResults([...interviewResults, result]);
      console.log(`📊 Added result for question ${currentQuestionIndex + 1} to interview results`);
      
      // Move to next question or complete the interview after a short delay
      // This allows the user to see their score before moving on
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          console.log(`➡️ Moving to next question (${currentQuestionIndex + 2}/${questions.length})`);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setCurrentAnalysis(null);
          setLiveAnalysis(null);
          resetTranscript();
        } else {
          // Complete the interview
          console.log('🏁 All questions answered, completing interview');
          onComplete([...interviewResults, result]);
        }
      }, 3000); // 3 second delay to show the score
      
    } catch (error) {
      console.error('❌ Error analyzing answer:', error);
      // Still move to the next question even if analysis fails
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          console.log(`⚠️ Moving to next question despite analysis error (${currentQuestionIndex + 2}/${questions.length})`);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setCurrentAnalysis(null);
          setLiveAnalysis(null);
          resetTranscript();
        } else {
          console.log('🏁 All questions answered (with errors), completing interview');
          onComplete(interviewResults);
        }
      }, 1500);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleManualAnswer = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);
    
    // Analyze the answer as the user types
    if (liveScoreEnabled) {
      // Debounce to avoid too many API calls
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      debounceTimeoutRef.current = setTimeout(() => {
        analyzePartialResponse(e.target.value);
      }, 1000);
    }
    
    // Log less frequently to avoid console spam
    if (e.target.value.length % 20 === 0) {
      console.log(`✍️ User typing: ${e.target.value.length} characters so far`);
    }
  };

  const testVoice = () => {
    if (voiceEnabled && isSpeechSynthesisSupported) {
      try {
        const selectedVoiceObj = availableVoices.find(voice => voice.name === selectedVoice);
        if (!selectedVoiceObj) {
          console.warn('🔊 Selected voice not found, using default');
        }
        
        // Test the voice
        const success = speak('This is how I will sound during the interview.', { 
          voice: selectedVoiceObj,
          rate: voiceRate 
        });
        
        if (!success) {
          setVoiceError('Failed to use speech synthesis. Please try again or use a different browser.');
        } else {
          setVoiceError(null);
        }
      } catch (error) {
        console.error('🔊 Error testing voice:', error);
        setVoiceError('Error testing voice. Please try again or use a different browser.');
      }
    }
  };

  // Voice settings handlers
  const handleVoiceToggle = () => {
    const newValue = !voiceEnabled;
    setVoiceEnabled(newValue);
    setVoiceSettingsChanged(true);
    console.log(`🔊 Voice ${newValue ? 'enabled' : 'disabled'}`);
    
    if (newValue && isSpeechSynthesisSupported) {
      try {
        const success = speak('Voice output is now enabled.', { rate: voiceRate });
        if (!success) {
          setVoiceError('Failed to enable voice. Please try a different browser.');
        } else {
          setVoiceError(null);
        }
      } catch (error) {
        console.error('🔊 Error toggling voice:', error);
        setVoiceError('Error enabling voice. Please try again.');
      }
    } else if (isSpeechSynthesisSupported) {
      cancelSpeech();
    }
  };

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
    setVoiceSettingsChanged(true);
    
    if (voiceEnabled && isSpeechSynthesisSupported) {
      try {
        const selectedVoiceObj = availableVoices.find(voice => voice.name === e.target.value);
        if (!selectedVoiceObj) {
          console.warn('🔊 Selected voice not found');
          setVoiceError('Selected voice not available. Please try another voice.');
          return;
        }
        
        // Test the new voice
        const success = speak('This is how I will sound during the interview.', { 
          voice: selectedVoiceObj,
          rate: voiceRate 
        });
        
        if (!success) {
          setVoiceError('Failed to use this voice. Please try another voice or browser.');
        } else {
          setVoiceError(null);
        }
      } catch (error) {
        console.error('🔊 Error changing voice:', error);
        setVoiceError('Error using this voice. Please try another voice.');
      }
    }
  };

  const handleRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setVoiceRate(newRate);
    setVoiceSettingsChanged(true);
    
    if (voiceEnabled && isSpeechSynthesisSupported) {
      try {
        const selectedVoiceObj = availableVoices.find(voice => voice.name === selectedVoice);
        const success = speak('This is the new speaking rate.', { 
          voice: selectedVoiceObj,
          rate: newRate 
        });
        
        if (!success) {
          setVoiceError('Failed to change speaking rate. Please try again.');
        } else {
          setVoiceError(null);
        }
      } catch (error) {
        console.error('🔊 Error changing rate:', error);
        setVoiceError('Error changing speaking rate. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        
        <div className="flex items-center">
          {/* Voice Settings Toggle Button */}
          <button
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            className="flex items-center text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md mr-2 transition-colors"
            aria-label="Toggle voice settings"
          >
            <span className="mr-1.5">🔊</span>
            Voice Settings
          </button>
          
          {countdown !== null && (
            <div className="text-right font-medium text-gray-600">
              {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
            </div>
          )}
        </div>
      </div>
      
      {/* Voice Settings Panel */}
      {showVoiceSettings && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-semibold text-blue-800">Voice Controls</h3>
            {voiceSettingsChanged && !voiceError && (
              <div className="text-xs text-green-600 font-medium px-2 py-1 bg-green-100 rounded-full">
                Settings updated
              </div>
            )}
          </div>
          
          {voiceError && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {voiceError}
              <button 
                onClick={testVoice}
                className="ml-2 underline text-blue-600 hover:text-blue-800"
              >
                Test again
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Enable Voice
                </label>
                <div 
                  className={`relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out rounded-full cursor-pointer ${voiceEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                  onClick={handleVoiceToggle}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 transition-transform duration-200 ease-in-out bg-white rounded-full ${voiceEnabled ? 'transform translate-x-6' : ''}`}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Live Score Analysis
                </label>
                <div 
                  className={`relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out rounded-full cursor-pointer ${liveScoreEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                  onClick={() => {
                    setLiveScoreEnabled(!liveScoreEnabled);
                    setVoiceSettingsChanged(true);
                  }}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 transition-transform duration-200 ease-in-out bg-white rounded-full ${liveScoreEnabled ? 'transform translate-x-6' : ''}`}
                  />
                </div>
              </div>
            </div>
            
            {isSpeechSynthesisSupported && voiceEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voice
                  </label>
                  <select
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                    value={selectedVoice}
                    onChange={handleVoiceChange}
                    disabled={!voiceEnabled}
                  >
                    {availableVoices.length === 0 ? (
                      <option value="">Loading voices...</option>
                    ) : (
                      availableVoices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))
                    )}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Speaking Rate: {voiceRate}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={voiceRate}
                    onChange={handleRateChange}
                    disabled={!voiceEnabled}
                    className="w-full"
                  />
                </div>
              </>
            )}
            
            {!isSpeechSynthesisSupported && (
              <p className="text-sm text-yellow-600 col-span-2">
                Speech synthesis is not supported in your browser. Please try Chrome, Edge, or Safari for the best experience.
              </p>
            )}
            
            {isSpeechSynthesisSupported && availableVoices.length === 0 && (
              <p className="text-sm text-yellow-600 col-span-2">
                No voices available. Please try refreshing the page or using a different browser.
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="font-bold mb-2">Question:</h3>
        <p className="text-gray-800">{currentQuestion.question}</p>
        <div className="mt-2 text-sm text-gray-500">
          Difficulty: {currentQuestion.difficulty}
        </div>
        {voiceEnabled && isSpeechSynthesisSupported && (
          <button 
            onClick={() => {
              const voices = getVoices();
              const voiceObj = voices.find(v => v.name === selectedVoice) || voices[0];
              speak(currentQuestion.question, { voice: voiceObj, rate: voiceRate });
            }}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span className="mr-1">🔊</span> Read aloud
          </button>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold mb-2">Your Answer:</h3>
        {!hasRecognitionSupport && (
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            rows="6"
            value={answers[currentQuestionIndex] || ''}
            onChange={handleManualAnswer}
            disabled={isAnswering && hasRecognitionSupport}
            placeholder="Type your answer here..."
          />
        )}
        
        {hasRecognitionSupport && (
          <div className={`p-3 min-h-[150px] border border-gray-300 rounded-lg shadow-inner ${isListening ? 'bg-green-50 border-green-300' : ''}`}>
            {transcript || answers[currentQuestionIndex] || ''}
          </div>
        )}
        
        {/* Live score display */}
        <LiveScoreDisplay 
          analysis={currentAnalysis} 
          liveAnalysis={liveAnalysis}
          isLiveScoreEnabled={liveScoreEnabled} 
        />
      </div>
      
      <div className="flex flex-wrap gap-3 justify-between">
        {!isAnswering ? (
          <button
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
            onClick={startAnswering}
            disabled={analysisLoading}
          >
            Start Answering
          </button>
        ) : (
          <button
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-sm"
            onClick={handleStopAnswering}
          >
            Stop Recording
          </button>
        )}
        
        <button
          className={`flex-1 py-2 px-4 rounded-md text-white transition shadow-sm
            ${analysisLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          onClick={handleSubmitAnswer}
          disabled={analysisLoading}
        >
          {analysisLoading ? 'Processing...' : 'Submit & Continue'}
        </button>
      </div>
    </div>
  );
};

export default InterviewSession;