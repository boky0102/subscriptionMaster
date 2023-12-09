import { useState } from 'react';

export interface Notification {
     message: string;
     notificationType: 'success' | 'error' | 'warning';
     active: boolean;
}

export function useNotification() {
     const [notification, setNotification] = useState({} as Notification);

     function triggerFunction(message: Notification['message'], notificationType: Notification['notificationType']) {
          setNotification({
               message: message,
               notificationType: notificationType,
               active: true,
          });

          setTimeout(() => {
               setNotification((prevState) => ({
                    ...prevState,
                    active: false,
               }));
          }, 3000);
     }

     return [notification, triggerFunction] as const;
}
