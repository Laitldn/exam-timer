import { useContext } from "react";
import SettingsContext from "./SettingsContext";
import Backbutton from "./Backbutton";

function Settings(){


    return (
        <div>

       <h1 style={{color: "white"}}>

           Settings

       </h1> 

        <Backbutton/>
        </div>
    );

}

export default Settings;

