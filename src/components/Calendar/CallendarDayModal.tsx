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

                         <div className="renewed-subscriptions-container">
                              {props.subscriptionsRenewedOnDate.map((subscription) => {
                                   return (
                                        <div>
                                             <span>{subscription.subscriptionName}</span>
                                             <span>{subscription.chargeAmount}</span>
                                             <span>{subscription.category}</span>
                                        </div>
                                   );
                              })}
                         </div>
                    </div>
               </>
          );
     } else {
          return null;
     }
}
