
const EntriesList = ({ entries }) => {
  return(
    <div className='Entries'>
      {entries.map(entry =>
        <div key={entry._id}>
          <h2>{entry.title}</h2>
          <pre className='RD'>{entry.content}</pre>
          <p>{new Date(entry.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

export default EntriesList