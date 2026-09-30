import { SiTheplanetarysociety } from "react-icons/si";
import { RiHomeLine, RiSettingsLine } from "react-icons/ri";
import { FaRegCircleUser, FaPencil } from "react-icons/fa6";
import { TbRobot } from "react-icons/tb";

const Sidebar = () => {
	return(
		<div className="mx-1 my-1 rounded p-3 bg-neutral-900 text-neutral-200 text-lg">
			<div className="flex flex-col space-y-5 items-center">
				<SiTheplanetarysociety className="mb-15 text-3xl"/>
				<RiHomeLine />
				<FaPencil className="text-[14px]"/>
				<TbRobot className="text-[22px]"/>
				<RiSettingsLine />
				<FaRegCircleUser className="text-[18px]"/>
			</div>
		</div>
	)
}

export default Sidebar