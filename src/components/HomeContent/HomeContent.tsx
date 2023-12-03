import './HomeContent.css';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import { UserData } from '../Main/Home';
import { Link } from 'react-router-dom';
import { Notification } from '../Main/Home';
import { useEffect, useState } from 'react';
import '../../assets/arrow-left.svg';
import ArrowIcon from '../ArrowIcon/ArrowIcon';
import AreaYearChart from '../charts/AreaYearChart';
import BarChartAllYears from '../charts/BarChartAllYears';
import SubscriptionTypeSelect from '../SubscriptionTypeSelect.tsx/SubscriptionTypeSelect';
import PieCategoryChart from '../charts/PieCategoryChart';
import { CategoryColor } from '../CategoryColor.tsx/CategoryColor';
import { getChartCategoryDataYear, getChartDataAllYears, getChartDataYear } from '../../utility/subscription.utility';
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

type HomeContentProps = {
     subscriptionData: Subscription[];
     userData: UserData;
     notificationTrigger: (message: Notification['message'], type: Notification['notificationType']) => void;
     handleDeleteClick: (subscriptionId: string) => void;
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
     | 'Streaming service'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

type FilterStates = 'all' | 'free-trial' | 'subscription';

export default function HomeContent(props: HomeContentProps) {
     const [chartData, setChartData] = useState([] as ChartData[]);
     const [chartYearData, setChartYearData] = useState([] as ChartYearData[]);
     const [chartCategoryYearData, setChartCategoryYearData] = useState([] as ChartYearCategoryData[]);
     const currentYear = new Date().getFullYear();
     const [selectedYear, setSelectedYear] = useState(currentYear);
     const [chartType, setChartType] = useState('year');
     const [filterState, setFilterState] = useState('all' as FilterStates);
     const [filteredSubscriptionData, setFilteredSubscriptionData] = useState(props.subscriptionData as Subscription[]);

     console.log(currencies);

     useEffect(() => {
          let currency: keyof typeof currencies;

          for (currency in currencies) {
               const currentCurrency = currencies[currency];
               console.log(currentCurrency.name);
          }
     }, []);

     function handleRightArrowClick() {
          setSelectedYear((year) => year + 1);
     }

     function handleLeftArrowClick() {
          setSelectedYear((year) => year - 1);
     }

     function handleChartTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const value = event.target.value;
          setChartType(value);
     }

     useEffect(() => {
          setChartData([]);
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

     useEffect(() => {
          if (filterState === 'free-trial') {
               setFilteredSubscriptionData(() => {
                    const returnArray = props.subscriptionData.filter((subscription) => {
                         console.log(subscription.freeTrial);
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
          console.log(props.subscriptionData);
     }, [filterState, props.subscriptionData]);

     return (
          <>
               <div className="subscriptions-container">
                    <SubscriptionTypeSelect
                         handleAllChange={handleAllFilter}
                         handleFreeTrialChange={handleFreeTrialFilter}
                         handleSubscriptionsChange={handleSubscriptionFilter}
                         filterState={filterState}
                    ></SubscriptionTypeSelect>
                    <div className="subscriptions-cards-container">
                         {filteredSubscriptionData.map((subscription) => (
                              <SubscriptionCard
                                   handleDeleteClick={props.handleDeleteClick}
                                   notificationTrigger={props.notificationTrigger}
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
                         {chartType === 'year' && <AreaYearChart chartData={chartData}></AreaYearChart>}
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
                                   props.userData.userColorData.map((category) => (
                                        <CategoryColor
                                             name={category.category}
                                             color={category.color}
                                             key={category.color}
                                        ></CategoryColor>
                                   ))}
                         </div>
                    </div>
               </div>
          </>
     );
}
