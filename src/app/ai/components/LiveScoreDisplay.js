"use client";
import React from 'react';

const LiveScoreDisplay = ({ analysis, liveAnalysis, isLiveScoreEnabled }) => {
  // Don't show anything if live scoring is disabled or no analysis is available
  if (!isLiveScoreEnabled || (!analysis && !liveAnalysis)) {
    return null;
  }

  // Use either the final analysis or the live analysis
  const displayAnalysis = analysis || liveAnalysis;
  
  // If there's no score, don't display anything
  if (!displayAnalysis || (!displayAnalysis.overallScore && !displayAnalysis.preliminaryScore)) {
    return null;
  }
  
  // Determine the score to display
  const score = displayAnalysis.overallScore || displayAnalysis.preliminaryScore;
  const isLive = !analysis && liveAnalysis;
  
  // Determine color based on score
  const getScoreColor = (score) => {
    if (score >= 7) return {
      bg: 'bg-gradient-to-r from-green-50 to-green-100',
      border: 'border-green-300',
      text: 'text-green-800',
      scoreText: 'text-green-600',
      scoreBg: 'bg-green-100',
    };
    if (score >= 4) return {
      bg: 'bg-gradient-to-r from-yellow-50 to-yellow-100',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      scoreText: 'text-yellow-600',
      scoreBg: 'bg-yellow-100',
    };
    return {
      bg: 'bg-gradient-to-r from-red-50 to-red-100',
      border: 'border-red-300',
      text: 'text-red-800',
      scoreText: 'text-red-600',
      scoreBg: 'bg-red-100',
    };
  };
  
  const colors = getScoreColor(score);
  
  // Render the score as a circle
  const renderScoreCircle = (score) => {
    const scorePercent = Math.round((score / 10) * 100);
    const strokeDasharray = 2 * Math.PI * 40; // Circumference of the circle
    const strokeDashoffset = strokeDasharray * (1 - scorePercent / 100);
    
    return (
      <div className="relative h-24 w-24 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            strokeWidth="8"
            className="stroke-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            strokeWidth="8"
            className={`stroke-current ${colors.scoreText}`}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${colors.scoreText}`}>{score}</span>
          <span className="text-xs">out of 10</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`mt-6 rounded-lg border ${colors.border} shadow-md overflow-hidden`}>
      {/* Header with title and score */}
      <div className={`${colors.bg} p-4 border-b ${colors.border}`}>
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <h3 className={`font-bold ${colors.text} text-lg flex items-center`}>
              {isLive ? (
                <>
                  <span className="mr-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </span>
                  Live Analysis
                </>
              ) : (
                'Final Score'
              )}
            </h3>
            {isLive && (
              <p className="text-xs text-gray-600 mt-1">
                Analysis is updated as you speak
              </p>
            )}
          </div>
          
          <div className="mt-3 md:mt-0">
            {renderScoreCircle(score)}
          </div>
        </div>
      </div>
      
      {/* Assessment text */}
      <div className="p-4 bg-white">
        {displayAnalysis.assessment && (
          <div className="mb-4">
            <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Assessment</h4>
            <p className="text-gray-700 italic border-l-4 pl-3 py-1 border-gray-300">
              "{displayAnalysis.assessment}"
            </p>
          </div>
        )}
        
        {/* Show detailed dimension scores if available */}
        {displayAnalysis.dimensions && (
          <div className="mt-4">
            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Performance by Dimension</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(displayAnalysis.dimensions).map(([dimension, data]) => {
                const dimensionColors = getScoreColor(data.score);
                
                return (
                  <div key={dimension} className="bg-gray-50 rounded-md p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">
                        {dimension.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className={`font-bold ${dimensionColors.scoreText}`}>
                        {data.score}/10
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${dimensionColors.scoreText.replace('text', 'bg')}`}
                        style={{ width: `${data.score * 10}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {isLive && (
          <div className="mt-4 text-xs text-gray-500 bg-blue-50 p-2 rounded border border-blue-100 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            This is a preliminary analysis and may change as you continue speaking.
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScoreDisplay;