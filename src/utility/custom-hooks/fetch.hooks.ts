import axios from 'axios';
import { useEffect, useState } from 'react';
import { CurrenciesObj, triggerNotification } from '../../types';

type subscriptionCategories =
     | 'Streaming service'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

interface Subscription {
     id: string;
     subscriptionName: string;
     chargeAmount: number;
     renewalDate: Date;
     dateAdded: Date;
     freeTrial: boolean;
     category: subscriptionCategories;
     currency: string;
     subscriptionStopped?: Date;
}

type UserColorData = {
     category: subscriptionCategories;
     color: string;
};

export interface UserData {
     username: string;
     email?: string;
     userColorData?: UserColorData[];
     preferredCurrency: keyof CurrenciesObj;
}

export function useFetchSubscriptions(dataPosted: number, triggerNotification: triggerNotification) {
     const [subscriptionData, setSubscriptionData] = useState([] as Subscription[]);
     const [userData, setUserData] = useState({} as UserData);
     const serverLink = import.meta.env.VITE_SERVER_LINK;
     useEffect(() => {
          axios.get(serverLink + '/subscriptions', {
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         const fetchedSubscriptions = response.data.subscriptions as Subscription[];
                         const adjustedSubscriptionsArrray = fetchedSubscriptions.map((subscription) => {
                              subscription.renewalDate = new Date(subscription.renewalDate);
                              subscription.dateAdded = new Date(subscription.dateAdded);
                              if (subscription.subscriptionStopped) {
                                   subscription.subscriptionStopped = new Date(subscription.subscriptionStopped);
                              }
                              return subscription;
                         });
                         setSubscriptionData(adjustedSubscriptionsArrray);
                         if (Object.keys(userData).length === 0) {
                              setUserData({
                                   username: response.data.username,
                                   email: response.data.email,
                                   userColorData: response.data.userCategoryColor,
                                   preferredCurrency: response.data.preferredCurrency,
                              });
                         }
                    }
               })
               .catch((error) => {
                    console.log(error.message);
               });
     }, [dataPosted, userData, serverLink]);

     function deleteSubscription(subscriptionId: string) {
          axios.delete(serverLink + '/subscription/' + subscriptionId, {
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         triggerNotification('Subscription removed successfuly', 'success');
                         setSubscriptionData((prevData) => {
                              const filteredArray = prevData.filter((subscription) => {
                                   if (subscription.id !== subscriptionId) {
                                        return subscription;
                                   }
                              });
                              return filteredArray;
                         });
                    }
               })
               .catch((error) => {
                    triggerNotification(error.message, 'error');
                    console.log(error.message);
               });
     }

     return [subscriptionData, userData, { deleteSubscription }] as const;
}
