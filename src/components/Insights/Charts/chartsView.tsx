import './chartsView.css';
import { Subscription } from '../../MySubscriptions/Mysubscriptions';
import { useEffect, useState } from 'react';
import { getChartDataAllYears, getChartDataYear } from '../../../utility/subscription.utility';
import AreaYearChart from '../../charts/AreaYearChart';

type ChartsViewProps = {
     subscriptionData: Subscription[];
};

type ChartAreaYearData = {
     month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
     totalCostForMonth: number;
};

type ChartYearData = {
     year: number;
     totalCostForYear: number;
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

export default function ChartsView(props: ChartsViewProps) {
     const [selectedYear, setSelectedYear] = useState('all' as number | 'all');
     const [selectedSubscription, setSelectedSubscription] = useState('all');

     let chartAreaData = [];

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
          } else {
               chartAreaData = getChartDataYear(props.subscriptionData, selectedYear);
          }
     } else {
          if (filteredDataBySubscription.length > 0) {
               chartAreaData = getChartDataAllYears(filteredDataBySubscription);
          } else {
               chartAreaData = getChartDataAllYears(props.subscriptionData);
          }
     }

     function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const { name, value } = event.target;
          if (name === 'timeFrame') {
               if (value === 'all') setSelectedYear('all');
               else setSelectedYear(parseInt(value));
          } else if (name === 'subscription') {
               setSelectedSubscription(value);
          }
     }

     return (
          <div>
               <div>
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
                    <label htmlFor="subscription-select">Selected subscription</label>
                    <select id="subscription-select" name="subscription" onChange={handleSelectChange}>
                         <option value="all">All</option>
                         {props.subscriptionData.map((subscription) => (
                              <option key={subscription.id} value={subscription.id}>
                                   {subscription.subscriptionName}
                              </option>
                         ))}
                    </select>
               </div>
               <div className="insights-charts-container">
                    <div className="insights-chart insights-chart-big">
                         <AreaYearChart chartData={chartAreaData} timeFrame={selectedYear}></AreaYearChart>
                    </div>
                    <div className="insights-chart"></div>
                    <div className="insights-chart"></div>
               </div>
          </div>
     );
}
