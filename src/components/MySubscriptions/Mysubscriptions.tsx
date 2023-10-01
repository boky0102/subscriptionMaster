export interface Subscription {
    subscriptionName: string,
    renewalDate: Date,
    dateAdded: Date,
    chargeAmount: number,
    emailNotification?: boolean,
    id?: string
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