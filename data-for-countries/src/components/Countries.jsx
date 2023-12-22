const Countries = ({ countries, handleShow }) => {
  return countries.length <= 10 ? (
    <ul>
      {countries.map((e, index) => (
        <li key={index + 1}>
          <p>{e.name.common}</p>
          <button onClick={() => handleShow(e)}>show</button>
        </li>
      ))}
    </ul>
  ) : (
    <p>Too many matches, specify another filter</p>
  );
};

export default Countries;
