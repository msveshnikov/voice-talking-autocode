# Voice Talking App with AI

## Project Overview

The Voice Talking App with AI is a React-based application that combines speech recognition, text-to-speech functionality, and AI-powered conversations. Built using Material-UI v5, this app offers a user-friendly interface for voice-based interactions in both English and Russian languages.

## Architecture

### Core Components

1. **App.js**: The main component that orchestrates the application's layout and functionality.
2. **SpeechRecognition.js**: Handles speech-to-text conversion.
3. **TextToSpeech.js**: Manages text-to-speech output.
4. **LanguageSelector.js**: Allows users to switch between supported languages.
5. **ConversationLog.js**: Displays the history of user-AI interactions.

### Custom Hooks

- **useAIIntegration.js**: Manages the integration with the Gemini Flash 1.5 AI model.

### Styling

- **theme.js**: Defines the application's theme, including color schemes and typography.

## Module Interactions

1. The `App.js` component initializes the application and renders the main UI.
2. User speech input is captured by `SpeechRecognition.js` and converted to text.
3. The text is processed by the AI model using `useAIIntegration.js`.
4. The AI's response is displayed in `ConversationLog.js` and converted to speech using `TextToSpeech.js`.
5. Users can change the language using `LanguageSelector.js`, which affects both speech recognition and text-to-speech output.

## Features

- Speech-to-Text (STT) and Text-to-Speech (TTS) functionality
- Integration with Gemini Flash 1.5 AI model
- Support for English and Russian languages
- Automatic and manual recording options
- Conversation history display
- Responsive design for various device sizes
- Dark/light mode toggle
- Voice visualization for active speech input

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/voice-talking-app.git
   cd voice-talking-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Gemini API key:
     ```
     REACT_APP_GEMINI_KEY=your_api_key_here
     ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage Instructions

1. Select your preferred language using the language selector.
2. Click the microphone icon to start recording (or enable automatic recording).
3. Speak clearly into your device's microphone.
4. The app will transcribe your speech and send it to the AI model.
5. The AI's response will be displayed in the conversation log and spoken aloud.
6. Use the dark/light mode toggle for your preferred visual style.

## Planned Improvements

- Optimize AI model integration for faster response times
- Add support for additional languages
- Integrate with cloud services for data persistence and sync across devices
- Implement accessibility features (e.g., screen reader support, keyboard navigation)
- Save conversation logs to local storage
- Add automatic pause detection for immediate AI responses
- Improve dark theme application across the entire app

## Contributing

Contributions to the Voice Talking App with AI are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please read our contributing guidelines and code of conduct before submitting pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository or contact the maintainers directly.

---

This documentation provides a comprehensive overview of the Voice Talking App with AI, including its architecture, features, setup instructions, and planned improvements. It should help developers and users understand the project's structure and functionality.