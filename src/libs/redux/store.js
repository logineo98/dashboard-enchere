
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import userReducer from "./reducers/user"
import enchereReducer from "./reducers/enchere"

const rootReducer = combineReducers({ user: userReducer, enchere: enchereReducer })
const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


export { store }