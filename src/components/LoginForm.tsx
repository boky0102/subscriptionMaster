import Button from "./Button"

function LoginForm(props: {type: "login" | "register"}){


    return(
            <div id="buttons-container">
                <form>
                    <div>
                        <label>Username</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password"></input>
                        {/* <Button label="Register" type="submit"></Button> */}
                    </div>
                    {
                        props.type === "register" &&
                        <div>
                            <label>{props.type}</label>
                            <input type="password"></input>
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