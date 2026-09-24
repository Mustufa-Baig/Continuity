import { useState } from 'react'

const Login = ({ handleLogin, message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div className="bg-gray-400 w-sm p-5 rounded-xl shadow-xl/20 flex flex-col items-center">
      <h2>Log in</h2>
      <form className="flex flex-col items-end mt-5" onSubmit={loginUser}>
        <div>
          <label>
            Username
            <input 
              className="bg-gray-300 rounded ml-5 mb-2 p-1"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              className="bg-gray-300 rounded ml-6 p-1"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        { message==="invalid username or password" && <h1 className="text-red-600" >{ message }</h1>}
        <button className="bg-gray-200 hover:bg-blue-400 p-1 rounded border mt-5" type="submit">login</button>
      </form>
    </div>
  )
}

export default Login