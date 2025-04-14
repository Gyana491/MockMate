'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import InterviewSession from '../ai/components/InterviewSession';
import InterviewSetup from '../ai/components/InterviewSetup';
import FeedbackSummary from '../ai/components/FeedbackSummary';
import { generateInterviewQuestions, generateFeedback } from '../ai/utils/openRouterApi';

export default function Home() {
  const [state, setState] = useState('setup'); // setup, interview, feedback
  const [skill, setSkill] = useState('');
  const [questions, setQuestions] = useState([]);
  const [interviewResults, setInterviewResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Log application lifecycle and state changes
  useEffect(() => {
    console.log('🚀 MockMate application initialized');
    
    // Log environment information
    console.log('🌐 Environment:', {
      nextVersion: '15.3.0',
      reactVersion: '19.0.0',
      userAgent: navigator.userAgent,
      language: navigator.language,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString()
    });
    
    // Add global error handler
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Still call the original method
      originalConsoleError.apply(console, args);
      
      // Log to our application error tracking (if this were a real app)
      if (args[0] && typeof args[0] === 'string' && args[0].includes('OpenRouter API')) {
        console.log('⚠️ OpenRouter API error detected - would send to error tracking service');
      }
    };
    
    return () => {
      console.log('🏁 MockMate application terminated');
      // Restore original console.error
      console.error = originalConsoleError;
    };
  }, []);
  
  // Log state changes
  useEffect(() => {
    console.log(`🔄 Application state changed to: ${state}`);
  }, [state]);

  const handleStartInterview = async (selectedSkill) => {
    console.log(`🚀 Starting interview process for skill: ${selectedSkill}`);
    console.time('⏱️ Total Interview Setup Time');
    
    setLoading(true);
    setSkill(selectedSkill);
    
    try {
      // Generate questions for the selected skill
      console.log(`📚 Requesting questions for ${selectedSkill}...`);
      const questionData = await generateInterviewQuestions(selectedSkill);
      
      console.log(`✅ Received ${questionData.length} questions for ${selectedSkill}`);
      console.log('📊 Question difficulty breakdown:', 
        questionData.reduce((acc, q) => {
          acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
          return acc;
        }, {})
      );
      
      setQuestions(questionData);
      setState('interview');
    } catch (error) {
      console.error('❌ Error generating questions:', error);
      alert('Failed to generate interview questions. Please try again.');
    } finally {
      setLoading(false);
      console.timeEnd('⏱️ Total Interview Setup Time');
    }
  };

  const handleCompleteInterview = async (results) => {
    console.log(`🏁 Interview completed with ${results.length} answered questions`);
    console.time('⏱️ Total Feedback Generation Time');
    
    setLoading(true);
    setInterviewResults(results);
    
    try {
      // Generate feedback based on interview results
      console.log(`📊 Requesting feedback analysis for ${results.length} answers...`);
      
      // Log average score before feedback
      const avgScore = results.reduce((sum, result) => {
        const score = typeof result.analysis.score === 'number' 
          ? result.analysis.score 
          : parseInt(result.analysis.score) || 0;
        return sum + score;
      }, 0) / results.length;
      
      console.log(`📈 Average score before feedback: ${avgScore.toFixed(1)}/10`);
      
      const feedbackData = await generateFeedback(results);
      
      console.log('✅ Feedback generated successfully:', {
        strengthsCount: feedbackData.strengths.length,
        areasToImproveCount: feedbackData.areasToImprove.length,
        conceptsCount: feedbackData.conceptsToStudy.length
      });
      
      setFeedback(feedbackData);
      setState('feedback');
    } catch (error) {
      console.error('❌ Error generating feedback:', error);
      alert('Failed to generate feedback. Please try again.');
      // Still show results without AI feedback
      setState('feedback');
      setFeedback({
        overallFeedback: "We couldn't generate automated feedback due to a technical error.",
        strengths: [],
        areasToImprove: [],
        conceptsToStudy: [],
        interviewTips: []
      });
    } finally {
      setLoading(false);
      console.timeEnd('⏱️ Total Feedback Generation Time');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <header className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">MockMate</h1>
        <p className="text-gray-600">AI-Powered Interview Practice</p>
      </header>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">
              {state === 'setup' ? 'Preparing your interview questions...' : 
               state === 'interview' ? 'Analyzing your answers...' : 
               'Generating your personalized feedback...'}
            </p>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto">
        {state === 'setup' && (
          <InterviewSetup onStartInterview={handleStartInterview} />
        )}
        
        {state === 'interview' && questions.length > 0 && (
          <InterviewSession 
            questions={questions} 
            onComplete={handleCompleteInterview} 
          />
        )}
        
        {state === 'feedback' && feedback && (
          <FeedbackSummary 
            interviewResults={interviewResults} 
            feedback={feedback} 
          />
        )}
      </main>

      <footer className="max-w-6xl mx-auto mt-12 text-center text-gray-500 text-sm">
        <p>© 2025 MockMate - Your AI Interview Assistant</p>
      </footer>
    </div>
  );
}
