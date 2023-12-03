import DashboardButton from './DashboardButton';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Dashboard.css';
import logo from '../../assets/logo.svg';
import UserIcon from '../CurrentUser/CurrentUser';

type DashboardProps = {
     username: string;
};

function Dashboard(props: DashboardProps) {
     return (
          <div className="dashboard-container">
               <img className="dashboard-logo" src={logo} />
               <div className="actions-container">
                    <DashboardButton label="Home" route=""></DashboardButton>
                    <DashboardButton label="Settings" route="settings"></DashboardButton>
                    <DashboardButton label="Calendar" route="callendar"></DashboardButton>
                    <DashboardButton label="Subscription History" route="mysubscriptions"></DashboardButton>
                    <DashboardButton label="Add subscription" route="addsubscription"></DashboardButton>
               </div>
               <div className="logout-container">
                    <UserIcon username={props.username}></UserIcon>
                    <LogOutButton></LogOutButton>
               </div>
          </div>
     );
}

export default Dashboard;
