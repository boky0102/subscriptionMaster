import DashboardButton from "./DashboardButton";
import LogOutButton from "./LogOutButton";


function Dashboard(){




    return(
        <div className="dashboard-container">
            <div className="graph"></div>
            <div className="actions-container">
                <DashboardButton label="SETTINGS" route="settings"></DashboardButton>
                <DashboardButton label="CALENDAR" route="callendar"></DashboardButton>
                <DashboardButton label="MY SUBSCRIPTIONS" route=""></DashboardButton>
                <DashboardButton label="ADD SUBSCRIPRION" route="addsubscription"></DashboardButton>
                <LogOutButton></LogOutButton>
            </div>
        </div>
    )



}

export default Dashboard;