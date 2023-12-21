import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from './components/Countries.jsx';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  return (
    <>
      <div>
        find countries <input value={value} onChange={handleChange} />
      </div>
      <Countries filter={value} countries={countries} />
    </>
  );
}

export default App;
