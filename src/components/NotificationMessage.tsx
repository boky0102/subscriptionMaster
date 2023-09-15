import './NotificationMessage.css';
import { useEffect } from 'react';

type NotificationProps = {
    message: string | undefined,
    notificationType: "success" | "error" | "warning" | undefined
}

export default function NotificationMessage(props: NotificationProps){
    
    useEffect(() => {
        console.log("Notification ", props.message !== undefined);
        console.log(props);
    });
    
    return(
        
        <div className={props.message !== undefined ? "notification-container-activated notification-container" : "notification-container"}>{props.message}</div>
        
    )
}