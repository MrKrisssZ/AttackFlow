// testing for report
import { useEffect } from 'react'
import { useState } from 'react'
import { useReportsContext } from '../hooks/UseReportsContext'

// components
import ReportUploadForm from '../components/ReportForm'
// testing for report page
import ReportDetails from '../components/ReportDetails'

const Annotation = () => {
    // testing for report page
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
        <>
            {/* <h1>Annotation</h1> */}
            <ReportUploadForm></ReportUploadForm>

            {/* testing for the report page */}
            <div className='home'>
                <div className='users'>
                    { reports && reports.map((report) => (
                        <ReportDetails key={ report._id } report={ report }/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Annotation