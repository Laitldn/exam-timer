import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
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
    const today = new Date();

    const day = today.getDate();

    const month = today.getMonth() + 1;

    const year = today.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;


    const handleStartTimer = async (data) => {
        const newTimer = {
            ...data,
            date: formattedDate,
            id: Date.now()
        };
        try {
            await axios.post('http://localhost:5000/timers', newTimer);
            setTimers((prevTimers) => [...prevTimers, newTimer]);
        } catch (error) {
            console.error('Error saving timer:', error);
        }
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
                                    timerId={timer.id}
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
