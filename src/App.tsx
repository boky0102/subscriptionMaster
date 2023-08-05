import './App.css'
import Header from './components/Header'
import Home from './components/Home';
import LoginForm from './components/LoginForm'
import { Routes, Route } from "react-router-dom";

function App() {



  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<LoginForm type="login"></LoginForm>}></Route>
        <Route path="/register" element={<LoginForm type="register"></LoginForm>}></Route>
      </Routes>
    </>
  )
}

export default App