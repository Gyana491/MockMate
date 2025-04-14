"use client";
import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from '../utils/speechSynthesis';

const InterviewSetup = ({ onStartInterview }) => {
  const [skill, setSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceRate, setVoiceRate] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [liveScoreEnabled, setLiveScoreEnabled] = useState(true);
  
  const { getVoices, isSpeechSynthesisSupported, speak, cancel } = useSpeechSynthesis();
  
  const skillOptions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'Data Science',
    'Machine Learning', 'DevOps', 'Cloud Computing', 'System Design', 'Data Structures'
  ];

  // Get available voices on component mount
  useEffect(() => {
    console.log('🚀 Interview Setup component mounted');
    
    // Log browser details for debugging
    console.log('🌐 Browser details:', {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform
    });
    
    // Get available voices if speech synthesis is supported
    if (isSpeechSynthesisSupported) {
      // Some browsers load voices asynchronously, so we need to listen for the voiceschanged event
      const loadVoices = () => {
        const voices = getVoices();
        console.log(`🔊 Found ${voices.length} voices for speech synthesis`);
        setAvailableVoices(voices);
        
        // Set a default voice if available
        if (voices.length > 0) {
          // Try to find a female English voice as they often sound better for interviews
          const preferredVoice = voices.find(voice => 
            voice.lang.includes('en') && voice.name.includes('Female')
          ) || voices[0];
          
          setSelectedVoice(preferredVoice.name);
          console.log(`🔊 Set default voice: ${preferredVoice.name}`);
        }
      };
      
      loadVoices();
      
      // Chrome requires this event for voices to be loaded
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      // Test speech synthesis
      if (voiceEnabled) {
        speak('Welcome to MockMate, your AI interview assistant.', { rate: voiceRate });
      }
    } else {
      console.log('🔊 Speech synthesis not supported in this browser');
    }
    
    return () => {
      console.log('🚀 Interview Setup component unmounted');
      if (isSpeechSynthesisSupported) {
        cancel();
      }
    };
  }, [isSpeechSynthesisSupported, getVoices, speak, cancel, voiceEnabled, voiceRate]);

  useEffect(() => {
    if (skill) {
      console.log(`🔍 User selected skill: ${skill}`);
    }
  }, [skill]);

  // Handle voice change
  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
    if (voiceEnabled && isSpeechSynthesisSupported) {
      const selectedVoiceObj = availableVoices.find(voice => voice.name === e.target.value);
      // Test the new voice
      speak('This is how I will sound during the interview.', { 
        voice: selectedVoiceObj,
        rate: voiceRate 
      });
    }
  };

  // Toggle voice on/off
  const handleVoiceToggle = () => {
    const newValue = !voiceEnabled;
    setVoiceEnabled(newValue);
    console.log(`🔊 Voice ${newValue ? 'enabled' : 'disabled'}`);
    
    if (newValue && isSpeechSynthesisSupported) {
      speak('Voice output is now enabled.', { rate: voiceRate });
    } else if (isSpeechSynthesisSupported) {
      cancel();
    }
  };

  // Handle rate change
  const handleRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setVoiceRate(newRate);
    
    if (voiceEnabled && isSpeechSynthesisSupported) {
      const selectedVoiceObj = availableVoices.find(voice => voice.name === selectedVoice);
      speak('This is the new speaking rate.', { 
        voice: selectedVoiceObj,
        rate: newRate 
      });
    }
  };

  const handleStartInterview = async () => {
    if (!skill) {
      console.warn('⚠️ Attempted to start interview without selecting a skill');
      return;
    }
    
    console.log(`🚀 Starting interview for skill: ${skill}`);
    console.log(`🔊 Voice settings: enabled=${voiceEnabled}, rate=${voiceRate}, voice=${selectedVoice}`);
    console.log(`📊 Live score: ${liveScoreEnabled ? 'enabled' : 'disabled'}`);
    
    setLoading(true);
    
    try {
      console.time('⏱️ Interview Setup Time');
      await onStartInterview(skill, {
        voiceEnabled,
        voiceRate,
        selectedVoice,
        liveScoreEnabled
      });
      console.timeEnd('⏱️ Interview Setup Time');
    } catch (error) {
      console.error('❌ Error in handleStartInterview:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Setup Your Mock Interview</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill">
          Select Interview Topic
        </label>
        <select
          id="skill"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        >
          <option value="">Select a topic</option>
          {skillOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      
      {/* Voice Settings */}
      <div className="mb-5 p-3 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Voice Settings</h3>
        
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
        
        {isSpeechSynthesisSupported && voiceEnabled && (
          <>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Voice
              </label>
              <select
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
          <p className="text-sm text-yellow-600">
            Speech synthesis is not supported in your browser.
          </p>
        )}
      </div>
      
      {/* Live Score Setting */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Enable Live Score Analysis
          </label>
          <div 
            className={`relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out rounded-full cursor-pointer ${liveScoreEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setLiveScoreEnabled(!liveScoreEnabled)}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 transition-transform duration-200 ease-in-out bg-white rounded-full ${liveScoreEnabled ? 'transform translate-x-6' : ''}`}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Shows real-time assessment of your answers as you speak.
        </p>
      </div>
      
      <button
        className={`w-full py-2 px-4 rounded-md text-white font-medium 
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        onClick={handleStartInterview}
        disabled={loading || !skill}
      >
        {loading ? 'Preparing Interview...' : 'Start Interview'}
      </button>
    </div>
  );
};

export default InterviewSetup;