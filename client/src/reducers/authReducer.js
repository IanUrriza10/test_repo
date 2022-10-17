const INITIAL_STATE = {
	isSignedIn: null,
}
export const signed = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SIGN_IN":
			return { ...state, isSignedIn: true }
		case "SIGN_OUT":
			return { ...state, isSignedIn: false }
		default:
			return state
	}
}

export const user = (state = {}, action) => {
	switch (action.type) {
		case "SET_USER":
			return action.payload
		case "REMOVE_USER":
			return {}
	}
}
