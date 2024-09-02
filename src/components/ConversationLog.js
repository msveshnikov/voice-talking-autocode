import React, { useEffect, useState, useCallback } from "react";
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Collapse,
    Box,
    Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";

const ConversationLog = ({ conversation, currentSession, onSessionChange }) => {
    const [expanded, setExpanded] = useState(true);
    const [savedSessions, setSavedSessions] = useState([]);

    useEffect(() => {
        const savedConversations = JSON.parse(localStorage.getItem("conversationSessions")) || [];
        setSavedSessions(savedConversations);
    }, []);

    const saveConversationToLocalStorage = useCallback(
        (sessionId, conversationData) => {
            const updatedSessions = savedSessions.filter((session) => session.id !== sessionId);
            const newSession = {
                id: sessionId,
                conversation: conversationData,
                timestamp: new Date().toISOString(),
            };
            updatedSessions.push(newSession);
            localStorage.setItem("conversationSessions", JSON.stringify(updatedSessions));
            setSavedSessions(updatedSessions);
        },
        [savedSessions]
    );

    useEffect(() => {
        if (conversation.length > 0 && currentSession) {
            saveConversationToLocalStorage(currentSession, conversation);
        }
    }, [conversation, currentSession, saveConversationToLocalStorage]);

    const handleSaveConversation = () => {
        const newSessionId = Date.now().toString();
        saveConversationToLocalStorage(newSessionId, conversation);
        onSessionChange(newSessionId);
    };

    const handleDeleteSession = (sessionId) => {
        const updatedSessions = savedSessions.filter((session) => session.id !== sessionId);
        localStorage.setItem("conversationSessions", JSON.stringify(updatedSessions));
        setSavedSessions(updatedSessions);
        if (sessionId === currentSession) {
            onSessionChange(null);
        }
    };

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2, maxHeight: 400, overflow: "auto" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    Conversation Log
                </Typography>
                <Box>
                    <IconButton onClick={handleSaveConversation} size="small">
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={toggleExpanded} size="small">
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
            </Box>
            <Collapse in={expanded}>
                <List>
                    {conversation.map((entry, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={entry.role === "user" ? "You" : "AI"}
                                    secondary={entry.content}
                                    primaryTypographyProps={{ fontWeight: "bold" }}
                                    secondaryTypographyProps={{ component: "div" }}
                                />
                            </ListItem>
                            {index < conversation.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Collapse>
        </Paper>
    );
};

export default ConversationLog;
