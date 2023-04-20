import { useEffect, useState } from "react";
import wordList from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return wordList[Math.floor(Math.random() * wordList.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const correctLetters = guessedLetters.filter((letter) =>
    wordToGuess.includes(letter)
  );

  function addGuessedLetter(letter: string) {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters((currentLetters) => [...currentLetters, letter]);
  }

  const word = wordToGuess;

  function winCheck() {
    console.log(correctLetters.length);
    console.log(wordToGuess.length);
    console.log(wordToGuess);
    console.log();
    if (incorrectLetters.length === 6) {
      return 'You Lose The Word Was "' + word + '" - Refresh To Play Again';
    } else if (correctLetters.length === wordToGuess.length) {
      return "You Win - Refesh Browser";
    }
    return "";
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>{winCheck()}</div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          guessedLetters={guessedLetters}
          addGuessedLetter={addGuessedLetter}
          incorrectLetters={incorrectLetters}
          correctLetters={correctLetters}
          wordToGuess={wordToGuess}
        />
      </div>
    </div>
  );
}

export default App;
