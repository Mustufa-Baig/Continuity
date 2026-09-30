const BlockGraph = ({ data }) => {
	//const MAX_VALUE = data.reduce((prev, current) => (prev.value > current.value) ? prev : current).value +10

	if (data.length ===0) {
		return null
	}

	const MAX_VALUE = 15
	const size = 225 / MAX_VALUE

	const months = {
		"01":"JAN",
		"02":"FEB",
		"03":"MAR",
		"04":"APR",
		"05":"MAY",
		"06":"JUN",
		"07":"JUL",
		"08":"AUG",
		"09":"SEP",
		"10":"OCT",
		"11":"NOV",
		"12":"DEC"
	}
	
	let total = 0
	data.forEach(day => total+= day.count)
	
	return(
		<div className="w-fit font-grotesk text-neutral-500 p-2 rounded-lg bg-neutral-200">
			<h1 className="">Recent Entries</h1>
			<div className="bg-white p-2 rounded-lg">
				<div className="flex justify-between items-center">
					<h1 className="text-sm mb-2 font-light italic">Total Entries: <span className="text-2xl font-normal text-neutral-900">{total}</span></h1>
					<h1 className="font-light">Past 30 days</h1>
				</div>
				<div className="flex items-start">
					<div className="flex flex-col-reverse justify-between h-[225px] items-center">
						{Array.from({ length: MAX_VALUE }).map((_, i) => (
							<div key={i}>
								{ i%2==0 && <h1 className="text-xs">{i+1}-</h1> }
							</div>
						))}
					</div>
					{data.map((item,i) => (
						<div key={item.date} className="flex flex-col-reverse items-center" style={{ width: `${size}px`}}>
							{ item.date.split('-')[2]==='01' && <h6 className="text-neutral-900">{months[item.date.split('-')[1]]}</h6>}
							<h6 className="text-[10px] font-light">{item.date.split('-')[2]}</h6>
							{Array.from({ length: MAX_VALUE }).map((_, i) => (
								<div
									key={i}
									style={{
										width: `${size}px`,
										height: `${size}px`,
									}}
									className={`border border-white rounded-xs ${ i < item.count ? "bg-neutral-950" : "bg-neutral-300"}`}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default BlockGraph
