import './Button.css'
type ButtonInterface = "button" | "submit" | "reset" | undefined;

function Button(props: { label: string , type: ButtonInterface, className?: string}){
    

    
    return(
        <button type={props.type} className={props.className}>{props.label}<div className="underline"></div></button>
    )
}

export default Button;