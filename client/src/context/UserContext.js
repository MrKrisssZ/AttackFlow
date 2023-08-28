import { createContext, useReducer } from 'react'

export const UserContext = createContext()

// dispatch function is used to update the state using reducer and the state object in the provider
export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                users: action.payload
            }
        case 'CREATE_USER':
            return {
                users: [action.payload, ...state.users]
            }
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(usersReducer, {
        users: null
    })
   
    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
             { children }
        </UserContext.Provider>
    )
}