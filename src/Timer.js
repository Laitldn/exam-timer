import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SettingsButton from './SettingsButton';

function Timer(){
    const percentage = 50;
    const red = "#FF0000";
    const green = "#90ee90 ";
    return (
        
        <div>

        
       <div>
       <SettingsButton onClick={() => {}}/>
        </div>
     <center>

     <div>
         <div className= {"center"} style={{ width: 300, height: 200, }}>
            
             
             <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
                 textColor:'#fff',
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