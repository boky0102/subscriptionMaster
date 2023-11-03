import ArrowIcon from '../ArrowIcon/ArrowIcon';
import CalendarDay from './CalendarDay/CalendarDay';
import './Callendar.css';
import { useEffect, useState, useRef } from 'react';
import { Subscription } from '../MySubscriptions/Mysubscriptions';

//IDEJA =)$#?"=)$"?=)$=?"# DODAJ MOGUCNOST DODAVANJA NOVOG SUBSCRIPTIONA SA KALENDARA PREKO MODALA"

type CalendarProps = {
     subscriptionData?: Subscription[];
};

function getYearsTo1970() {
     const currentDate = new Date();
     const yearsArray: number[] = [];
     for (let year = currentDate.getFullYear(); year >= 1970; year--) {
          yearsArray.push(year);
     }
     return yearsArray;
}

function getMonthsInYear() {
     const date = new Date(2000, 0, 1);
     const monthsArray: string[] = [];
     for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
          monthsArray.push(date.toLocaleDateString('en-GB', { month: 'long' }));
          date.setMonth(monthIndex + 1);
     }
     return monthsArray;
}

function Callendar(props: CalendarProps) {
     const [currentDate, setCurrentDate] = useState(new Date());
     const [daysDateArray, setDaysDateArray] = useState(getDaysForMonth(currentDate));
     const yearsArray = useRef(getYearsTo1970());
     const monthsArray = useRef(getMonthsInYear());
     const calendarElement = useRef<HTMLDivElement>(null);

     function handleYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const value = parseInt(event.currentTarget.value);
          setCurrentDate((prevDate) => {
               const returnDate = new Date(prevDate);
               returnDate.setFullYear(value);
               return returnDate;
          });
     }

     function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
          const value = parseInt(event.currentTarget.value);
          setCurrentDate((prevDate) => {
               const returnDate = new Date(prevDate);
               returnDate.setMonth(value);
               return returnDate;
          });
     }

     function handleNextMonthClick() {
          const newDate = new Date(currentDate);
          newDate.setMonth(newDate.getMonth() + 1);
          setCurrentDate(newDate);
     }

     function handlePreviousMonthClick() {
          const newDate = new Date(currentDate);
          newDate.setMonth(newDate.getMonth() - 1);
          setCurrentDate(newDate);
     }

     function getDaysForMonth(date: Date): Date[] {
          const requestedDate = new Date(date);
          requestedDate.setDate(1);
          const dayOfWeek = requestedDate.getDay();
          if (dayOfWeek === 0) {
               requestedDate.setDate(1 - 6);
          } else if (dayOfWeek !== 1) {
               requestedDate.setDate(1 - dayOfWeek);
          }
          const arrayOfDates = [] as Date[];
          let firstPass = true;
          for (let i = 0; i < 35; i++) {
               const currentDayDate = new Date(requestedDate);
               arrayOfDates.push(currentDayDate);

               currentDayDate.setDate(requestedDate.getDate() + 1);
               requestedDate.setDate(requestedDate.getDate() + 1);

               //CHECK FOR MONTHS WHERE 6 ROWS ARE NECCESSARY TO DISPLAY ALL DATA
               if (i === 34 && firstPass) {
                    firstPass = false;
                    if (currentDayDate.getMonth() === date.getMonth()) {
                         i = i - 7;
                    }
               }
          }
          return arrayOfDates;
     }

     function handleNowClick() {
          setCurrentDate(() => {
               return new Date();
          });
     }

     useEffect(() => {
          setDaysDateArray(getDaysForMonth(currentDate));
     }, [currentDate]);

     return (
          <div className="calendar-container" ref={calendarElement}>
               <div className="date-select-container">
                    <div className="date-select-container">
                         <ArrowIcon
                              direction="left"
                              color="#0E1C36"
                              handleClick={() => handlePreviousMonthClick()}
                              className="arrow-icon"
                         ></ArrowIcon>
                         <span className="month-text">
                              {currentDate.toLocaleDateString('en-GB', { month: 'short' })}
                         </span>
                         <span className="year-text">{currentDate.getFullYear()}</span>

                         <ArrowIcon
                              direction="right"
                              color="#0E1C36"
                              handleClick={() => handleNextMonthClick()}
                              className="arrow-icon"
                         ></ArrowIcon>
                    </div>
                    <div className="manual-select-container">
                         <select onChange={handleYearChange} className="calendar-select-item">
                              {yearsArray.current.map((year) => (
                                   <option value={year} key={year}>
                                        {year}
                                   </option>
                              ))}
                         </select>
                         <select onChange={handleMonthChange} className="calendar-select-item">
                              {monthsArray.current.map((month, index) => (
                                   <option value={index} key={month}>
                                        {month}
                                   </option>
                              ))}
                         </select>
                         <button className="calendar-button" onClick={handleNowClick}>
                              NOW
                         </button>
                    </div>
               </div>
               <div className="calendar-header">
                    <div className="calendar-header-item">MON</div>
                    <div className="calendar-header-item">TUE</div>
                    <div className="calendar-header-item">WED</div>
                    <div className="calendar-header-item">THU</div>
                    <div className="calendar-header-item">FRI</div>
                    <div className="calendar-header-item">SAT</div>
                    <div className="calendar-header-item">SUN</div>
               </div>
               <div className={daysDateArray.length > 35 ? 'calendar calendar-additionalWeek' : 'calendar'}>
                    {daysDateArray.map((day) => {
                         if (day.getMonth() < currentDate.getMonth() || day.getMonth() > currentDate.getMonth()) {
                              return (
                                   <CalendarDay
                                        calendarElementRef={calendarElement.current!}
                                        subscriptionData={props.subscriptionData}
                                        key={day.toLocaleDateString()}
                                        date={day}
                                        insideScope={false}
                                   ></CalendarDay>
                              );
                         } else {
                              return (
                                   <CalendarDay
                                        calendarElementRef={calendarElement.current!}
                                        subscriptionData={props.subscriptionData}
                                        key={day.toLocaleDateString()}
                                        date={day}
                                        insideScope={true}
                                   ></CalendarDay>
                              );
                         }
                    })}
               </div>
          </div>
     );
}

export default Callendar;
