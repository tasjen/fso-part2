import { useState } from 'react';
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [keyword, setKeyword] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
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
