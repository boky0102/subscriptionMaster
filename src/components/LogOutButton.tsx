import axios from "axios";

function LogOutButton(){
    
    function handleLogOutButton(){
        const serverLink = import.meta.env.VITE_SERVER_LINK;
        axios.get(serverLink + "/logout", {
            withCredentials: true
        }).then((response) =>{
            console.log(response)
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <div>
            <button onClick={handleLogOutButton}>Log out</button>
        </div>
    )
    
}

export default LogOutButton;