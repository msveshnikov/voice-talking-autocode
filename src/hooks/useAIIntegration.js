import { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const useAIIntegration = () => {
    const [aiResponse, setAiResponse] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(async (message, language) => {
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
            return aiReply;
        } catch (err) {
            setError(`Error communicating with AI: ${err.message}`);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { aiResponse, error, isLoading, sendMessage };
};

export default useAIIntegration;
