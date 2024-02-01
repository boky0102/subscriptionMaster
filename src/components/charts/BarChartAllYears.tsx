import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

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

type ChartYearData = {
     year: number;
     totalCostForYear: number;
};

type BarChartAllYearsProps = {
     chartData: ChartYearData[] | ChartYearCategoryData[];
     categoryData?: boolean;
};

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
                         fill="#17BEBB"
                         name="Total cost"
                    />
               </BarChart>
          </ResponsiveContainer>
     );
}
