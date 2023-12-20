import { useReducer } from 'react';

type ActionTypes = { type: 'next' } | { type: 'previous' };

export function useSelectedYear() {
     const reducer = (state: number, action: ActionTypes) => {
          switch (action.type) {
               case 'next': {
                    if (state >= new Date().getFullYear()) return state;
                    else return state + 1;
               }
               case 'previous': {
                    return state - 1;
               }
               default: {
                    return state;
               }
          }
     };

     const [selectedYear, dispatch] = useReducer(reducer, new Date().getFullYear());

     function next() {
          dispatch({ type: 'next' });
     }

     function previous() {
          dispatch({ type: 'previous' });
     }

     return [selectedYear, { next, previous }] as const;
}
