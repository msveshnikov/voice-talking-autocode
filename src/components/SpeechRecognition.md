# SpeechRecognition Component Documentation

## Overview

The `SpeechRecognition` component is a React functional component that provides speech recognition functionality for the application. It utilizes the Web Speech API's `webkitSpeechRecognition` interface to capture and transcribe spoken words into text. This component is designed to be used as part of a larger speech-enabled application, likely working in conjunction with other components like `ConversationLog`, `LanguageSelector`, and `TextToSpeech`.

## File Location

`src/components/SpeechRecognition.js`

## Dependencies

-   React (specifically `useEffect` and `useRef` hooks)

## Component Props

| Prop           | Type     | Description                                                      |
| -------------- | -------- | ---------------------------------------------------------------- |
| `isListening`  | Boolean  | Determines whether speech recognition is active                  |
| `language`     | String   | The language code for speech recognition (e.g., 'en-US')         |
| `onTranscript` | Function | Callback function to handle the transcribed text                 |
| `onError`      | Function | Callback function to handle any errors during speech recognition |

## Functionality

1. Initializes the `webkitSpeechRecognition` object when the component mounts.
2. Configures the recognition settings:
    - `continuous`: Set to `true` for continuous listening
    - `interimResults`: Set to `true` to receive interim results
3. Handles speech recognition results and errors through event listeners.
4. Manages the recognition state based on the `isListening` prop.
5. Updates the recognition language when the `language` prop changes.
6. Cleans up the recognition object when the component unmounts.

## Key Methods

### Recognition Setup (useEffect)

Sets up the speech recognition object and configures event listeners.

### Language Update (useEffect)

Updates the recognition language when the `language` prop changes.

### Listening State Management (useEffect)

Starts or stops the recognition based on the `isListening` prop.

## Usage Example

```jsx
import React, { useState } from "react";
import SpeechRecognition from "./components/SpeechRecognition";

function App() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState(null);

    const handleTranscript = (text) => {
        setTranscript(text);
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
    };

    return (
        <div>
            <button onClick={() => setIsListening(!isListening)}>
                {isListening ? "Stop Listening" : "Start Listening"}
            </button>
            <SpeechRecognition
                isListening={isListening}
                language="en-US"
                onTranscript={handleTranscript}
                onError={handleError}
            />
            <p>Transcript: {transcript}</p>
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default App;
```

## Notes

-   This component relies on the `webkitSpeechRecognition` API, which may not be supported in all browsers. It includes a fallback error message for unsupported browsers.
-   The component doesn't render any UI elements itself (`return null`). It's designed to be used as a functional wrapper for speech recognition capabilities.
-   Error handling is implemented to catch and report any issues during the speech recognition process.

## Integration with Project

In the context of the project structure:

-   This component likely works closely with `ConversationLog.js` to display transcribed text.
-   It may interact with `LanguageSelector.js` to change the recognition language dynamically.
-   It could be part of a larger voice interaction system that includes `TextToSpeech.js` for a complete voice interface.
-   The `useAIIntegration.js` hook in the project might use the transcripts from this component to process user input for AI-driven responses.
