import './Button.css'
type ButtonInterface = "button" | "submit" | "reset" | undefined;

function Button(props: { label: string , type: ButtonInterface, className?: string, disabled?: boolean}){
    

    
    return(
        <button type={props.type} className={props.className} disabled={props.disabled}>{props.label}</button>
    )
}

export default Button;