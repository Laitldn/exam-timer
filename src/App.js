import logo from './images/LSBU_logo.png';
import './App.css';
import React, { useState } from 'react';
import InitialPage from './InitialPage';
import Timer from './Timer';

function App() {
    const [timerData, setTimerData] = useState(null);

    const handleStartTimer = (data) => {
        setTimerData(data);
    };

    return (
      <main>
        
        <div>
          <img src={logo} alt="LSBU" width={200}/>
        </div>

        <div className="App">
            {timerData ? (
              <Timer
              moduleName={timerData.moduleName}
              startTime={timerData.startTime}
              endTime={timerData.endTime}
              />
              ) : (
                <InitialPage onSubmit={handleStartTimer} />
                )}
        </div>
      </main>
    );
}

export default App;
