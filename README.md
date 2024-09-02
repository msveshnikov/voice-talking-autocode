# Voice Talking App with AI (built by [AutoCode](https://autocode.work) in 20 minutes)

## Overview

A React-based application that utilizes speech recognition for Speech-to-Text (STT) and Text-to-Speech (TTS) functionality, integrated with the Gemini Flash 1.5 model.

## Features

-   Simple React App with Material-UI v5
-   Speech recognition for STT and TTS
-   Integration with Gemini 3 Haiku AI model
-   Support for English and Russian languages
-   Environment variable-based configuration (REACT_APP_GEMINI_KEY)
-   Responsive design for various device sizes
-   Automatic and manual recording options
-   Conversation log display
-   User-friendly language selection interface
-   Dark/light mode toggle
-   Voice visualization for active speech input
-   Collapsible sidebar for conversation history and settings

## Project Structure

```
voice-talking-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── SpeechRecognition.js
│   │   ├── TextToSpeech.js
│   │   ├── LanguageSelector.js
│   │   ├── ConversationLog.js
│   │   ├── DarkModeToggle.js
│   │   └── VoiceVisualization.js
│   ├── hooks/
│   │   ├── useAIIntegration.js
│   │   └── useLocalStorage.js
│   ├── styles/
│   │   └── theme.js
│   ├── utils/
│   │   └── sessionManager.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Design Considerations

-   Implement a minimalist, clean interface with subtle animations
-   Use Material-UI's responsive grid system for layout consistency across devices
-   Create custom icons for various app functions (e.g., microphone, language selection)
-   Implement a floating action button (FAB) for quick access to main functions
-   Design an intuitive UI for switching between automatic and manual recording modes
-   Implement a progress indicator for AI response generation
-   Add a tooltip system for explaining various features and controls

## Planned Improvements

-   Optimize AI model integration for faster response times
-   Add support for additional languages
-   Integrate with cloud services for data persistence and sync across devices
-   Implement accessibility features (e.g., screen reader support, keyboard navigation)
-   Implement automatic pause detection for seamless conversation flow
-   Add session management with timestamps in the sidebar
-   Implement chat history context for improved AI responses
-   Enhance dark theme to cover the entire application interface
-   Add voice command support for hands-free operation
-   Implement real-time transcription display during speech input

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add your Gemini API key: `REACT_APP_GEMINI_KEY=your_api_key_here`
4. Start the development server: `npm start`

