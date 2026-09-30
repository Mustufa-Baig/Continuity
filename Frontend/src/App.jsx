import { useEffect, useState } from 'react'
import axios from 'axios'

import EntryForm from './components/EntryForm'
import EntriesList from './components/EntriesList'
import Header from './components/Header'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import BlockGraph from './components/BlockGraph'
import AttentionGraph from './components/AttentionGraph'

import card from './assets/card2.jpg';

import entriesService from './services/entries'
import loginService from './services/login'

const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ graphData, setGraphData ] = useState([])
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

      entriesService
        .dailyStats()
        .then(data => {
          setGraphData(data)
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
      <div className="flex justify-end h-screen items-center bg-neutral-950">
        <h1 className="absolute bottom-[8vh] left-[3vw] font-grotesk text-neutral-100 text-shadow-md text-shadow-olive-700 text-4xl">Zero effort<br/>Project Tracking</h1>
        <div className="flex justify-start items-center w-[50vw] h-[100vh]">
          <img src={card} className="w-[45vw] h-[95vh] object-cover rounded-xl ml-4"/>
        </div>
        <Login handleLogin={handleLogin} message={message}/>
      </div>
    )
  }
  
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="w-full h-full">
        <Header user={user} handleLogout={handleLogout}/>
        <div className="flex *:mx-1 my-1">
          <BlockGraph data={graphData}/>
          <AttentionGraph />
        </div>
        <EntryForm addEntry={addEntry}/>
        <EntriesList entries={entries}/>
      </div>
    </div>
  )
}

export default App