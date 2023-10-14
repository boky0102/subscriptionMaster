import './PieTooltip.css';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
     if (active && payload && payload.length) {
          console.log(label);
          const numberFormatter = new Intl.NumberFormat('en-US', {
               maximumFractionDigits: 2,
               minimumFractionDigits: 2,
          });
          const shortenAmount = numberFormatter.format(payload[0].value as number);
          return (
               <div className="tooltip-container">
                    <p className="tooltip-text">{payload[0].name}</p>
                    <p className="tooltip-text">{`Amount : ${shortenAmount}`}</p>
                    <p className="tooltip-text">{`Share :`}</p>
               </div>
          );
     }

     return null;
};

export default CustomTooltip;
