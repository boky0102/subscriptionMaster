import Button from "./Button"
import { FC } from "react"

type loginFormProps = 
    JSX.IntrinsicElements["input"] & {
        type: "login" | "register",
        inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    
}
 
const LoginForm: FC<loginFormProps> = (props: loginFormProps) => {

    return(
            <div id="buttons-container">
                <form>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" onChange={(props.inputChange)}></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" onChange={props.inputChange}></input>
                        {/* <Button label="Register" type="submit"></Button> */}
                    </div>
                    {
                        props.type === "register" &&
                        <div>
                            <label>{props.type}</label>
                            <input type="password" name="confirmPassword" onChange={props.inputChange}></input>
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