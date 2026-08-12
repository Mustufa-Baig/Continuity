import {useState} from 'react'

const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ newEntry, setNewEntry ] = useState('a new entry...')

  const addEntry = (event) => {
    event.preventDefault()

    const entryToAdd = {
      content: newEntry,
      id: String(entries.length + 1),
    }
    setEntries(entries.concat(entryToAdd))
    setNewEntry('')
  }


  const updateNewEntry = (event) => {
    setNewEntry(event.target.value)
  }

  return (
    <div>
      <form onSubmit={addEntry}>
        <input value={newEntry} onChange={updateNewEntry}/>
        <button type="submit">save</button>
      </form> 
      <ul>
        {entries.map(entry =>
          <li key={entry.id}>{entry.content}</li>
        )}
      </ul>
    </div>
  )
}

export default App