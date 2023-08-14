import Button from './Button';
import './Header.css';
import { Link } from "react-router-dom";
import LogOutButton from './LogOutButton';

function Header(){

    return(
        <header id="header-container">
            <div className="header-buttons-container">
                <Link to={"/login"}>
                    <Button label="Login" type="button"></Button>
                </Link>
                <Link to={"/register"}>
                    <Button label="Register" type="button"></Button>
                </Link>
                <LogOutButton></LogOutButton>
            </div>
        </header>
    )


}

export default Header;