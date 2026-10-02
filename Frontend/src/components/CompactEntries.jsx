import { Link } from "react-router-dom";

const CompactEntries = ({ entries }) => {
  return(
    <div className="bg-neutral-200 p-2 rounded-xs font-grotesk box-border">
      <div className="flex justify-between items-center">
        <h1 className="ml-2 text-black">Recent Entries</h1>
        
        <button className="bg-neutral-900 p-1 mb-2 rounded-xs hocus:bg-blue-400 text-neutral-100"><Link to="/entries">Read All</Link></button>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {entries.map((entry) => (
        <div key={entry.id}
          className="
            flex
               [&:nth-child(n+2)]:hidden
            sm:[&:nth-child(n+2)]:flex

            sm:[&:nth-child(n+3)]:hidden
            lg:[&:nth-child(n+3)]:flex
            
            lg:[&:nth-child(n+4)]:hidden
            xl:[&:nth-child(n+4)]:flex

            xl:[&:nth-child(n+5)]:hidden

            w-full h-[200px] min-w-0 flex-col overflow-hidden
            rounded-xs bg-neutral-800 p-[10px] justify-between
          "
        >
            <div className="flex justify-between items-center gap-2 min-w-0">
              <h2 className="w-[60%] block min-w-0 p-1 pl-3 rounded-xs truncate font-thin text-lg italic bg-neutral-100">
                {entry.project.title}
              </h2>
              <p className="max-w-[40%] shrink-0 font-thin text-sm truncate text-neutral-400">
                {new Date(entry.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <p className="w-full whitespace-pre-line overflow-hidden text-neutral-400 font-thin pl-1 flex-1 min-h-0 my-1">
              {entry.content}
            </p>


            <div className="flex justify-between items-center gap-2 min-w-0">
              <h3 className="min-w-0 ml-1 truncate text-neutral-500 text-sm">
                {entry.user.username}
              </h3>
              <button className="bg-neutral-100 p-1 rounded-xs shrink-0 hocus:bg-blue-400 hocus:text-neutral-100">
                <Link to={"/entries#"+entry.id}>read</Link>
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default CompactEntries