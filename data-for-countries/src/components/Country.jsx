const Weather = ({ weather }) => {
  return (
    <>
      <p>
        temperature {weather ? weather.current.temp_c : 'loading...'} Celcius
      </p>
      <div>
        <img src={weather ? weather.current.condition.icon : '#'} />
      </div>
      <p>
        wind{' '}
        {weather
          ? Math.round((5 / 18) * weather.current.wind_kph * 100) / 100
          : 'loading...'}{' '}
        m/s
      </p>
    </>
  );
};
const Country = ({ country, capitalWeather }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((e, index) => (
          <li key={index + 1}>{e}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt='flag' />
      <h1>Weather in {country.capital[0]}</h1>
      <Weather weather={capitalWeather} />
    </>
  );
};

export default Country;
