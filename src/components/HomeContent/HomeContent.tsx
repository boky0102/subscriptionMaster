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

interface Subscription {
     id: string;
     subscriptionName: string;
     chargeAmount: number;
     renewalDate: Date;
     dateAdded: Date;
     freeTrial: boolean;
     category: subscriptionCategories;
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

type Months = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';

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

     function getChartDataYear(subscriptionData: Subscription[], year: number) {
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth();
          const currentDay = new Date().getDay();
          const months: Months[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const chartYearDataArray: ChartData[] = [];
          if (subscriptionData) {
               months.forEach((month, index) => {
                    let totalMonthCost = 0;
                    subscriptionData.forEach((subscription) => {
                         if (subscription.subscriptionStopped) {
                              if (
                                   subscription.dateAdded.getFullYear() < year &&
                                   year < subscription.subscriptionStopped.getFullYear()
                              ) {
                                   totalMonthCost += subscription.chargeAmount;
                              } else if (subscription.dateAdded.getFullYear() === year) {
                                   if (
                                        subscription.dateAdded.getMonth() < index &&
                                        subscription.dateAdded.getMonth() < subscription.subscriptionStopped.getMonth()
                                   ) {
                                        totalMonthCost += subscription.chargeAmount;
                                   } else if (subscription.dateAdded.getMonth() === index) {
                                        if (
                                             subscription.dateAdded.getDay() <= currentDay &&
                                             subscription.dateAdded.getDay() < subscription.subscriptionStopped.getDay()
                                        ) {
                                             totalMonthCost += subscription.chargeAmount;
                                        }
                                   }
                              }
                              console.log(
                                   'STOP SUBSCRIPTION',
                                   subscription.subscriptionName,
                                   '   ',
                                   months[index],
                                   ': ',
                                   totalMonthCost,
                              );
                         } else {
                              if (subscription.dateAdded.getFullYear() < year) {
                                   totalMonthCost += subscription.chargeAmount;
                              } else if (subscription.dateAdded.getFullYear() === year) {
                                   if (subscription.dateAdded.getMonth() < index) {
                                        totalMonthCost += subscription.chargeAmount;
                                   } else if (subscription.dateAdded.getMonth() === index) {
                                        if (subscription.dateAdded.getDay() <= currentDay) {
                                             totalMonthCost += subscription.chargeAmount;
                                        }
                                   }
                              }
                         }
                    });

                    const monthChartData: ChartData = {
                         month: month,
                         totalCostForMonth: totalMonthCost,
                    };

                    if (currentYear === year) {
                         if (currentMonth >= index) {
                              chartYearDataArray.push(monthChartData);
                         }
                    } else if (currentYear !== year) {
                         chartYearDataArray.push(monthChartData);
                    }
               });
          }
          return chartYearDataArray;
     }

     function getChartCategoryDataYear(subscriptionData: Subscription[], year: number) {
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth();
          const currentDay = new Date().getDay();
          const months: Months[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const categories: subscriptionCategories[] = [
               'Streaming service',
               'Gaming',
               'Clothing',
               'Food',
               'Utility',
               'Education',
               'Software',
               'Other',
          ];

          const chartYearCategoryDataArray: ChartYearCategoryData[] = [];
          if (subscriptionData) {
               let totalCostAllCategories = 0;
               categories.forEach((category) => {
                    let totalCostYear = 0;
                    months.forEach((month, index) => {
                         let totalMonthCost = 0;
                         subscriptionData.forEach((subscription) => {
                              if (subscription.category === category) {
                                   if (subscription.dateAdded.getFullYear() < year) {
                                        totalMonthCost += subscription.chargeAmount;
                                   } else if (subscription.dateAdded.getFullYear() === year) {
                                        if (subscription.dateAdded.getMonth() < index) {
                                             totalMonthCost += subscription.chargeAmount;
                                        } else if (subscription.dateAdded.getMonth() === index) {
                                             if (subscription.dateAdded.getDay() <= currentDay) {
                                                  totalMonthCost += subscription.chargeAmount;
                                             }
                                        }
                                   }
                              }
                         });

                         if (currentYear === year) {
                              if (currentMonth >= index) {
                                   totalCostYear += totalMonthCost;
                              }
                         } else if (currentYear !== year) {
                              totalCostYear += totalMonthCost;
                         }
                    });

                    totalCostAllCategories += totalCostYear;
                    const categoryData: ChartYearCategoryData = {
                         name: category,
                         totalCost: totalCostYear,
                    };
                    if (totalCostYear !== 0) {
                         chartYearCategoryDataArray.push(categoryData);
                    }
               });
               const returnArray = chartYearCategoryDataArray.map((category) => {
                    const mapObject: ChartYearCategoryData = {
                         name: category.name,
                         totalCost: category.totalCost,
                         percentage: (category.totalCost / totalCostAllCategories) * 100,
                    };
                    return mapObject;
               });
               return returnArray;
          }
     }

     function getChartDataAllYears(subscriptionData: Subscription[]) {
          const currentYear = new Date().getFullYear();
          let lowestYear = currentYear;
          if (subscriptionData) {
               subscriptionData.forEach((subscription) => {
                    if (subscription.dateAdded.getFullYear() < lowestYear) {
                         lowestYear = subscription.dateAdded.getFullYear();
                    }
               });
          }
          const chartYearData: ChartYearData[] = [];
          for (let j = lowestYear; j <= currentYear; j++) {
               let yearTotalCost = 0;
               const yearCostByMonths = getChartDataYear(subscriptionData, j);
               if (yearCostByMonths) {
                    yearCostByMonths.forEach((month) => {
                         yearTotalCost += month.totalCostForMonth;
                    });
               }
               const iterationYearData: ChartYearData = {
                    year: j,
                    totalCostForYear: yearTotalCost,
               };
               chartYearData.push(iterationYearData);
          }
          return chartYearData;
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
                              <div>
                                   <select onChange={handleChartTypeChange} name="chartType">
                                        <option value="all-time">ALL TIME GRAPH</option>
                                        <option value="year">YEAR CHART</option>
                                   </select>
                              </div>
                         </div>
                    </div>
                    <div className="chart-container chart-container-pie">
                         <div className="chart">
                              <PieCategoryChart chartData={chartCategoryYearData}></PieCategoryChart>
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
