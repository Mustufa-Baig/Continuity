import {useState} from 'react'

const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ newEntry, setNewEntry ] = useState('a new entry...')
  const [ newTitle, setNewTitle ] = useState('')

  const addEntry = (event) => {
    event.preventDefault()

    const entryToAdd = {
      title: newTitle,
      content: newEntry,
      id: String(entries.length + 1),
      timestamp: new Date().toLocaleString(),
    }
    setEntries(entries.concat(entryToAdd))
    setNewEntry('')
    setNewTitle('')
  }

  const updateNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const updateNewEntry = (event) => {
    setNewEntry(event.target.value)
  }

  return (
    <div>
      <form onSubmit={addEntry}>
        <input value={newTitle} onChange={updateNewTitle}/>
        <textarea value={newEntry} onChange={updateNewEntry}/>
        <button type="submit">save</button>
      </form> 
      <div>
        {entries.map(entry =>
          <div key={entry.id}>
            <h2>{entry.title}</h2>
            <pre>{entry.content}</pre>
            <p>{entry.timestamp}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App