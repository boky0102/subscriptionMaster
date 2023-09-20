import './HomeContent.css';
import SubscriptionCard from './SubscriptionCard';
import { UserData } from './Home';
import { Link } from 'react-router-dom';
import { Notification } from './Home';

interface Subscription {
    id: string,
    subscriptionName: string,
    chargeAmount: number,
    renewalDate: Date,
    dateAdded: Date
}

type HomeContentProps = {
    subscriptionData: Subscription[],
    userData: UserData,
    notificationTrigger: (message: Notification["message"], type: Notification["notificationType"]) => void
}

export default function HomeContent(props: HomeContentProps){
    return(
        <>
            <div className='subscriptions-container'>
                {
                    props.subscriptionData.map((subscription) => 
                        <SubscriptionCard notificationTrigger={props.notificationTrigger} subscription={subscription} key={subscription.id} id={subscription.id}></SubscriptionCard>
                    )
                }
            </div>
            <div className='widget-container'>
                {
                    props.userData.email === undefined &&
                        <div>Email address isn't set up. Please go to <Link to="/home/settings" className='widget-link'>SETTINGS</Link> and setup email so you can recieve notificaitons.</div>
                }
            </div>
            
        </>
    )
}