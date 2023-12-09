import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import MySettings from '../Settings/MySettings';
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm';
import Callendar from '../Calendar/Callendar';
import Mysubscriptions from '../MySubscriptions/Mysubscriptions';
import './Home.css';
import HomeContent from '../HomeContent/HomeContent';
import MainNotification from '../MainNotification/MainNotification';
import currencies from '../../utility/Common-Currency.json';
import { CurrenciesObj } from '../../types';
import { isCurrencyCode } from '../../utility/types.utility';
import { useNotification } from '../../utility/custom-hooks/notification.hooks';
import { usePostSubscriptionData, useSubscriptionForm } from '../../utility/custom-hooks/form.hooks';

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

export interface UserData {
     username: string;
     email?: string;
     userColorData?: UserColorData[];
     preferredCurrency: keyof CurrenciesObj;
}

type subscriptionCategories =
     | 'Streaming service'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

type UserColorData = {
     category: subscriptionCategories;
     color: string;
};

function Home() {
     const serverPath = import.meta.env.VITE_SERVER_LINK;
     const navigate = useNavigate();
     const [
          subscriptionFormData,
          formDataisValid,
          { formChangeHandler, freeTrialSliderHandler, emailSliderHandler, selectChangeFunctionHandler },
     ] = useSubscriptionForm();
     const [notification, triggerNotification] = useNotification();
     const [dataPosted, subscriptionFormSubmitHandler] = usePostSubscriptionData(
          subscriptionFormData,
          formDataisValid,
          triggerNotification,
     );

     useEffect(() => {
          if (dataPosted !== 0) {
               setTimeout(() => {
                    navigate('/');
               }, 4000);
          }
     }, [dataPosted]);

     const [subscriptionData, setSubscriptionData] = useState<Subscription[]>([]);
     const [formFilled, setFormFilled] = useState(false);
     const [userData, setUserData] = useState({} as UserData);
     const [currency, setCurrency] = useState(userData.preferredCurrency);

     function handleDeleteClick(subscriptionId: string) {
          const serverLink = import.meta.env.VITE_SERVER_LINK + '/subscription/' + subscriptionId;
          axios.delete(serverLink, {
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         triggerNotification('Subscription removed successfully', 'success');
                         setSubscriptionData((prevData) =>
                              prevData.filter((subscription) => {
                                   if (subscription.id !== subscriptionId) {
                                        return subscription;
                                   }
                              }),
                         );
                    }
               })
               .catch((error) => {
                    const errorMessage: string = error.response.statusText;
                    triggerNotification(errorMessage, 'error');
               });
     }

     useEffect(() => {
          axios.get(serverPath + '/subscriptions', {
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         if (response.data.subscriptions) {
                              const responseSubscriptionData = response.data.subscriptions as Subscription[];
                              const dateObjectArray = responseSubscriptionData.map((subscription) => {
                                   subscription.renewalDate = new Date(subscription.renewalDate);
                                   subscription.dateAdded = new Date(subscription.dateAdded);
                                   if (subscription.subscriptionStopped) {
                                        subscription.subscriptionStopped = new Date(subscription.subscriptionStopped);
                                   }

                                   return subscription;
                              });
                              setSubscriptionData(dateObjectArray);
                         }

                         setUserData({
                              username: response.data.username,
                              email: response.data.email,
                              userColorData: response.data.userCategoryColor,
                              preferredCurrency: response.data.preferredCurrency,
                         });
                         if (response.data.preferredCurrency) {
                              setCurrency(response.data.preferredCurrency);
                         }
                    }
               })
               .catch((error) => {
                    console.log('auth error', error);
                    navigate('/login');
               });
     }, [dataPosted]);

     useEffect(() => {
          if (
               subscriptionFormData.chargeAmount &&
               subscriptionFormData.dateAdded &&
               subscriptionFormData.renewalDate &&
               subscriptionFormData.subscriptionName &&
               subscriptionFormData.category
          ) {
               setFormFilled(true);
          } else {
               setFormFilled(false);
          }
     }, [subscriptionFormData]);

     useEffect(() => {
          axios.get(serverPath + '/currencies', {
               withCredentials: true,
          })
               .then((response) => {
                    const currencyRates = response.data;
                    setSubscriptionData((prevData) => {
                         const adjustedSubscriptionArray = prevData.map((subscription) => {
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
                         return adjustedSubscriptionArray;
                    });
               })
               .catch((error) => {
                    console.log(error);
               });
          axios.post(
               serverPath + '/preferredCurrency',
               { preferredCurrency: currency },
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
     }, [currency, serverPath]);

     /* function handleSubscriptionFormSubmit(event: React.ChangeEvent<HTMLFormElement>) {
          event.preventDefault();
          const postLink = import.meta.env.VITE_SERVER_LINK + '/newsubscription';
          axios.post(postLink, subscriptionFormData, {
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         newDataPosted((number) => number + 1);
                         triggerNotification('Subscription added successfully', 'success');
                    }
               })
               .catch((error) => {
                    console.log(error);
                    triggerNotification('An error occured, please try again later', 'error');
               })
               .finally(() => {
                    setTimeout(() => {
                         navigate('/home');
                    }, 2000);
               });
     } */

     function handleCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const { value } = event.target;
          if (isCurrencyCode(value)) {
               setCurrency(value);
          }
     }

     return (
          <div className="main-grid-container">
               <Dashboard username={userData.username}></Dashboard>
               <div className="outlet-container">
                    <Routes>
                         <Route path="/settings" element={<MySettings email={userData.email}></MySettings>}></Route>
                         <Route
                              path="/addsubscription"
                              element={
                                   <SubscriptionForm
                                        emailSliderActive={subscriptionFormData.emailNotification}
                                        handleEmailSliderChange={emailSliderHandler}
                                        handleFreeTrialChange={freeTrialSliderHandler}
                                        freeTrial={subscriptionFormData.freeTrial}
                                        formFilled={formFilled}
                                        handleSubscriptionFormChange={formChangeHandler}
                                        handleSubscriptionFormSelectChange={selectChangeFunctionHandler}
                                        handleSubscriptionFormSubmit={subscriptionFormSubmitHandler}
                                        triggerNotification={triggerNotification}
                                        currencies={currencies}
                                   ></SubscriptionForm>
                              }
                         ></Route>
                         <Route
                              path="/callendar"
                              element={<Callendar subscriptionData={subscriptionData}></Callendar>}
                         ></Route>
                         <Route
                              path="/mysubscriptions"
                              element={
                                   <Mysubscriptions
                                        subscriptionData={subscriptionData}
                                        notificationTrigger={triggerNotification}
                                        handleDeleteClick={handleDeleteClick}
                                   ></Mysubscriptions>
                              }
                         ></Route>
                         <Route
                              path=""
                              element={
                                   <HomeContent
                                        handleDeleteClick={handleDeleteClick}
                                        notificationTrigger={triggerNotification}
                                        userData={userData}
                                        subscriptionData={subscriptionData}
                                        handleCurrencyChange={handleCurrencyChange}
                                        currentCurrency={currency}
                                   ></HomeContent>
                              }
                         ></Route>
                    </Routes>
                    <MainNotification
                         message={notification.message}
                         type={notification.notificationType}
                         active={notification.active}
                    ></MainNotification>
               </div>
          </div>
     );
}

export default Home;
