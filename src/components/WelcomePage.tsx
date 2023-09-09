import Header from "./Header";
import LoginForm from "./LoginForm";
import "./WelcomePage.css";

type WelcomePageProps =
 {
    route: "login" | "register"
};


export default function WelcomePage(props: WelcomePageProps){
    



    return(
        <div className="welcome-main-container">
            <Header type={props.route}></Header>
            <div className="welcome-content-container">
                <div className="welcome-form-container">
                    <LoginForm type={props.route === "login" ? "login" : "register"}></LoginForm>
                </div>
                <p className="welcome-text">
                    Subscription Master is a tool<br/> that enables you<br/> 
                    to take control over your
                    <br/>spending on subscriptions.<br/>
                    Easely manage your
                    <br/>
                    subscription spending and 
                    <br/>save some extra cash.<br/>
                </p>
            </div>
        </div>
    )
}