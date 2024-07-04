import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './images/LSBU_logo.png';
import './App.css';
import InitialPage from './InitialPage';
import Timer from './Timer';

function App() {
    const [timers, setTimers] = useState(() => {
        const savedTimers = localStorage.getItem('timers');
        return savedTimers ? JSON.parse(savedTimers) : [];
    });

    useEffect(() => {
        localStorage.setItem('timers', JSON.stringify(timers));
    }, [timers]);

    const handleStartTimer = (data) => {
        const newTimer = {
            ...data,
            id: Date.now()
        };
        setTimers((prevTimers) => [...prevTimers, newTimer]);
    };

    const handleTimerEnd = (id) => {
        setTimers((prevTimers) => prevTimers.filter(timer => timer.id !== id));
    };

    return (
        <Router>
            <main>
                <div>
                    <img src={logo} alt="LSBU" width={200} />
                </div>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<InitialPage onSubmit={handleStartTimer} />} />
                        {timers.map(timer => (
                            <Route
                                key={timer.id}
                                path={`/timer/${timer.id}`}
                                element={<Timer
                                    moduleName={timer.moduleName}
                                    startTime={timer.startTime}
                                    endTime={timer.endTime}
                                    onTimerEnd={() => handleTimerEnd(timer.id)}
                                />}
                            />
                        ))}
                    </Routes>
                </div>
            </main>
        </Router>
    );
}

export default App;
