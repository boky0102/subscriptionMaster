import { useEffect, useState } from 'react';
import { CurrenciesObj } from '../../types';
import axios from 'axios';

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

export function useCurrency(subscriptionData: Subscription[], currency: keyof CurrenciesObj) {
     const [currencyTransformedSubscriptions, setTransformedSubscriptions] = useState([] as Subscription[]);
     useEffect(() => {
          const serverLink = import.meta.env.VITE_SERVER_LINK + '/currencies';
          axios.get(serverLink, {
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         const currencyRates = response.data;
                         const exchangedSubscriptionsArray = subscriptionData.map((subscription) => {
                              if (subscription.currency !== currency) {
                                   if (currency == 'USD') {
                                        const chargeAmount =
                                             subscription.chargeAmount / currencyRates[subscription.currency];
                                        subscription.chargeAmount = Math.round(chargeAmount * 100) / 100;
                                        subscription.currency = 'USD';
                                   } else {
                                        if (subscription.currency === 'USD') {
                                             const chargeAmount = subscription.chargeAmount * currencyRates[currency];
                                             subscription.chargeAmount = Math.round(chargeAmount * 100) / 100;
                                             subscription.currency = currency;
                                        } else {
                                             const chargeAmountUSD =
                                                  subscription.chargeAmount / currencyRates[subscription.currency];
                                             const convertedAmountCurrency = chargeAmountUSD * currencyRates[currency];
                                             subscription.chargeAmount =
                                                  Math.round(convertedAmountCurrency * 100) / 100;
                                             subscription.currency = currency;
                                        }
                                   }
                              }
                              return subscription;
                         });
                         setTransformedSubscriptions(exchangedSubscriptionsArray);
                    }
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [currency, subscriptionData]);
     return [currencyTransformedSubscriptions] as const;
}
