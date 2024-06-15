import React, { useState } from 'react';
import './InitialPage.css';
function InitialPage({ onSubmit }) {
    const [moduleName, setModuleName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ moduleName, startTime, endTime });
    };

    return (
        <div>
            <h1>Setup Timer</h1>
            <div className='wrapper' >
                
                <form onSubmit={handleSubmit} >
                    <div>
                        {/* <label>Module Name: </label> */}
                        <input type="text" value={moduleName} placeholder='Module Name' onChange={(e) => setModuleName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Start Time:&nbsp; </label>
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    </div>
                    <div>
                        <label>End Time: &nbsp; </label>
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    </div>
                    <button className='submit' type="submit">Start Timer</button>
                </form>

            </div>
        </div>
    );
}

export default InitialPage;
