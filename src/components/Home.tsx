import axios from 'axios';
import {useEffect, useState} from 'react';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import MySettings from './MySettings';
import SubscriptionForm from './SubscriptionForm';
import Callendar from './Callendar';

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
                console.log(userData);
            }
            
        }) .catch((err) => {
            if(err){
                navigate("/login");
                
            }
        });
    }, []);

    return(
        <div className="main-container">
            <Dashboard></Dashboard>
            <div className="outlet-container">
                <Routes>
                    <Route path="/settings" element={<MySettings></MySettings>}></Route>
                    <Route path="/addsubscription" element={<SubscriptionForm></SubscriptionForm>}></Route>
                    <Route path="/callendar" element={<Callendar></Callendar>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Home;