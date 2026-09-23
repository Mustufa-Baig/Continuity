import { useState } from 'react'

const EntryForm = ({ addEntry }) => {
  const [ newEntry, setNewEntry ] = useState('')
  const [ newTitle, setNewTitle ] = useState('')

  const handleEntry = (event) => {
    event.preventDefault()

    addEntry({
      title: newTitle,
      content: newEntry,
    })

    setNewEntry('')
    setNewTitle('')
  }
  return (
    <div className='FormHolder'>
      <form onSubmit={handleEntry} className='Entry'>
        <input placeholder='Project Name' value={newTitle} 
          onChange={({ target }) => setNewTitle(target.value)}
        />
        <textarea placeholder='new entry for Project...' value={newEntry} 
          onChange={({ target }) => setNewEntry(target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EntryForm