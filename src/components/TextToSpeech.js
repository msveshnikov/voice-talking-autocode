import { useEffect, useRef } from 'react';

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

  const speak = (text, language) => {
    synth.current.cancel();
    utterance.current.text = text;
    utterance.current.lang = language;
    synth.current.speak(utterance.current);
  };

  const stop = () => {
    synth.current.cancel();
  };

  return { speak, stop };
};

export default TextToSpeech;