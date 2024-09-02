import React from "react";
import { Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const ConversationLog = ({ conversation }) => {
    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2, maxHeight: 300, overflow: "auto" }}>
            <Typography variant="h6" gutterBottom>
                Conversation Log:
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
