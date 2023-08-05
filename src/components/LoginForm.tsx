import Button from "./Button"
import { useState, useEffect} from "react"
import axios from "axios";

type loginFormProps = {
    type: "login" | "register"
}

interface User {
    username: string,
    password: string,
    confirmPassword: string | undefined
}

const LoginForm = (props: loginFormProps) => {

    const [formData, setFormData] = useState({} as User);

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = event.currentTarget;
        if(name === "username"){
            setFormData((prevData) => (
                {
                    ...prevData,
                    [ name ] : value
                }
            ))
        } else if( name === "password" ){
            setFormData((prevData) => (
                {
                    ...prevData,
                    [ name ] : value
                }
            ))
        } else {
            setFormData((prevData) => (
                {
                    ...prevData,
                    [ name ] : value
                }
            ))
        }

    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        let serverPath = import.meta.env.VITE_SERVER_LINK;
        if(props.type === "login"){
            serverPath += "/login";
        } else {
            serverPath += "/register";
        }

        axios.post(serverPath, formData, 
            {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        console.log(formData);
    }, [formData]);
    
    

    return(
            <div id="buttons-container">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" onChange={handleFormChange}></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" onChange={handleFormChange}></input>
                        {/* <Button label="Register" type="submit"></Button> */}
                    </div>
                    {
                        props.type === "register" &&
                        <div>
                            <label>{props.type}</label>
                            <input type="password" name="confirmPassword" onChange={handleFormChange}></input>
                        </div>

                    }
                    <div>
                        {
                        props.type === "register" ? 
                        <Button label="register" type="submit"></Button> :
                        <Button label="login" type="submit"></Button>
                        }
                    </div>
                </form>
            </div>
    )
}



export default LoginForm