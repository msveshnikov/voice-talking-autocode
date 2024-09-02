import { useState, useCallback, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const useAIIntegration = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedSessions = localStorage.getItem("conversationSessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  const saveSessionToLocalStorage = useCallback((sessionData) => {
    const updatedSessions = [...sessions, sessionData];
    localStorage.setItem("conversationSessions", JSON.stringify(updatedSessions));
    setSessions(updatedSessions);
  }, [sessions]);

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
      const updatedConversation = [
        ...conversationHistory,
        { role: "user", content: message },
        { role: "assistant", content: aiReply },
      ];
      setConversationHistory(updatedConversation);
      saveSessionToLocalStorage({
        id: Date.now().toString(),
        conversation: updatedConversation,
      });
      return aiReply;
    } catch (err) {
      setError(`Error communicating with AI: ${err.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [conversationHistory, saveSessionToLocalStorage]);

  const clearConversationHistory = useCallback(() => {
    setConversationHistory([]);
    localStorage.removeItem("conversationSessions");
    setSessions([]);
  }, []);

  const loadSession = useCallback((sessionId) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setConversationHistory(session.conversation);
    }
  }, [sessions]);

  return {
    aiResponse,
    error,
    isLoading,
    sendMessage,
    conversationHistory,
    clearConversationHistory,
    sessions,
    loadSession,
  };
};

export default useAIIntegration;