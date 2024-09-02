// src\utils\sessionManager.js

import { useState, useEffect, useCallback } from "react";

const SESSION_STORAGE_KEY = "conversationSessions";

const useSessionManager = () => {
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);

    useEffect(() => {
        loadSessionsFromStorage();
    }, []);

    const loadSessionsFromStorage = useCallback(() => {
        const storedSessions = localStorage.getItem(SESSION_STORAGE_KEY);
        if (storedSessions) {
            setSessions(JSON.parse(storedSessions));
        }
    }, []);

    const saveSessionsToStorage = useCallback((updatedSessions) => {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedSessions));
    }, []);

    const createNewSession = useCallback(() => {
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
    }, [sessions, saveSessionsToStorage]);

    const updateSession = useCallback(
        (sessionId, conversation) => {
            const updatedSessions = sessions.map((session) =>
                session.id === sessionId ? { ...session, conversation } : session
            );
            setSessions(updatedSessions);
            saveSessionsToStorage(updatedSessions);
        },
        [sessions, saveSessionsToStorage]
    );

    const deleteSession = useCallback(
        (sessionId) => {
            const updatedSessions = sessions.filter((session) => session.id !== sessionId);
            setSessions(updatedSessions);
            if (currentSession === sessionId) {
                setCurrentSession(null);
            }
            saveSessionsToStorage(updatedSessions);
        },
        [sessions, currentSession, saveSessionsToStorage]
    );

    const getSession = useCallback(
        (sessionId) => {
            return sessions.find((session) => session.id === sessionId);
        },
        [sessions]
    );

    const getAllSessions = useCallback(() => {
        return sessions;
    }, [sessions]);

    const setActiveSession = useCallback((sessionId) => {
        setCurrentSession(sessionId);
    }, []);

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
