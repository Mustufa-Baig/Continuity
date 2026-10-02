import Sidebar from './Sidebar'
import BlockGraph from './BlockGraph'
import AttentionGraph from './AttentionGraph'
import Header from './Header'
import CompactEntries from './CompactEntries'
import ProjectsList from './ProjectsList'

const Dashboard = ({ user, entries, projectsList, graphData, handleLogout }) => {
  return (
    <div className="flex min-h-[100vh] h-full">
      <Sidebar />
      <div className="w-full h-full p-2">
        <Header user={user} handleLogout={handleLogout}/>
        <div className="flex my-1">
          <BlockGraph data={graphData}/>
          <AttentionGraph />
        </div>
        <CompactEntries entries={entries}/>
        <ProjectsList projectsList={projectsList}/>
      </div>
    </div>
  )
}

export default Dashboard