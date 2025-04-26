import React from 'react';
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

    return (
        <>
            <Header />
            <main>
                <Status />
                <section className="languages flex fl-cntr">{languageChips}</section>
            </main>
        </>
    );
}

export default App;
