// Speech recognition utility
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function useSpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition({
    commands: [],
    transcribing: true,
    clearTranscriptOnListen: true,
    onStart: () => {
      console.log('🎤 Speech recognition started');
    },
    onEnd: () => {
      console.log('🎤 Speech recognition stopped');
    },
    onError: (error) => {
      console.error('🎤 Speech recognition error:', error);
    },
    onResult: (result) => {
      console.log(`🎤 Speech recognition interim result: ${result.length} characters`);
    }
  });

  useEffect(() => {
    setHasRecognitionSupport(browserSupportsSpeechRecognition);
    console.log('🎤 Speech recognition supported:', browserSupportsSpeechRecognition);
    console.log('🎤 Microphone available:', isMicrophoneAvailable);
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  useEffect(() => {
    if (transcript) {
      console.log(`🎤 New transcript: ${transcript.length} characters`);
    }
  }, [transcript]);

  useEffect(() => {
    console.log(`🎤 Listening state changed: ${listening}`);
  }, [listening]);

  const startListening = () => {
    console.log('🎤 Attempting to start speech recognition...');
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
  };

  const stopListening = () => {
    console.log('🎤 Stopping speech recognition...');
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  return {
    transcript,
    isListening: listening,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport
  };
}