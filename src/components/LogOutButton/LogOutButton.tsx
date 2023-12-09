import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LogOutButton.css';
import LogOutIcon from '../Icons/LogOutIconSvg';

function LogOutButton() {
     const navigate = useNavigate();
     function handleLogOutButton() {
          const serverLink = import.meta.env.VITE_SERVER_LINK;
          axios.get(serverLink + '/logout', {
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         console.log(response);
                    }
               })
               .catch((error) => {
                    console.log(error);
               })
               .finally(() => {
                    navigate('/login');
               });
     }

     return (
          <div onClick={handleLogOutButton} className="logout-element">
               <div>
                    <LogOutIcon className="settings-icon logout-icon"></LogOutIcon>
               </div>
               <div className="log-out-text">Log out</div>
          </div>
     );
}

export default LogOutButton;
