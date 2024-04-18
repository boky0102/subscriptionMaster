import './chartsView.css';
import { Subscription } from '../../../components/MySubscriptions/Mysubscriptions';
import { useState } from 'react';
import { filterSubscriptionData, calculateChartData } from '../../../utility/subscription.utility';
import AreaYearChart from '../../../components/charts/AreaYearChart';
import PieCategoryChart from '../../../components/charts/PieCategoryChart';
import BarChartAllYears from '../../../components/charts/BarChartAllYears';
import InfoDisplay from '../../../components/InfoDisplay/InfoDisplay';
import { UserColorData, subscriptionCategories } from '../../../types';

type ChartsViewProps = {
     subscriptionData: Subscription[];
     userColors: UserColorData;
};

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
          'Streaming',
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

export default function ChartsView(props: ChartsViewProps) {
     const [selectedYear, setSelectedYear] = useState('all' as number | 'all');
     const [selectedSubscription, setSelectedSubscription] = useState('all');
     const [selectedCategory, setSelectedCategory] = useState('all' as subscriptionCategories | 'all');

     const categories = getCategories();

     const filteredDataBySubscription = filterSubscriptionData(
          props.subscriptionData,
          selectedSubscription,
          selectedCategory,
     );

     const { chartAreaData, chartPieData, totalAmountPaid, biggestCategory, biggestSubscription, averageMonthly } =
          calculateChartData(filteredDataBySubscription, selectedYear);

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
