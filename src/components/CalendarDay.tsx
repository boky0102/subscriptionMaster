
 
type CalendarDayProps = {
    date: Date,
    insideScope: boolean,
}


export default function CalendarDay(props: CalendarDayProps){
    
    return(
        <div className={props.insideScope ? "calendar-field date-current" : "calendar-field date-outside"}>
            <div className="date-number">
                {props.date.getDate()}
            </div>
        </div>
    )
}