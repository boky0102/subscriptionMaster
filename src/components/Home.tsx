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
                console.log(response.status);
            }
            
        }) .catch((err) => {
            if(err){
                navigate("/login");
                
            }
        });
    }, []);

    return(
        <div>
            Hi user {userData}
        </div>
    )
}

export default Home;