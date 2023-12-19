import { useState, useEffect } from 'react';
import personService from './services/persons.js'
const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown with: <input onChange={handleFilter} />
    </div>
  );
};
const PersonForm = ({
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};
const Persons = ({ persons, keyword }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(keyword.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');


  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    const newPerson = { name: newName, number: newNumber };
    
    personService
      .create(newPerson)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    setNewName('');
    setNewNumber('');
  };
  const handleFilter = (event) => {
    setKeyword(event.target.value);
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} keyword={keyword} />
    </div>
  );
};

export default App;
