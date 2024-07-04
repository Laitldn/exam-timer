import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Settings from './Settings';
import SettingsButton from './SettingsButton';
import { useRef, useState, useEffect } from 'react';
import SettingsContext from './SettingsContext';

function Timer({ moduleName, startTime, endTime, onTimerEnd }) {
    const [showSettings, setSettings] = useState(false);

    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return { hours, minutes };
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    const [showBorder, setBorder] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0); // Remaining time in seconds
    const intervalRef = useRef(null);
    const [pathColor, setPathColor] = useState("#90ee90"); // Default green
    const [showTimer, setShowTimer] = useState(true);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();

            const startTime = new Date();
            startTime.setHours(start.hours, start.minutes, 0, 0); // Set start time

            const endTime = new Date();
            endTime.setHours(end.hours, end.minutes, 0, 0); // Set end time

            if (now >= startTime && now < endTime) {
                const totalRemainingSeconds = Math.floor((endTime - now) / 1000);
                setRemainingTime(totalRemainingSeconds);

                const totalDurationSeconds = Math.floor((endTime - startTime) / 1000);
                const elapsedSeconds = totalDurationSeconds - totalRemainingSeconds;
                const elapsedMinutes = Math.floor(elapsedSeconds / 60);

                if (elapsedMinutes < 30 || elapsedMinutes >= totalDurationSeconds / 60 - 30) {
                    setPathColor("#FF0000"); // Red for first 30 min and last 30 min
                    setBorder(true); // Showing the border
                } else {
                    setPathColor("#90ee90"); // Green otherwise
                    setBorder(false); // Removing The Border
                }
            } else {
                clearInterval(intervalRef.current);
                setRemainingTime(0);
                setPathColor("#90ee90"); // Reset to green
                // Hide the timer after 5 minutes
                setTimeout(() => {
                    setShowTimer(false);
                    onTimerEnd(); // Notify that the timer has ended
                }, 5 * 60 * 1000);
            }
        };

        updateTimer(); // Initial call to set the countdown state immediately

        intervalRef.current = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalRef.current);
    }, [start, end, onTimerEnd]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const totalDuration = ((end.hours - start.hours) * 60 * 60) + ((end.minutes - start.minutes) * 60); // Total duration in seconds
    const percentage = (remainingTime / totalDuration) * 100; // Adjusted to the specified duration

    if (!showTimer) {
        return null; // Return nothing if the timer should not be shown
    }

    return (
        <div>
            <SettingsContext.Provider value={{
                showSettings,
                setSettings,
            }}>

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
                                        text={formatTime(remainingTime)}
                                        styles={buildStyles({
                                            textColor: '#fff',
                                            textSize: 15,
                                            pathColor: pathColor,
                                            tailColor: 'rgba(255,255,255,.2)',
                                        })}
                                    />
                                    
                                    {showBorder ? <hr /> : null}
                                </div>
                                {showBorder ? <text className='redText'>You are not allowed to leave</text>:<text className='greenText'>You are allowed to leave the room</text>}
                            </div>
                        </center>
                    </div>


                }
            </SettingsContext.Provider>

        </div>
    );
}

export default Timer;
