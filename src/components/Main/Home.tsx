import { useEffect } from 'react';
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
import { useFetchSubscriptions } from '../../utility/custom-hooks/fetch.hooks';
import { useCurrency } from '../../utility/custom-hooks/currency.hook';

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

     const [subscriptionData, userData, { deleteSubscription, postPrefferedUserCurrency }] = useFetchSubscriptions(
          dataPosted,
          triggerNotification,
     );

     const [currencyAdjustedSubData] = useCurrency(subscriptionData, userData.preferredCurrency);

     useEffect(() => {
          if (dataPosted !== 0) {
               setTimeout(() => {
                    navigate('/');
               }, 4000);
          }
     }, [dataPosted]);

     /* useEffect(() => {
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
     }, [subscriptionFormData]); */

     /* useEffect(() => {
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
 */
     function handleCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const { value } = event.target;
          if (isCurrencyCode(value)) {
               postPrefferedUserCurrency(value);
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
                                        formFilled={formDataisValid}
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
                              element={<Callendar subscriptionData={currencyAdjustedSubData}></Callendar>}
                         ></Route>
                         <Route
                              path="/mysubscriptions"
                              element={
                                   <Mysubscriptions
                                        subscriptionData={currencyAdjustedSubData}
                                        notificationTrigger={triggerNotification}
                                        handleDeleteClick={deleteSubscription}
                                   ></Mysubscriptions>
                              }
                         ></Route>
                         <Route
                              path=""
                              element={
                                   <HomeContent
                                        handleDeleteClick={deleteSubscription}
                                        notificationTrigger={triggerNotification}
                                        userData={userData}
                                        subscriptionData={currencyAdjustedSubData}
                                        handleCurrencyChange={handleCurrencyChange}
                                        currentCurrency={userData.preferredCurrency}
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
