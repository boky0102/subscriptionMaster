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

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get(serverPath + "/subscriptions", {
            withCredentials: true
        }) .then((response) => {
            console.log(response.data)
            setUserData(response.data)
        }) .catch((error) => {
            console.log("auth error",error);
            navigate("/login");
        })
    }, []);

    return(
        <>
            <Dashboard></Dashboard>
            <div className="outlet-container">
                <Routes>
                    <Route path="/settings" element={<MySettings></MySettings>}></Route>
                    <Route path="/addsubscription" element={<SubscriptionForm></SubscriptionForm>}></Route>
                    <Route path="/callendar" element={<Callendar></Callendar>}></Route>
                </Routes>
                {
                    userData.map((subscription) => {
                        return <h1>{subscription.subscriptionName} {subscription.chargeAmount}</h1>
                    })
                }
            </div>
        </>
    )
}

export default Home;