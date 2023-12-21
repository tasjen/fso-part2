import Country from './Country.jsx';

const Countries = ({ filter, countries }) => {
  if (countries === null) return <p>fetching data...</p>;
  if (filter === '') return null;
  const results = countries.filter((e) => {
    return e.name.common.toLowerCase().includes(filter.toLowerCase());
  });
  return results.length === 1
    ? <Country country={results[0]} />
    : results.length <= 10
    ? (
      <ul>
        {results.map((e) => (
          <li key={e.ccn3}>{e.name.common}</li>
        ))}
      </ul>
    )
    : <p>Too many matches, specify another filter</p>
};

export default Countries;
