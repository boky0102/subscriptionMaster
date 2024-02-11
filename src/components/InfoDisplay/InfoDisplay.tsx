import './InfoDisplay.css';

type infoDisplayProps = {
     header: string;
     amount?: number;
     amountHeader?: string;
};

export default function InfoDisplay(props: infoDisplayProps) {
     return (
          <div className="info-display-container">
               <div className="info-display-header">{props.header}</div>
               <div className="info-display-amount-container">
                    {props.amountHeader && <div className="info-display-header-secondary">{props.amountHeader}</div>}
                    <div className="info-display-amount">{props.amount && Math.round(props.amount * 100) / 100}</div>
               </div>
          </div>
     );
}
