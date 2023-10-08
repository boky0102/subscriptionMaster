import { Link } from 'react-router-dom';
import './DashboardButton.css';

interface props {
     label: string;
     route: 'settings' | 'callendar' | 'mysubscription' | 'addsubscription' | '' | 'mysubscriptions' | 'addfreetrial';
}

function DashboardButton(props: props) {
     return (
          <Link to={`/home/${props.route}`} className="dashboard-link">
               <div>{props.label}</div>
          </Link>
     );
}

export default DashboardButton;
