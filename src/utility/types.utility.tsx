import { CurrenciesObj } from '../types';

type currencieKey = keyof CurrenciesObj;
export function isCurrencyCode(currencyKey: string): currencyKey is currencieKey {
     return currencyKey.includes(currencyKey as currencieKey);
}

export type SubscriptionsTable = {
     subscriptionName: string;
     startedDate: Date;
     stoppedDate?: Date;
     chargeAmount: number;
     currency: string;
     totalPaid: number;
};
