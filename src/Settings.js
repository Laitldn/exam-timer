import { useContext, useState } from 'react';
import axios from 'axios';
import SettingsContext from './SettingsContext';
import Backbutton from './Backbutton';
import './Settings.css'

function Settings() {
    const { timerId, setSettings } = useContext(SettingsContext);
    const [students, setStudents] = useState('');
    const [issues, setIssues] = useState('');
    const [alarm, setAlarm] = useState(false);

    const handleSave = async () => {
        const newDetails = {
            students: parseInt(students, 10),
            issues: issues.split(',').map(issue => issue.trim()),
            alarm,
            timerId
        };

        try {
            const response = await axios.get(`http://localhost:5000/timerdetails?timerId=${timerId}`);
            if (response.data.length > 0) {
                const existingDetails = response.data[0];
                await axios.put(`http://localhost:5000/timerdetails/${existingDetails.id}`, newDetails);
            } else {
                await axios.post('http://localhost:5000/timerdetails', newDetails);
            }
        } catch (error) {
            console.error('Error saving timer details:', error);
        }
        setSettings(false);
    };

    return (
        <div>
            <h1 style={{ color: "white" }}>Settings</h1>
            <Backbutton />
            <div className='centerA'>

                <div className='n_student'>
                    <input
                        
                        placeholder='Number of Students'
                        type="number"
                        value={students}
                        onChange={(e) => setStudents(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <input
                        className='issue'
                        placeholder='Issues'
                        type="text"
                        value={issues}
                        onChange={(e) => setIssues(e.target.value)}
                        />
                </div>
                <div>
                    <label>Fire Alarm: </label>
                    <input
                        type="checkbox"
                        checked={alarm}
                        onChange={(e) => setAlarm(e.target.checked)}
                        />
                </div>
                <button className='save' onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}

export default Settings;
