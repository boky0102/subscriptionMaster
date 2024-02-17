import axios from 'axios';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { subscriptionCategories, triggerNotification } from '../../types';
import './MySettings.css';
import { UserColorData } from '../../types';

type SettingsProps = {
     email?: string;
     triggerNotification: triggerNotification;
     userColorData: UserColorData;
};

interface SettingsForm {
     email: string;
}

function isValidEmail(email: string) {
     const emailRegex = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     return emailRegex.test(email);
}

function MySettings(props: SettingsProps) {
     const [settings, setSettings] = useState({} as SettingsForm);
     const [validEmail, setValidEmail] = useState(undefined as boolean | undefined);
     const [colorFormData, setColorFormData] = useState({} as UserColorData);

     function handleChangeSettings(event: React.ChangeEvent<HTMLInputElement>) {
          const { name, value } = event.currentTarget;
          if (name === 'email') {
               if (value.length === 0) {
                    setValidEmail(undefined);
               } else {
                    setValidEmail(isValidEmail(value));
                    setSettings((prevSettings) => ({
                         ...prevSettings,
                         [name]: value,
                    }));
               }
          }
     }

     function handleFormSubmit(event: React.ChangeEvent<HTMLFormElement>) {
          event.preventDefault();
          const serverLink = import.meta.env.VITE_SERVER_LINK + '/settings';
          axios.put(serverLink, settings, {
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         props.triggerNotification('Updated user email', 'success');
                    } else {
                         console.log('Couldnt update');
                    }
               })
               .catch((error) => {
                    console.log(error);
               });
     }

     function handleColorSubmit(event: React.FormEvent<HTMLFormElement>) {
          event.preventDefault();
          const serverLink = import.meta.env.VITE_SERVER_LINK + '/change-color';
          const postColorObj = {} as UserColorData;
          if (colorFormData) {
               console.log(postColorObj);
               axios.post(serverLink, colorFormData, {
                    withCredentials: true,
               })
                    .then((response) => {
                         if (response.status === 200) {
                              props.triggerNotification('Updated user colors', 'success');
                         }
                    })
                    .catch((error) => {
                         console.log(error);
                    });
          } else {
               console.log('No new color data');
          }
     }

     function handleColorChange(event: React.ChangeEvent<HTMLInputElement>) {
          const { value, name } = event.target;
          setColorFormData((previousObj) => ({
               ...previousObj,
               [name]: value,
          }));
     }

     useEffect(() => {
          console.log(colorFormData);
     }, [colorFormData]);

     return (
          <div className="settings-container">
               <form className="sub-form-container settings-form" onSubmit={handleFormSubmit}>
                    <h3>Email settings</h3>
                    <div className="sub-form-section">
                         <label htmlFor="email">Email address</label>
                         <input
                              type="email"
                              name="email"
                              id="email"
                              className="sub-form-input"
                              placeholder={props.email}
                              onChange={handleChangeSettings}
                              autoComplete="true"
                         ></input>
                         {!validEmail && validEmail !== undefined && <div>Email is not valid</div>}
                    </div>

                    <div className="sub-form-section">
                         <Button label="Save" type="submit" className="sub-form-button" disabled={!validEmail}></Button>
                    </div>
               </form>
               <form className="settings-form-color-container settings-form" onSubmit={handleColorSubmit}>
                    <h3>Category color settings</h3>
                    {props.userColorData &&
                         (Object.keys(props.userColorData) as Array<subscriptionCategories>).map((categoryKey) => {
                              return (
                                   <div
                                        key={categoryKey + props.userColorData[categoryKey]}
                                        className="color-input-container"
                                   >
                                        <label htmlFor={`${categoryKey}-colorpicker`}>{categoryKey}</label>
                                        <input
                                             id={`${categoryKey}-colorpicker`}
                                             type="color"
                                             defaultValue={props.userColorData[categoryKey]}
                                             onChange={handleColorChange}
                                             name={categoryKey}
                                        ></input>
                                   </div>
                              );
                         })}
                    <div className="sub-form-section">
                         <Button label="Save" type="submit" className="sub-form-button"></Button>
                    </div>
               </form>
          </div>
     );
}

export default MySettings;
