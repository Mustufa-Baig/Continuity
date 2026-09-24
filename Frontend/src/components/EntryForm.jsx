import { useState } from 'react'

const EntryForm = ({ addEntry }) => {
  const [ newEntry, setNewEntry ] = useState('')
  const [ newTitle, setNewTitle ] = useState('')

  const handleEntry = (event) => {
    event.preventDefault()

    addEntry({
      title: newTitle,
      content: newEntry,
    })

    setNewEntry('')
    setNewTitle('')
  }
  return (
    <div className="box-border flex w-full justify-center">
      <form
        onSubmit={handleEntry}
        className="box-border flex w-full max-w-[900px] flex-col justify-center"
      >
        <input
          placeholder="Project Name"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          className="
            box-border
            w-full
            rounded-[10px]
            border-2
            border-solid
            border-black
            p-[5px]
            text-[24px]
          "
        />

        <textarea
          placeholder="new entry for Project..."
          value={newEntry}
          onChange={({ target }) => setNewEntry(target.value)}
          className="
            box-border
            min-h-[200px]
            w-full
            max-w-full
            resize-y
            rounded-[10px]
            border-2
            border-solid
            border-black
            p-[5px]
            text-[16px]
          "
        />

        <button
          type="submit"
          className="
            rounded-[10px]
            border-2
            border-solid
            border-gray-300
            text-[32px]
          "
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default EntryForm