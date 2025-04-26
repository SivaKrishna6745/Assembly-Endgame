import React, { useState } from 'react';
import Header from './components/Header';
import Status from './components/Status';
import { languages } from './languages.js';

function App() {
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

    const [word, setWord] = useState('react');
    const wordArray = Array.from(word);

    const wordsSection = wordArray.map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>);

    return (
        <>
            <Header />
            <main>
                <Status />
                <section className="languages flex fl-cntr">{languageChips}</section>
                <section className="word flex fl-cntr">{wordsSection}</section>
            </main>
        </>
    );
}

export default App;
