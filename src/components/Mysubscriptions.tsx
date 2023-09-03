export interface Subscription {
    subscriptionName: string,
    renewalDate: Date,
    addedDate: Date,
    chargeAmount: number
}


type MySubscriptionProps = {
    subscriptionData: Subscription[]
}


export default function Mysubscriptions(props: MySubscriptionProps){

    return(
        <div>
            {
                props.subscriptionData.map((subscription) => {
                    return(
                        <div> {subscription.subscriptionName} - {subscription.chargeAmount}</div>
                    )
                })
            }
        </div>
    )
}