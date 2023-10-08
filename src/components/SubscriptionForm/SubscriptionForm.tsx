import { useEffect, useRef } from 'react';
import './SubscriptionForm.css';
import Slider from '../Slider/Slider';
import { triggerNotification } from '../../types';

type SubscriptionFormProps = {
     handleSubscriptionFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
     handleSubscriptionFormSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
     handleSubscriptionFormSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
     handleEmailSliderChange: () => void;
     emailSliderActive: boolean | undefined;
     handleFreeTrialChange: () => void;
     freeTrial: boolean | undefined;
     formFilled: boolean;
     clearFormValues: () => void;
     triggerNotification: triggerNotification;
};

function SubscriptionForm(props: SubscriptionFormProps) {
     const formStartInputElement = useRef(null as HTMLInputElement | null);
     const dateInputElement = useRef(null as HTMLInputElement | null);

     useEffect(() => {
          const currentDate = new Date();
          props.clearFormValues();
          if (formStartInputElement.current) {
               formStartInputElement.current.focus();
          }
          if (dateInputElement.current && currentDate) {
               dateInputElement.current.valueAsDate = currentDate;
               const year = currentDate.getFullYear().toString();
               let month = currentDate.getMonth().toString();
               let day = currentDate.getDate().toString();
               if (parseInt(month) < 10) {
                    month = '0' + month;
               }
               if (parseInt(day) < 10) {
                    day = '0' + day;
               }
               dateInputElement.current.max = `${year}-${month}-${day}`;
          }
     }, []);

     return (
          <>
               <form onSubmit={props.handleSubscriptionFormSubmit} className="sub-form-container">
                    <h3>Subscription information</h3>
                    <div className="sub-form-section">
                         <label htmlFor="subscriptionName">Subscription name</label>
                         <input
                              ref={formStartInputElement}
                              type="text"
                              name="subscriptionName"
                              className="sub-form-input"
                              onChange={props.handleSubscriptionFormChange}
                              required
                         ></input>
                         <div className="error-message"></div>
                    </div>

                    <div className="sub-form-section">
                         <label htmlFor="dateAdded">Date subscribed</label>
                         <input
                              type="date"
                              name="dateAdded"
                              className="sub-form-input"
                              onChange={props.handleSubscriptionFormChange}
                              ref={dateInputElement}
                              required
                         ></input>
                         <div className="error-message"></div>
                    </div>

                    <div className="sub-form-section">
                         <label htmlFor="renewalDate">Renewal Date</label>
                         <input
                              type="date"
                              name="renewalDate"
                              className="sub-form-input"
                              onChange={props.handleSubscriptionFormChange}
                         ></input>
                         <div className="error-message"></div>
                    </div>

                    <div className="sub-form-section">
                         <label htmlFor="chargeAmount">Subscription cost per month</label>
                         <input
                              type="number"
                              step={0.01}
                              name="chargeAmount"
                              className="sub-form-input"
                              onChange={props.handleSubscriptionFormChange}
                              required
                         ></input>
                         <div className="error-message"></div>
                    </div>

                    <div className="sub-form-section">
                         <label htmlFor="category">Category</label>
                         <select
                              name="category"
                              className="sub-form-select"
                              onChange={props.handleSubscriptionFormSelectChange}
                         >
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
                         <Slider
                              sliderActive={props.emailSliderActive}
                              handleSliderClick={props.handleEmailSliderChange}
                         ></Slider>
                    </div>

                    <div className="sub-form-section">
                         <label>Free trial</label>
                         <Slider
                              sliderActive={props.freeTrial}
                              handleSliderClick={props.handleFreeTrialChange}
                         ></Slider>
                    </div>

                    <div className="sub-form-section">
                         <button disabled={!props.formFilled} type="submit" className="sub-form-button">
                              Add subscription
                         </button>
                    </div>
               </form>
          </>
     );
}

export default SubscriptionForm;
