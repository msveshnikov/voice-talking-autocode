import React, { useState, useEffect, useCallback } from "react";
import {
    Container,
    Typography,
    Button,
    TextField,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const App = () => {
    const [isListening, setIsListening] = useState(false);
    const [text, setText] = useState("");
    const [conversation, setConversation] = useState([]);
    const [language, setLanguage] = useState("en-US");
    const [aiResponse, setAiResponse] = useState("");
    const [error, setError] = useState("");

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    const handleListen = useCallback(() => {
        if (isListening) {
            recognition.start();
            recognition.onend = () => {
                recognition.start();
            };
        } else {
            recognition.stop();
            recognition.onend = () => {
                console.log("Stopped listening per click");
            };
        }

        recognition.onstart = () => {
            console.log("Listening started");
            setError("");
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");

            setText(transcript);
        };

        recognition.onerror = (event) => {
            setError(`Speech recognition error: ${event.error}`);
        };
    }, [isListening]);

    useEffect(() => {
        handleListen();
        return () => {
            recognition.stop();
        };
    }, [handleListen]);

    const toggleListening = () => {
        setIsListening((prevState) => !prevState);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async () => {
        if (text.trim() === "") return;

        setConversation((prev) => [...prev, { role: "user", content: text }]);
        setText("");

        try {
            const response = await fetch("https://api.anthropic.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.REACT_APP_CLAUDE_KEY,
                },
                body: JSON.stringify({
                    model: "claude-3-haiku-20240307",
                    messages: [{ role: "user", content: text }],
                }),
            });

            const data = await response.json();
            const aiReply = data.choices[0].message.content;

            setAiResponse(aiReply);
            setConversation((prev) => [...prev, { role: "assistant", content: aiReply }]);

            const speech = new SpeechSynthesisUtterance(aiReply);
            speech.lang = language;
            window.speechSynthesis.speak(speech);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to get AI response. Please try again.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Voice Talking App with AI
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="language-select-label">Language</InputLabel>
                                <Select
                                    labelId="language-select-label"
                                    id="language-select"
                                    value={language}
                                    label="Language"
                                    onChange={handleLanguageChange}
                                >
                                    <MenuItem value="en-US">English</MenuItem>
                                    <MenuItem value="ru-RU">Russian</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                color={isListening ? "secondary" : "primary"}
                                onClick={toggleListening}
                                fullWidth
                            >
                                {isListening ? "Stop" : "Start"} Listening
                            </Button>
                        </Grid>
                    </Grid>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        sx={{ my: 2 }}
                    />
                    <Button variant="contained" onClick={handleSubmit} sx={{ mb: 2 }}>
                        Submit
                    </Button>
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            AI Response:
                        </Typography>
                        <Typography>{aiResponse}</Typography>
                    </Paper>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Conversation Log:
                        </Typography>
                        {conversation.map((entry, index) => (
                            <Typography key={index}>
                                <strong>{entry.role === "user" ? "You:" : "AI:"}</strong> {entry.content}
                            </Typography>
                        ))}
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default App;
