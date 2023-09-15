import NotificationMessage from './NotificationMessage';
import './SubscriptionForm.css';


interface Notification {
    message: string | undefined,
    notificationType: "success" | "error" | "warning" | undefined
}

type SubscriptionFormProps = {
    handleSubscriptionFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubscriptionFormSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void,
    notification?: Notification
}





function SubscriptionForm(props: SubscriptionFormProps){

    return(
        <>
        <form onSubmit={props.handleSubscriptionFormSubmit} className="sub-form-container">
            <div className="sub-form-section">
                <label>Subscription name</label>
                <input type="text" name="subscriptionName" className="sub-form-input" onChange={props.handleSubscriptionFormChange}></input>
                <div className='error-message'></div>
            </div>
            
            <div className="sub-form-section">
                <label>Date subscribed</label>
                <input type="date" name="startDate" className="sub-form-input" onChange={props.handleSubscriptionFormChange}></input>
                <div className='error-message'></div>
            </div>
            
            <div className="sub-form-section">
                <label>Renewal Date</label>
                <input type="date" name="renewalDate" className="sub-form-input" onChange={props.handleSubscriptionFormChange}></input>
                <div className='error-message'></div>
            </div>
            
            <div className="sub-form-section">
                <label>Subscription cost per month</label>
                <input type="number" name="chargeAmount" className="sub-form-input" onChange={props.handleSubscriptionFormChange}></input>
                <div className='error-message'></div>
            </div>
            
            <div className="sub-form-section">
                <button type="submit" className='sub-form-button'>Add subscription</button>
            </div>

            <NotificationMessage message={props.notification?.message} notificationType={props.notification?.notificationType}></NotificationMessage>            
        </form>
        </>
    )
}

export default SubscriptionForm