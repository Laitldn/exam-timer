import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Settings from './Settings';
import SettingsButton from './SettingsButton';
import SettingsContext from './SettingsContext';

function Timer({ moduleName, startTime, endTime, timerId, onTimerEnd }) {
    const [showSettings, setSettings] = useState(false);

    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return { hours, minutes };
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    const [showBorder, setBorder] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const intervalRef = useRef(null);
    const [pathColor, setPathColor] = useState("#90ee90");
    const [showTimer, setShowTimer] = useState(true);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();

            const startTime = new Date();
            startTime.setHours(start.hours, start.minutes, 0, 0);

            const endTime = new Date();
            endTime.setHours(end.hours, end.minutes, 0, 0);

            if (now >= startTime && now < endTime) {
                setWaiting(false);
                const totalRemainingSeconds = Math.floor((endTime - now) / 1000);
                setRemainingTime(totalRemainingSeconds);

                const totalDurationSeconds = Math.floor((endTime - startTime) / 1000);
                const elapsedSeconds = totalDurationSeconds - totalRemainingSeconds;
                const elapsedMinutes = Math.floor(elapsedSeconds / 60);

                if (elapsedMinutes < 30 || elapsedMinutes >= totalDurationSeconds / 60 - 30) {
                    setPathColor("#FF0000");
                    setBorder(true);
                } else {
                    setPathColor("#90ee90");
                    setBorder(false);
                }
            } else if (now < startTime) {
                const totalRemainingSeconds = Math.floor((startTime - now) / 1000);
                setRemainingTime(totalRemainingSeconds);
                setPathColor("#FFA500");
            } else {
                clearInterval(intervalRef.current);
                setRemainingTime(0);
                setPathColor("#90ee90");
                setTimeout(() => {
                    setShowTimer(false);
                    onTimerEnd();
                }, 5 * 60 * 1000);
            }
        };

        updateTimer();
        intervalRef.current = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalRef.current);
    }, [start, end, onTimerEnd]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const totalDuration = ((end.hours - start.hours) * 60 * 60) + ((end.minutes - start.minutes) * 60);
    const percentage = waiting ? 100 - ((remainingTime / ((start.hours * 60 * 60) + (start.minutes * 60))) * 100) : (remainingTime / totalDuration) * 100;

    if (!showTimer) {
        return null;
    }

    return (
        <div>
            <SettingsContext.Provider value={{ showSettings, setSettings, timerId }}>
                {showSettings ? <Settings /> :
                    <div>
                        <div className='details'>
                            <h1>{moduleName}</h1>
                        </div>
                        <div>
                            <SettingsButton onClick={() => setSettings(true)} />
                        </div>
                        <center>
                            <div>
                                <div className="center" style={{ width: 400, height: 300 }}>
                                    <CircularProgressbar
                                        value={percentage}
                                        text={waiting ? ` ${formatTime(remainingTime)}` : formatTime(remainingTime)}
                                        styles={buildStyles({
                                            textColor: '#fff',
                                            textSize: 15,
                                            pathColor: pathColor,
                                            tailColor: 'rgba(255,255,255,.2)',
                                        })}
                                    />
                                    {showBorder ? <hr /> : null}
                                </div>
                                {waiting ? null : showBorder ? <text className='redText'>You are not allowed to leave</text> : <text className='greenText'>You are allowed to leave the room</text>}
                            </div>
                        </center>
                    </div>
                }
            </SettingsContext.Provider>
        </div>
    );
}

export default Timer;
