// src\utils\sessionManager.js

import { useState, useEffect } from 'react';

const SESSION_STORAGE_KEY = 'conversationSessions';

const useSessionManager = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    loadSessionsFromStorage();
  }, []);

  const loadSessionsFromStorage = () => {
    const storedSessions = localStorage.getItem(SESSION_STORAGE_KEY);
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    }
  };

  const saveSessionsToStorage = (updatedSessions) => {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedSessions));
  };

  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      conversation: [],
    };
    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    setCurrentSession(newSession.id);
    saveSessionsToStorage(updatedSessions);
    return newSession.id;
  };

  const updateSession = (sessionId, conversation) => {
    const updatedSessions = sessions.map((session) =>
      session.id === sessionId ? { ...session, conversation } : session
    );
    setSessions(updatedSessions);
    saveSessionsToStorage(updatedSessions);
  };

  const deleteSession = (sessionId) => {
    const updatedSessions = sessions.filter((session) => session.id !== sessionId);
    setSessions(updatedSessions);
    if (currentSession === sessionId) {
      setCurrentSession(null);
    }
    saveSessionsToStorage(updatedSessions);
  };

  const getSession = (sessionId) => {
    return sessions.find((session) => session.id === sessionId);
  };

  const getAllSessions = () => {
    return sessions;
  };

  const setActiveSession = (sessionId) => {
    setCurrentSession(sessionId);
  };

  return {
    createNewSession,
    updateSession,
    deleteSession,
    getSession,
    getAllSessions,
    setActiveSession,
    currentSession,
  };
};

export default useSessionManager;