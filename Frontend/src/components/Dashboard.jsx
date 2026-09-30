import Sidebar from './Sidebar'
import BlockGraph from './BlockGraph'
import AttentionGraph from './AttentionGraph'
import Header from './Header'
import EntriesList from './EntriesList'

const Dashboard = ({ user, entries, graphData, handleLogout }) => {
  return (
    <div className="flex min-h-[100vh] h-full">
      <Sidebar />
      <div className="w-full h-full">
        <Header user={user} handleLogout={handleLogout}/>
        <div className="flex *:mx-1 my-1">
          <BlockGraph data={graphData}/>
          <AttentionGraph />
        </div>
        <EntriesList entries={entries}/>
      </div>
    </div>
  )
}

export default Dashboard