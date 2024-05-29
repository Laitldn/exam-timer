import logo from './logo.svg';
import './App.css';
import Timer from './Timer';
import { useState } from 'react';
import Settings from './Settings';
import SettingsContext from './SettingsContext';


function App() {


  const [showSettings, setSettings] = useState(false);
 

  return (
    <main>

      <div>

      </div>

      <SettingsContext.Provider value ={{
        showSettings,
        setSettings,
      }}>

        {showSettings ? <Settings/> : <Timer/>}
      </SettingsContext.Provider>
      
      
        
      
    </main>
  );
}

export default App;
