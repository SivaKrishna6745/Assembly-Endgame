import React, { useState } from 'react';
import { languages } from './languages.js';
import { getFarewellText } from './utils.js';

function App() {
    const [currentWord, setCurrentWord] = useState('react');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const maxNoOfGuesses = 8;

    const wrongGuessCount = guessedLetters.filter((letter) => !currentWord.includes(letter)).length;
    const hasWon = currentWord.split('').every((letter) => guessedLetters.includes(letter));
    const hasLost = wrongGuessCount === maxNoOfGuesses;
    let isGameOver = hasWon || hasLost;

    const languageChips = languages.map((lang, index) => {
        const styles = {
            color: lang.color,
            backgroundColor: lang.backgroundColor,
        };
        return (
            <>
                <span
                    key={lang.name}
                    className={`language-chip ${wrongGuessCount > index ? 'lost' : ''}`}
                    style={styles}
                >
                    {lang.name}
                </span>
            </>
        );
    });

    const addGuessedLetter = (letter) => {
        setGuessedLetters((prevGuessedLetters) =>
            prevGuessedLetters.includes(letter) ? prevGuessedLetters : [...prevGuessedLetters, letter]
        );
    };

    const guessedLettersSet = new Set(guessedLetters);
    const currentWordsSection = currentWord.split('').map((letter, index) => (
        <span key={index} className="flex fl-cntr">
            {guessedLettersSet.has(letter) && letter.toUpperCase()}
        </span>
    ));

    const alphabetArray = Array.from(alphabet);
    const keyboard = alphabetArray.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);
        const isWrong = isGuessed && !currentWord.includes(letter);
        return (
            <button
                type="button"
                key={letter}
                className={`btn ${isCorrect && 'success'} ${isWrong && 'failure'}`}
                onClick={() => addGuessedLetter(letter)}
                disabled={isGameOver && !isGuessed}
            >
                {letter.toUpperCase()}
            </button>
        );
    });

    function renderGameStatus() {
        if (hasWon) {
            return (
                <>
                    <h2 className="status-title">You win!</h2>
                    <p className="status-subtitle">Well done! 🎉</p>
                </>
            );
        }
        if (hasLost) {
            return (
                <>
                    <h2 className="status-title">Game over!</h2>
                    <p className="status-subtitle">You lose! Better startr learning Assembly 😢</p>
                </>
            );
        }
        if (!isGameOver && wrongGuessCount > 0) {
            return (
                <>
                    <p className="flex fl-cntr">{getFarewellText(languages[wrongGuessCount - 1]?.name)}</p>
                </>
            );
        }
        return null;
    }

    return (
        <>
            <header>
                <h1 className="game-title">Assembly: Endgame</h1>
                <p className="game-desc">
                    Guess the word in under 8 attempts to keep the programming world safe from Assembly!
                </p>
            </header>
            <main>
                {
                    <section
                        className={`status flex fl-cntr ${hasWon && 'won'} ${hasLost && 'lost'} ${
                            !isGameOver && wrongGuessCount > 0 && 'farewell-message'
                        }`}
                    >
                        {renderGameStatus()}
                    </section>
                }
                <section className="languages flex fl-cntr">{languageChips}</section>
                <section className="current-word flex fl-cntr">{currentWordsSection}</section>
                <section className="keyboard flex fl-cntr">{keyboard}</section>
                {isGameOver && <button className="new-game btn">New Game</button>}
            </main>
        </>
    );
}

export default App;
