import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from './components/Countries.jsx';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState(null);
  const [showingCountry, setShowingCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    setShowingCountry(null);
  };
  const handleShow = (country) => {
    setShowingCountry(country);
  };

  return (
    <>
      <div>
        find countries <input value={value} onChange={handleChange} />
      </div>
      <Countries
        filter={value}
        countries={countries}
        showingCountry={showingCountry}
        handleShow={handleShow}
      />
    </>
  );
}

export default App;
