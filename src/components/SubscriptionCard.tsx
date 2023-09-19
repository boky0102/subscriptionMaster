
import { Subscription } from './Mysubscriptions';
import './SubscriptionCard.css';
import Slider from './Slider';
import {useState} from 'react';

type SubscriptionCardProps = {
    subscription: Subscription,
    id: string
}



export default function SubscriptionCard(props: SubscriptionCardProps){

    //wirte function for notification controll that will ift state up to hamecontent every time notification is trigerred

    const [sliderActive, setSliderActive] = useState(false);

    function handleSliderChange(){
        if(sliderActive){
            setSliderActive(false);
        } else{
            setSliderActive(true);
        }
    }

    return(
        <div className='subscription-card-container'>
            <div className='header-container'>
                <div className='subscription-name'>{props.subscription.subscriptionName.toUpperCase()}</div>
                <div className='subscription-amount'>{props.subscription.chargeAmount}</div>
            </div>
            <div className='division-line'></div>
            <div className='subscription-card-element'>Renewal Date</div>
            <div className='subscription-card-element'>{props.subscription.renewalDate.toDateString()}</div>
            <div className='subscription-card-element'>
                <Slider sliderActive={sliderActive} handleSliderClick={handleSliderChange}></Slider>
            </div>
            
        </div>
    )
}