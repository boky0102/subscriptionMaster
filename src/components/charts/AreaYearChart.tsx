import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';

type ChartData = {
     month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
     totalCostForMonth: number;
};

type ChartYearData = {
     year: number;
     totalCostForYear: number;
};

type AreaYearChartProps = {
     chartData: ChartData[] | ChartYearData[];
     timeFrame: 'all' | number;
     height?: number;
};

export default function AreaYearChart(props: AreaYearChartProps) {
     return (
          <ResponsiveContainer width={'100%'} height={props.height}>
               <AreaChart data={props.chartData} margin={{ top: 20, left: 0, right: 50, bottom: 0 }}>
                    <defs>
                         <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#17BEBB" stopOpacity={1} />
                              <stop offset="95%" stopColor="#17BEBB" stopOpacity={0.3} />
                         </linearGradient>
                    </defs>
                    <Area
                         type="monotone"
                         dataKey={props.timeFrame === 'all' ? 'totalCostForYear' : 'totalCostForMonth'}
                         stroke="#17BEBB"
                         fillOpacity={1}
                         fill="url(#colorUv)"
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                         dataKey={props.timeFrame === 'all' ? 'year' : 'month'}
                         fontWeight={'bold'}
                         stroke="#0E1C36"
                    ></XAxis>
                    <YAxis stroke="#0E1C36"></YAxis>
               </AreaChart>
          </ResponsiveContainer>
     );
}
