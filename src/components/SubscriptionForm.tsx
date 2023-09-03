

type SubscriptionFormProps = {
    handleSubscriptionFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubscriptionFormSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void
}



function SubscriptionForm(props: SubscriptionFormProps){

    return(
        <form onSubmit={props.handleSubscriptionFormSubmit}>
            <label>Subscription name</label>
            <input type="text" name="subscriptionName" onChange={props.handleSubscriptionFormChange}></input>

            <label>Date subscribed</label>
            <input type="date" name="startDate" onChange={props.handleSubscriptionFormChange}></input>

            <label>Renewal Date</label>
            <input type="date" name="renewalDate" onChange={props.handleSubscriptionFormChange}></input>

            <label>Subscription cost per month</label>
            <input type="number" name="chargeAmount" onChange={props.handleSubscriptionFormChange}></input>
            <button type="submit">Add subscription</button>
        </form>
    )
}

export default SubscriptionForm