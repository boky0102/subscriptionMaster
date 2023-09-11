import DashboardButton from "./DashboardButton";
import LogOutButton from "./LogOutButton";
import './Dashboard.css';
import logo from '../assets/logo.svg';

function Dashboard(){




    return(
        <div className="dashboard-container">
            <img className="dashboard-logo" src={logo} /> 
            <div className="actions-container">
                <DashboardButton label="Settings" route="settings"></DashboardButton>
                <DashboardButton label="Calendar" route="callendar"></DashboardButton>
                <DashboardButton label="My subscriptions" route=""></DashboardButton>
                <DashboardButton label="Add subscription" route="addsubscription"></DashboardButton>
                <LogOutButton></LogOutButton>
            </div>
        </div>
    )



}

export default Dashboard;