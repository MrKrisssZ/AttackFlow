import React, { useState } from 'react'

const ReportForm = () => {
    // To-do: get the userID
    const [ userID, setUserID ] = useState('user01')
    const [ url, setUrl] = useState('')
    const [ uploadedAt, setUploadedAt] = useState(Date())
    const [ validated, setValidated] = useState(false)

    const [ error, setError ] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const report = { url, uploadedAt, userID, validated }

        const response = await fetch('/api/reports', {
            method: 'POST',
            body: JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            // reset the error
            setError(null)

            //reset the form
            setUrl('')

            console.log('new report added: ', json)
            // dispatch({ type: 'CREATE_REPORT ', payload: json })
        }
    }

    return (
        <form className='create' onSubmit={ handleSubmit }>
            <h3>Upload an incident report link</h3>
                <label>Enter the url</label>
                <input 
                    type='url' 
                    onChange={(e) => setUrl(e.target.value)}
                    pattern='https://.*' 
                    required />
                <button>Upload</button>
                { error && <div className='error'>{ error }</div>}
        </form>
    )
}

export default ReportForm