import React from 'react'

const PersonForm = ({name, number, nameChange, numberChange, action}) => {
    return (
        <form onSubmit={action} className='numberForm'>
        <div className='entryForm'>
          Name: <input value={name} onChange={nameChange} />
        </div>
        <div className='entryForm'>
          Number: <input value={number} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default PersonForm