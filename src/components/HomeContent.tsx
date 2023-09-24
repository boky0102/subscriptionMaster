import './HomeContent.css';
import SubscriptionCard from './SubscriptionCard';
import { UserData } from './Home';
import { Link } from 'react-router-dom';
import { Notification } from './Home';
import { useEffect, useState } from 'react';
import { CartesianGrid, XAxis, YAxis, AreaChart, Area, ResponsiveContainer } from 'recharts';
import '../assets/arrow-right.svg';
import ArrowIcon from './ArrowIcon';


interface Subscription {
    id: string,
    subscriptionName: string,
    chargeAmount: number,
    renewalDate: Date,
    dateAdded: Date
}

type HomeContentProps = {
    subscriptionData: Subscription[],
    userData: UserData,
    notificationTrigger: (message: Notification["message"], type: Notification["notificationType"]) => void,
    handleDeleteClick: (subscriptionId: string) => void
}

type ChartData = {
    month: "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec",
    totalCostForMonth: number
}

type Months = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export default function HomeContent(props: HomeContentProps){

    const [chartData, setChartData] = useState([] as ChartData[]);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    function handleRightArrowClick(){
        setSelectedYear(year => year + 1);
    }

    function handleLeftArrowClick(){
        setSelectedYear(year => year - 1);
    }

    useEffect(() => {
        setChartData([]);
        const months: Months[] = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] ;
        const currentMonth = new Date().getMonth();
        months.forEach((month, index) => {
            let totalCost = 0;
            if(props.subscriptionData.length > 0){
                props.subscriptionData.forEach((subscription) => {
                    if(selectedYear === currentYear){
                        if(index >= subscription.dateAdded.getMonth() && currentMonth >= index){
                            totalCost += subscription.chargeAmount;
                            
                        }
                    } else{
                        if(subscription.dateAdded.getFullYear() === selectedYear){
                            if(index >= subscription.dateAdded.getMonth()){
                                totalCost += subscription.chargeAmount;
                            }
                        } else{
                            if(subscription.dateAdded.getFullYear() < selectedYear){
                                totalCost += subscription.chargeAmount;
                                console.log(subscription.dateAdded);
                            }
                        }
                    }
                    
                })
            }
            const monthData: ChartData = {
                month: month,
                totalCostForMonth: totalCost
            }
            console.log(monthData);

            if(currentMonth >= index && selectedYear === currentYear){
                setChartData((prevData) => {
                    const newData = [...prevData, monthData];
                    return newData
                });
            } else {
                if(selectedYear !== currentYear){
                    setChartData((prevData) => {
                        const newData = [...prevData, monthData];
                        return newData;
                    })
                }
            }
            
        })
    }, [props.subscriptionData, selectedYear]);


   /*  useEffect(() => {
        console.log(chartData);
    }, [chartData])
 */


    return(
        <>
            <div className='subscriptions-container'>
                {
                    props.subscriptionData.map((subscription) => 
                        <SubscriptionCard handleDeleteClick={props.handleDeleteClick} notificationTrigger={props.notificationTrigger} subscription={subscription} key={subscription.id} id={subscription.id}></SubscriptionCard>
                    )
                }
            </div>
            <div className='widget-container'>
                {
                    props.userData.email === undefined &&
                        <div>Email address isn't set up. Please go to <Link to="/home/settings" className='widget-link'>SETTINGS</Link> and setup email so you can recieve notificaitons.</div>
                }
                <div className='chart-container'>
                    <ResponsiveContainer width={"100%"} height={300} >
                        <AreaChart data={chartData} margin={{top: 20, left: 0, right: 50, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#17BEBB" stopOpacity={1}/>
                                <stop offset="95%" stopColor="#17BEBB" stopOpacity={0.3}/>
                            </linearGradient>
                        </defs>
                            <Area type="monotone" dataKey="totalCostForMonth" stroke="#17BEBB" fillOpacity={1} fill="url(#colorUv)" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" fontWeight={"bold"} stroke="#0E1C36"></XAxis>
                            <YAxis stroke="#0E1C36"></YAxis>
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className='chart-action-container'>    
                        <ArrowIcon className='arrow-icon' direction='left' color={"#17BEBB"} handleClick={() => handleLeftArrowClick()}></ArrowIcon>
                        <span>{selectedYear}</span>
                        <ArrowIcon className='arrow-icon' direction='right' color={"#17BEBB"} handleClick={() => handleRightArrowClick()}></ArrowIcon>
                    </div>
                </div>
            </div>
            
        </>
    )
}