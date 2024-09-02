import { useEffect, useRef, useCallback } from "react";

const SpeechRecognition = ({ isListening, language, onTranscript, onError, autoRecording }) => {
    const recognition = useRef(null);
    const lastTranscriptRef = useRef("");
    const timeoutRef = useRef(null);

    const handleResult = useCallback(
        (event) => {
            let finalTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript !== "") {
                lastTranscriptRef.current = finalTranscript;
                onTranscript(finalTranscript);
            }
        },
        [onTranscript]
    );

    const handleError = useCallback(
        (event) => {
            onError(event.error);
        },
        [onError]
    );

    const handleEnd = useCallback(() => {
        if (autoRecording) {
            timeoutRef.current = setTimeout(() => {
                if (recognition.current) {
                    recognition.current.start();
                }
            }, 1000);
        }
    }, [autoRecording]);

    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognition.current = new window.webkitSpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.onresult = handleResult;
            recognition.current.onerror = handleError;
            recognition.current.onend = handleEnd;
        } else {
            onError("Speech recognition is not supported in this browser.");
        }

        return () => {
            if (recognition.current) {
                recognition.current.stop();
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [handleResult, handleError, handleEnd, onError]);

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
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            }
        }
    }, [isListening]);

    useEffect(() => {
        const pauseDetectionTimeout = 1500;

        const checkForPause = () => {
            if (lastTranscriptRef.current.trim() !== "") {
                onTranscript(lastTranscriptRef.current);
                lastTranscriptRef.current = "";
            }
        };

        if (isListening) {
            const intervalId = setInterval(checkForPause, pauseDetectionTimeout);
            return () => clearInterval(intervalId);
        }
    }, [isListening, onTranscript]);

    return null;
};

export default SpeechRecognition;