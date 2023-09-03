import './App.css'
import Header from './components/Header'
import Home from './components/Home';
import LoginForm from './components/LoginForm'
import { Routes, Route } from "react-router-dom";
import { useState } from "react";





function App() {

  const [isLoggedIn, loggedIn] = useState(false);

  function handleUserLoggedIn(logged: boolean){
    logged ? loggedIn(true) : loggedIn(false);
  }
  
  return (
    <div className="main-grid-container"> 
          <Header userLogged={isLoggedIn} loggedFlagHandler={handleUserLoggedIn}></Header>
          <Routes>
            <Route path="/*" element={<Home loggedFlagHandler={handleUserLoggedIn}></Home>}></Route>
            <Route path="/login" element={<LoginForm type="login" loggedFlagHandler={handleUserLoggedIn}></LoginForm>}></Route>
            <Route path="/register" element={<LoginForm type="register" loggedFlagHandler={handleUserLoggedIn}></LoginForm>}></Route>
            
          </Routes>
    </div>
  )
}

export default App