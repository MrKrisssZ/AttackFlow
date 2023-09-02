import { createContext, useReducer } from 'react'

export const ReportsContext = createContext()

// takes 2 arguments, state: prevState, action: object pass to dispatch function
export const reportsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REPORTS':
            return {
                reports: action.payload
            }
        case 'CREATE_REPORT':
            return {
                reports: [action.payload, ...state.reports]
            }
        case 'DELETE_REPORT':
            return {
                reports: state.reports.filter((r) => r._id != action.payload._id)
            }
        default:
            return state
    }
}

export const ReportsContextProvider = ({ children }) => {
    // dispatch takes 2 arguments, type (state change) and payload (data)
    const [ reports, dispatch ] = useReducer(reportsReducer, {
        reports: null
    })
   
    return (
        <ReportsContext.Provider value={{ ...reports, dispatch }}>
             { children }
        </ReportsContext.Provider>
    )
}