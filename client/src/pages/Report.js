import React from "react"
import { useEffect, useState } from 'react'

// components
import ReportDetails from '../components/ReportDetails'

// const Report = () => {
//     const [ reports, setReports ] = useState(null)

//     useEffect(() => {
//         const fetchReports = async () => {
//             const response = await fetch('/api/reports')
//             const json = await response.json()

//             if (response.ok) {
//                 setReports(json)
//             }
//         }

//         fetchReports()
//     }, [])

//     return (
//         <>
//             <h1>Report</h1>
//             { reports && reports.map((report) => (
//                 <ReportDetails key={ report._id } report={ report }/>
//             ))}
//         </>
//     )
// }
const Report = () => {
    return (
        <>
            <p>Report</p>
        </>
    )
}

export default Report