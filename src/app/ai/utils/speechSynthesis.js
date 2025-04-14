// Speech synthesis utility
export function useSpeechSynthesis() {
  // Check if browser supports speech synthesis
  const isSpeechSynthesisSupported = typeof window !== 'undefined' && window.speechSynthesis;
  
  // Function to speak text
  const speak = (text, options = {}) => {
    if (!isSpeechSynthesisSupported) {
      console.warn('🔊 Speech synthesis not supported in this browser');
      return false;
    }
    
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set options
      utterance.rate = options.rate || 1; // Speed of speech (0.1 to 10)
      utterance.pitch = options.pitch || 1; // Pitch of speech (0 to 2)
      utterance.volume = options.volume || 1; // Volume (0 to 1)
      
      // Set voice if provided
      if (options.voice) {
        utterance.voice = options.voice;
      }
      
      // Add event listeners for logging
      utterance.onstart = () => {
        console.log('🔊 Speech started');
      };
      
      utterance.onend = () => {
        console.log('🔊 Speech ended');
      };
      
      utterance.onerror = (event) => {
        console.error('🔊 Speech error:', event.error, event);
      };
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
      
      // Chrome has a bug where speech synthesis sometimes stops after ~15 seconds
      // This is a workaround to keep it going
      const resumeInfinity = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(resumeInfinity);
        } else {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000); // Reset every 10 seconds
      
      // Clear the interval when speech ends
      utterance.onend = () => {
        clearInterval(resumeInfinity);
        console.log('🔊 Speech ended');
      };
      
      return true;
    } catch (error) {
      console.error('🔊 Error in speech synthesis:', error);
      return false;
    }
  };
  
  // Function to stop speaking
  const cancel = () => {
    if (!isSpeechSynthesisSupported) return;
    try {
      window.speechSynthesis.cancel();
      console.log('🔊 Speech cancelled');
    } catch (error) {
      console.error('🔊 Error cancelling speech:', error);
    }
  };
  
  // Function to pause speaking
  const pause = () => {
    if (!isSpeechSynthesisSupported) return;
    try {
      window.speechSynthesis.pause();
      console.log('🔊 Speech paused');
    } catch (error) {
      console.error('🔊 Error pausing speech:', error);
    }
  };
  
  // Function to resume speaking
  const resume = () => {
    if (!isSpeechSynthesisSupported) return;
    try {
      window.speechSynthesis.resume();
      console.log('🔊 Speech resumed');
    } catch (error) {
      console.error('🔊 Error resuming speech:', error);
    }
  };
  
  // Function to get available voices
  const getVoices = () => {
    if (!isSpeechSynthesisSupported) return [];
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        return voices;
      } else {
        console.warn('🔊 No voices available yet, returning empty array');
        return [];
      }
    } catch (error) {
      console.error('🔊 Error getting voices:', error);
      return [];
    }
  };

  return {
    speak,
    cancel,
    pause,
    resume,
    getVoices,
    isSpeechSynthesisSupported
  };
}