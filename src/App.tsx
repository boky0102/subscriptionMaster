import './App.css'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import { useState, useEffect } from 'react'

function App() {

  interface User{
    username: string | undefined,
    password: string | undefined ,
    confirmPassword: string | undefined
  }

  const [formData, setFormData] = useState<User>({} as User);
  
  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>){
    const {value, name} = event.currentTarget;
    if(name === "username"){
      setFormData((prevData) => (
        {
          ...prevData,
          [ name ] : value
        }
      ))
    } else if(name === "password"){
      setFormData((prevData) => (
        {
          ...prevData,
          [ name ] : value
        }
      ))
    } else{
      setFormData((prevData) => (
        {
          ...prevData,
          [ name ] : value
        }
      ))
    }
    
    
  }

  useEffect(() => {
    console.log(formData);
  }, [formData] );




  return (
    <>
      <Header></Header>
      <LoginForm type="register" inputChange={handleFormChange}></LoginForm>
    </>
  )
}

export default App