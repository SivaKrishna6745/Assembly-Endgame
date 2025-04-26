import React, { useState } from 'react';
import Header from './components/Header';
import Status from './components/Status';
import { languages } from './languages.js';

function App() {
    const [currentWord, setCurrentWord] = useState('react');
    const [guessedLetters, setGuessedLetters] = useState([]);

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    const languageChips = languages.map((lang) => {
        const styles = {
            color: lang.color,
            backgroundColor: lang.backgroundColor,
        };
        return (
            <span key={lang.name} className="language-chip" style={styles}>
                {lang.name}
            </span>
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
            >
                {letter.toUpperCase()}
            </button>
        );
    });

    return (
        <>
            <Header />
            <main>
                <Status />
                <section className="languages flex fl-cntr">{languageChips}</section>
                <section className="current-word flex fl-cntr">{currentWordsSection}</section>
                <section className="keyboard flex fl-cntr">{keyboard}</section>
                <button className="new-game btn">New Game</button>
            </main>
        </>
    );
}

export default App;
