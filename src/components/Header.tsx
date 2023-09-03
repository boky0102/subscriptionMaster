import Button from './Button';
import './Header.css';
import { Link } from "react-router-dom";
import LogOutButton from './LogOutButton';

type HeaderProps = {
    userLogged: boolean,
    loggedFlagHandler: (logged: boolean) => void
}

function Header(props: HeaderProps){

    return(
        <header id="header-container">
            <div className="header-buttons-container">
                {
                   !props.userLogged && 
                   <>
                        <Link to={"/login"}>
                            <Button label="Login" type="button"></Button>
                        </Link>
                        <Link to={"/register"}>
                            <Button label="Register" type="button"></Button>
                        </Link>
                    </>
                }
                {
                    props.userLogged &&
                    <>
                        <LogOutButton loggedFlagHandler={props.loggedFlagHandler}></LogOutButton>
                    </>
                }
                
                
            </div>
        </header>
    )


}

export default Header;