import { useEffect, useRef } from "react";

const SpeechRecognition = ({ isListening, language, onTranscript, onError }) => {
    const recognition = useRef(null);

    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognition.current = new window.webkitSpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;

            recognition.current.onresult = (event) => {
                let finalTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript !== "") {
                    onTranscript(finalTranscript);
                }
            };

            recognition.current.onerror = (event) => {
                onError(event.error);
            };
        } else {
            onError("Speech recognition is not supported in this browser.");
        }

        return () => {
            if (recognition.current) {
                recognition.current.stop();
            }
        };
    }, [onTranscript, onError]);

    useEffect(() => {
        if (recognition.current) {
            recognition.current.lang = language;
        }
    }, [language]);

    useEffect(() => {
        if (recognition.current) {
            if (isListening) {
                recognition.current.start();
            } else {
                recognition.current.stop();
            }
        }
    }, [isListening]);

    return null;
};

export default SpeechRecognition;
