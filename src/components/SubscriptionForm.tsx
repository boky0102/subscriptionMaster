import { useEffect, useState } from "react";
import axios from "axios"


interface subscriptionData {
    subscriptionName: string,
    startDate: Date,
    renewalDate: Date,
    cost: number
}




function SubscriptionForm(){

    const [subscriptionData, setSubscriptionData] = useState({} as subscriptionData);
    
    function handleSubscriptionDataChange(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = event.currentTarget
        if(name === "subscriptionName"){
            setSubscriptionData((prevData) => (
                {
                    ...prevData,
                    [name] : value
                }
            ))
        } else if(name === "chargeAmount"){
            setSubscriptionData((prevData) => (
                {
                    ...prevData,
                    [name] : value
                }
            ))
        } else if(name === "startDate"){
            const valueToDate = new Date(value);
            setSubscriptionData((prevData) => (
                {
                    ...prevData,
                    [name] : valueToDate
                }
            ))
        } else if(name === "renewalDate"){
            const valueToDate = new Date(value);
            setSubscriptionData((prevData) => (
                {
                    ...prevData,
                    [name] : valueToDate
                }
            ))
        }
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const serverLink = import.meta.env.VITE_SERVER_LINK
        axios.post(serverLink + "/newsubscription", subscriptionData, {
            withCredentials: true
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log(subscriptionData);
    }, [subscriptionData]);

    return(
        <form onSubmit={handleFormSubmit}>
            <label>Subscription name</label>
            <input type="text" name="subscriptionName" onChange={handleSubscriptionDataChange}></input>

            <label>Date subscribed</label>
            <input type="date" name="startDate" onChange={handleSubscriptionDataChange}></input>

            <label>Renewal Date</label>
            <input type="date" name="renewalDate" onChange={handleSubscriptionDataChange}></input>

            <label>Subscription cost per month</label>
            <input type="text" name="chargeAmount" onChange={handleSubscriptionDataChange}></input>
            <button type="submit">Add subscription</button>
        </form>
    )
}

export default SubscriptionForm