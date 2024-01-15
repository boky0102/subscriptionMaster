import './chartsView.css';
import { Subscription } from '../../MySubscriptions/Mysubscriptions';
import { useState } from 'react';
import { getChartDataYear } from '../../../utility/subscription.utility';
import AreaYearChart from '../../charts/AreaYearChart';

type ChartsViewProps = {
     subscriptionData: Subscription[];
};

type ChartAreaYearData = {
     month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
     totalCostForMonth: number;
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
     const [selectedYear, setSelectedYear] = useState(1);
     const [selectedSubscription, setSelectedSubscription] = useState('all');

     let chartAreaData: ChartAreaYearData[] = [];

     if (selectedYear !== 1) {
          chartAreaData = getChartDataYear(props.subscriptionData, selectedYear);
     }

     function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const { name, value } = event.target;
          if (name === 'timeFrame') {
               setSelectedYear(parseInt(value));
          } else if (name === 'subscription') {
               setSelectedSubscription(value);
          }
     }

     return (
          <div>
               <div>
                    <label htmlFor="time-frame-select">Time frame</label>
                    <select id="time-frame-select" name="timeFrame" onChange={handleSelectChange}>
                         <option value={1}>All time</option>
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
                         <AreaYearChart chartData={chartAreaData}></AreaYearChart>
                    </div>
                    <div className="insights-chart"></div>
                    <div className="insights-chart"></div>
               </div>
          </div>
     );
}
