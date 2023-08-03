type ButtonInterface = "button" | "submit" | "reset" | undefined;

function Button(props: { label: string , type: ButtonInterface}){
    
    
    return(
        <button type={props.type}>{props.label}</button>
    )
}

export default Button;