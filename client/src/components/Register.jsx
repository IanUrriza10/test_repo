import { useState } from "react"
import server from "../api/auth"
const Register = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("submit")
		server
			.post("/api/users/", {
				username,
				password,
				email,
			})
			.then((response) => {
				console.log(response)
			})
			.catch((err) => console.log(err))
	}
	return (
		<div className="Register">
			<form
				className="ui form"
				onSubmit={handleSubmit}
			>
				<div className="field">
					<label>Username</label>
					<input
						type="text"
						className="username"
						value={username}
						placeholder="Name"
						onChange={(e) => {
							setUsername(e.target.value)
						}}
					/>
				</div>
				<div className="field">
					<label>Email</label>
					<input
						type="text"
						className="email"
						value={email}
						placeholder="Email"
						onChange={(e) => {
							setEmail(e.target.value)
						}}
					/>
				</div>
				<div className="field">
					<label>Password</label>
					<input
						type="password"
						className="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					className="ui button"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default Register
