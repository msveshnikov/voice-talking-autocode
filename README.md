# Voice Talking App with AI  (build by [AutoCode](https://autocode.work) in 20 minutes)

## Overview

A React-based application that utilizes speech recognition for Speech-to-Text (STT) and Text-to-Speech (TTS) functionality, integrated with the Claude 3 Haiku AI model.

## Features

-   Simple React App with Material-UI v5
-   Speech recognition for STT and TTS
-   Integration with Claude 3 Haiku AI model
-   Support for English and Russian languages
-   Environment variable-based configuration (REACT_APP_CLAUDE_KEY)
-   Responsive design for various device sizes
-   Automatic and manual recording options
-   Conversation log display
-   User-friendly language selection interface

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
│   │   └── ConversationLog.js
│   ├── hooks/
│   │   └── useAIIntegration.js
│   ├── styles/
│   │   └── theme.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Design Considerations

-   Implement a dark/light mode toggle for improved user experience
-   Use a minimalist, clean interface with subtle animations
-   Incorporate voice visualization for active speech input
-   Design an intuitive UI for switching between automatic and manual recording modes
-   Implement a collapsible sidebar for conversation history and settings
-   Use Material-UI's responsive grid system for layout consistency across devices
-   Create custom icons for various app functions (e.g., microphone, language selection)

## Planned Improvements

-   Optimize AI model integration for faster response times
-   Add support for additional languages
-   Integrate with cloud services for data persistence and sync across devices
-   Implement accessibility features (e.g., screen reader support, keyboard navigation)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add your Claude API key: `REACT_APP_CLAUDE_KEY=your_api_key_here`
4. Start the development server: `npm start`

## Contributing

Contributions are welcome! Please read our contributing guidelines and code of conduct before submitting pull requests.

## License

This project is licensed under the MIT License.
