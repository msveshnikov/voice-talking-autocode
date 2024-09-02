import { useState, useCallback, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const useAIIntegration = () => {
    const [aiResponse, setAiResponse] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]);

    useEffect(() => {
        const savedConversations = localStorage.getItem("conversationHistory");
        if (savedConversations) {
            setConversationHistory(JSON.parse(savedConversations));
        }
    }, []);

    const saveConversationToLocalStorage = useCallback((conversation) => {
        localStorage.setItem("conversationHistory", JSON.stringify(conversation));
    }, []);

    const sendMessage = useCallback(
        async (message, language) => {
            setIsLoading(true);
            setError(null);

            try {
                const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });

                const prompt = `You are a helpful AI assistant. Please respond in ${language}. ${message}`;
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
                saveConversationToLocalStorage(updatedConversation);
                return aiReply;
            } catch (err) {
                setError(`Error communicating with AI: ${err.message}`);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [conversationHistory, saveConversationToLocalStorage]
    );

    const clearConversationHistory = useCallback(() => {
        setConversationHistory([]);
        localStorage.removeItem("conversationHistory");
    }, []);

    return {
        aiResponse,
        error,
        isLoading,
        sendMessage,
        conversationHistory,
        clearConversationHistory,
    };
};

export default useAIIntegration;
