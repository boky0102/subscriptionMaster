import { useEffect, useRef } from 'react';
import './SubscriptionForm.css';
import Slider from '../Slider/Slider';


type SubscriptionFormProps = {
    handleSubscriptionFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubscriptionFormSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void,
    handleSubscriptionFormSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    handleSliderChange: () => void,
    sliderActive: boolean | undefined,
    formFilled: boolean,
    clearFormValues: () => void
}


function SubscriptionForm(props: SubscriptionFormProps){

    const formStartInputElement = useRef(null as HTMLInputElement | null);

    useEffect(() => {
        props.clearFormValues();
        if(formStartInputElement.current){
            formStartInputElement.current.focus();
        }
    }, []);


    return(
        <>
        <form onSubmit={props.handleSubscriptionFormSubmit} className="sub-form-container">
            <div className="sub-form-section">
                <label htmlFor='subscriptionName'>Subscription name</label>
                <input ref={formStartInputElement} type="text" name="subscriptionName" className="sub-form-input" onChange={props.handleSubscriptionFormChange} required></input>
                <div className='error-message'></div>
            </div>
            
            <div className="sub-form-section">
                <label htmlFor='dateAdded'>Date subscribed</label>
                <input type="date" name="dateAdded" className="sub-form-input" onChange={props.handleSubscriptionFormChange} required></input>
                <div className='error-message'></div>
            </div>
            
            <div className="sub-form-section">
                <label htmlFor='renewalDate'>Renewal Date</label>
                <input type="date" name="renewalDate" className="sub-form-input" onChange={props.handleSubscriptionFormChange}></input>
                <div className='error-message'></div>
            </div>
            
            <div className="sub-form-section">
                <label htmlFor='chargeAmount'>Subscription cost per month</label>
                <input type="number" step={0.01} name="chargeAmount" className="sub-form-input" onChange={props.handleSubscriptionFormChange} required></input>
                <div className='error-message'></div>
            </div>

            <div className='sub-form-section'>
                <label htmlFor='category'>Category</label>
                <select name="category" className='sub-form-select' onChange={props.handleSubscriptionFormSelectChange}>
                    <option value="Streaming service">Streaming service</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="Utility">Utility</option>
                    <option value="Education">Education</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="sub-form-section">
                <label>Email notification</label>
                <Slider sliderActive={props.sliderActive} handleSliderClick={props.handleSliderChange}></Slider>
            </div>
            
            <div className="sub-form-section">
                <button disabled={!props.formFilled} type="submit" className='sub-form-button'>Add subscription</button>
            </div>
            
          
        </form>
        </>
    )
}

export default SubscriptionForm