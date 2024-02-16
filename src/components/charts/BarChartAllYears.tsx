import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { UserColorData } from '../../types';

type subscriptionCategories =
     | 'Streaming'
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

type ChartYearData = {
     year: number;
     totalCostForYear: number;
};

type BarChartAllYearsProps = {
     chartData: ChartYearData[] | ChartYearCategoryData[];
     userColorData: UserColorData;
     categoryData?: boolean;
};

function isChartYearCategoryData(data: ChartYearData | ChartYearCategoryData): data is ChartYearCategoryData {
     return (data as ChartYearCategoryData).name !== undefined;
}

export default function BarChartAllYears(props: BarChartAllYearsProps) {
     return (
          <ResponsiveContainer width="100%" height={300}>
               <BarChart
                    data={props.chartData}
                    margin={{
                         top: 20,
                         right: 50,
                         left: 0,
                         bottom: 0,
                    }}
               >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                         dataKey={props.categoryData ? 'name' : 'year'}
                         fontWeight={'bold'}
                         stroke="#0E1C36"
                         name="Year"
                    />
                    <YAxis stroke="#0E1C36" />
                    <Tooltip />
                    <Bar
                         dataKey={props.categoryData ? 'totalCost' : 'totalCostForYear'}
                         maxBarSize={props.chartData.length > 2 ? undefined : 200}
                         fill="#17BEBB"
                         name="Total cost"
                    >
                         {props.userColorData &&
                              props.chartData.map((entry) => {
                                   if (isChartYearCategoryData(entry)) {
                                        return (
                                             <Cell
                                                  key={`${entry.name}-colorKey`}
                                                  fill={props.userColorData[entry.name]}
                                             ></Cell>
                                        );
                                   }
                              })}
                    </Bar>
               </BarChart>
          </ResponsiveContainer>
     );
}
