import { Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import Login from "./Login"
import Register from "./Register"

import StreamCreate from "./streams/StreamCreate"
import StreamDelete from "./streams/StreamDelete"
import StreamEdit from "./streams/StreamEdit"
import StreamShow from "./streams/StreamShow"

const App = () => {
	return (
		<div className="App ui container">
			{/* <Default text="OK"/> */}
			<Routes>
				<Route
					path="/"
					element={<Layout />}
				>
					<Route
						path="login"
						element={<Login />}
					/>
					<Route
						path="register"
						element={<Register />}
					/>
					<Route
						path="streams/new"
						element={<StreamCreate />}
					/>
					<Route
						path="streams/edit"
						element={<StreamEdit />}
					/>
					<Route
						path="streams/delete"
						element={<StreamDelete />}
					/>
					<Route
						path="streams/show"
						element={<StreamShow />}
					/>
				</Route>
			</Routes>
		</div>
	)
}

export default App
