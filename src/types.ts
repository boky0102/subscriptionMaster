import currencies from './utility/Common-Currency.json';

interface Notification {
     message: string;
     notificationType: 'success' | 'error' | 'warning';
     active: boolean;
}

export type triggerNotification = (message: Notification['message'], type: Notification['notificationType']) => void;

export type CurrenciesObj = typeof currencies;

export interface UserData {
     username: string;
     email?: string;
     userColorData: UserColorData;
     preferredCurrency: keyof CurrenciesObj;
}

export type subscriptionCategories =
     | 'Streaming'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

export type UserColorData = {
     [key in subscriptionCategories]: string;
};
