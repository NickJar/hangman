import styles from "./Keyboard.module.css";
const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type KeyboardProps = {
  addGuessedLetter: Function;
  guessedLetters: string[];
  incorrectLetters: string[];
  correctLetters: string[];
  wordToGuess: string;
};

export function Keyboard({
  addGuessedLetter,
  guessedLetters,
  incorrectLetters,
  correctLetters,
  wordToGuess,
}: KeyboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
      }}
    >
      {KEYS.map((key) => {
        return (
          <button
            className={
              guessedLetters.includes(key) ||
              incorrectLetters.length == 6 ||
              correctLetters.length === wordToGuess.length
                ? `${styles.inactive}`
                : `${styles.btn}`
            }
            key={key}
            onClick={() => {
              addGuessedLetter(key);
            }}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
