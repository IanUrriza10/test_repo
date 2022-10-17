export const signIn = () => async (dispatch, useState) => {
	dispatch({ type: "SIGN_IN" })
}

export const signOut = () => {
	return {
		type: "SIGN_OUT",
	}
}
