import { Cell, LabelList, Pie, PieChart, Tooltip } from 'recharts';
import CustomTooltip from './PieTooltip';
import { useWindowDimensions } from '../../utility/window.utility';
import { useEffect, useState } from 'react';
import { UserColorData, subscriptionCategories } from '../../types';

type ChartYearCategoryData = {
     name: subscriptionCategories;
     totalCost: number;
     percentage?: number;
};

type PieChartProps = {
     chartData: ChartYearCategoryData[];
     userColors: UserColorData;
};

export default function PieCategoryChart(props: PieChartProps) {
     const { width } = useWindowDimensions();
     const [chartLayout, setChartLayout] = useState({
          outerRadius: 125,
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
                    outerRadius: 140,
               }));
          }
     }, [width]);

     return (
          <PieChart width={300} height={300}>
               <Pie data={props.chartData} dataKey={'totalCost'} outerRadius={chartLayout.outerRadius}>
                    {props.chartData.map((entry) => {
                         const fillColor = props.userColors[entry.name];
                         return <Cell key={entry.name} fill={fillColor}></Cell>;
                    })}
                    <LabelList dataKey={'category'} position={'outside'} fill={'#cccccc'}></LabelList>
               </Pie>
               <LabelList values={'category'}></LabelList>
               <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
          </PieChart>
     );
}
