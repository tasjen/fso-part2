const Country = ({ country }) => {
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
    </>
  );
};

export default Country;
