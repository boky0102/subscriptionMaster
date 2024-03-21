import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import MySettings from '../Settings/MySettings';
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm';
import Callendar from '../Calendar/Callendar';
import Mysubscriptions, { Subscription } from '../MySubscriptions/Mysubscriptions';
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
import Insights from '../Insights/Insights';
import { calculatePredictedExpensesYear, getChartDataYear } from '../../utility/subscription.utility';

export interface UserData {
     username: string;
     email?: string;
     userColorData: UserColorData;
     preferredCurrency: keyof CurrenciesObj;
}

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
     id: string;
}

type UserColorData = {
     [key in subscriptionCategories]: string;
};

//Used for calculating expected subscriptions cost graph
function addFormValuesToSubscription(subscriptionData: Subscription[], subscriptionFormData: SubscriptionFormValue) {
     if (
          subscriptionFormData.category &&
          subscriptionFormData.chargeAmount &&
          subscriptionFormData.dateAdded &&
          subscriptionFormData.renewalDate &&
          subscriptionFormData.subscriptionName
     ) {
          const formInputSubscription: Subscription = {
               id: '1',
               subscriptionName: subscriptionFormData.subscriptionName,
               chargeAmount: subscriptionFormData.chargeAmount,
               dateAdded: new Date(
                    subscriptionFormData.dateAdded.getFullYear(),
                    subscriptionFormData.dateAdded.getMonth(),
                    subscriptionFormData.dateAdded.getDate(),
               ),
               renewalDate: new Date(
                    subscriptionFormData.renewalDate.getFullYear(),
                    subscriptionFormData.renewalDate.getMonth(),
                    subscriptionFormData.renewalDate.getDate(),
               ),
               currency: subscriptionFormData.currency,
          };
          return [...subscriptionData, formInputSubscription];
     } else return undefined;
}

function Home() {
     const navigate = useNavigate();
     const [notification, triggerNotification] = useNotification();

     const [
          subscriptionFormData,
          formDataisValid,
          { formChangeHandler, freeTrialSliderHandler, emailSliderHandler, selectChangeFunctionHandler },
     ] = useSubscriptionForm(navigate);

     const [dataPosted, subscriptionFormSubmitHandler] = usePostSubscriptionData(
          subscriptionFormData,
          formDataisValid,
          triggerNotification,
     );

     const [subscriptionData, userData, { deleteSubscription, postPrefferedUserCurrency, stopSubscription }] =
          useFetchSubscriptions(dataPosted, triggerNotification, navigate);

     const [currencyAdjustedSubData] = useCurrency(subscriptionData, userData.preferredCurrency);

     const extendedSubscriptionData = addFormValuesToSubscription(subscriptionData, subscriptionFormData);
     const areaExtended = extendedSubscriptionData ? getChartDataYear(extendedSubscriptionData, 2024) : undefined;
     const chartArea = getChartDataYear(subscriptionData, new Date().getFullYear());
     const predictedExpenses =
          extendedSubscriptionData && calculatePredictedExpensesYear(subscriptionData, subscriptionFormData);
     const expenses = calculatePredictedExpensesYear(subscriptionData);

     useEffect(() => {
          if (dataPosted !== 0) {
               setTimeout(() => {
                    navigate('/');
               }, 4000);
          }
     }, [dataPosted]);

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
                         <Route
                              path="/settings"
                              element={
                                   <MySettings
                                        email={userData.email}
                                        triggerNotification={triggerNotification}
                                        userColorData={userData.userColorData && userData.userColorData}
                                   ></MySettings>
                              }
                         ></Route>
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
                                        preferredCurrency={userData.preferredCurrency}
                                        areaDiffChartData={areaExtended && areaExtended}
                                        areaChartData={chartArea && chartArea}
                                        newExpenseAmount={predictedExpenses}
                                        expenses={expenses}
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
                              path="/insights"
                              element={
                                   <Insights
                                        userColorData={userData.userColorData}
                                        subscriptionsData={currencyAdjustedSubData}
                                   ></Insights>
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
                                        handleUnsubscribe={stopSubscription}
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
