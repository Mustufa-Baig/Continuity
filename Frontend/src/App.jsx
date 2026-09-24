import { useEffect, useState } from 'react'
import axios from 'axios'

import EntryForm from './components/EntryForm'
import EntriesList from './components/EntriesList'
import Header from './components/Header'
import Login from './components/Login'

import entriesService from './services/entries'
import loginService from './services/login'

const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedContinuityUser')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      setUser(savedUser)
      entriesService.setToken(savedUser.token)
      
      entriesService
        .getAll()
        .then(data => {
          setEntries(data)
        })
        .catch(error => {
          console.log(error)
        })
    }
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


  const handleLogin = (credentials) => {
    loginService
      .login(credentials)
      .then(user => {
        window.localStorage.setItem(
          'loggedContinuityUser', JSON.stringify(user)
        )
        entriesService.setToken(user.token)
        setUser(user)
        entriesService
          .getAll()
          .then(data => {
            setEntries(data)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error.response.data.error)
        setMessage(error.response.data.error)

        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
  }


  const handleLogout = async event => {
    event.preventDefault()

    window.localStorage.removeItem('loggedContinuityUser')
    setUser(null)
    entriesService.setToken(null)
  }

  if (!user){
    return(
      <div className="flex flex-col items-center justify-between h-screen">
        <h1>Continuity</h1>
        <Login handleLogin={handleLogin} message={message}/>
        <h1>Mirza Mustafa 2026</h1>
      </div>
    )
  }
  return (
    <div>
      <Header user={user} handleLogout={handleLogout}/>
      <EntryForm addEntry={addEntry}/>
      <EntriesList entries={entries}/>
    </div>
  )
}

export default App