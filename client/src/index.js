import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import App from "./components/App"
import reducers from "./reducers"

const root = ReactDOM.createRoot(document.getElementById("root"))
const store = createStore(reducers, applyMiddleware(thunk))
root.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
)
