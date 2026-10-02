import Sidebar from './Sidebar'
import Header from './Header'
import EntryForm from './EntryForm'

const CreateEntry = ({ user, addEntry, projectsList, handleLogout }) => {
  return (
    <div className="flex min-h-[100vh] h-full">
      <Sidebar />
      <div className="w-full h-full p-2 font-grotesk">
        <Header user={user} handleLogout={handleLogout}/>
        <EntryForm addEntry={addEntry} projectsList={projectsList}/>
      </div>
    </div>
  )
}

export default CreateEntry