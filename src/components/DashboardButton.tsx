import { Link } from "react-router-dom"

interface props{
    label: string,
    route: "settings" | "callendar" | "mysubscription" | "addsubscription" | ""
}


function DashboardButton(props: props){

    return(
        <Link to={`/${props.route}`}>
            <button className="dashboard-button">{props.label}</button>
        </Link>
    )
}

export default DashboardButton