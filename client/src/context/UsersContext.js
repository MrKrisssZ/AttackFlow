import { createContext, useReducer } from 'react'

export const UsersContext = createContext()

// takes 2 arguments, state: prevState, action: object pass to dispatch function
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
        case 'DELETE_USER':
            return {
                users: state.users.filter((u) => u._id != action.payload._id)
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({ children }) => {
    // dispatch takes 2 arguments, type (state change) and payload (data)
    const [ users, dispatch ] = useReducer(usersReducer, {
        users: null
    })
   
    return (
        <UsersContext.Provider value={{ ...users, dispatch }}>
             { children }
        </UsersContext.Provider>
    )
}