import './chartsView.css';
import { Subscription } from '../../MySubscriptions/Mysubscriptions';
import { useState } from 'react';
import {
     getCategoryDataAllYears,
     getChartCategoryDataYear,
     getChartDataAllYears,
     getChartDataYear,
     getSingleSubscriptionData,
     getSingleSubscriptionDataYear,
} from '../../../utility/subscription.utility';
import AreaYearChart from '../../charts/AreaYearChart';
import PieCategoryChart from '../../charts/PieCategoryChart';
import BarChartAllYears from '../../charts/BarChartAllYears';
import InfoDisplay from '../../InfoDisplay/InfoDisplay';

type UserColorData = {
     category: subscriptionCategories;
     color: string;
};

type ChartsViewProps = {
     subscriptionData: Subscription[];
     userColors?: UserColorData[];
};

type ChartYearCategoryData = {
     name: subscriptionCategories;
     totalCost: number;
     percentage?: number;
};

type ChartYearData = {
     year: number;
     totalCostForYear: number;
};

type ChartData = {
     month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
     totalCostForMonth: number;
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

interface SubscriptionExtended extends Subscription {
     totalPaid: number;
}

function getAllYears() {
     let currentYear = new Date().getFullYear();
     const yearsArray = [];
     while (currentYear !== 1970) {
          yearsArray.push(currentYear);
          currentYear--;
     }
     return yearsArray;
}

function getCategories() {
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

     return categories;
}

function getTotalAmountAllYears(data: ChartYearData[]) {
     let sum = 0;
     data.forEach((entry) => {
          sum += entry.totalCostForYear;
     });
     return sum;
}

function getTotalAmountYear(data: ChartData[]) {
     let sum = 0;
     data.forEach((month) => {
          sum += month.totalCostForMonth;
     });

     return sum;
}

function getBiggestCategoryYear(data: ChartYearCategoryData[]) {
     let biggest = data[0];
     data.forEach((category) => {
          if (category.totalCost > biggest.totalCost) {
               biggest = category;
          }
     });
     return biggest;
}

function getBiggestCategoryAllYears(data: ChartYearCategoryData[]) {
     let biggest = data[0];
     data.forEach((category) => {
          if (category.totalCost > biggest.totalCost) {
               biggest = category;
          }
     });
     return biggest;
}

function getHighestSubscriptionYear(data?: Subscription[], year: number) {
     let highestSubscription = {
          totalPaid: 0,
     } as SubscriptionExtended;
     if (data) {
          data.forEach((subscription) => {
               const totalPaid = getSingleSubscriptionDataYear(subscription, year);
               if (totalPaid > highestSubscription.totalPaid) {
                    highestSubscription = {
                         ...subscription,
                         totalPaid: totalPaid,
                    };
               }
          });
          return highestSubscription;
     }

     return undefined;
}

function getHighestSubscriptionAllYears(data?: Subscription[]) {
     let highestSubscription = {
          totalPaid: 0,
     } as SubscriptionExtended;
     if (data) {
          data.forEach((subscription) => {
               const totalPaid = getSingleSubscriptionData(subscription);
               if (totalPaid > highestSubscription.totalPaid) {
                    highestSubscription = {
                         ...subscription,
                         totalPaid: totalPaid,
                    };
               }
          });
          return highestSubscription;
     }

     return undefined;
}

function getAverageMonthlyCost(totalAmountPaid: number, timeFrame: 'all' | number, subscriptions: Subscription[]) {
     if (timeFrame === 'all') {
          let passedMonths = 0;
          let startingDate = new Date();
          const currentDate = new Date();
          subscriptions.forEach((subscription) => {
               if (subscription.dateAdded < startingDate) {
                    startingDate = new Date(
                         subscription.dateAdded.getFullYear(),
                         subscription.dateAdded.getMonth(),
                         subscription.dateAdded.getDate(),
                    );
               }
          });
          while (startingDate < currentDate) {
               startingDate = new Date(startingDate.getFullYear(), startingDate.getMonth() + 1, startingDate.getDate());
               passedMonths++;
          }
          console.log('passed', passedMonths);
          return totalAmountPaid / passedMonths;
     }
}

export default function ChartsView(props: ChartsViewProps) {
     const [selectedYear, setSelectedYear] = useState('all' as number | 'all');
     const [selectedSubscription, setSelectedSubscription] = useState('all');
     const [selectedCategory, setSelectedCategory] = useState('all' as subscriptionCategories | 'all');

     let chartAreaData = [];
     let chartPieData = [] as ChartYearCategoryData[];
     let totalAmountPaid = 0;
     let biggestCategory = {} as ChartYearCategoryData;
     let biggestSubscription = {} as SubscriptionExtended | undefined;
     let averageMonthly = 0 as number | undefined;

     const categories = getCategories();

     let filteredDataBySubscription = [] as Subscription[];
     if (selectedSubscription !== 'all') {
          filteredDataBySubscription = props.subscriptionData.filter((subscription) => {
               if (subscription.id === selectedSubscription) {
                    return subscription;
               }
          });
     } else {
          filteredDataBySubscription = [...props.subscriptionData];
     }

     if (selectedYear !== 1 && selectedYear !== 'all') {
          if (filteredDataBySubscription.length > 0) {
               chartAreaData = getChartDataYear(filteredDataBySubscription, selectedYear);
               const pieChartData = getChartCategoryDataYear(filteredDataBySubscription, selectedYear);
               totalAmountPaid = getTotalAmountYear(chartAreaData);
               biggestSubscription = getHighestSubscriptionYear(filteredDataBySubscription, selectedYear);
               if (pieChartData) {
                    chartPieData = pieChartData;
                    biggestCategory = getBiggestCategoryYear(pieChartData);
               }
          } else {
               chartAreaData = getChartDataYear(props.subscriptionData, selectedYear);
               const pieChartData = getChartCategoryDataYear(filteredDataBySubscription, selectedYear);
               totalAmountPaid = getTotalAmountYear(chartAreaData);
               biggestSubscription = getHighestSubscriptionYear(props.subscriptionData, selectedYear);
               if (pieChartData) {
                    chartPieData = pieChartData;
                    biggestCategory = getBiggestCategoryYear(pieChartData);
               }
          }
     } else {
          if (filteredDataBySubscription.length > 0) {
               chartAreaData = getChartDataAllYears(filteredDataBySubscription);
               chartPieData = getCategoryDataAllYears(filteredDataBySubscription);
               totalAmountPaid = getTotalAmountAllYears(chartAreaData);
               biggestCategory = getBiggestCategoryAllYears(chartPieData);
               biggestSubscription = getHighestSubscriptionAllYears(filteredDataBySubscription);
               averageMonthly = getAverageMonthlyCost(totalAmountPaid, 'all', filteredDataBySubscription);
          } else {
               chartAreaData = getChartDataAllYears(props.subscriptionData);
               chartPieData = getCategoryDataAllYears(props.subscriptionData);
               totalAmountPaid = getTotalAmountAllYears(chartAreaData);
               biggestCategory = getBiggestCategoryAllYears(chartPieData);
               biggestSubscription = getHighestSubscriptionAllYears(props.subscriptionData);
               averageMonthly = getAverageMonthlyCost(totalAmountPaid, 'all', props.subscriptionData);
          }
     }

     function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const { name, value } = event.target;
          if (name === 'timeFrame') {
               if (value === 'all') setSelectedYear('all');
               else setSelectedYear(parseInt(value));
          } else if (name === 'subscription') {
               setSelectedSubscription(value);
          } else if (name === 'category') {
               setSelectedCategory(value as subscriptionCategories | 'all');
          }
     }

     return (
          <div>
               <div className="insight-toolbar-info-container">
                    <div className="insight-toolbar">
                         <label htmlFor="time-frame-select">Time frame</label>
                         <select id="time-frame-select" name="timeFrame" onChange={handleSelectChange}>
                              <option value={'all'}>All time</option>
                              {getAllYears().map((year) => {
                                   return (
                                        <option key={year} value={year}>
                                             {year}
                                        </option>
                                   );
                              })}
                         </select>
                         <label htmlFor="subscription-select">Subscription</label>
                         <select id="subscription-select" name="subscription" onChange={handleSelectChange}>
                              <option value="all">All</option>
                              {selectedCategory === 'all'
                                   ? props.subscriptionData.map((subscription) => (
                                          <option key={subscription.id} value={subscription.id}>
                                               {subscription.subscriptionName}
                                          </option>
                                     ))
                                   : props.subscriptionData.map((subscription) => {
                                          if (subscription.category === selectedCategory) {
                                               return (
                                                    <option key={subscription.id} value={subscription.id}>
                                                         {subscription.subscriptionName}
                                                    </option>
                                               );
                                          }
                                     })}
                         </select>
                         <label htmlFor="category-select">Category</label>
                         <select id="category-select" name="category" onChange={handleSelectChange}>
                              <option value="all">All</option>
                              {categories.map((category) => (
                                   <option key={category} value={category}>
                                        {category}
                                   </option>
                              ))}
                         </select>
                    </div>
                    <div className="insights-info-bar">
                         <InfoDisplay header="Total paid" amount={totalAmountPaid && totalAmountPaid}></InfoDisplay>
                         <InfoDisplay
                              header="Highest Category"
                              amount={biggestCategory && biggestCategory.totalCost}
                              amountHeader={biggestCategory && biggestCategory.name}
                         ></InfoDisplay>
                         <InfoDisplay
                              header="Highest Subscription"
                              amount={biggestSubscription && biggestSubscription.totalPaid}
                              amountHeader={biggestSubscription && biggestSubscription.subscriptionName}
                         ></InfoDisplay>
                         <InfoDisplay
                              header="Average Monthly Cost"
                              amount={averageMonthly && averageMonthly}
                         ></InfoDisplay>
                    </div>
               </div>
               <div className="insights-charts-container">
                    <div className="insights-chart insights-chart-big">
                         <AreaYearChart chartData={chartAreaData} timeFrame={selectedYear}></AreaYearChart>
                    </div>
                    <div className="insights-chart insights-chart-outer">
                         <PieCategoryChart chartData={chartPieData} userColors={props.userColors}></PieCategoryChart>
                    </div>
                    <div className="insights-chart insights-chart-big insights-chart-category">
                         <BarChartAllYears
                              chartData={chartPieData}
                              categoryData={true}
                              userColorData={props.userColors}
                         ></BarChartAllYears>
                    </div>
               </div>
          </div>
     );
}
