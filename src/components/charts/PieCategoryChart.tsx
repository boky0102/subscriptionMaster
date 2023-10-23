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
     percentage?: number;
};

type categoryColor = {
     category: subscriptionCategories;
     color: string;
};

type PieChartProps = {
     chartData: ChartYearCategoryData[];
     userColors?: categoryColor[];
};

export default function PieCategoryChart(props: PieChartProps) {
     return (
          <ResponsiveContainer width={'100%'} height={300}>
               <PieChart width={400} height={400}>
                    <Pie data={props.chartData} dataKey={'totalCost'} outerRadius={135}>
                         {props.chartData.map((entry) => {
                              let fillColor = '';
                              if (props.userColors) {
                                   props.userColors.forEach((colorCategory) => {
                                        if (colorCategory.category === entry.name) {
                                             fillColor = colorCategory.color;
                                             return;
                                        }
                                   });
                              }
                              return <Cell key={entry.name} fill={fillColor}></Cell>;
                         })}
                         <LabelList dataKey={'category'} position={'outside'} fill={'#cccccc'}></LabelList>
                    </Pie>
                    <LabelList values={'category'}></LabelList>
                    <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
               </PieChart>
          </ResponsiveContainer>
     );
}
