import axios from 'axios';
import {useEffect, useState} from 'react';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import MySettings from './MySettings';
import SubscriptionForm from './SubscriptionForm';
import Callendar from './Callendar';
import Mysubscriptions from './Mysubscriptions';

interface Subscription {
    subscriptionName: string,
    chargeAmount: number,
    renewalDate: Date,
    addedDate: Date
}

function Home(){
    const serverPath = import.meta.env.VITE_SERVER_LINK;
    const navigate = useNavigate();

    const [subscriptionData, setSubscriptionData] = useState<Subscription[]>([]);
    const [subscriptionFormData, setSubscriptionFormData] = useState({} as Subscription);
    const [dataPosted, newDataPosted] = useState(false);

    useEffect(() => {
        axios.get(serverPath + "/subscriptions", {
            withCredentials: true
        }) .then((response) => {
            console.log("Render",response.data)
            setSubscriptionData(response.data)
        }) .catch((error) => {
            console.log("auth error",error);
            navigate("/login");
        })
    }, [dataPosted]);

    useEffect(() => {
        console.log(subscriptionFormData);
    }, [subscriptionFormData]);

    function handleSubscriptionFormChange(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = event.currentTarget
        if(name === "subscriptionName"){
            setSubscriptionFormData((prevData) => (
                {
                    ...prevData,
                    [name] : value
                }
            ))
        } else if(name === "chargeAmount"){
            setSubscriptionFormData((prevData) => (
                {
                    ...prevData,
                    [name] : parseInt(value)
                }
            ))
        } else if(name === "startDate"){
            const valueToDate = new Date(value);
            setSubscriptionFormData((prevData) => (
                {
                    ...prevData,
                    [name] : valueToDate
                }
            ))
        } else if(name === "renewalDate"){
            const valueToDate = new Date(value);
            setSubscriptionFormData((prevData) => (
                {
                    ...prevData,
                    [name] : valueToDate
                }
            ))
        }
    }

    function handleSubscriptionFormSubmit(event: React.ChangeEvent<HTMLFormElement>){
        event.preventDefault();
        const postLink = import.meta.env.VITE_SERVER_LINK + "/newsubscription";
        axios.post(postLink, subscriptionFormData, {
            withCredentials: true
        }).then((response) => {
            if(response.status === 200){
                console.log("POSTED");
                newDataPosted(true);
            }
        }).catch((error) => {
            console.log(error);
        })
        
    }



    return(
        <>
            <Dashboard></Dashboard>
            <div className="outlet-container">
                <Routes>
                    <Route path="/settings" element={<MySettings></MySettings>}></Route>
                    <Route path="/addsubscription" element={<SubscriptionForm handleSubscriptionFormChange={handleSubscriptionFormChange} handleSubscriptionFormSubmit={handleSubscriptionFormSubmit}></SubscriptionForm>}></Route>
                    <Route path="/callendar" element={<Callendar></Callendar>}></Route>
                    <Route path="" element={<Mysubscriptions subscriptionData={subscriptionData}></Mysubscriptions>}></Route>
                </Routes>
            </div>
        </>
    )
}

export default Home;