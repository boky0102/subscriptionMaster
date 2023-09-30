import { Subscription } from "./Mysubscriptions";
import { useEffect, useState } from "react";

 
type CalendarDayProps = {
    date: Date,
    insideScope: boolean,
    subscriptionData?: Subscription[]
}

function subscriptionActiveOnDate(currentDate: Date, subscriptionRenewal: Date, subscriptionAdded: Date){
    if(currentDate.getDate() === subscriptionRenewal.getDate()){
        if(currentDate.getFullYear() >= subscriptionAdded.getFullYear()){
            if(currentDate.getFullYear() === subscriptionAdded.getFullYear()){
                if(currentDate.getMonth() >= subscriptionAdded.getMonth()){
                    return true
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }else {
        return false;
    }
}

function getSubscriptionsRenewalOnDate(subscriptionsArray: Subscription[] ,date: Date){
    const subscriptionsOnDate = subscriptionsArray.filter((subscription) => {
        if(subscriptionActiveOnDate(date, subscription.renewalDate, subscription.dateAdded)){
            return subscription
        }
    });
    return subscriptionsOnDate;
}


export default function CalendarDay(props: CalendarDayProps){

    const [subscriptionsOnDay, setSubscriptions] = useState([] as Subscription[]);

    useEffect(() => {
        if(props.subscriptionData){
            setSubscriptions(getSubscriptionsRenewalOnDate(props.subscriptionData, props.date))
        }
        
    }, [])

    
    
    return(
        <div className={props.insideScope ? "calendar-field date-current" : "calendar-field date-outside"}>
            <div className="date-number">
                {props.date.getDate()}
                {
                    subscriptionsOnDay.map((subscription) => (
                        <div className="calendar-subscription-name">{subscription.subscriptionName}</div>
                    ))
                }
            </div>
        </div>
    )
}