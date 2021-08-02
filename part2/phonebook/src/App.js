import React, { useState } from "react";

const Filter = ({value, onChange}) => {
    return (
        <div>
            Filter shown with: <input value={value} onChange={onChange} />
        </div>
    )
}

const PersonForm = ({name, number, nameChange, numberChange, action}) => {
    return (
        <form onSubmit={action}>
        <div>
          name: <input value={name} onChange={nameChange} />
        </div>
        <div>
          number: <input value={number} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Persons = ({persons, filter}) => {
    return (
        <ul>
        {filter !== "" 
        ? persons.map((person) => (
            <li key={person.name}>{person.name} {person.number}</li>)).filter(person => person.key.includes(filter))
        : persons.map((person) => (
          <li key={person.name}>{person.name} {person.number}</li>
        ))
        }
      </ul>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
      { name: "Arto Hellas", number: "0123456789" },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };
    persons.map((person) => person.name).find((person) => person === newName)
      ? window.alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
};

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new number</h3>
      <PersonForm name={newName} number={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} action={addName}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;