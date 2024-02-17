import axios from 'axios';
import { useEffect, useState } from 'react';
import { CurrenciesObj, triggerNotification } from '../../types';
import { NavigateFunction } from 'react-router-dom';
import { UserData } from '../../components/Main/Home';

type subscriptionCategories =
     | 'Streaming'
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

export function useFetchSubscriptions(
     dataPosted: number,
     triggerNotification: triggerNotification,
     navigate: NavigateFunction,
) {
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
                         if (fetchedSubscriptions) {
                              const adjustedSubscriptionsArrray = fetchedSubscriptions.map((subscription) => {
                                   subscription.renewalDate = new Date(subscription.renewalDate);
                                   subscription.dateAdded = new Date(subscription.dateAdded);
                                   if (subscription.subscriptionStopped) {
                                        subscription.subscriptionStopped = new Date(subscription.subscriptionStopped);
                                   }
                                   return subscription;
                              });
                              setSubscriptionData(adjustedSubscriptionsArrray);
                         }

                         console.log(response.data);

                         setUserData({
                              username: response.data.username,
                              email: response.data.email,
                              userColorData: response.data.userCategoryColor,
                              preferredCurrency: response.data.preferredCurrency,
                         });
                    }
               })
               .catch((error) => {
                    if (error.response) {
                         if (error.response.status === 401) {
                              navigate('/login');
                         }
                    }

                    console.log(error);
               });
     }, [dataPosted, serverLink, navigate]);

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

     function postPrefferedUserCurrency(currency: keyof CurrenciesObj) {
          const serverLink = import.meta.env.VITE_SERVER_LINK + '/preferredCurrency';
          axios.post(
               serverLink,
               {
                    preferredCurrency: currency,
               },
               {
                    withCredentials: true,
               },
          )
               .then((response) => {
                    if (response.status === 200) {
                         setUserData((prevData) => ({
                              ...prevData,
                              preferredCurrency: currency,
                         }));
                    }
               })
               .catch((error) => {
                    console.log(error);
               });
     }

     function stopSubscription(id: string) {
          setSubscriptionData((prevData) => {
               const unsubscribeSubscription = prevData.map((subscription) => {
                    if (subscription.id === id) {
                         subscription.subscriptionStopped = new Date();
                         return subscription;
                    } else {
                         return subscription;
                    }
               });
               return unsubscribeSubscription;
          });
     }

     return [subscriptionData, userData, { deleteSubscription, postPrefferedUserCurrency, stopSubscription }] as const;
}
