import { SubscriptionsTable } from '../types.utility';
import { useReducer } from 'react';

type ActionTypes = { type: 'Name' } | { type: 'Amount paid' } | { type: 'Date subscribed' } | { type: 'Charge amount' };

type actions = 'Name' | 'Amount paid' | 'Date subscribed' | 'Charge amount';

const reducer = (state: SubscriptionsTable[], action: ActionTypes) => {
     switch (action.type) {
          case 'Name': {
               const sortedArray = [...state];

               sortedArray.sort((a, b) => {
                    if (a.subscriptionName[0] > b.subscriptionName[0]) return -1;
                    else return 1;
               });
               return sortedArray;
          }
          case 'Amount paid': {
               const sortedArray = [...state];

               sortedArray.sort((a, b) => {
                    if (a.totalPaid > b.totalPaid) {
                         return 1;
                    } else return -1;
               });
               return sortedArray;
          }
          case 'Charge amount': {
               const sortedArray = [...state];

               sortedArray.sort((a, b) => {
                    if (a.chargeAmount > b.chargeAmount) {
                         return 1;
                    } else return -1;
               });
               return sortedArray;
          }
          case 'Date subscribed': {
               const sortedArray = [...state];

               sortedArray.sort((a, b) => {
                    if (a.startedDate > b.startedDate) {
                         return 1;
                    } else return -1;
               });
               return sortedArray;
          }
          default:
               return state;
     }
};

export function useSortSubscriptions(subscriptions: SubscriptionsTable[]) {
     const [sortedArray, dispatch] = useReducer(reducer, subscriptions);

     function handleSortSelect(event: React.ChangeEvent<HTMLSelectElement>) {
          const value = event.target.value as actions;
          console.log(value);
          switch (value) {
               case 'Amount paid':
                    console.log('paid');
                    dispatch({ type: 'Amount paid' });
                    break;
               case 'Charge amount':
                    dispatch({ type: 'Charge amount' });
                    break;
               case 'Date subscribed':
                    dispatch({ type: 'Date subscribed' });
                    break;
               case 'Name':
                    dispatch({ type: 'Name' });
                    break;
          }
     }

     return [sortedArray, { handleSortSelect }] as const;
}
