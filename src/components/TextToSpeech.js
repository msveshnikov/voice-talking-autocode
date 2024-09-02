import { useEffect, useRef, useCallback } from 'react';

const TextToSpeech = {
  speak: (text, language) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  },
};

export const useTextToSpeech = () => {
  const synth = useRef(window.speechSynthesis);
  const utterance = useRef(new SpeechSynthesisUtterance());

  useEffect(() => {
    const currentSynth = synth.current;
    return () => {
      currentSynth.cancel();
    };
  }, []);

  const speak = useCallback((text, language) => {
    synth.current.cancel();
    utterance.current.text = text;
    utterance.current.lang = language;
    synth.current.speak(utterance.current);
  }, []);

  const stop = useCallback(() => {
    synth.current.cancel();
  }, []);

  const pause = useCallback(() => {
    synth.current.pause();
  }, []);

  const resume = useCallback(() => {
    synth.current.resume();
  }, []);

  const getVoices = useCallback(() => {
    return synth.current.getVoices();
  }, []);

  const setVoice = useCallback((voice) => {
    utterance.current.voice = voice;
  }, []);

  return { speak, stop, pause, resume, getVoices, setVoice };
};

export default TextToSpeech;