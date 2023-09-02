import { useReportsContext } from '../hooks/UseReportsContext'

const ReportDetails = ({ report }) => {
    const { dispatch } = useReportsContext()

    const handleClick = async () => {
        const response = await fetch('/api/reports/'+report._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_REPORT', payload: json})
        }
    }
    return (
        <div className='user-details'>
            <p><strong>URL: </strong>{ report.url }</p>
            <p><strong>Reported by: </strong>{ report.userID }</p>
            <p><strong>Reported at: </strong>{ report.uploadedAt }</p>
            <span onClick={ handleClick }>delete</span>
        </div>
    )
}

export default ReportDetails