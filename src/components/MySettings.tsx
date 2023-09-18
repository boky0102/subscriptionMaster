import axios from "axios";
import Button from "./Button";
import { useState  } from "react";

type SettingsProps = {
    email?: string
}

interface SettingsForm {
    email: string
}

function isValidEmail(email: string){
    const emailRegex = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);

}

function MySettings(props: SettingsProps){

    const [settings, setSettings] = useState({} as SettingsForm);
    const [validEmail, setValidEmail] = useState(undefined as boolean | undefined); 


    function handleChangeSettings(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = event.currentTarget;
        if(name === "email"){
            setValidEmail(isValidEmail(value));
            setSettings( (prevSettings) => (
                {
                    ...prevSettings,
                    [name] : value
                }
            )
                
            )
        }
    }

    function handleFormSubmit(event: React.ChangeEvent<HTMLFormElement>){
        event.preventDefault();
        const serverLink = import.meta.env.VITE_SERVER_LINK + "/settings";
        axios.put(serverLink, settings, {
            withCredentials: true
        }).then((response) => {
            if(response.status === 200){
                console.log("Data updated successfully");
            } else{
                console.log("Couldnt update");
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    return(
        <form className="sub-form-container" onSubmit={handleFormSubmit}>
            <div className="sub-form-section">
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" className="sub-form-input" value={props.email} onChange={handleChangeSettings}></input>
                {
                    !validEmail && 
                        <div>Email is not valid</div>
                }
            </div>
            
            <div className="sub-form-section">
                <Button label="Save" type="submit" className="sub-form-button" disabled={!validEmail}></Button>
            </div>
            
        </form>
    )
}

export default MySettings