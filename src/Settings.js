import { useContext } from "react";
import SettingsContext from "./SettingsContext";
import Backbutton from "./Backbutton";

function Settings(){

    const settingsinfo = useContext(SettingsContext);

    return (
        <div>

       <h1 style={{color: "white"}}>

           Settings

       </h1> 

        <Backbutton onClick={() => settingsinfo.setSettings(false)}/>
        </div>
    );

}

export default Settings;

