import { useState, useEffect } from 'react';
import personService from './services/persons.js';
import Filter from './components/Filter.jsx';
import PersonForm from './components/PersonForm.jsx';
import Persons from './components/Persons.jsx';
import Notification from './components/Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notiMessage, setNotiMessage] = useState({ text: null, type: '' });

  useEffect(() => {
    personService
      .getAll()
      .then((returnedPersons) => setPersons(returnedPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const alrAdded = persons.find((e) => e.name === newName);

    if (alrAdded) {
      if (
        confirm(`${newName} is already added to phonebook
      , replace the old number with a new one?`)
      ) {
        personService
          .update(alrAdded.id, { ...alrAdded, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((e) => (e.id !== alrAdded.id ? e : returnedPerson))
            );
            setNotiMessage({
              text: `Added ${returnedPerson.name}`,
              type: '',
            });
            setTimeout(() => setNotiMessage({ text: null, type: '' }), 5000);
          })
          .catch(() => {
            setNotiMessage({
              text: `Information of ${alrAdded.name} has already been removed from server`,
              type: 'error',
            });
            setTimeout(() => setNotiMessage({ text: null, type: '' }), 5000);
            setPersons(persons.filter((p) => p.id !== alrAdded.id));
          });
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setNotiMessage({ text: `Added ${returnedPerson.name}`, type: '' });
          setTimeout(() => setNotiMessage({ text: null, type: '' }), 5000);
        });
      setNewName('');
      setNewNumber('');
    }
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
  const handleDelete = (id) => {
    if (confirm(`Delete ${persons.find((e) => e.id === id).name}`)) {
      personService
        .del(id)
        .then(() => setPersons(persons.filter((e) => e.id !== id)))
        .catch(() => setPersons(persons.filter((e) => e.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notiMessage={notiMessage} />
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
      <Persons
        persons={persons}
        keyword={keyword}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
