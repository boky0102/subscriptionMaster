import { Subscription } from '../MySubscriptions/Mysubscriptions';
import './SubscriptionCard.css';
import Slider from '../Slider/Slider';
import { useState } from 'react';
import axios from 'axios';
import { Notification } from '../Main/Home';

type SubscriptionCardProps = {
     subscription: Subscription;
     id: string;
     notificationTrigger: (message: Notification['message'], type: Notification['notificationType']) => void;
     handleDeleteClick: (susbscriptionId: string) => void;
};

export default function SubscriptionCard(props: SubscriptionCardProps) {
     //wirte function for notification controll that will ift state up to hamecontent every time notification is trigerred

     const [sliderActive, setSliderActive] = useState(props.subscription.emailNotification);

     function handleSliderChange() {
          if (sliderActive) {
               setSliderActive(false);
          } else {
               setSliderActive(true);
          }
          const serverLink = import.meta.env.VITE_SERVER_LINK + '/subscription';
          axios.put(
               serverLink,
               {
                    subscriptionId: props.id,
               },
               {
                    withCredentials: true,
               },
          )
               .then((response) => {
                    props.notificationTrigger(
                         `Successfully updated email notification for subscription ${props.subscription.subscriptionName}`,
                         'success',
                    );
                    console.log(response);
               })
               .catch((error) => {
                    console.log(error);
               });
     }

     return (
          <div className="subscription-card-container">
               <div className="header-container">
                    <div className="subscription-name">{props.subscription.subscriptionName.toUpperCase()}</div>
                    <div className="subscription-amount">{props.subscription.chargeAmount}</div>
               </div>
               <div className="division-line"></div>
               <div className="subscription-card-element">Date started</div>
               <div className="subscription-card-element">{props.subscription.dateAdded.toDateString()}</div>
               <div className="subscription-card-element">Category</div>
               <div className="subscription-card-element">{props.subscription.category}</div>
               <div className="subscription-card-element">
                    <Slider sliderActive={sliderActive} handleSliderClick={handleSliderChange}></Slider>
               </div>
               <div className="subscription-card-element">
                    <button className="delete-button" onClick={() => props.handleDeleteClick(props.id)}>
                         DELETE
                    </button>
               </div>
          </div>
     );
}
