import CloseIcon from '../Icons/CloseIconSvg';
import { Subscription } from '../MySubscriptions/Mysubscriptions';
import './CallendarDayModal.css';

type CalendarDayModalProps = {
     isOpen: boolean;
     handleModalClose: (event: React.MouseEvent<HTMLDivElement>) => void;
     date: Date;
     subscriptionsRenewedOnDate: Subscription[];
};

export default function CalendarDayModal(props: CalendarDayModalProps) {
     const amountHeader = props.date >= new Date() ? 'Amount to be charged' : 'Amount charged';

     if (props.isOpen) {
          return (
               <>
                    <div className="calendar-modal-container" onClick={props.handleModalClose}></div>
                    <div className="calendar-modal-content">
                         <div className="modal-header-container">
                              <h1>
                                   {props.date.toLocaleDateString('en-gb', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit',
                                   })}
                              </h1>
                              <div className="icon-container" onClick={props.handleModalClose}>
                                   <CloseIcon className="modal-close-icon"></CloseIcon>
                              </div>
                         </div>

                         <table className="modal-info-table">
                              <thead>
                                   <th>Subscription name</th>
                                   <th>{amountHeader}</th>
                              </thead>
                              <tbody>
                                   {props.subscriptionsRenewedOnDate.map((subscription) => {
                                        return (
                                             <tr key={subscription.id}>
                                                  <td>{subscription.subscriptionName.toUpperCase()}</td>
                                                  <td>{subscription.chargeAmount}</td>
                                             </tr>
                                        );
                                   })}
                                   <tr className="modal-table-total">
                                        <td>TOTAL</td>
                                        <td>
                                             {props.subscriptionsRenewedOnDate.reduce((sum, current) => {
                                                  return (sum += current.chargeAmount);
                                             }, 0)}
                                        </td>
                                   </tr>
                              </tbody>
                         </table>
                    </div>
               </>
          );
     } else {
          return null;
     }
}
