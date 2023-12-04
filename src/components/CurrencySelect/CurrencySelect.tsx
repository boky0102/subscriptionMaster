import currencies from '../../utility/Common-Currency.json';

type CurrencySelectProps = {
     handleCurrencySelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function CurrencySelect(props: CurrencySelectProps) {
     return (
          <select className="sub-form-select currency-select" onChange={props.handleCurrencySelectChange}>
               {(Object.keys(currencies) as Array<keyof typeof currencies>).map((currency) => (
                    <option value={currencies[currency].code} key={currencies[currency].code}>
                         {currencies[currency].code} - {currencies[currency].symbol}
                    </option>
               ))}
          </select>
     );
}
