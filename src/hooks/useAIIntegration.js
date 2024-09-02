import { useState, useCallback } from "react";
import axios from "axios";

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

const useAIIntegration = () => {
    const [aiResponse, setAiResponse] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(async (message, language) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                CLAUDE_API_URL,
                {
                    model: "claude-3-haiku-20240307",
                    max_tokens: 1000,
                    messages: [
                        {
                            role: "system",
                            content: `You are a helpful AI assistant. Please respond in ${language}.`,
                        },
                        { role: "user", content: message },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": process.env.REACT_APP_CLAUDE_KEY,
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );

            const aiReply = response.data.content[0].text;
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
