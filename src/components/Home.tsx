import axios from 'axios';
import {useEffect, useState} from 'react';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import MySettings from './MySettings';
import SubscriptionForm from './SubscriptionForm';
import Callendar from './Callendar';
import Mysubscriptions from './Mysubscriptions';
import './Home.css';
import HomeContent from './HomeContent';

interface Subscription {
    id: string,
    subscriptionName: string,
    chargeAmount: number,
    renewalDate: Date,
    dateAdded: Date
}

export interface UserData {
    username: string,
    email?: string
}

interface SubscriptionFormValue{
    subscriptionName: string | undefined,
    chargeAmount: number | undefined,
    renewalDate: Date | undefined,
    dateAdded: Date | undefined
}

interface Notification {
    message: string | undefined,
    notificationType: "success" | "error" | "warning" | undefined
}



function Home(){
    const serverPath = import.meta.env.VITE_SERVER_LINK;
    const navigate = useNavigate();

    const [subscriptionData, setSubscriptionData] = useState<Subscription[]>([]);
    const [subscriptionFormData, setSubscriptionFormData] = useState({} as SubscriptionFormValue);
    const [dataPosted, newDataPosted] = useState(false);
    const [notification, setNotification] = useState({message: undefined, notificationType: undefined} as Notification);
    const [formFilled, setFormFilled] = useState(false);
    const [userData, setUserData] = useState({} as UserData);

    useEffect(() => {
        axios.get(serverPath + "/subscriptions", {
            withCredentials: true
        }) .then((response) => {
            if(response.status === 200){
                if(response.data.subscriptions){
                    const responseSubscriptionData = response.data.subscriptions as Subscription[];
                    const dateObjectArray = responseSubscriptionData.map((subscription) => {
                    subscription.renewalDate = new Date(subscription.renewalDate);
                    return subscription
                    });
                    setSubscriptionData(dateObjectArray);
                }
                
                setUserData({
                    username: response.data.username,
                    email: response.data.email
                });
                
            }
        }) .catch((error) => {
            console.log("auth error",error);
            navigate("/login");
        })
    }, [dataPosted]);

    useEffect(() => {
        setSubscriptionFormData({
            subscriptionName: undefined,
            renewalDate: undefined,
            dateAdded: undefined,
            chargeAmount: undefined
        })
    }, []);

    useEffect(() => {
        if(subscriptionFormData.chargeAmount && subscriptionFormData.dateAdded  && subscriptionFormData.renewalDate && subscriptionFormData.subscriptionName){
            setFormFilled(true);
        } else{
            setFormFilled(false);
        }
    }, [subscriptionFormData]);

    

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    function handleSubscriptionFormChange(event: React.ChangeEvent<HTMLInputElement>){


        const {name, value} = event.currentTarget;
        console.log("CURRENT CHANGE", name, "VALUE", value);
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
        } else if(name === "dateAdded"){
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
                setNotification({
                    message: "Successfully created added new subscription to your subscriptions, redirecting you to home...",
                    notificationType: "success"
                });
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setTimeout( () => {
                setNotification({
                    message: undefined,
                    notificationType: undefined
                })
            }, 2000)
        })
        
    }

    function clearFormValues() : void{
        setSubscriptionFormData({
            subscriptionName: undefined,
            renewalDate: undefined,
            dateAdded: undefined,
            chargeAmount: undefined
        })
    }



    return(
        <div className="main-grid-container">
            <Dashboard></Dashboard>
            <div className="outlet-container">
                <Routes>
                    <Route path="/settings" element={<MySettings></MySettings>}></Route>
                    <Route path="/addsubscription" element={<SubscriptionForm clearFormValues={clearFormValues} formFilled={formFilled} notification={notification} handleSubscriptionFormChange={handleSubscriptionFormChange} handleSubscriptionFormSubmit={handleSubscriptionFormSubmit}></SubscriptionForm>}></Route>
                    <Route path="/callendar" element={<Callendar></Callendar>}></Route>
                    <Route path="/mysubscriptions" element={<Mysubscriptions subscriptionData={subscriptionData}></Mysubscriptions>}></Route>
                    <Route path="" element={<HomeContent userData={userData} subscriptionData={subscriptionData}></HomeContent>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Home;