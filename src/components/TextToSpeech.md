# TextToSpeech Component Documentation

## Overview

The `TextToSpeech.js` file is a crucial component in the project's speech synthesis functionality. It's located in the `src/components` directory and provides two main exports:

1. A `TextToSpeech` object with a `speak` method.
2. A custom React hook `useTextToSpeech` for more advanced text-to-speech control.

This component integrates with the browser's Web Speech API to convert text into spoken words, supporting multiple languages.

## TextToSpeech Object

### Methods

#### speak(text, language)

Converts the given text to speech in the specified language.

- Parameters:
  - `text` (string): The text to be spoken.
  - `language` (string): The language code (e.g., 'en-US', 'fr-FR') for speech synthesis.

- Usage:
  ```javascript
  import TextToSpeech from './components/TextToSpeech';

  TextToSpeech.speak('Hello, world!', 'en-US');
  ```

## useTextToSpeech Hook

A custom React hook that provides more control over the speech synthesis process.

### Returns

An object with two methods:

- `speak(text, language)`: Starts speaking the provided text.
- `stop()`: Stops any ongoing speech synthesis.

### Usage

```javascript
import { useTextToSpeech } from './components/TextToSpeech';

function MyComponent() {
  const { speak, stop } = useTextToSpeech();

  const handleSpeak = () => {
    speak('Hello, this is a test', 'en-US');
  };

  const handleStop = () => {
    stop();
  };

  return (
    <div>
      <button onClick={handleSpeak}>Speak</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
```

### Implementation Details

- Uses `useRef` to maintain references to the `speechSynthesis` object and `SpeechSynthesisUtterance` instance.
- Implements a cleanup function using `useEffect` to cancel any ongoing speech when the component unmounts.
- The `speak` method cancels any ongoing speech before starting a new one.
- The `stop` method can be used to manually cancel the speech at any time.

## Project Context

This component is part of a larger application that likely involves voice interaction and language processing. It works alongside other components like `SpeechRecognition.js` and `LanguageSelector.js` to provide a comprehensive voice interface. The `useTextToSpeech` hook can be easily integrated into other components that require text-to-speech functionality.

## Browser Compatibility

This component relies on the Web Speech API, which may not be supported in all browsers. It's recommended to check for compatibility and provide fallback options in production applications.

## Note

When using this component, ensure that the necessary permissions are granted by the user for speech synthesis, especially in mobile or restricted environments.