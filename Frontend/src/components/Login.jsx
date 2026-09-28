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
    <div className="bg-neutral-950 w-[50vw] h-[100vh] flex flex-col justify-between items-center text-white p-5 font-grotesk">
      <div className="flex justify-end w-full">
        <h3>Continuity Archive</h3>
      </div>
      <form className="flex flex-col items-end mt-5 w-full" onSubmit={loginUser}>
        <div className="flex justify-between items-end w-full">
          <div className=" w-full pr-10">
            <h1 className="text-5xl mb-10">Login</h1>
            <label className="flex flex-col">
              <span className="text-sm">Username</span>
              <input 
                className="bg-neutral-950 p-1 border-b-1 border-neutral-600 hocus:outline-none hocus:border-white"
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>

          <label className="flex flex-col w-full pl-10">
            <span className="text-sm">Password</span>
            <input
              className="bg-neutral-950 p-1 border-b-1 border-neutral-600 hocus:outline-none hocus:border-white"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
          
        </div>
        <div className="flex items-center justify-center mt-5 mb-10">
          { message==="invalid username or password" && <h1 className="text-red-500 mr-5" >{ message }</h1>}
          <button className="bg-neutral-950 w-25 p-1 rounded border border-neutral-200 hocus:bg-blue-300 hocus:text-black hocus:border-neutral-950" type="submit">login</button>
        </div>
      </form>
      <div className="flex flex-col items-end w-full">
        <h3>Dont have an account?</h3>
        <h2 className="text-blue-300">Sign up</h2>
      </div>
    </div>
  )
}

export default Login