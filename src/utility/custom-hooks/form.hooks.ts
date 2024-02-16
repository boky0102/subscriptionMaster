import axios from 'axios';
import { useEffect, useState } from 'react';
import { triggerNotification } from '../../types';

type subscriptionCategories =
     | 'Streaming'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

interface SubscriptionFormValue {
     subscriptionName: string | undefined;
     chargeAmount: number | undefined;
     renewalDate: Date | undefined;
     dateAdded: Date | undefined;
     emailNotification: boolean | undefined;
     freeTrial: boolean | undefined;
     category: subscriptionCategories | undefined;
     currency: string;
}

export function useSubscriptionForm() {
     const [subscriptionFormData, setSubscriptionFormData] = useState({} as SubscriptionFormValue);
     const [formValid, setFormValid] = useState(false);

     useEffect(() => {
          if (
               subscriptionFormData.chargeAmount &&
               subscriptionFormData.dateAdded &&
               subscriptionFormData.renewalDate &&
               subscriptionFormData.subscriptionName &&
               subscriptionFormData.category &&
               subscriptionFormData.currency
          ) {
               setFormValid(true);
          } else {
               setFormValid(false);
          }
     }, [subscriptionFormData, setFormValid]);

     function formChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
          const { name, value } = event.target;
          if (name === 'chargeAmount') {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    chargeAmount: parseFloat(value),
               }));
          } else if (name === 'dateAdded') {
               const valueToDate = new Date(value);
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    [name]: valueToDate,
               }));
          } else if (name === 'renewalDate') {
               const valueToDate = new Date(value);
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    [name]: valueToDate,
               }));
          } else if (name === 'subscriptionName') {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          }
     }

     function selectChangeFunctionHandler(event: React.ChangeEvent<HTMLSelectElement>) {
          const name = event.target.name;
          if (name === 'category') {
               const value = event.target.value as subscriptionCategories;
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          } else if (name === 'currency') {
               const value = event.target.value;
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    currency: value,
               }));
          }
     }

     function emailSliderHandler() {
          if (
               subscriptionFormData.emailNotification === undefined ||
               subscriptionFormData.emailNotification === false
          ) {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    emailNotification: true,
               }));
          } else {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    emailNotification: false,
               }));
          }
     }

     function freeTrialSliderHandler() {
          if (subscriptionFormData.freeTrial === undefined || subscriptionFormData.freeTrial === false) {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    freeTrial: true,
               }));
          } else {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    freeTrial: false,
               }));
          }
     }

     return [
          subscriptionFormData,
          formValid,
          {
               formChangeHandler,
               selectChangeFunctionHandler,
               emailSliderHandler,
               freeTrialSliderHandler,
          },
     ] as const;
}

export function usePostSubscriptionData(
     subscriptionData: SubscriptionFormValue,
     formValidation: boolean,
     triggerNotification: triggerNotification,
) {
     const [posted, dataPosted] = useState(0);
     function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
          if (formValidation) {
               const serverLink = import.meta.env.VITE_SERVER_LINK + '/newsubscription';
               event.preventDefault();
               axios.post(serverLink, subscriptionData, {
                    withCredentials: true,
               })
                    .then((response) => {
                         if (response.status === 200) {
                              dataPosted((counter) => counter + 1);
                              triggerNotification('Subscription data uploaded succesfully', 'success');
                         }
                    })
                    .catch((error) => {
                         console.log(error);
                         triggerNotification(error.message, 'error');
                    });
          } else {
               triggerNotification("Form isn't complete", 'warning');
          }
     }

     return [posted, handleFormSubmit] as const;
}
