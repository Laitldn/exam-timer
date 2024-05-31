import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import SettingsButton from './SettingsButton';
import { useContext, useRef, useState, useEffect } from 'react';
import SettingsContext from './SettingsContext';

export function Timer() {
    const startHour = 17;
    const startMinute = 51;
    const endHour = 17;
    const endMinute = 52;

    const settingsinfo = useContext(SettingsContext);
    const [remainingTime, setRemainingTime] = useState(0);
    const intervalRef = useRef(null);
    const [pathColor, setPathColor] = useState("#90ee90");

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentSeconds = now.getSeconds();

            const startTime = new Date();
            startTime.setHours(startHour, startMinute, 0, 0);

            const endTime = new Date();
            endTime.setHours(endHour, endMinute, 0, 0);

            if (now >= startTime && now < endTime) {
                const totalRemainingSeconds = Math.floor((endTime - now) / 1000);
                setRemainingTime(totalRemainingSeconds);

                const totalDurationSeconds = Math.floor((endTime - startTime) / 1000);
                const elapsedSeconds = totalDurationSeconds - totalRemainingSeconds;
                const elapsedMinutes = Math.floor(elapsedSeconds / 60);

                if (elapsedMinutes < 30 || elapsedMinutes >= totalDurationSeconds / 60 - 30) {
                    setPathColor("#FF0000");
                } else {
                    setPathColor("#90ee90");
                }
            } else {
                clearInterval(intervalRef.current);
                setRemainingTime(0);
                setPathColor("#90ee90");
            }
        };

        updateTimer();

        intervalRef.current = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const totalDuration = ((endHour - startHour) * 60 * 60) + ((endMinute - startMinute) * 60);
    const percentage = (remainingTime / totalDuration) * 100;

    return (
        <div>
            <div className='details'>
                <h1>Name of The Module</h1>
            </div>
            <div>
                <SettingsButton onClick={() => settingsinfo.setSettings(true)} />
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
                            })} />
                    </div>
                </div>
            </center>
        </div>
    );
}
