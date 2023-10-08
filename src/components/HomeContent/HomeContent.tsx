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

interface Subscription {
     id: string;
     subscriptionName: string;
     chargeAmount: number;
     renewalDate: Date;
     dateAdded: Date;
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

type Months = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';

export default function HomeContent(props: HomeContentProps) {
     const [chartData, setChartData] = useState([] as ChartData[]);
     const [chartYearData, setChartYearData] = useState([] as ChartYearData[]);
     const currentYear = new Date().getFullYear();
     const [selectedYear, setSelectedYear] = useState(currentYear);
     const [chartType, setChartType] = useState('year');

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
     }, [props.subscriptionData, selectedYear, chartType]);

     useEffect(() => {
          console.log(chartYearData);
     }, [chartYearData]);

     return (
          <>
               <div className="subscriptions-container">
                    {props.subscriptionData.map((subscription) => (
                         <SubscriptionCard
                              handleDeleteClick={props.handleDeleteClick}
                              notificationTrigger={props.notificationTrigger}
                              subscription={subscription}
                              key={subscription.id}
                              id={subscription.id}
                         ></SubscriptionCard>
                    ))}
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
               </div>
          </>
     );
}
