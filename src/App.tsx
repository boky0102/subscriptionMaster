import './App.css'
import Home from './components/Main/Home';
import { Routes, Route } from "react-router-dom";
import WelcomePage from './components/WelcomePage/WelcomePage';





function App() {

  
  return (
          <Routes>
            <Route path="/" element={<WelcomePage route="login"></WelcomePage>}></Route>
            <Route path="/home/*" element={<Home></Home>}></Route>
            <Route path="/login" element={<WelcomePage route="login"></WelcomePage>}></Route>
            <Route path="/register" element={<WelcomePage route="register"></WelcomePage>}></Route>
            
          </Routes>
  )
}

export default App