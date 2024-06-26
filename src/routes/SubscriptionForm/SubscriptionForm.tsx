import { useEffect, useRef } from 'react';
import './SubscriptionForm.css';
import Slider from '../../components/Slider/Slider';
import { CurrenciesObj, triggerNotification } from '../../types';
import AreaYearDiffChart from '../../components/charts/AreaYearDiffChart';
import { calculateIncreasedPercentage } from '../../utility/math.utility';

type ChartData = {
     month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
     totalCostForMonth: number;
};

type ChartYearData = {
     year: number;
     totalCostForYear: number;
};

type SubscriptionFormProps = {
     handleSubscriptionFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
     handleSubscriptionFormSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
     handleSubscriptionFormSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
     handleEmailSliderChange: () => void;
     emailSliderActive: boolean | undefined;
     handleFreeTrialChange: () => void;
     freeTrial: boolean | undefined;
     formFilled: boolean;
     triggerNotification: triggerNotification;
     currencies: CurrenciesObj;
     preferredCurrency: keyof CurrenciesObj;
     areaChartData?: ChartData[] | ChartYearData[];
     areaDiffChartData?: ChartData[] | ChartYearData[];
     newExpenseAmount?: number;
     expenses?: number;
};

function SubscriptionForm(props: SubscriptionFormProps) {
     const formStartInputElement = useRef(null as HTMLInputElement | null);
     const dateInputElement = useRef(null as HTMLInputElement | null);
     const currencySelectElement = useRef(null as HTMLSelectElement | null);

     useEffect(() => {
          const currentDate = new Date();
          if (formStartInputElement.current) {
               formStartInputElement.current.focus();
          }
          if (dateInputElement.current && currentDate) {
               dateInputElement.current.valueAsDate = currentDate;
               const year = currentDate.getFullYear().toString();
               let month = (currentDate.getMonth() + 1).toString();
               let day = currentDate.getDate().toString();
               if (parseInt(month) < 10) {
                    month = '0' + month;
               }
               if (parseInt(day) < 10) {
                    day = '0' + day;
               }
               dateInputElement.current.max = `${year}-${month}-${day}`;
          }

          console.log(props.preferredCurrency);
     }, []);

     return (
          <div className="add-sub-main-container">
               <form onSubmit={props.handleSubscriptionFormSubmit} className="sub-form-container">
                    <h3>Subscription information</h3>
                    <div className="sub-form-section">
                         <label htmlFor="subscription-form-name">Subscription name</label>
                         <input
                              ref={formStartInputElement}
                              type="text"
                              id="subscription-form-name"
                              name="subscriptionName"
                              className="sub-form-input"
                              onChange={props.handleSubscriptionFormChange}
                              required
                         ></input>
                         <div className="error-message"></div>
                    </div>

                    <div className="sub-form-section">
                         <label htmlFor="subscription-form-datesub">Date subscribed</label>
                         <input
                              type="date"
                              name="dateAdded"
                              id="subscription-form-datesub"
                              className="sub-form-input"
                              onChange={props.handleSubscriptionFormChange}
                              ref={dateInputElement}
                              required
                         ></input>
                         <div className="error-message"></div>
                    </div>

                    <div className="sub-form-section">
                         <label htmlFor="subscription-form-renewDate">Renewal Date</label>
                         <input
                              type="date"
                              id="subscription-form-renewDate"
                              name="renewalDate"
                              className="sub-form-input"
                              onChange={props.handleSubscriptionFormChange}
                         ></input>
                         <div className="error-message"></div>
                    </div>

                    <div className="sub-form-section two-part">
                         <div className="select-form-left">
                              <label htmlFor="subscription-form-amount">Monthly cost</label>
                              <input
                                   type="number"
                                   step={0.01}
                                   id="subscription-form-amount"
                                   name="chargeAmount"
                                   className="sub-form-input"
                                   onChange={props.handleSubscriptionFormChange}
                                   required
                              ></input>
                              <div className="error-message"></div>
                         </div>

                         <div className="select-form-right">
                              <label htmlFor="subscription-form-currency">Currency</label>
                              <select
                                   name="currency"
                                   id="subscription-form-currency"
                                   className="sub-form-select"
                                   onChange={props.handleSubscriptionFormSelectChange}
                                   ref={currencySelectElement}
                              >
                                   {props.preferredCurrency && (
                                        <option
                                             key={props.currencies[props.preferredCurrency].code}
                                             value={props.currencies[props.preferredCurrency].code}
                                        >
                                             {props.currencies[props.preferredCurrency].code}
                                        </option>
                                   )}

                                   {(Object.keys(props.currencies) as Array<keyof typeof props.currencies>).map(
                                        (currency) => {
                                             if (currency !== props.preferredCurrency) {
                                                  return (
                                                       <option value={currency} key={currency}>
                                                            {currency}
                                                       </option>
                                                  );
                                             }
                                        },
                                   )}
                              </select>
                         </div>
                    </div>

                    <div className="sub-form-section">
                         <label htmlFor="subscription-form-category">Category</label>
                         <select
                              name="category"
                              className="sub-form-select"
                              onChange={props.handleSubscriptionFormSelectChange}
                              id="subscription-form-category"
                         >
                              <option value={undefined}></option>
                              <option value="Streaming">Streaming service</option>
                              <option value="Gaming">Gaming</option>
                              <option value="Clothing">Clothing</option>
                              <option value="Food">Food</option>
                              <option value="Utility">Utility</option>
                              <option value="Education">Education</option>
                              <option value="Software">Software</option>
                              <option value="Other">Other</option>
                         </select>
                    </div>

                    <div className="sub-form-section  sub-form-slider">
                         <label>Email notification</label>
                         <Slider
                              sliderActive={props.emailSliderActive}
                              handleSliderClick={props.handleEmailSliderChange}
                         ></Slider>
                    </div>

                    <div className="sub-form-section sub-form-slider">
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
               <div className="area-diff-container">
                    <div className="area-diff-chart">
                         <h3>Prediction chart</h3>
                         <AreaYearDiffChart
                              chartData={props.areaChartData && props.areaChartData}
                              newChartData={props.areaDiffChartData && props.areaDiffChartData}
                              timeFrame={2024}
                              height={300}
                         ></AreaYearDiffChart>
                    </div>
                    <div>
                         <h2>Expense change</h2>
                         <div>
                              <span>Total cost for year</span>
                              <span className="total-cost-number">
                                   {props.newExpenseAmount && props.newExpenseAmount}
                              </span>
                         </div>
                         <div>
                              <span>Total cost without addition</span>
                              <span className="total-cost-number">{props.expenses && props.expenses}</span>
                         </div>
                         <div>
                              <span>Increase</span>
                              <span className="total-cost-number">
                                   {props.expenses && props.newExpenseAmount && props.newExpenseAmount - props.expenses}
                              </span>
                              <span className="total-cost-number">
                                   {props.expenses &&
                                        props.newExpenseAmount &&
                                        calculateIncreasedPercentage(props.expenses, props.newExpenseAmount)}
                                   %
                              </span>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default SubscriptionForm;
