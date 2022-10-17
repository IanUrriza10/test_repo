const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const { db } = require("./../config/db")
const SqlString = require("sqlstring")
const { response } = require("express")

const registerUser = asyncHandler(async (req, res) => {
	// CHECK IF PAYLOAD IS COMPLETE
	const { username, email, password } = req.body
	if (!username || !email || !password) {
		res.status(400)
		throw new Error("Please fill in all fields")
	}

	// CHECK IF USER EXISTS
	const userExists = await findUser(username)
	if (userExists) {
		res.status(400)
		throw new Error("User already exists")
	}

	// PASSWORD HASHING
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	// INSERT NEW USER TO DB
	const payload = { username, password: hashedPassword, email }
	await createUser(payload).catch((err) => {
		res.status(400)
		throw new Error(err)
	})

	// GENERATE TOKEN
	const user = await findUser(username).then((db_user) => addToken(db_user))

	if (user) {
		res.status(201).json(user)
	} else {
		res.status(400)
		throw new Error("Invalid User data")
	}
})

// LOGIN USER CONTROLLER

const loginUser = asyncHandler(async (req, res) => {
	// CHECK IF PAYLOAD IS COMPLETE
	const { username, password } = req.body
	if (!username || !password) {
		res.status(400)
		throw new Error("Please fill in all fields")
	}

	// CHECK IF USER EXISTS
	const user = await findUser(username)
	if (!user) {
		res.status(400)
		throw new Error("No User Found")
	}

	if (await bcrypt.compare(password, user.password)) {
		await removePassword(user)
		const payload = await addToken(user)
		res.status(200).json(payload)
	} else {
		res.status(400)
		throw new Error("Wrong Password")
	}
})

const getUser = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "user data" })
})

const createUser = asyncHandler(async (payload) => {
	return new Promise((resolve, reject) => {
		const insert_string = SqlString.format(
			"INSERT INTO USER SET ?",
			payload
		)
		db.query(insert_string)
			.then((response) => {
				resolve(response)
			})
			.catch((err) => {
				reject(err.sqlMessage)
			})
	})
})

const findUser = async (username) => {
	return new Promise((resolve) => {
		const insert_string = SqlString.format(
			"SELECT * FROM USER WHERE username = ?",
			username
		)
		db.query(insert_string).then(([rows]) => {
			resolve(rows[0])
			// return results
		})
	})
}
const removePassword = async (payload) => {
	delete payload.password
}

const addToken = async (payload) => {
	payload = { ...payload, token: generateToken(payload.id) }
	return payload
}

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	})
}

module.exports = { registerUser, loginUser, getUser }
