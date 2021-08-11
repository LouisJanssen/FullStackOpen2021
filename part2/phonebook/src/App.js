import React, { useState, useEffect } from 'react'
import numberService from './services/Numbers'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import Footer from './Footer'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
    const filteredPerson = persons.filter((person) => person.name === newName)
    if(persons.map((person) => person.name).find((person) => person === newName)){
      if(window.confirm(`${newName} is already added to phonebook, do you want to change the number ?`)){
        numberService
          .update(filteredPerson[0].id, nameObject)
          .then(() => {
            numberService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
            setNewName("");
            setNewNumber("");
            setMessage(
              `${filteredPerson[0].name} number updated`
              )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(() => {
            setMessage(
              `Error: ${filteredPerson[0].name} already updated`
              )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
      else{
        setNewName("");
        setNewNumber("");        
      }
    }
    else{
      numberService
      .create(nameObject)
      .then(returnedPerson => {      
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessage(
          `${returnedPerson.name} added`
          )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    })
    .catch(() => {
      setMessage(
        `Error: ${filteredPerson[0].name} already added`
        )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    } 
  };

  const deleteName = (id) => {
    const filteredPerson = persons.filter((person) => person.id === id)
    const filteredName = filteredPerson[0].name
    const filteredId = filteredPerson[0].id
    if (window.confirm(`Do you want to delete ${filteredName} number ?`)){
      numberService
        .deleteNumber(filteredId)
        .then(() => {
          setPersons(persons.filter(person => person.id !== filteredId))
          setMessage(
            `${filteredName} deleted`
            )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          setMessage(
            `Error: ${filteredPerson[0].name} already deleted`
            )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div className='container'>
    <h2 className='Title'>Phonebook</h2>
      <div className='content'>
        <Notification message={message}/>
        <Filter value={filter} onChange={handleFilterChange} />
        <h3>Add a new number</h3>
        <PersonForm name={newName} number={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} action={addName}/>
        <h3>Numbers</h3>
        <Persons persons={persons} filter={filter} deleteName={deleteName}/>
      </div>
      <Footer />
    </div>
  );
};

export default App;