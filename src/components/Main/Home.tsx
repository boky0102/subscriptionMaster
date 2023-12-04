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

export interface Notification {
     message: string;
     notificationType: 'success' | 'error' | 'warning';
     active: boolean;
}

function Home() {
     const serverPath = import.meta.env.VITE_SERVER_LINK;
     const navigate = useNavigate();

     const [subscriptionData, setSubscriptionData] = useState<Subscription[]>([]);
     const [subscriptionFormData, setSubscriptionFormData] = useState({} as SubscriptionFormValue);
     const [dataPosted, newDataPosted] = useState(0);
     const [formFilled, setFormFilled] = useState(false);
     const [userData, setUserData] = useState({} as UserData);
     const [notification, setNotification] = useState({} as Notification);
     const [currency, setCurrency] = useState('USD');

     function triggerNotification(
          message: Notification['message'],
          type: Notification['notificationType'],
          dataChanged?: boolean,
     ) {
          if (dataChanged) {
               newDataPosted((number) => number + 1);
          }
          setNotification({
               message: message,
               notificationType: type,
               active: true,
          });
          setTimeout(() => {
               setNotification((prevNotification) => ({
                    ...prevNotification,
                    active: false,
               }));
          }, 3000);
     }

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
                         });
                    }
               })
               .catch((error) => {
                    console.log('auth error', error);
                    navigate('/login');
               });
     }, [dataPosted]);

     useEffect(() => {
          setSubscriptionFormData({
               subscriptionName: undefined,
               renewalDate: undefined,
               dateAdded: undefined,
               chargeAmount: undefined,
               emailNotification: false,
               category: undefined,
               freeTrial: false,
               currency: 'USD',
          });
     }, []);

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

     function handleSubscriptionFormChange(event: React.ChangeEvent<HTMLInputElement>) {
          const { name, value } = event.currentTarget;
          if (name === 'subscriptionName') {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          } else if (name === 'chargeAmount') {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    [name]: parseFloat(value),
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
          }
     }

     function handleSubscriptionFormSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const name = event.currentTarget.name;
          const value = event.currentTarget.value as subscriptionCategories;
          if (name === 'category') {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          } else if (name === 'currency') {
               setSubscriptionFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          }
          console.log(subscriptionData);
     }

     function handleEmailSliderChange() {
          let emailNotificationFlag: boolean;
          if (
               subscriptionFormData.emailNotification === undefined ||
               subscriptionFormData.emailNotification === false
          ) {
               emailNotificationFlag = true;
          } else {
               emailNotificationFlag = false;
          }

          setSubscriptionFormData((prevData) => ({
               ...prevData,
               emailNotification: emailNotificationFlag,
          }));
     }

     function handleFreeTrialChange() {
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

     function handleSubscriptionFormSubmit(event: React.ChangeEvent<HTMLFormElement>) {
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
     }

     function handleCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const { value } = event.target;
          setCurrency(value);
     }

     function clearFormValues(): void {
          setSubscriptionFormData({
               subscriptionName: undefined,
               renewalDate: undefined,
               dateAdded: undefined,
               chargeAmount: undefined,
               emailNotification: undefined,
               category: undefined,
               freeTrial: undefined,
               currency: 'USD',
          });
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
                                        handleEmailSliderChange={handleEmailSliderChange}
                                        handleFreeTrialChange={handleFreeTrialChange}
                                        freeTrial={subscriptionFormData.freeTrial}
                                        clearFormValues={clearFormValues}
                                        formFilled={formFilled}
                                        handleSubscriptionFormChange={handleSubscriptionFormChange}
                                        handleSubscriptionFormSelectChange={handleSubscriptionFormSelectChange}
                                        handleSubscriptionFormSubmit={handleSubscriptionFormSubmit}
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
