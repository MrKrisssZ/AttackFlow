import React from "react"
import { useEffect } from 'react'
import { useReportsContext } from '../hooks/UseReportsContext'

// components
import ReportDetails from '../components/ReportDetails'

const Home = () => {
    const { reports, dispatch } = useReportsContext()

    // filter validated reports
    const validatedReports = reports ? reports.filter(report => report.validated) : [];

    useEffect(() => {
        const fetchReports = async () => {
            const response = await fetch('/api/reports')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_REPORTS', payload: json })
            }
        }

        fetchReports()
    }, [dispatch])

    return (
        <>
            <h2 className="text-lg font-semibold mb-4">Validated Reports</h2>
            {validatedReports.length === 0 ? (
                <p>No validated reports are available.</p>
            ) : (
                validatedReports.map(report => (
                    <ReportDetails key={report._id} report={report} validated={report.validated}/>
                ))
            )}
        </>
    )
}

export default Home