import './App.css'
import Header from './components/Header'
import Home from './components/Home';
import LoginForm from './components/LoginForm'
import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";

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
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<LoginForm type="login" inputChange={handleFormChange}></LoginForm>}></Route>
        <Route path="/register" element={<LoginForm type="register" inputChange={handleFormChange}></LoginForm>}></Route>
      </Routes>
    </>
  )
}

export default App