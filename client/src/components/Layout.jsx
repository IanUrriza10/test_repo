import Header from "./Header"
import { Outlet } from "react-router-dom"
import StreamList from "./streams/StreamList"
const Layout = () => {
	return (
		<div className="Layout">
			<Header />
			<StreamList />
			<Outlet />
		</div>
	)
}
export default Layout
