import './HomeContent.css';
import SubscriptionCard from './SubscriptionCard';

interface Subscription {
    subscriptionName: string,
    chargeAmount: number,
    renewalDate: Date,
    dateAdded: Date
}

type HomeContentProps = {
    subscriptionData: Subscription[]
}

export default function HomeContent(props: HomeContentProps){
    return(
        <>
            <div className='subscriptions-container'>
                {
                    props.subscriptionData.map((subscription) => 
                        <SubscriptionCard subscription={subscription}></SubscriptionCard>
                    )
                }
            </div>
            <div className='widget-container'></div>
            
        </>
    )
}