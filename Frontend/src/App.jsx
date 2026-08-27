import { useEffect, useState } from 'react'
import axios from 'axios'
import './app.css'

const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ newEntry, setNewEntry ] = useState('')
  const [ newTitle, setNewTitle ] = useState('')

  useEffect(() => {
    axios
      .get('/api/entries')
      .then(response => {
        setEntries(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()

    const entryToAdd = {
      title: newTitle,
      content: newEntry,
    }

    axios
      .post('/api/entries', entryToAdd)
      .then(response => {
        setEntries([response.data, ...entries])
        setNewEntry('')
        setNewTitle('')
      })
      .catch(error => {
        console.log(error.response.data)
      })
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
          <div key={entry._id}>
            <h2>{entry.title}</h2>
            <pre className='RD'>{entry.content}</pre>
            <p>{new Date(entry.createdAt).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App