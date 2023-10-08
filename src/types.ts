interface Notification {
     message: string;
     notificationType: 'success' | 'error' | 'warning';
     active: boolean;
}

export type triggerNotification = (message: Notification['message'], type: Notification['notificationType']) => void;
