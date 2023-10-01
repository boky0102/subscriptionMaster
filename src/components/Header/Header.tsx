import Button from '../Button/Button';
import './Header.css';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';


type HeaderProps = {
    type: "login" | "register"
}

function Header(props: HeaderProps){

    return(
        <header id="header-container">
            <div className="header-item">
                <img src={logo} className="logo"></img>
            </div>
            
            <div className="header-buttons-container">
                
                        {
                            props.type === "register" && 
                            <Link to={"/login"}>
                                <Button label="Login" type="button" className="header-button"></Button>
                            </Link>
                        }

                        {
                            props.type === "login" &&
                            <Link to={"/register"}>
                                <Button label="Register" type="button" className='header-button'></Button>
                            </Link>
                        }
                        
                
            </div>
            
        </header>
    )


}

export default Header;