import Sidebar from './Sidebar'
import BlockGraph from './BlockGraph'
import AttentionGraph from './AttentionGraph'
import Header from './Header'
import EntriesList from './EntriesList'

const AllEntries = ({ user, entries, graphData, handleLogout }) => {
  return (
    <div className="flex min-h-[100vh] h-full">
      <Sidebar />
      <div className="w-full h-full p-2">
        <Header user={user} handleLogout={handleLogout}/>
        <div className="p-1 bg-neutral-300 rounded-sm mt-1">
	        <h1 className="text-2xl italic font-grotesk my-2 ml-1">All Entries</h1>
	        <EntriesList entries={entries}/>
	    </div>
      </div>
    </div>
  )
}

export default AllEntries