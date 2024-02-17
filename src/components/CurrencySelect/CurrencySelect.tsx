import { CurrenciesObj } from '../../types';
import currencies from '../../utility/Common-Currency.json';

type CurrencySelectProps = {
     handleCurrencySelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
     currentCurrency: keyof CurrenciesObj;
};

export default function CurrencySelect(props: CurrencySelectProps) {
     return (
          <select
               className="sub-form-select currency-select"
               onChange={props.handleCurrencySelectChange}
               value={props.currentCurrency}
               name="currency-select"
          >
               {props.currentCurrency !== undefined && (
                    <option value={currencies[props.currentCurrency].code} key={currencies[props.currentCurrency].code}>
                         {currencies[props.currentCurrency].code} - {currencies[props.currentCurrency].symbol}
                    </option>
               )}

               {(Object.keys(currencies) as Array<keyof typeof currencies>).map((currency) => {
                    if (currencies[currency].code !== props.currentCurrency) {
                         return (
                              <option value={currencies[currency].code} key={currencies[currency].code}>
                                   {currencies[currency].code} - {currencies[currency].symbol}
                              </option>
                         );
                    }
               })}
          </select>
     );
}
