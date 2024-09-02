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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const App = () => {
    const [isListening, setIsListening] = useState(false);
    const [text, setText] = useState("");
    const [conversation, setConversation] = useState([]);
    const [language, setLanguage] = useState("en-US");
    const [aiResponse, setAiResponse] = useState("");

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
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");

            setText(transcript);
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
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_CLAUDE_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
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
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Voice Talking App with AI
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
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
                    <Button
                        variant="contained"
                        color={isListening ? "secondary" : "primary"}
                        onClick={toggleListening}
                        sx={{ mb: 2 }}
                    >
                        {isListening ? "Stop" : "Start"} Listening
                    </Button>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleSubmit} sx={{ mb: 2 }}>
                        Submit
                    </Button>
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
