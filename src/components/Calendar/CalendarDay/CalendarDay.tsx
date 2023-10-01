import { Subscription } from "../../MySubscriptions/Mysubscriptions";
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

function isToday(date: Date){
    const currentDate = new Date();
    if(date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate()){
        return true;
    }
    return false;
}


export default function CalendarDay(props: CalendarDayProps){

    const [subscriptionsOnDay, setSubscriptions] = useState([] as Subscription[]);
    const [isCurrentDay, setCurrentDayFlag] = useState(false);

    useEffect(() => {
        if(props.subscriptionData){
            setSubscriptions(getSubscriptionsRenewalOnDate(props.subscriptionData, props.date))
        }
        if(isToday(props.date)){
            setCurrentDayFlag(true);
        } else {
            setCurrentDayFlag(false);
        }
        
    }, [props.subscriptionData, props.date])

    
    
    return(
        <div className={props.insideScope ? "calendar-field date-current" : "calendar-field date-outside"}>
            <div className={isCurrentDay ? "date-number date-number-today" : "date-number"}>
                {props.date.getDate()}
                {
                    subscriptionsOnDay.map((subscription) => (
                        <div key={subscription.id} className="calendar-subscription-name">{subscription.subscriptionName}</div>
                    ))
                }
            </div>
        </div>
    )
}