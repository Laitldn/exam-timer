import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SettingsButton from './SettingsButton';
import { useContext } from 'react';
import SettingsContext from './SettingsContext';

function Timer(){
    const percentage = 50;
    const settingsinfo = useContext(SettingsContext);

    const red = "#FF0000";
    const green = "#90ee90 ";
    return (
        
        <div>
            <div className='details'>
        <h1 >Name of The Module</h1>
      </div>
      
        
       <div>
       <SettingsButton onClick={() => settingsinfo.setSettings(true)}/>
        </div>
     <center>

     <div>
         <div className= {"center"} style={{ width: 400, height: 300, }}>
            
             
             <CircularProgressbar value={percentage} text={`00:00:00`} styles={buildStyles({
                 textColor:'#fff',
                 textSize:15,
                 pathColor: green,
                 tailColor:'rgba(255,255,255,.2)',
                })}/>

    </div>
     </div>
     </center>
    </div>

       
    );

}

export default Timer;