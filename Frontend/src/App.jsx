import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

import Login from './components/Login'

import Dashboard from './components/Dashboard'
import CreateEntry from './components/CreateEntry'
import AllEntries from './components/AllEntries'
import ProtectedRoute from './components/ProtectedRoute'

import card from './assets/card2.jpg';

import entriesService from './services/entries'
import projectsService from './services/projects'
import loginService from './services/login'

const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ projectsList, setProjectsList ] = useState([])
  const [ graphData, setGraphData ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ message, setMessage ] = useState(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedContinuityUser')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      setUser(savedUser)
      entriesService.setToken(savedUser.token)
      projectsService.setToken(savedUser.token)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user){
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

      projectsService
        .getAll()
        .then(data => {
          setProjectsList(data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [ user ] )

  const addEntry = (entryToAdd) => {
    entriesService
      .create(entryToAdd)
      .then(data => {
        setEntries([data, ...entries])
        navigate('/')
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
        projectsService.setToken(user.token)
        setUser(user)
        entriesService
          .getAll()
          .then(data => {
            setEntries(data)
          })
          .catch(error => {
            console.log(error)
          })
          navigate('/')
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
    projectsService.setToken(null)
    navigate('/login')
  }


  return (
    
      <Routes>

        <Route path="/login" element={
          <div className="flex justify-end h-screen items-center bg-neutral-950">
            <h1 className="absolute bottom-[8vh] left-[3vw] font-grotesk text-neutral-100 text-shadow-md text-shadow-olive-700 text-4xl">Zero effort<br/>Project Tracking</h1>
            <div className="flex justify-start items-center w-[50vw] h-[100vh]">
              <img src={card} className="w-[45vw] h-[95vh] object-cover rounded-xl ml-4"/>
            </div>
            <Login handleLogin={handleLogin} message={message}/>
          </div>
        } />

        
        <Route path="/" element={ 
          <ProtectedRoute user={user} loading={loading}>
            <Dashboard user={user} entries={entries} projectsList={projectsList} graphData={graphData} handleLogout={handleLogout} /> 
          </ProtectedRoute>
        } />
        
        <Route path="/create" element={
          <ProtectedRoute user={user} loading={loading}>
            <CreateEntry user={user} addEntry={addEntry} projectsList={projectsList} handleLogout={handleLogout} />
          </ProtectedRoute>
        } />

        <Route path="/entries" element={
          <ProtectedRoute user={user} loading={loading}>
            <AllEntries user={user} entries={entries} graphData={graphData} handleLogout={handleLogout} /> 
          </ProtectedRoute>
        } />
    
      </Routes>
    
  )

}

export default App