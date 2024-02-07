import './chartsView.css';
import { Subscription } from '../../MySubscriptions/Mysubscriptions';
import { useState } from 'react';
import {
     getCategoryDataAllYears,
     getChartCategoryDataYear,
     getChartDataAllYears,
     getChartDataYear,
} from '../../../utility/subscription.utility';
import AreaYearChart from '../../charts/AreaYearChart';
import PieCategoryChart from '../../charts/PieCategoryChart';
import BarChartAllYears from '../../charts/BarChartAllYears';

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

export default function ChartsView(props: ChartsViewProps) {
     const [selectedYear, setSelectedYear] = useState('all' as number | 'all');
     const [selectedSubscription, setSelectedSubscription] = useState('all');
     const [selectedCategory, setSelectedCategory] = useState('all' as subscriptionCategories | 'all');

     let chartAreaData = [];
     let chartPieData = [] as ChartYearCategoryData[];
     let totalAmountPaid = 0;
     let biggestCategory = {} as ChartYearCategoryData;

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
               if (pieChartData) {
                    chartPieData = pieChartData;
                    biggestCategory = getBiggestCategoryYear(pieChartData);
               }
          } else {
               chartAreaData = getChartDataYear(props.subscriptionData, selectedYear);
               const pieChartData = getChartCategoryDataYear(filteredDataBySubscription, selectedYear);
               totalAmountPaid = getTotalAmountYear(chartAreaData);
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
          } else {
               chartAreaData = getChartDataAllYears(props.subscriptionData);
               chartPieData = getCategoryDataAllYears(props.subscriptionData);
               totalAmountPaid = getTotalAmountAllYears(chartAreaData);
               biggestCategory = getBiggestCategoryAllYears(chartPieData);
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
                         <h3>
                              <span>Total paid for subscriptions</span>
                              <span>{Math.round(totalAmountPaid * 100) / 100}</span>
                         </h3>
                         <h3>
                              <span>Category most payed for is {biggestCategory && biggestCategory.name}</span>
                              <span>{biggestCategory && biggestCategory.totalCost}</span>
                         </h3>
                         <h3>
                              <span>Subscription most payed for</span>
                              <span></span>
                         </h3>
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
