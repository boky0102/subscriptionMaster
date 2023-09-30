import ArrowIcon from './ArrowIcon';
import CalendarDay from './CalendarDay';
import './Callendar.css';
import { useEffect, useState } from 'react';
import { Subscription } from './Mysubscriptions';


//IDEJA =)$#?"=)$"?=)$=?"# DODAJ MOGUCNOST DODAVANJA NOVOG SUBSCRIPTIONA SA KALENDARA PREKO MODALA"

type CalendarProps = {
    subscriptionData?: Subscription[]
}

function Callendar(props: CalendarProps){

    const testArray = [];
    for(let j = 0; j<35; j++){
        testArray.push(0);
    }

    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysDateArray, setDaysDateArray] = useState(getDaysForMonth(currentDate));

    function handleNextMonthClick(){
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    }

    function handlePreviousMonthClick(){
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    }


    function getDaysForMonth(date: Date): Date[]{
        const requestedDate = new Date(date);
        requestedDate.setDate(1);
        const dayOfWeek = requestedDate.getDay();
        if(dayOfWeek === 0){
            requestedDate.setDate(1 - 6);
        } else if(dayOfWeek !== 1){
            requestedDate.setDate(1-dayOfWeek);
        }
        const arrayOfDates = [] as Date[];
        let firstPass = true;
        for(let i = 0; i<35; i++){
            const currentDayDate = new Date(requestedDate);
            arrayOfDates.push(currentDayDate);
            
            currentDayDate.setDate(requestedDate.getDate() + 1);
            requestedDate.setDate(requestedDate.getDate() + 1);
            
            //CHECK FOR MONTHS WHERE 6 ROWS ARE NECCESSARY TO DISPLAY ALL DATA
            if(i === 34 && firstPass){
                firstPass = false;
                if(currentDayDate.getMonth() === date.getMonth()){

                    i = i - 7;
                } 
            }
        }
        return arrayOfDates;
        
        
    }

   
    useEffect(() => {
        setDaysDateArray(getDaysForMonth(currentDate));
            
    }, [currentDate]);

    
    return(
        <div className='calendar-container'>
            <div className='date-select-container'>
                <ArrowIcon direction='left' color="#0E1C36" handleClick={() => handlePreviousMonthClick()} className='arrow-icon'></ArrowIcon>
                <span className='month-text'>
                {
                    currentDate.toLocaleDateString("en-GB", {month: "short"})
                }
                </span>
                <span className='year-text'>
                {
                    currentDate.getFullYear()
                }
                </span>
                
                <ArrowIcon direction='right' color="#0E1C36" handleClick={() => handleNextMonthClick()} className='arrow-icon'></ArrowIcon>
            </div>
            <div className='calendar-header'>
                <div className='calendar-header-item'>MON</div>
                <div className='calendar-header-item'>TUE</div>
                <div className='calendar-header-item'>WED</div>
                <div className='calendar-header-item'>THU</div>
                <div className='calendar-header-item'>FRI</div>
                <div className='calendar-header-item'>SAT</div>
                <div className='calendar-header-item'>SUN</div>
            </div>
            <div className={daysDateArray.length > 35 ? "calendar calendar-additionalWeek" : "calendar"}>
                {
                    daysDateArray.map((day) => {
                        if(day.getMonth() < currentDate.getMonth() || day.getMonth() > currentDate.getMonth()){
                            return(
                                <CalendarDay subscriptionData={props.subscriptionData} key={day.toLocaleDateString()} date={day} insideScope={false}></CalendarDay>
                            )
                            
                        } else {
                            return(
                                <CalendarDay subscriptionData={props.subscriptionData} key={day.toLocaleDateString()} date={day} insideScope={true}></CalendarDay>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Callendar