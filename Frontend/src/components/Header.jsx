const Header = ({ user, handleLogout }) => {
	if (!user) {
		return null
	}
	return(
		<div className="flex justify-between items-center px-5 py-1">
			<h1 className="text-[20px] italic text-gray-500">{ user.name }</h1>
			<button className="bg-gray-400 hover:bg-red-500 rounded p-1 shadow-lg outline" onClick={handleLogout}>Logout</button>
		</div>
	)
}

export default Header