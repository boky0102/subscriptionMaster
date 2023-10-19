import { Subscription } from '../MySubscriptions/Mysubscriptions';
import './SubscriptionCard.css';
import Slider from '../Slider/Slider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Notification } from '../Main/Home';
import { TrashBin } from '../Icons/TrashBinSvg';
import Button from '../Button/Button';

type SubscriptionCardProps = {
     subscription: Subscription;
     id: string;
     notificationTrigger: (message: Notification['message'], type: Notification['notificationType']) => void;
     handleDeleteClick: (susbscriptionId: string) => void;
};

export default function SubscriptionCard(props: SubscriptionCardProps) {
     //wirte function for notification controll that will ift state up to hamecontent every time notification is trigerred

     const [sliderActive, setSliderActive] = useState(props.subscription.emailNotification);
     const [nextRenewal, setNextRenewal] = useState(props.subscription.renewalDate);
     const currentDate = new Date();

     useEffect(() => {
          if (props.subscription.renewalDate.getDate() <= currentDate.getDate()) {
               const newRenewalDate = new Date(nextRenewal);
               newRenewalDate.setMonth(currentDate.getMonth() + 1);
               setNextRenewal(newRenewalDate);
          }
     }, [props.subscription]);

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

     function handleUnsubscribe(id: string) {
          const serverLink = import.meta.env.VITE_SERVER_LINK + '/subscription-stop';
          axios.put(
               serverLink,
               {
                    subscriptionId: id,
               },
               {
                    withCredentials: true,
               },
          );
     }

     return (
          <div className="subscription-card-container">
               <div className="header-container">
                    <div className="subscription-name">
                         <div>{props.subscription.subscriptionName.toUpperCase()}</div>
                         <TrashBin id="trash-bin-icon" onClick={() => props.handleDeleteClick(props.id)}></TrashBin>
                         <Button
                              className="subscription-card-button"
                              label="UNSUBSCRIBE"
                              type="button"
                              onClick={() => handleUnsubscribe(props.id)}
                         ></Button>
                    </div>

                    <div className="subscription-amount">{props.subscription.chargeAmount}</div>
               </div>
               <div className="division-line"></div>
               <div className="subscription-card-element">
                    <div>Date started</div>
                    <div>{props.subscription.dateAdded.toDateString()}</div>
               </div>
               <div className="subscription-card-element">
                    <div>Next renewal</div>
                    <div>
                         {nextRenewal.toLocaleDateString('en-GB', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                         })}
                    </div>
               </div>
               <div className="subscription-card-element">
                    <div>Category</div>
                    <div>{props.subscription.category}</div>
               </div>
               <div className="subscription-card-element">
                    <div>Email notification</div>
                    <Slider sliderActive={sliderActive} handleSliderClick={handleSliderChange}></Slider>
               </div>
          </div>
     );
}
