import { CurrenciesObj } from '../types';

type currencieKey = keyof CurrenciesObj;
export function isCurrencyCode(currencyKey: string): currencyKey is currencieKey {
     return currencyKey.includes(currencyKey as currencieKey);
}