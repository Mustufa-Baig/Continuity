import { useState } from 'react'

const EntryForm = ({ addEntry }) => {
  const [newEntry, setNewEntry] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [projectFocused, setProjectFocused] = useState(false)

  const projectSuggestions = [
    'Portfolio',
    'Blog',
    'Todo App',
    'E-commerce',
    'Notes App',
    'Dashboard',
  ]

  const filteredSuggestions = projectSuggestions.filter((project) =>
    project.toLowerCase().includes(newTitle.toLowerCase())
  )

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
    <div className="w-full pr-1">
      <form
        onSubmit={handleEntry}
        className="w-full"
      >
        <div className="flex justify-between items-center">
          <div
            className="relative w-[50%]"
            onFocus={() => setProjectFocused(true)}
            onBlur={(event) => {
              // Only hide when focus leaves the entire wrapper
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setProjectFocused(false)
              }
            }}
          >
            <input
              placeholder="Project Name"
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
              className={`
                w-full
                p-[5px]
                text-[24px]
                border
                border-solid
                border-neutral-900
                rounded-lg
                ${projectFocused && filteredSuggestions.length > 0 && "rounded-b-none border-b-0"}
              `}
            />

            {projectFocused && filteredSuggestions.length > 0 && (
              <div className="
                absolute
                left-0
                right-0
                top-[90%]
                z-10
                mt-1
                bg-neutral-100
                border
                border-2
                border-t-0
                border-neutral-900
                rounded-b-lg
                overflow-hidden
              ">
                {filteredSuggestions.map((project) => (
                  <button
                    key={project}
                    type="button"
                    onClick={() => {
                      setNewTitle(project)
                      setProjectFocused(false)
                    }}
                    className="
                      block
                      w-full
                      px-3
                      py-2
                      text-left
                      text-[20px]
                      hocus:bg-blue-400
                      hocus:text-white
                    "
                  >
                    {project}
                  </button>
                ))}
              </div>
            )}

          </div>

          <button
            type="submit"
            className="
              px-5
              text-[32px]
              border-2
              border-solid
              border-neutral-900
              rounded-lg

              hocus:bg-blue-400
              hocus:text-white
            "
          >
            Save
          </button>
        </div>

        <textarea
          placeholder="new entry for Project..."
          value={newEntry}
          onChange={({ target }) => setNewEntry(target.value)}
          className="
            resize-none
            w-full
            h-[75vh]
            p-[5px]
            mt-1
            text-[18px]
            border
            border-solid
            border-neutral-900
            rounded-lg
          "
        />
      </form>
    </div>
  )
}

export default EntryForm
