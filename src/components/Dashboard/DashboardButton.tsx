import { Link } from 'react-router-dom';
import './DashboardButton.css';
import SettingsIcon from '../Icons/SettingsIconSvg';
import CalendarIcon from '../Icons/CalendarIconSvg';
import AddIcon from '../Icons/AddIconSvg';
import HistoryIcon from '../Icons/HistoryIconSvg';
import HomeIconSvg from '../Icons/HomeIconSvg';

interface props {
     label: string;
     route:
          | 'settings'
          | 'callendar'
          | 'subscriptionHistory'
          | 'addsubscription'
          | ''
          | 'mysubscriptions'
          | 'addfreetrial';
}

function DashboardButton(props: props) {
     return (
          <div className="dashboard-button-container">
               {props.route === 'settings' && <SettingsIcon className="settings-icon"></SettingsIcon>}
               {props.route === 'callendar' && <CalendarIcon className="settings-icon"></CalendarIcon>}
               {props.route === 'addsubscription' && <AddIcon className="settings-icon"></AddIcon>}
               {props.route === 'mysubscriptions' && <HistoryIcon className="settings-icon"></HistoryIcon>}
               {props.route === '' && <HomeIconSvg className="settings-icon"></HomeIconSvg>}
               <Link to={`/home/${props.route}`} className="dashboard-link">
                    <div>{props.label}</div>
               </Link>
          </div>
     );
}

export default DashboardButton;
