import { useEffect, useState } from 'react'
import axios from 'axios'
import './app.css'
import EntryForm from './components/EntryForm'
import EntriesList from './components/EntriesList'
import entriesService from './services/entries'

const App = () => {
  const [ entries, setEntries ] = useState([])

  useEffect(() => {
    entriesService
      .getAll()
      .then(data => {
        setEntries(data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }, [])

  const addEntry = (entryToAdd) => {
    entriesService
      .create(entryToAdd)
      .then(data => {
        setEntries([data, ...entries])
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }


  return (
    <div>
      <EntryForm addEntry={addEntry}/>
      <EntriesList entries={entries}/>
    </div>
  )
}

export default App