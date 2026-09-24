
const EntriesList = ({ entries }) => {
  return(
    <div className="grid w-full grid-cols-1 gap-5 box-border sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex w-full min-w-0 flex-col overflow-hidden rounded-[20px] border-2 border-gray-300 p-[10px] box-border"
        >
          <h2 className="min-w-0 max-w-full break-words">{entry.title}</h2>

          <pre className="min-w-0 max-w-full whitespace-pre-wrap break-words text-red-500">
            {entry.content}
          </pre>

          <h3 className="min-w-0 max-w-full break-words text-gray-500">{entry.user.username}</h3>

          <p className="min-w-0 max-w-full break-words">
            {new Date(entry.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default EntriesList