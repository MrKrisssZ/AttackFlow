import { useReportsContext } from '../hooks/UseReportsContext'

const ReportDetails = ({ report }) => {
    const { dispatch } = useReportsContext()

    const handleClick = async () => {
        const response = await fetch('/api/reports/' + report._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_REPORT', payload: json })
        }
    }
    return (
        <div className="bg-white rounded-lg my-5 mx-auto p-5 relative shadow-md">
            <p className="text-lg font-semibold mb-2"><strong>URL: </strong>{report.url}</p>
            <p className="text-sm text-gray-600"><strong>Reported by: </strong>{report.userID}</p>
            <p className="text-sm text-gray-600"><strong>Reported at: </strong>{report.uploadedAt}</p>
            <div class="flex justify-center rounded-md bg-gray w-24 mt-4">
                <span onClick={handleClick} className="cursor-pointer bg-gray-200 rounded-full text-gray-600">delete</span>
            </div>
        </div >
    )
}

export default ReportDetails