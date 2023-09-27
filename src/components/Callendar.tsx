import ArrowIcon from './ArrowIcon';
import './Callendar.css';
import { useEffect, useState } from 'react';

//IDEJA =)$#?"=)$"?=)$=?"# DODAJ MOGUCNOST DODAVANJA NOVOG SUBSCRIPTIONA SA KALENDARA PREKO MODALA"

function Callendar(){

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
        for(let i = 0; i<35; i++){
            const currentDayDate = new Date(requestedDate);
            arrayOfDates.push(currentDayDate);
            currentDayDate.setDate(requestedDate.getDate() + 1);
            requestedDate.setDate(requestedDate.getDate() + 1);
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
                {
                    currentDate.toLocaleDateString("en-GB", {month: "short"})
                }
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
            <div className='calendar'>
                {
                    daysDateArray.map((day) => (
                        <div className='calendar-field'>{day.getDate()}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default Callendar