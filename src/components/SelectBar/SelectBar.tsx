import './SelectBar.css';

type SubscriptionTypeSelectProps = {
     filterElements: string[];
     handleElementClick: (event: React.MouseEvent<HTMLDivElement>) => void;
     filterState: string;
};

export default function SelectBar(props: SubscriptionTypeSelectProps) {
     let animationClasses = '';
     if (props.filterState === props.filterElements[0]) {
          animationClasses = 'select-nav-marker select-nav-move-left';
     } else if (props.filterState === props.filterElements[2]) {
          animationClasses = 'select-nav-marker select-nav-move-right';
     } else {
          animationClasses = 'select-nav-marker';
     }

     return (
          <div className="select-nav-container">
               <div className={animationClasses}></div>
               <div
                    id={props.filterElements[0]}
                    className={
                         props.filterState === props.filterElements[0]
                              ? 'select-nav-item marked-text'
                              : 'select-nav-item'
                    }
                    onClick={props.handleElementClick}
               >
                    {props.filterElements[0]}
               </div>
               <div
                    id={props.filterElements[1]}
                    className={
                         props.filterState === props.filterElements[1]
                              ? 'select-nav-item marked-text'
                              : 'select-nav-item'
                    }
                    onClick={props.handleElementClick}
               >
                    {props.filterElements[1]}
               </div>
               <div
                    id={props.filterElements[2]}
                    className={
                         props.filterState === props.filterElements[2]
                              ? 'select-nav-item marked-text'
                              : 'select-nav-item'
                    }
                    onClick={props.handleElementClick}
               >
                    {props.filterElements[2]}
               </div>
          </div>
     );
}
