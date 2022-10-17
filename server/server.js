const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const { errorHandler } = require("./middleware/errorMiddleware")

const port = process.env.PORT || 5000
const app = express()
const corsOptions = {
	origin: "http://localhost:3000",
	optionSuccessStatus: 200,
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))

app.get("/", (req, res) => res.status(200).json("Backend Working"))
app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))
