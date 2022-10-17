import { combineReducers } from "redux"
import { signed, user } from "./authReducer"

export default combineReducers({
	auth: signed,
	user: user,
})
