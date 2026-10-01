import { useLocation } from 'react-router-dom';


const Header = ({ user, handleLogout }) => {
	if (!user) {
		return null
	}

	let path=''
	switch (location.pathname) {
	  case "/":
	    path = "/ Dashboard"
	    break;
	  case "/create":
	    path = "/ New Entry"
	    break;
	  default:
	    path = ""
	}

	return(
		<div className="flex justify-between items-center px-5 py-1 mt-2 font-grotesk">
			<h1 className="text-2xl italic text-neutral-900">Continuity Archive <span className="text-xs font-light">{path}</span></h1>
			<div className="flex *:ml-10">
				<h1 className="text-[20px] italic text-neutral-400">{ user.name }</h1>
				<button className="bg-neutral-950 hocus:bg-red-500 rounded p-1 shadow-lg text-neutral-200" onClick={handleLogout}>Logout</button>
			</div>
		</div>
	)
}

export default Header