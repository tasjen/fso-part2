import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from './components/Countries.jsx';
import Country from './components/Country.jsx';
const api_key = import.meta.env.VITE_SOME_KEY;

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState(null);
  const [showingCountry, setShowingCountry] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [capitalWeather, setCapitalWeather] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    if (searchResult.length === 1) {
      handleShow(searchResult[0]);
    } else {
      setShowingCountry(null);
      setCapitalWeather(null);
    }
  }, [searchResult]);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (!countries) return;
    setSearchResult(
      countries.filter((e) =>
        e.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleShow = (country) => {
    setShowingCountry(country);
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital[0]}`
      )
      .then((response) => setCapitalWeather(response.data));
  };

  return (
    <>
      <div>
        find countries <input value={value} onChange={handleChange} />
      </div>
      {countries === null ? (
        <p>fetching data...</p>
      ) : value === '' ? (
        <></>
      ) : showingCountry === null ? (
        <Countries countries={searchResult} handleShow={handleShow} />
      ) : (
        <Country country={showingCountry} capitalWeather={capitalWeather} />
      )}
    </>
  );
}

export default App;
