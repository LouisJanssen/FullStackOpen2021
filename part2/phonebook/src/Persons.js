import React from 'react'

const Persons = ({persons, filter, deleteName}) => {
    return (
        <ul className='numbers'>
        {filter !== "" 
        ? persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number} <button onClick={() => {deleteName(person.id)}}>Delete</button>
            </li>))
            .filter(person => person.key.includes(filter))
        : persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number} <button onClick={() => {deleteName(person.id)}}>Delete</button>
          </li>
        ))
        }
      </ul>
    )
}

export default Persons