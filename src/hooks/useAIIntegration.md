# useAIIntegration Hook Documentation

## Overview

`useAIIntegration` is a custom React hook that provides AI integration functionality for a conversational application. It manages the state and logic for interacting with the Google Generative AI API, handling conversation history, and managing conversation sessions.

This hook is a crucial part of the application, likely used in the main `App.js` or a high-level component to provide AI-related functionality to the entire application.

## Hook Details

### State Variables

- `aiResponse`: Stores the latest response from the AI.
- `error`: Holds any error messages that occur during AI communication.
- `isLoading`: Boolean indicating whether an AI request is in progress.
- `conversationHistory`: Array storing the entire conversation history.
- `sessions`: Array of saved conversation sessions.

### Functions

#### sendMessage

Sends a message to the AI and processes the response.

**Parameters:**
- `message` (string): The user's message to send to the AI.
- `language` (string): The language in which the AI should respond.

**Returns:**
- Promise<string|null>: The AI's response or null if an error occurred.

**Functionality:**
- Communicates with the Google Generative AI API.
- Updates the conversation history.
- Saves the session to local storage.

#### clearConversationHistory

Clears the current conversation history and removes all saved sessions from local storage.

#### loadSession

Loads a specific conversation session.

**Parameters:**
- `sessionId` (string): The ID of the session to load.

### Helper Functions

#### saveSessionToLocalStorage

Internal function to save the current session to local storage.

**Parameters:**
- `sessionData` (object): The session data to save.

### Effects

- An effect hook is used to load saved sessions from local storage when the component mounts.

## Usage Example

```jsx
import React from 'react';
import useAIIntegration from './hooks/useAIIntegration';

function ChatComponent() {
  const {
    aiResponse,
    error,
    isLoading,
    sendMessage,
    conversationHistory,
    clearConversationHistory,
    sessions,
    loadSession
  } = useAIIntegration();

  const handleSendMessage = async () => {
    const userMessage = "Hello, AI!";
    const language = "English";
    await sendMessage(userMessage, language);
  };

  return (
    <div>
      {/* Render chat interface using the hook's state and functions */}
    </div>
  );
}

export default ChatComponent;
```

## Dependencies

This hook relies on the following external libraries and environment variables:

- `react`: For React hooks functionality.
- `@google/generative-ai`: For interacting with Google's Generative AI API.
- `REACT_APP_GEMINI_KEY`: Environment variable storing the API key for Google Generative AI.

## Notes

- Ensure that the `REACT_APP_GEMINI_KEY` environment variable is properly set for the AI functionality to work.
- This hook manages conversation persistence using local storage, allowing users to resume sessions across page reloads.
- The hook is designed to work with other components in the project, such as `ConversationLog`, `LanguageSelector`, `SpeechRecognition`, and `TextToSpeech`.