import './SubscriptionTypeSelect.css';

type FilterStates = 'all' | 'free-trial' | 'subscription';

type SubscriptionTypeSelectProps = {
     handleFreeTrialChange: () => void;
     handleSubscriptionsChange: () => void;
     handleAllChange: () => void;
     filterState: FilterStates;
};

export default function SubscriptionTypeSelect(props: SubscriptionTypeSelectProps) {
     let animationClasses = '';
     if (props.filterState === 'free-trial') {
          animationClasses = 'select-nav-marker select-nav-move-left';
     } else if (props.filterState === 'subscription') {
          animationClasses = 'select-nav-marker select-nav-move-right';
     } else {
          animationClasses = 'select-nav-marker';
     }

     return (
          <div className="select-nav-container">
               <div className={animationClasses}></div>
               <div
                    className={props.filterState === 'free-trial' ? 'select-nav-item marked-text' : 'select-nav-item'}
                    onClick={props.handleFreeTrialChange}
               >
                    Free trials
               </div>
               <div
                    className={props.filterState === 'all' ? 'select-nav-item marked-text' : 'select-nav-item'}
                    onClick={props.handleAllChange}
               >
                    All
               </div>
               <div
                    className={props.filterState === 'subscription' ? 'select-nav-item marked-text' : 'select-nav-item'}
                    onClick={props.handleSubscriptionsChange}
               >
                    Subscriptions
               </div>
          </div>
     );
}
