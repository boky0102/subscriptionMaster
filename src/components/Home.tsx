import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Home(){
    const serverPath = import.meta.env.VITE_SERVER_LINK;
    const navigate = useNavigate();

    const [userData, setUserData] = useState("");

    useEffect(() => {
        axios.get(serverPath, {
            withCredentials: true
        }) .then((response) => {
            if(response.status === 200){
                setUserData(response.data);

            } else{
                navigate("/login");
            }
            
        }) .catch(err => console.log(err));
    }, []);

    return(
        <div>
            Hi user {userData}
        </div>
    )
}

export default Home;