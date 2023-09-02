const ReportDetails = ({ report }) => {
    return (
        <div>
            <h4>{ report.url }</h4>
            <p><strong>Reported by: </strong>{ report.userID }</p>
            <p><strong>Reported at: </strong>{ report.uploadedAt }</p>
        </div>
    )
}

export default ReportDetails