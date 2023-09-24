type ArrowIconProps = {
    direction: "left" | "right",
    color: string,
    className: string | undefined,
    handleClick?: () => void
}


export default function ArrowIcon(props: ArrowIconProps){
    return(
        <>
            {
                props.direction === "left" ? 
                <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="arrowLeft" className={props.className} onClick={props.handleClick}>
                    <path d="M8.16485 11.6296L14.7953 5.1999C15.2091 4.79869 16 5.04189 16 5.5703L16 18.4297C16 18.9581 15.2091 19.2013 14.7953 18.8001L8.16485 12.3704C7.94505 12.1573 7.94505 11.8427 8.16485 11.6296Z" fill="currentColor"/>
                </svg>
                :
                <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="arrowRight" className={props.className} onClick={props.handleClick}>
                    <path d="M15.8351 11.6296L9.20467 5.1999C8.79094 4.79869 8 5.04189 8 5.5703L8 18.4297C8 18.9581 8.79094 19.2013 9.20467 18.8001L15.8351 12.3704C16.055 12.1573 16.0549 11.8427 15.8351 11.6296Z" fill="currentColor"/>
                </svg>
            }
        </>
        
    )
}