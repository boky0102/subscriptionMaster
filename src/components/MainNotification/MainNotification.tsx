import './MainNotification.css';
import { useState, useEffect } from 'react';

type MainNotificationProps = {
     message: string | undefined;
     type: 'error' | 'warning' | 'success' | undefined;
     active: boolean;
};

export default function MainNotification(props: MainNotificationProps) {
     const [notificationStyleClasses, setNotificationStyleClasses] = useState('');
     useEffect(() => {
          if (props.active) {
               switch (props.type) {
                    case 'error':
                         setNotificationStyleClasses(
                              'error main-notification-container main-notification-container-activated',
                         );
                         break;
                    case 'success':
                         setNotificationStyleClasses(
                              'success main-notification-container main-notification-container-activated',
                         );
                         break;
                    case 'warning':
                         setNotificationStyleClasses(
                              'warning main-notification-container main-notification-container-activated',
                         );
                         break;
                    default:
                         setNotificationStyleClasses('main-notification-container');
               }
          } else {
               setNotificationStyleClasses('main-notification-container');
          }
     }, [props.message, props.type, props.active]);
     return <div className={notificationStyleClasses}>{props.message}</div>;
}
