import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

type ChartYearData = {
     year: number;
     totalCostForYear: number;
};

type BarChartAllYearsProps = {
     chartData: ChartYearData[];
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
                    <XAxis dataKey="year" fontWeight={'bold'} stroke="#0E1C36" name="Year" />
                    <YAxis stroke="#0E1C36" />
                    <Tooltip />
                    <Bar dataKey="totalCostForYear" fill="#17BEBB" name="Total subscription cost" />
               </BarChart>
          </ResponsiveContainer>
     );
}
