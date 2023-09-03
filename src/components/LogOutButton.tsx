import axios from "axios";
import { useNavigate } from "react-router-dom";

type LogOutProps = {
    loggedFlagHandler: (logged: boolean) => void
}

function LogOutButton(props: LogOutProps){
    const navigate = useNavigate();
    function handleLogOutButton(){
        const serverLink = import.meta.env.VITE_SERVER_LINK;
        axios.get(serverLink + "/logout", {
            withCredentials: true
        }).then((response) =>{
            console.log(response)
            if(response.status === 200){
                props.loggedFlagHandler(false);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            navigate("/login");
        })
    }

    return(
        <div>
            <button onClick={handleLogOutButton}>Log out</button>
        </div>
    )
    
}

export default LogOutButton;