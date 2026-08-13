import {useState} from 'react'
import './app.css'

const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ newEntry, setNewEntry ] = useState('')
  const [ newTitle, setNewTitle ] = useState('')

  const addEntry = (event) => {
    event.preventDefault()

    const entryToAdd = {
      title: newTitle,
      content: newEntry,
      id: String(entries.length + 1),
      timestamp: new Date().toLocaleString(),
    }
    setEntries([entryToAdd , ...entries])
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
      <div className='FormHolder'>
        <form onSubmit={addEntry} className='Entry'>
          <input placeholder='Project Name' value={newTitle} onChange={updateNewTitle}/>
          <textarea placeholder='new entry for Project...' value={newEntry} onChange={updateNewEntry}/>
          <button type="submit">Save</button>
        </form>
      </div>
      <div className='Entries'>
        {entries.map(entry =>
          <div key={entry.id}>
            <h2>{entry.title}</h2>
            <pre className='RD'>{entry.content}</pre>
            <p>{entry.timestamp}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App