import { Link } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"
const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<Link
				to="/"
				className="item"
			>
				Streamy
			</Link>
			<div className="right menu">
				<Link
					to="/"
					className="item"
				>
					All Streams
				</Link>
				{/* <GoogleAuth/> */}
				<Link to="/login">
					<button className="ui button">Login</button>
				</Link>
				<Link to="/register">
					<button className="ui button">Register</button>
				</Link>
			</div>
		</div>
	)
}
export default Header
