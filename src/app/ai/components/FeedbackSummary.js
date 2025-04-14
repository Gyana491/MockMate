"use client";
import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from '../utils/speechSynthesis';

const FeedbackSummary = ({ interviewResults, feedback, settings }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [dimensionChartView, setDimensionChartView] = useState('average');
  
  // Voice settings from props
  const { voiceEnabled = true, voiceRate = 1, selectedVoice = '' } = settings || {};
  
  // Speech synthesis for reading feedback
  const {
    speak,
    cancel: cancelSpeech,
    isSpeechSynthesisSupported,
    getVoices
  } = useSpeechSynthesis();
  
  // Log component initialization and received data
  useEffect(() => {
    console.log(`📊 Feedback Summary initialized with ${interviewResults.length} answered questions`);

    // Calculate and log score distribution
    const overallScores = interviewResults.map(result => {
      return typeof result.analysis.overallScore === 'number' 
        ? result.analysis.overallScore 
        : parseInt(result.analysis.overallScore) || 0;
    });

    const avgScore = overallScores.reduce((sum, score) => sum + score, 0) / overallScores.length;
    const minScore = Math.min(...overallScores);
    const maxScore = Math.max(...overallScores);

    console.log('📈 Score statistics:', {
      average: avgScore.toFixed(1),
      min: minScore,
      max: maxScore,
      distribution: overallScores
    });

    // Also analyze dimensions if available
    if (interviewResults[0]?.analysis?.dimensions) {
      console.log('📊 Analyzing performance across dimensions');

      // Get all dimension names
      const dimensionNames = Object.keys(interviewResults[0].analysis.dimensions);

      // Calculate average scores for each dimension
      const dimensionScores = dimensionNames.reduce((acc, dimension) => {
        const scores = interviewResults.map(result => 
          result.analysis.dimensions[dimension]?.score || 0
        );
        const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        acc[dimension] = {
          average: avg.toFixed(1),
          min: Math.min(...scores),
          max: Math.max(...scores)
        };
        return acc;
      }, {});

      console.log('📈 Dimension analysis:', dimensionScores);
    }

    console.log('📝 Feedback structure:', {
      overallFeedbackLength: feedback.overallFeedback.length,
      strengthsCount: feedback.strengths.length,
      areasToImproveCount: feedback.areasToImprove.length,
      conceptsToStudyCount: feedback.conceptsToStudy.length,
      interviewTipsCount: feedback.interviewTips.length
    });

    // Read summary aloud if enabled
    if (voiceEnabled && isSpeechSynthesisSupported) {
      const voices = getVoices();
      const voiceObj = voices.find(v => v.name === selectedVoice) || voices[0];

      const summaryText = `Here's your interview feedback summary. Your overall score is ${avgScore.toFixed(1)} out of 10. ${feedback.overallFeedback.substring(0, 200)}`;

      speak(summaryText, {
        voice: voiceObj,
        rate: 1,
        pitch: 1
      });
    }
  }, [interviewResults, feedback, voiceEnabled, isSpeechSynthesisSupported, selectedVoice, getVoices, speak]);
  
  // Calculate overall score
  const overallScore = interviewResults.reduce((sum, result) => {
    const score = typeof result.analysis.overallScore === 'number' 
      ? result.analysis.overallScore 
      : parseInt(result.analysis.overallScore) || 0;
    return sum + score;
  }, 0) / interviewResults.length;

  // Calculates scores for each dimension if available
  const calculateDimensionScores = () => {
    if (!interviewResults[0]?.analysis?.dimensions) return null;
    
    const dimensionNames = Object.keys(interviewResults[0].analysis.dimensions);
    
    return dimensionNames.reduce((acc, dimension) => {
      // Get all scores for this dimension
      const scores = interviewResults.map(result => 
        result.analysis.dimensions[dimension]?.score || 0
      );
      
      // Calculate statistics
      const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      
      acc[dimension] = {
        average: avg,
        min: Math.min(...scores),
        max: Math.max(...scores),
        scores: scores
      };
      
      return acc;
    }, {});
  };
  
  const dimensionScores = calculateDimensionScores();

  const toggleQuestion = (index) => {
    if (expandedQuestion === index) {
      console.log(`🔍 Collapsing details for question ${index + 1}`);
      setExpandedQuestion(null);
    } else {
      console.log(`🔍 Expanding details for question ${index + 1}`);
      setExpandedQuestion(index);
      
      // Read the details aloud if voice is enabled
      if (voiceEnabled && isSpeechSynthesisSupported) {
        const question = interviewResults[index];
        const voices = getVoices();
        const voiceObj = voices.find(v => v.name === selectedVoice) || voices[0];
        
        const detailText = `Question ${index + 1}: ${question.question.substring(0, 100)}. 
                          Your score was ${question.analysis.overallScore} out of 10. 
                          Assessment: ${question.analysis.assessment}`;
        
        speak(detailText, {
          voice: voiceObj,
          rate: voiceRate
        });
      }
    }
  };

  // Log when user views detailed feedback
  useEffect(() => {
    if (expandedQuestion !== null) {
      const question = interviewResults[expandedQuestion];
      console.log(`📖 User viewing details for Q${expandedQuestion + 1}:`, {
        question: question.question.substring(0, 30) + '...',
        userAnswerLength: question.userAnswer.length,
        score: question.analysis.overallScore || question.analysis.score
      });
    }
  }, [expandedQuestion, interviewResults, getVoices, speak]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Interview Feedback</h2>
      
      <div className="mb-8 text-center">
        <div className="inline-block rounded-full bg-blue-100 p-3 mb-2">
          <div className="text-3xl font-bold text-blue-800">
            {overallScore.toFixed(1)}/10
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Overall Score</h3>
      </div>
      
      {/* Performance Across Dimensions */}
      {dimensionScores && (
        <div className="mb-8 p-5 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Performance By Dimension</h3>
          
          <div className="flex mb-3 border-b pb-2">
            <button 
              onClick={() => setDimensionChartView('average')}
              className={`mr-3 px-3 py-1 rounded-md ${dimensionChartView === 'average' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Average
            </button>
            <button 
              onClick={() => setDimensionChartView('min')}
              className={`mr-3 px-3 py-1 rounded-md ${dimensionChartView === 'min' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Minimum
            </button>
            <button 
              onClick={() => setDimensionChartView('max')}
              className={`px-3 py-1 rounded-md ${dimensionChartView === 'max' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Maximum
            </button>
          </div>
          
          <div className="space-y-3">
            {Object.entries(dimensionScores).map(([dimension, data]) => (
              <div key={dimension} className="flex items-center">
                <div className="w-40 mr-2">
                  <div className="text-sm font-medium text-gray-700">
                    {dimension.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                </div>
                <div className="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-4 rounded-full ${
                      data[dimensionChartView] >= 7 ? 'bg-green-500' : 
                      data[dimensionChartView] >= 4 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${data[dimensionChartView] * 10}%` }}
                  ></div>
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700 w-12 text-right">
                  {data[dimensionChartView].toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Feedback Summary */}
      <div className="mb-8 p-5 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Overall Feedback</h3>
        <p className="mb-4 text-gray-700">{feedback.overallFeedback}</p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="font-bold text-green-700 mb-2">Strengths</h4>
            <ul className="list-disc pl-5 space-y-1">
              {feedback.strengths.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-red-700 mb-2">Areas to Improve</h4>
            <ul className="list-disc pl-5 space-y-1">
              {feedback.areasToImprove.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold text-blue-700 mb-2">Concepts to Study</h4>
          <ul className="list-disc pl-5 space-y-1">
            {feedback.conceptsToStudy.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold text-purple-700 mb-2">Interview Tips</h4>
          <ul className="list-disc pl-5 space-y-1">
            {feedback.interviewTips.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
        
        {voiceEnabled && isSpeechSynthesisSupported && (
          <button 
            onClick={() => {
              const voices = getVoices();
              const voiceObj = voices.find(v => v.name === selectedVoice) || voices[0];
              
              speak(feedback.overallFeedback, {
                voice: voiceObj,
                rate: voiceRate
              });
            }}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span className="mr-1">🔊</span> Read feedback aloud
          </button>
        )}
      </div>
      
      {/* Individual Question Breakdown */}
      <h3 className="text-xl font-bold mb-4 text-gray-800">Question Breakdown</h3>
      <div className="space-y-4">
        {interviewResults.map((result, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div 
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
              onClick={() => toggleQuestion(index)}
            >
              <div>
                <span className="font-medium">Question {index + 1}:</span> {result.question.substring(0, 80)}...
              </div>
              <div className="flex items-center space-x-3">
                <div className={`font-bold rounded-full w-10 h-10 flex items-center justify-center
                  ${Number(result.analysis.overallScore || result.analysis.score) >= 7 ? 'bg-green-100 text-green-800' : 
                    Number(result.analysis.overallScore || result.analysis.score) >= 4 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}
                >
                  {result.analysis.overallScore || result.analysis.score}
                </div>
                <svg className={`w-6 h-6 transition-transform ${expandedQuestion === index ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            {expandedQuestion === index && (
              <div className="p-4 border-t border-gray-200">
                <div className="mb-4">
                  <h4 className="font-bold text-gray-700 mb-2">Your Answer:</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{result.userAnswer}</p>
                </div>
                
                {/* Dimensional breakdown if available */}
                {result.analysis.dimensions && (
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-700 mb-2">Dimension Scores:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(result.analysis.dimensions).map(([dimension, data]) => (
                        <div key={dimension} className="flex items-center">
                          <div className="w-32 text-sm font-medium text-gray-700">
                            {dimension.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                          </div>
                          <div className={`ml-2 font-medium 
                            ${data.score >= 7 ? 'text-green-600' : 
                              data.score >= 4 ? 'text-yellow-600' : 
                              'text-red-600'}`}
                          >
                            {data.score}/10
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-2">
                      {Object.entries(result.analysis.dimensions).map(([dimension, data]) => (
                        <div key={dimension} className="mt-2">
                          <div className="text-sm font-medium text-gray-700">
                            {dimension.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} feedback:
                          </div>
                          <div className="text-sm text-gray-600">
                            {data.comments}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <h4 className="font-bold text-gray-700 mb-2">Assessment:</h4>
                  <p className="text-gray-600">{result.analysis.assessment}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Expected Answer:</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{result.expectedAnswer}</p>
                </div>
                
                {voiceEnabled && isSpeechSynthesisSupported && (
                  <button 
                    onClick={() => {
                      const voices = getVoices();
                      const voiceObj = voices.find(v => v.name === selectedVoice) || voices[0];
                      const assessmentText = `Assessment for question ${index + 1}: ${result.analysis.assessment}`;
                      speak(assessmentText, { voice: voiceObj, rate: voiceRate });
                    }}
                    className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <span className="mr-1">🔊</span> Read assessment aloud
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button 
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => {
            console.log('🔄 User requested new interview');
            window.location.reload();
          }}
        >
          Start New Interview
        </button>
      </div>
    </div>
  );
};

export default FeedbackSummary;