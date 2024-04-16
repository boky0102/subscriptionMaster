import './HomeContent.css';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import { UserData } from '../Main/Home';
import { Link } from 'react-router-dom';
import { Notification } from '../../utility/custom-hooks/notification.hooks';
import { useEffect, useState } from 'react';
import '../../assets/arrow-left.svg';
import ArrowIcon from '../ArrowIcon/ArrowIcon';
import AreaYearChart from '../charts/AreaYearChart';
import BarChartAllYears from '../charts/BarChartAllYears';
import SubscriptionTypeSelect from '../SubscriptionTypeSelect.tsx/SubscriptionTypeSelect';
import PieCategoryChart from '../charts/PieCategoryChart';
import { CategoryColor } from '../CategoryColor.tsx/CategoryColor';
import {
     filterSubscriptionData,
     getChartCategoryDataYear,
     getChartDataAllYears,
     getChartDataYear,
} from '../../utility/subscription.utility';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import { CurrenciesObj } from '../../types';

interface Subscription {
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

type HomeContentProps = {
     subscriptionData: Subscription[];
     userData: UserData;
     notificationTrigger: (message: Notification['message'], type: Notification['notificationType']) => void;
     handleDeleteClick: (subscriptionId: string) => void;
     handleCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
     handleUnsubscribe: (subscriptionId: string) => void;
     currentCurrency: keyof CurrenciesObj;
};

type ChartData = {
     month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
     totalCostForMonth: number;
};

type ChartYearData = {
     year: number;
     totalCostForYear: number;
};

type ChartYearCategoryData = {
     name: subscriptionCategories;
     totalCost: number;
     percentage?: number;
};

type subscriptionCategories =
     | 'Streaming'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

type FilterStates = 'all' | 'free-trial' | 'subscription';

function filterSubscriptions(subscriptionData: Subscription[], filterRule: FilterStates) {
     if (filterRule === 'all') {
          return subscriptionData.filter((subscription) => !subscription.subscriptionStopped);
     } else if (filterRule === 'free-trial') {
          return subscriptionData.filter((subscription) => subscription.freeTrial && !subscription.subscriptionStopped);
     } else {
          return subscriptionData.filter(
               (subscription) => !subscription.freeTrial && !subscription.subscriptionStopped,
          );
     }
}

export default function HomeContent(props: HomeContentProps) {
     const [chartData, setChartData] = useState([] as ChartData[]);
     const [chartYearData, setChartYearData] = useState([] as ChartYearData[]);
     const [chartCategoryYearData, setChartCategoryYearData] = useState([] as ChartYearCategoryData[]);
     const currentYear = new Date().getFullYear();
     const [selectedYear, setSelectedYear] = useState(currentYear);
     const [chartType, setChartType] = useState('year');
     const [filterState, setFilterState] = useState('all' as FilterStates);
     /* const [filteredSubscriptionData, setFilteredSubscriptionData] = useState(props.subscriptionData as Subscription[]); */

     function handleRightArrowClick() {
          if (selectedYear < currentYear) {
               setSelectedYear((year) => year + 1);
          }
     }

     function handleLeftArrowClick() {
          setSelectedYear((year) => year - 1);
     }

     function handleChartTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const value = event.target.value;
          setChartType(value);
     }

     useEffect(() => {
          const chartDataArray = getChartDataYear(props.subscriptionData, selectedYear);
          setChartData(chartDataArray);
          const chartAllyearsData = getChartDataAllYears(props.subscriptionData);
          setChartYearData(chartAllyearsData);
          const chartCategoryData = getChartCategoryDataYear(props.subscriptionData, selectedYear);
          if (chartCategoryData) {
               setChartCategoryYearData(chartCategoryData);
          }
     }, [props.subscriptionData, selectedYear, chartType]);

     function handleFreeTrialFilter() {
          setFilterState('free-trial');
     }

     function handleAllFilter() {
          setFilterState('all');
     }

     function handleSubscriptionFilter() {
          setFilterState('subscription');
     }

     const filteredSubscriptionData = filterSubscriptions(props.subscriptionData, filterState);

     /* useEffect(() => {
          if (filterState === 'free-trial') {
               setFilteredSubscriptionData(() => {
                    const returnArray = props.subscriptionData.filter((subscription) => {
                         if (subscription.freeTrial === true && !subscription.subscriptionStopped) {
                              return subscription;
                         }
                    });
                    return returnArray;
               });
          } else if (filterState === 'subscription') {
               setFilteredSubscriptionData(() => {
                    const returnArray = props.subscriptionData.filter((subscription) => {
                         if (subscription.freeTrial !== true && !subscription.subscriptionStopped) {
                              return subscription;
                         }
                    });
                    return returnArray;
               });
          } else if (filterState === 'all') {
               setFilteredSubscriptionData(() => {
                    const returnArray = props.subscriptionData.filter((subscription) => {
                         if (!subscription.subscriptionStopped) {
                              return subscription;
                         }
                    });
                    return returnArray;
               });
          }
     }, [filterState, props.subscriptionData]); */

     return (
          <>
               <div className="subscriptions-container">
                    <div className="top-tooltip-container">
                         <div className="subscriptions-type-select">
                              <SubscriptionTypeSelect
                                   handleAllChange={handleAllFilter}
                                   handleFreeTrialChange={handleFreeTrialFilter}
                                   handleSubscriptionsChange={handleSubscriptionFilter}
                                   filterState={filterState}
                              ></SubscriptionTypeSelect>
                         </div>

                         <div>
                              <CurrencySelect
                                   handleCurrencySelectChange={props.handleCurrencyChange}
                                   currentCurrency={props.currentCurrency}
                              ></CurrencySelect>
                         </div>
                    </div>

                    <div className="subscriptions-cards-container">
                         {filteredSubscriptionData.map((subscription) => (
                              <SubscriptionCard
                                   handleDeleteClick={props.handleDeleteClick}
                                   notificationTrigger={props.notificationTrigger}
                                   handleStopSubscription={props.handleUnsubscribe}
                                   subscription={subscription}
                                   key={subscription.id}
                                   id={subscription.id}
                              ></SubscriptionCard>
                         ))}
                    </div>
               </div>
               <div className="widget-container">
                    {props.userData.email === undefined && (
                         <div>
                              Email address isn't set up. Please go to{' '}
                              <Link to="/home/settings" className="widget-link">
                                   SETTINGS
                              </Link>{' '}
                              and setup email so you can recieve notificaitons.
                         </div>
                    )}
                    <div className="chart-container">
                         {chartType === 'year' && (
                              <AreaYearChart
                                   chartData={chartData}
                                   height={200}
                                   timeFrame={selectedYear}
                              ></AreaYearChart>
                         )}
                         {chartType === 'all-time' && <BarChartAllYears chartData={chartYearData}></BarChartAllYears>}

                         <div className="chart-action-container">
                              <div className="year-select-container">
                                   <ArrowIcon
                                        className="arrow-icon"
                                        direction="left"
                                        color={'#17BEBB'}
                                        handleClick={() => handleLeftArrowClick()}
                                   ></ArrowIcon>
                                   <span>{selectedYear}</span>
                                   <ArrowIcon
                                        className="arrow-icon"
                                        direction="right"
                                        color={'#17BEBB'}
                                        handleClick={() => handleRightArrowClick()}
                                   ></ArrowIcon>
                              </div>

                              <div className="chart-type-select-container">
                                   <select
                                        onChange={handleChartTypeChange}
                                        name="chartType"
                                        className="data-select-item"
                                   >
                                        <option value="year">YEAR CHART</option>
                                        <option value="all-time">ALL TIME GRAPH</option>
                                   </select>
                              </div>
                         </div>
                    </div>
                    <div className="chart-container chart-container-pie">
                         <div className="chart">
                              <PieCategoryChart
                                   chartData={chartCategoryYearData}
                                   userColors={props.userData.userColorData}
                              ></PieCategoryChart>
                         </div>

                         <div className="categories-container">
                              {props.userData.userColorData !== undefined &&
                                   (Object.keys(props.userData.userColorData) as Array<subscriptionCategories>).map(
                                        (categoryKey) => (
                                             <CategoryColor
                                                  name={categoryKey}
                                                  color={props.userData.userColorData[categoryKey]}
                                                  key={props.userData.userColorData[categoryKey]}
                                             ></CategoryColor>
                                        ),
                                   )}
                         </div>
                    </div>
               </div>
          </>
     );
}
