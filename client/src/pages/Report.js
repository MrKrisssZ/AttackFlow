import React from "react"
import { useEffect } from 'react'
// import { useState } from 'react'
import { useReportsContext } from '../hooks/UseReportsContext'

// components
import ReportDetails from '../components/ReportDetails'

const Report = () => {
    // const [ reports, setReports ] = useState(null)
    const { reports, dispatch } = useReportsContext()

    useEffect(() => {
        const fetchReports = async () => {
            const response = await fetch('/api/reports')
            const json = await response.json()

            if (response.ok) {
                // setReports(json)
                dispatch({ type: 'SET_REPORTS', payload: json })
            }
        }

        fetchReports()
    // }, [])
    }, [dispatch])

    return (
        <div className='home'>
            <div className='users'>
                <h1>Report</h1>
                { reports && reports.map((report) => (
                    <ReportDetails key={ report._id } report={ report }/>
                ))}
            </div>
        </div>
    )
}

export default Report