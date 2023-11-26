import { Cell, LabelList, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from './PieTooltip';
import { useWindowDimensions } from '../../utility/window.utility';
import { useEffect, useState } from 'react';

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
     const { width } = useWindowDimensions();
     const [chartLayout, setChartLayout] = useState({
          outerRadius: 135,
     });
     useEffect(() => {
          if (width < 576) {
               setChartLayout((prevLayout) => ({
                    ...prevLayout,
                    outerRadius: 145,
               }));
          } else {
               setChartLayout((prevLayout) => ({
                    ...prevLayout,
                    outerRadius: 135,
               }));
          }
     }, [width]);

     return (
          <ResponsiveContainer width={'100%'} height={300}>
               <PieChart width={400} height={400}>
                    <Pie data={props.chartData} dataKey={'totalCost'} outerRadius={chartLayout.outerRadius}>
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
