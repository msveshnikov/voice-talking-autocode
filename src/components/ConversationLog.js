import React, { useEffect } from "react";
import { Paper, Typography, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const ConversationLog = ({ conversation }) => {
    useEffect(() => {
        const savedConversations = JSON.parse(localStorage.getItem("conversations")) || [];
        if (
            conversation.length > 0 &&
            !savedConversations.some((c) => JSON.stringify(c) === JSON.stringify(conversation))
        ) {
            savedConversations.push(conversation);
            localStorage.setItem("conversations", JSON.stringify(savedConversations));
        }
    }, [conversation]);

    const handleSaveConversation = () => {
        const savedConversations = JSON.parse(localStorage.getItem("conversations")) || [];
        savedConversations.push(conversation);
        localStorage.setItem("conversations", JSON.stringify(savedConversations));
    };

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2, maxHeight: 300, overflow: "auto" }}>
            <Typography variant="h6" gutterBottom>
                Conversation Log:
                <IconButton onClick={handleSaveConversation} size="small" sx={{ ml: 1 }}>
                    <SaveIcon />
                </IconButton>
            </Typography>
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
        </Paper>
    );
};

export default ConversationLog;
