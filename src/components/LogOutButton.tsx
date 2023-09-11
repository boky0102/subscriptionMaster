import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LogOutButton.css";




function LogOutButton(){
    const navigate = useNavigate();
    function handleLogOutButton(){
        const serverLink = import.meta.env.VITE_SERVER_LINK;
        axios.get(serverLink + "/logout", {
            withCredentials: true
        }).then((response) =>{
            console.log(response)
            if(response.status === 200){
                console.log(response);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            navigate("/login");
        })
    }

    return(
        <div onClick={handleLogOutButton} className="logout-element">
            Log out
        </div>
    )
    
}

export default LogOutButton;