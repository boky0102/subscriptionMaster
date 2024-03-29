import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import { triggerNotification } from '../../types';
import { getSingleSubscriptionData } from '../../utility/subscription.utility';

type subscriptionCategories =
     | 'Streaming'
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
     notificationTrigger: triggerNotification;
     handleDeleteClick: (id: string) => void;
};

export default function Mysubscriptions(props: MySubscriptionProps) {
     const filteredSubscriptions = props.subscriptionData.filter((subscription) => {
          if (subscription.subscriptionStopped) {
               return subscription;
          }
     });

     return (
          <div className="subscriptions-cards-container subscription-history-container">
               {filteredSubscriptions.map((subscription) => {
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
