import { useState, useCallback, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import useSessionManager from "../utils/sessionManager";

const useAIIntegration = () => {
    const [aiResponse, setAiResponse] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]);
    const {
        createNewSession,
        updateSession,
        deleteSession,
        getSession,
        getAllSessions,
        setActiveSession,
        currentSession,
    } = useSessionManager();

    useEffect(() => {
        if (currentSession) {
            const session = getSession(currentSession);
            if (session) {
                setConversationHistory(session.conversation);
            }
        }
    }, [currentSession, getSession]);

    const sendMessage = useCallback(
        async (message, language) => {
            setIsLoading(true);
            setError(null);

            try {
                const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });

                const prompt = `You are a helpful AI assistant. Please respond in ${language}. Context: ${conversationHistory
                    .map((msg) => `${msg.role}: ${msg.content}`)
                    .join("\n")}\n\nUser: ${message}\nAssistant:`;
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const aiReply = response.text();

                setAiResponse(aiReply);
                const updatedConversation = [
                    ...conversationHistory,
                    { role: "user", content: message },
                    { role: "assistant", content: aiReply },
                ];
                setConversationHistory(updatedConversation);

                if (!currentSession) {
                    const newSessionId = createNewSession();
                    setActiveSession(newSessionId);
                }
                updateSession(currentSession, updatedConversation);

                return aiReply;
            } catch (err) {
                setError(`Error communicating with AI: ${err.message}`);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [conversationHistory, currentSession, createNewSession, setActiveSession, updateSession]
    );

    const clearConversationHistory = useCallback(() => {
        setConversationHistory([]);
        if (currentSession) {
            deleteSession(currentSession);
            setActiveSession(null);
        }
    }, [currentSession, deleteSession, setActiveSession]);

    const loadSession = useCallback(
        (sessionId) => {
            const session = getSession(sessionId);
            if (session) {
                setConversationHistory(session.conversation);
                setActiveSession(sessionId);
            }
        },
        [getSession, setActiveSession]
    );

    return {
        aiResponse,
        error,
        isLoading,
        sendMessage,
        conversationHistory,
        clearConversationHistory,
        sessions: getAllSessions(),
        loadSession,
        deleteSession,
        currentSession,
    };
};

export default useAIIntegration;
