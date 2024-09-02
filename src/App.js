import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
    Container,
    Typography,
    Button,
    TextField,
    Box,
    Grid,
    Switch,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Paper,
    Fab,
    Tooltip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MicIcon from "@mui/icons-material/Mic";
import HistoryIcon from "@mui/icons-material/History";
import SendIcon from "@mui/icons-material/Send";
import SpeechRecognition from "./components/SpeechRecognition";
import { useTextToSpeech } from "./components/TextToSpeech";
import LanguageSelector from "./components/LanguageSelector";
import ConversationLog from "./components/ConversationLog";
import useAIIntegration from "./hooks/useAIIntegration";
import useSessionManager from "./utils/sessionManager";
import { lightTheme, darkTheme } from "./styles/theme";

const App = () => {
    const [mode, setMode] = useState("light");
    const [isListening, setIsListening] = useState(false);
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("en-US");
    const [autoRecording, setAutoRecording] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const theme = useMemo(() => createTheme(mode === "light" ? lightTheme : darkTheme), [mode]);

    const {
        aiResponse,
        error,
        isLoading,
        sendMessage,
        conversationHistory,
        clearConversationHistory,
        sessions,
        loadSession,
        deleteSession,
    } = useAIIntegration();

    const { createNewSession, updateSession, getSession, getAllSessions, setActiveSession, currentSession } =
        useSessionManager();

    const { speak, stop } = useTextToSpeech();

    const handleListen = useCallback(
        (transcript) => {
            setText(transcript);
            if (autoRecording && transcript.trim() !== "") {
                handleSubmit();
            }
        },
        [autoRecording]
    );

    const toggleListening = () => {
        setIsListening((prevState) => !prevState);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async () => {
        if (text.trim() === "") return;
        stop();
        const aiReply = await sendMessage(text, language);
        setText("");

        if (aiReply) {
            speak(aiReply, language);
        }

        if (autoRecording) {
            setIsListening(true);
        }

        if (currentSession) {
            updateSession(currentSession, [
                ...conversationHistory,
                { role: "user", content: text },
                { role: "assistant", content: aiReply },
            ]);
        } else {
            const newSessionId = createNewSession();
            setActiveSession(newSessionId);
            updateSession(newSessionId, [
                ...conversationHistory,
                { role: "user", content: text },
                { role: "assistant", content: aiReply },
            ]);
        }
    };

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    const selectSession = (sessionId) => {
        loadSession(sessionId);
        setActiveSession(sessionId);
    };

    useEffect(() => {
        if (autoRecording && !isListening) {
            setIsListening(true);
        }
    }, [autoRecording, isListening]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: "background.default", minHeight: "100vh", color: "text.primary" }}>
                <Container maxWidth="md">
                    <Box>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="h4" component="h1" gutterBottom>
                                    Voice Talking App with AI
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={toggleTheme} color="inherit">
                                    {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                                <IconButton onClick={toggleDrawer(true)} color="inherit">
                                    <HistoryIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <LanguageSelector language={language} onChange={handleLanguageChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Tooltip title={isListening ? "Stop Listening" : "Start Listening"}>
                                    <Button
                                        variant="contained"
                                        color={isListening ? "secondary" : "primary"}
                                        onClick={toggleListening}
                                        startIcon={<MicIcon />}
                                        fullWidth
                                    >
                                        {isListening ? "Stop" : "Start"} Listening
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Typography>Auto Recording:</Typography>
                            <Switch
                                checked={autoRecording}
                                onChange={() => setAutoRecording((prev) => !prev)}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mb: 2 }}
                            disabled={isLoading}
                            startIcon={<SendIcon />}
                        >
                            {isLoading ? "Processing..." : "Submit"}
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
                        <ConversationLog
                            conversation={conversationHistory}
                            currentSession={currentSession}
                            onSessionChange={selectSession}
                        />
                    </Box>
                </Container>
                <SpeechRecognition
                    isListening={isListening}
                    language={language}
                    onTranscript={handleListen}
                    onError={(error) => console.error(error)}
                    autoRecording={autoRecording}
                />
                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            <ListItem>
                                <ListItemText primary="Conversation Sessions" />
                            </ListItem>
                            {getAllSessions().map((session) => (
                                <ListItem key={session.id} button onClick={() => selectSession(session.id)}>
                                    <ListItemText
                                        primary={`Session ${session.id}`}
                                        secondary={new Date(session.timestamp).toLocaleString()}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                <Tooltip title="Clear Conversation">
                    <Fab
                        color="secondary"
                        aria-label="clear"
                        onClick={clearConversationHistory}
                        sx={{ position: "fixed", bottom: 16, right: 16 }}
                    >
                        <HistoryIcon />
                    </Fab>
                </Tooltip>
            </Box>
        </ThemeProvider>
    );
};

export default App;
