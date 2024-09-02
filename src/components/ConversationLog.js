import React, { useEffect, useState } from "react";
import { Paper, Typography, List, ListItem, ListItemText, Divider, IconButton, Collapse, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ConversationLog = ({ conversation, currentSession }) => {
    const [expanded, setExpanded] = useState(true);
    const [savedSessions, setSavedSessions] = useState([]);

    useEffect(() => {
        const savedConversations = JSON.parse(localStorage.getItem("conversationSessions")) || [];
        setSavedSessions(savedConversations);
    }, []);

    useEffect(() => {
        if (conversation.length > 0 && currentSession) {
            const updatedSessions = savedSessions.filter((session) => session.id !== currentSession);
            updatedSessions.push({ id: currentSession, conversation });
            localStorage.setItem("conversationSessions", JSON.stringify(updatedSessions));
            setSavedSessions(updatedSessions);
        }
    }, [conversation, currentSession, savedSessions]);

    const handleSaveConversation = () => {
        const newSession = { id: Date.now().toString(), conversation };
        const updatedSessions = [...savedSessions, newSession];
        localStorage.setItem("conversationSessions", JSON.stringify(updatedSessions));
        setSavedSessions(updatedSessions);
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
