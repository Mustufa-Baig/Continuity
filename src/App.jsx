import {useState} from 'react'

const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ newEntry, setNewEntry ] = useState('a new entry...')

  const addEntry = (event) => {
    event.preventDefault()

    const entryToAdd = {
      content: newEntry,
      id: String(entries.length + 1),
      timestamp: new Date().toLocaleString(),
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
        <textarea value={newEntry} onChange={updateNewEntry}/>
        <button type="submit">save</button>
      </form> 
      <div>
        {entries.map(entry =>
          <pre key={entry.id}>{entry.content} : {entry.timestamp}</pre>
        )}
      </div>
    </div>
  )
}

export default App