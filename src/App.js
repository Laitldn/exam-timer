import logo from './images/LSBU_logo.png';
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
        <img src={logo} alt="LSBU" width={200}/>
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
