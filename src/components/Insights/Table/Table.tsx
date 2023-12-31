import { transformToNormalCase } from '../../../utility/string.utility';
import { getSingleSubscriptionData } from '../../../utility/subscription.utility';
import { Subscription } from '../../MySubscriptions/Mysubscriptions';
import './table.css';
import { useSortSubscriptions } from '../../../utility/custom-hooks/sort.hook';
import { useEffect } from 'react';

type TableProps = {
     subscriptionData: Subscription[];
};

export default function Table(props: TableProps) {
     const tableSubscriptionData = props.subscriptionData.map((subscription) => {
          const newSubscriptionObject = {
               subscriptionName: subscription.subscriptionName,
               startedDate: subscription.dateAdded,
               stoppedDate: subscription.subscriptionStopped,
               chargeAmount: subscription.chargeAmount,
               currency: subscription.currency,
               totalPaid: getSingleSubscriptionData(subscription),
          };
          return newSubscriptionObject;
     });

     const [sortedArray, { handleSortSelect }] = useSortSubscriptions(tableSubscriptionData);

     useEffect(() => {
          console.log(sortedArray);
     }, [sortedArray]);

     return (
          <>
               <div>
                    <label htmlFor="sortSelect">Sort by</label>
                    <select
                         name="sortSelect"
                         id="sortSelect"
                         className="sort-select"
                         defaultValue={'Name'}
                         onChange={handleSortSelect}
                    >
                         <option value="Amount paid">Amount paid</option>
                         <option value="Date subscribed">Date subscribed</option>
                         <option value="Charge amount">Charged amount</option>
                         <option value="Name">Name</option>
                    </select>
               </div>
               <table className="data-table">
                    <thead>
                         <tr>
                              {sortedArray.length !== 0 &&
                                   (Object.keys(sortedArray[0]) as Array<keyof (typeof sortedArray)[0]>).map(
                                        (tableHeader) => {
                                             return <th key={tableHeader}>{transformToNormalCase(tableHeader)}</th>;
                                        },
                                   )}
                         </tr>
                    </thead>
                    <tbody>
                         {sortedArray.length !== 0 &&
                              sortedArray.map((subscription) => {
                                   return (
                                        <tr key={subscription.chargeAmount}>
                                             {(Object.keys(subscription) as Array<keyof typeof subscription>).map(
                                                  (key) => {
                                                       const fieldData = subscription[key];
                                                       if (fieldData instanceof Date) {
                                                            return (
                                                                 <td key={subscription.subscriptionName}>
                                                                      {fieldData.toLocaleDateString('en-GB', {
                                                                           year: 'numeric',
                                                                           month: 'short',
                                                                           day: '2-digit',
                                                                      })}
                                                                 </td>
                                                            );
                                                       } else if (fieldData === undefined) {
                                                            return <td key={subscription.subscriptionName}>ONGOING</td>;
                                                       } else if (typeof fieldData === 'string') {
                                                            return (
                                                                 <td key={subscription.subscriptionName}>
                                                                      {fieldData}
                                                                 </td>
                                                            );
                                                       } else if (typeof fieldData === 'number') {
                                                            return (
                                                                 <td key={subscription.subscriptionName}>
                                                                      {fieldData.toString()}
                                                                 </td>
                                                            );
                                                       }
                                                  },
                                             )}
                                        </tr>
                                   );
                              })}
                    </tbody>
               </table>
          </>
     );
}
