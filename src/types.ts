import currencies from './utility/Common-Currency.json';

interface Notification {
     message: string;
     notificationType: 'success' | 'error' | 'warning';
     active: boolean;
}

export type triggerNotification = (message: Notification['message'], type: Notification['notificationType']) => void;

export type CurrenciesObj = typeof currencies;
