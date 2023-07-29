import Button from "./Button";
import './Header.css';

function Header(){

    return(
        <header id="header-container">
            <div id="logo"> Subscription Master </div>
            <div id="buttons-container">
                <div>
                    <Button label="Login"></Button>
                </div>
                <div>
                    <Button label="Register"></Button>
                </div>
            </div>
        </header>
    )


}

export default Header;