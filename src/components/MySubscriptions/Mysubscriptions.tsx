import { useEffect, useState } from 'react';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import { Notification } from '../Main/Home';
import { getSingleSubscriptionData } from '../../utility/subscription.utility';

type subscriptionCategories =
     | 'Streaming service'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

export interface Subscription {
     subscriptionName: string;
     renewalDate: Date;
     dateAdded: Date;
     chargeAmount: number;
     emailNotification?: boolean;
     freeTrial?: boolean;
     category?: subscriptionCategories;
     id: string;
     subscriptionStopped?: Date;
     currency: string;
}

type MySubscriptionProps = {
     subscriptionData: Subscription[];
     notificationTrigger: (
          message: Notification['message'],
          type: Notification['notificationType'],
          active?: Notification['active'],
     ) => void;
     handleDeleteClick: (id: string) => void;
};

export default function Mysubscriptions(props: MySubscriptionProps) {
     const [stoppedSubscriptions, setStoppedSubscriptions] = useState([] as Subscription[]);
     useEffect(() => {
          setStoppedSubscriptions(() => {
               const filteredArray = props.subscriptionData.filter((subscription) => {
                    if (subscription.subscriptionStopped) {
                         return subscription;
                    }
               });
               return filteredArray;
          });
     }, [props.subscriptionData]);

     return (
          <div className="subscriptions-cards-container subscription-history-container">
               {stoppedSubscriptions.map((subscription) => {
                    return (
                         <SubscriptionCard
                              subscription={subscription}
                              id={subscription.id}
                              notificationTrigger={props.notificationTrigger}
                              handleDeleteClick={props.handleDeleteClick}
                              key={subscription.id}
                              unsubscribed={true}
                              totalCost={getSingleSubscriptionData(subscription)}
                         ></SubscriptionCard>
                    );
               })}
          </div>
     );
}
