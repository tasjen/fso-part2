import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons(persons.concat({name: newName}));
    setNewName('');

  }
  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>
          {person.name}
        </p>)}
    </div>
  )
}

export default App