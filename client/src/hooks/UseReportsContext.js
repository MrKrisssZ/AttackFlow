import { ReportsContext } from '../context/ReportsContext'
import { useContext } from 'react'

export const useReportsContext = () => {
    const context = useContext(ReportsContext)

    if (!context) {
        throw Error('useReportsContext must be used inside an ReportsContextProvider')
    }

    return context
}