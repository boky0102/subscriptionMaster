import './ErrorBox.css';

type ErrorBoxProps = {
    message?: string,
    transformClass?: string
}

export default function ErrorBox(props: ErrorBoxProps){
    return(
        <div className={"error-box" + " " + props.transformClass}>
            {props.message}
        </div>
    )
}