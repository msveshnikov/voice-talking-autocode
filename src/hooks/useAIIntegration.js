import { useState, useCallback } from "react";
import axios from "axios";

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

const useAIIntegration = () => {
    const [aiResponse, setAiResponse] = useState("");
    const [error, setError] = useState(null);

    const sendMessage = useCallback(async (message) => {
        try {
            const response = await axios.post(
                CLAUDE_API_URL,
                {
                    model: "claude-3-haiku-20240307",
                    max_tokens: 1000,
                    messages: [{ role: "user", content: message }],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": process.env.REACT_APP_CLAUDE_KEY,
                    },
                }
            );

            const aiReply = response.data.content[0].text;
            setAiResponse(aiReply);
            setError(null);
            return aiReply;
        } catch (err) {
            setError("Error communicating with AI: " + err.message);
            return null;
        }
    }, []);

    return { aiResponse, error, sendMessage };
};

export default useAIIntegration;
