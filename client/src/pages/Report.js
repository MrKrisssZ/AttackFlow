import React from "react"
import { useEffect } from 'react'
import { useState } from 'react'
import { useReportsContext } from '../hooks/UseReportsContext'

// components
import ReportDetails from '../components/ReportDetails'

const Report = () => {
    // const [ reports, setReports ] = useState(null)
    const { reports, dispatch } = useReportsContext()
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('/api/reports')
                const json = await response.json()

                if (response.ok) {
                    // setReports(json)
                    dispatch({ type: 'SET_REPORTS', payload: json })
                }
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchReports()
        // }, [])
    }, [dispatch])

    useEffect(() => {
        if (!isLoading) {
            fetchReports();
        }
    }, [isLoading])

    const fetchReports = async () => {
        try {
            const response = await fetch('/api/reports');
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_REPORTS', payload: json });
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    return (
        <div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Report</h3>
                {reports && reports.map((report) => (
                    <ReportDetails key={report._id} report={report} validated={report.validated} />
                ))}
            </div>
        </div >
    )
}

export default Report