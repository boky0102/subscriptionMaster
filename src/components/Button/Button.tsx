import './Button.css';
type ButtonInterface = 'button' | 'submit' | 'reset' | undefined;

function Button(props: {
     label: string;
     type: ButtonInterface;
     className?: string;
     disabled?: boolean;
     onClick?: () => void;
}) {
     return (
          <button type={props.type} className={props.className} disabled={props.disabled} onClick={props.onClick}>
               {props.label}
          </button>
     );
}

export default Button;
