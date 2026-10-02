const ProjectsList = ({ projectsList }) => {
	return (
		<div className="bg-neutral-600 text-white rounded-xs mt-2 py-5 font-grotesk">
			<h1 className="text-3xl pb-2 border-b-1 border-neutral-500 pl-3 italic">Projects List</h1>
			<table className="table-fixed w-full">
			  <thead>
			    <tr className="*:border-b-1 *:py-2 *:border-neutral-500 *:bg-neutral-800 *:text-left">
			      <th className="w-50 pl-3">Title</th>
			      <th className="w-25">Author</th>
			      <th className="w-25">Created</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{ projectsList.map((project) => (
					<tr key={project.id} className="border-b-1 border-neutral-500 bg-neutral-700">
						<td className="pl-3 py-2">{project.title}</td>
						<td>Me</td>
						<td>{new Date(project.createdAt).toLocaleDateString()}</td>
					</tr>
				)) }
			  </tbody>
			</table>
		</div>
	)
}

export default ProjectsList