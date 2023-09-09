import Button from "./Button"
import { useState, useEffect} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';

type loginFormProps = {
    type: "login" | "register",
}

interface User {
    username: string,
    password: string,
    confirmPassword: string | undefined
}

const LoginForm = (props: loginFormProps) => {

    const [formData, setFormData] = useState({} as User);
    const navigate = useNavigate();

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
                },
                withCredentials: true
            })
            .then((response) => {
                
                if(response.status === 200){
                    if(props.type === "login"){
                        navigate("/home");
                    } else {
                        navigate("/login");
                    }
                }
                
                

            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        console.log(formData);
    }, [formData]);
    
    

    return(
            <div className="login-form-container">
                <form onSubmit={handleFormSubmit}>
                    <div className="login-form-section">
                        <label className="login-form-label">Username</label>
                        <input className="login-form-input" type="text" name="username" onChange={handleFormChange}></input>
                    </div>
                    <div className="login-form-section">
                        <label className="login-form-label">Password</label>
                        <input className="login-form-input" type="password" name="password" onChange={handleFormChange}></input>
                        {/* <Button label="Register" type="submit"></Button> */}
                    </div>
                    {
                        props.type === "register" &&
                        <div className="login-form-section">
                            <label className="login-form-label">{props.type}</label>
                            <input className="login-form-input" type="password" name="confirmPassword" onChange={handleFormChange}></input>
                        </div>

                    }
                    <div>
                        {
                        props.type === "register" ? 
                        <Button className="login-form-button" label="Register" type="submit"></Button> :
                        <Button className="login-form-button" label="Login" type="submit"></Button>
                        }
                    </div>
                </form>
            </div>
    )
}



export default LoginForm