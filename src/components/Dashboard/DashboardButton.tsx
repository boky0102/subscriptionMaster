import { Link, useLocation } from 'react-router-dom';
import './DashboardButton.css';
import SettingsIcon from '../Icons/SettingsIconSvg';
import CalendarIcon from '../Icons/CalendarIconSvg';
import AddIcon from '../Icons/AddIconSvg';
import HistoryIcon from '../Icons/HistoryIconSvg';
import HomeIconSvg from '../Icons/HomeIconSvg';
import { useState } from 'react';

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
     const currentLocation = useLocation().pathname.split('/')[2];

     return (
          <Link to={`/home/${props.route}`} className="dashboard-link dashboard-button-container">
               {props.route === 'settings' && (
                    <SettingsIcon
                         className={
                              currentLocation === 'settings' ? 'settings-icon settings-icon-active' : 'settings-icon'
                         }
                    ></SettingsIcon>
               )}
               {props.route === 'callendar' && (
                    <CalendarIcon
                         className={
                              currentLocation === 'callendar' ? 'settings-icon settings-icon-active' : 'settings-icon'
                         }
                    ></CalendarIcon>
               )}
               {props.route === 'addsubscription' && (
                    <AddIcon
                         className={
                              currentLocation === 'addsubscription'
                                   ? 'settings-icon settings-icon-active'
                                   : 'settings-icon'
                         }
                    ></AddIcon>
               )}
               {props.route === 'mysubscriptions' && (
                    <HistoryIcon
                         className={
                              currentLocation === 'mysubscriptions'
                                   ? 'settings-icon settings-icon-active'
                                   : 'settings-icon'
                         }
                    ></HistoryIcon>
               )}
               {props.route === '' && (
                    <HomeIconSvg
                         className={currentLocation === '' ? 'settings-icon settings-icon-active' : 'settings-icon'}
                    ></HomeIconSvg>
               )}
               <div className="link-container">
                    <div className="link-label">{props.label}</div>
                    <div className="link-underscore"></div>
               </div>
          </Link>
     );
}

export default DashboardButton;
