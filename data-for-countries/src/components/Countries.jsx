const Countries = ({ filter, countries }) => {
  if (!filter || !countries) return null;
  const results = countries.filter((e) => {
    return e.name.common.toLowerCase().includes(filter.toLowerCase());
  });

  return results.length <= 10 ? (
    <ul>
      {results.map((e) => (
        <li key={e.ccn3}>{e.name.common}</li>
      ))}
    </ul>
  ) : (
    <p>Too many matches, specify another filter</p>
  );
};

export default Countries;
