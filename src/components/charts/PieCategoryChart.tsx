import { Cell, LabelList, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from './PieTooltip';

type subscriptionCategories =
     | 'Streaming service'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

type ChartYearCategoryData = {
     name: subscriptionCategories;
     totalCost: number;
};

type PieChartProps = {
     chartData: ChartYearCategoryData[];
};

export default function PieCategoryChart(props: PieChartProps) {
     const COLORS = ['#7E57F2', '#F073BE', '#63ABFA', '#EDA751', '#79F56E', '#F4F570', '#F5DE6C', '#59F5CA'];

     return (
          <ResponsiveContainer width={'100%'} height={300}>
               <PieChart width={400} height={400}>
                    <Pie data={props.chartData} dataKey={'totalCost'} outerRadius={135}>
                         {props.chartData.map((entry, index) => {
                              return <Cell key={entry.name} fill={COLORS[index]}></Cell>;
                         })}
                         <LabelList dataKey={'category'} position={'outside'} fill={'#cccccc'}></LabelList>
                    </Pie>
                    <LabelList values={'category'}></LabelList>
                    <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
               </PieChart>
          </ResponsiveContainer>
     );
}
