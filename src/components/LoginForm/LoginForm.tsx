import Button from '../Button/Button';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import ErrorBox from '../ErrorBox';

type loginFormProps = {
     type: 'login' | 'register';
};

interface User {
     username: string;
     password: string;
     confirmPassword: string | undefined;
}

const LoginForm = (props: loginFormProps) => {
     const usernameInputElement = useRef(null as HTMLInputElement | null);

     useEffect(() => {
          const serverLink = import.meta.env.VITE_SERVER_LINK;
          axios.get(serverLink, {
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         navigate('/home');
                         console.log('ERROR');
                    }
               })
               .catch((error) => {
                    console.log(error);
               });
     }, []);

     useEffect(() => {
          if (usernameInputElement.current) {
               usernameInputElement.current.focus();
          }
     }, []);

     const [formData, setFormData] = useState({} as User);
     const [errorMessage, setErrorMessage] = useState(undefined as undefined | string);
     const navigate = useNavigate();
     const errorElement = useRef(null);

     function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
          const { name, value } = event.currentTarget;
          if (name === 'username') {
               if (value.length < 4 && value.length !== 0) {
                    event.currentTarget.setCustomValidity('Username must be longer than 3 letters');
                    setErrorMessage('Username must be longer than 3 letters');
               } else {
                    event.currentTarget.setCustomValidity('');
                    setErrorMessage(undefined);
               }
               setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          } else if (name === 'password') {
               if (value.length < 8 && value.length !== 0) {
                    event.currentTarget.setCustomValidity('Password must be longer than 7 characters');
                    setErrorMessage('Password must be longer than 7 characters');
               } else {
                    event.currentTarget.setCustomValidity('');
                    setErrorMessage(undefined);
               }
               setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          } else {
               if (formData.password !== value && value.length !== 0) {
                    event.currentTarget.setCustomValidity('Passwords must match');
                    setErrorMessage('Passwords must match');
               } else {
                    event.currentTarget.setCustomValidity('');
                    setErrorMessage(undefined);
               }
               setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          }
     }

     function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
          event.preventDefault();
          let serverPath = import.meta.env.VITE_SERVER_LINK;
          if (props.type === 'login') {
               serverPath += '/login';
          } else {
               serverPath += '/register';
          }

          axios.post(serverPath, formData, {
               headers: {
                    'Content-Type': 'application/json',
               },
               withCredentials: true,
          })
               .then((response) => {
                    if (response.status === 200) {
                         if (props.type === 'login') {
                              navigate('/home');
                         } else {
                              navigate('/login');
                         }
                    }
               })
               .catch((err) => {
                    setErrorMessage(err.response.statusText);
                    console.log(err);
               });
     }

     return (
          <div className="login-form-container">
               <form onSubmit={handleFormSubmit}>
                    <div
                         id="error"
                         className={errorMessage ? 'login-error-element login-error-active' : 'login-error-element'}
                         ref={errorElement}
                    >
                         <ErrorBox message={errorMessage}></ErrorBox>
                    </div>

                    <div className="login-form-section">
                         <label className="login-form-label" htmlFor="username">
                              Username
                         </label>
                         <input
                              className="login-form-input"
                              type="text"
                              name="username"
                              onChange={handleFormChange}
                              ref={usernameInputElement}
                         ></input>
                    </div>
                    <div className="login-form-section">
                         <label className="login-form-label" htmlFor="password">
                              Password
                         </label>
                         <input
                              className="login-form-input"
                              type="password"
                              name="password"
                              onChange={handleFormChange}
                         ></input>
                    </div>
                    {props.type === 'register' && (
                         <div className="login-form-section">
                              <label className="login-form-label" htmlFor="confirmPassword">
                                   Confirm Password
                              </label>
                              <input
                                   className="login-form-input"
                                   type="password"
                                   name="confirmPassword"
                                   onChange={handleFormChange}
                              ></input>
                         </div>
                    )}
                    <div>
                         {props.type === 'register' ? (
                              <Button
                                   className="login-form-button"
                                   label="Register"
                                   type="submit"
                                   disabled={errorMessage ? true : false}
                              ></Button>
                         ) : (
                              <Button
                                   className="login-form-button"
                                   label="Login"
                                   type="submit"
                                   disabled={errorMessage ? true : false}
                              ></Button>
                         )}
                    </div>
               </form>
          </div>
     );
};

export default LoginForm;
