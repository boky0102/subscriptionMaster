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
     id?: string;
}

type MySubscriptionProps = {
     subscriptionData: Subscription[];
};

export default function Mysubscriptions(props: MySubscriptionProps) {
     return (
          <div>
               {props.subscriptionData.map((subscription) => {
                    return (
                         <div>
                              {' '}
                              {subscription.subscriptionName} - {subscription.chargeAmount}
                         </div>
                    );
               })}
          </div>
     );
}
