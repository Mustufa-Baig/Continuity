import { MdAddCircleOutline } from "react-icons/md";
import { useState } from 'react'

const EntryForm = ({ addEntry, projectsList }) => {
  const [newEntry, setNewEntry] = useState('')

  const projectIDs = projectsList?.reduce((acc, project) => {
    acc[project.id] = project.title;
    return acc;
  }, {});


  const handleEntry = (event) => {
    event.preventDefault()

    addEntry({
      project_id: projectId,
      content: newEntry,
    })

    setNewEntry('')
    setProjectId('')
  }

  const [projectId, setProjectId] = useState('')

  const handleChange = (event) => {
    setProjectId(event.target.value);
  };
  return (
    <div className="w-full pr-1">
      <form
        onSubmit={handleEntry}
        className="w-full"
      >
        <div className='flex justify-between items-center'>  
        <label className="text-neutral-500 text-lg ml-2">Project:
          <select className={`text-2xl ml-3 ${ projectId ? "text-blue-600" : "text-red-400" }`} value={projectId} onChange={handleChange}>
            <option disabled value=''>Select a Project</option>

            { projectsList?.map((project) => (
              <option className="text-neutral-900" key={project.id} value={project.id}>{project.title}</option>
            )) }

          </select>
        </label>

        <div className="flex justify-between items-center">
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
      </div>
        <textarea
          placeholder={`new entry for ${ projectId ? projectIDs[projectId] : "Project" }...`}
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
