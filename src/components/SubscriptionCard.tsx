import { Subscription } from './Mysubscriptions';
import './SubscriptionCard.css';

type SubscriptionCardProps = {
    subscription: Subscription
}

export default function SubscriptionCard(props: SubscriptionCardProps){
    return(
        <div className='subscription-card-container'>
            <div className='header-container'>
                <div className='subscription-name'>{props.subscription.subscriptionName}</div>
                <div className='subscription-amount'>{props.subscription.chargeAmount}</div>
            </div>
            <div className='subscription-card-element'>Renewal Date</div>
            <div className='subscription-card-element'>{props.subscription.renewalDate.toString()}</div>
        </div>
    )
}