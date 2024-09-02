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
import useSessionManager from "../utils/sessionManager";

const ConversationLog = ({ conversation, currentSession, onSessionChange }) => {
    const [expanded, setExpanded] = useState(true);
    const { getAllSessions, updateSession, deleteSession, createNewSession, setActiveSession } = useSessionManager();

    useEffect(() => {
        if (conversation.length > 0 && currentSession) {
            updateSession(currentSession, conversation);
        }
    }, [conversation, currentSession, updateSession]);

    const handleSaveConversation = useCallback(() => {
        const newSessionId = createNewSession();
        updateSession(newSessionId, conversation);
        onSessionChange(newSessionId);
    }, [conversation, createNewSession, updateSession, onSessionChange]);

    const handleDeleteSession = useCallback(
        (sessionId) => {
            deleteSession(sessionId);
            if (sessionId === currentSession) {
                onSessionChange(null);
            }
        },
        [deleteSession, currentSession, onSessionChange]
    );

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleLoadSession = useCallback(
        (sessionId) => {
            setActiveSession(sessionId);
            onSessionChange(sessionId);
        },
        [setActiveSession, onSessionChange]
    );

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
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Saved Sessions
            </Typography>
            <List>
                {getAllSessions().map((session) => (
                    <ListItem key={session.id}>
                        <ListItemText
                            primary={`Session ${session.id}`}
                            secondary={new Date(session.timestamp).toLocaleString()}
                        />
                        <Button onClick={() => handleLoadSession(session.id)}>Load</Button>
                        <IconButton onClick={() => handleDeleteSession(session.id)} size="small">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ConversationLog;
