import React, { useState, useRef } from 'react'

const UserForm = () => {
    const [ userID, setUserID ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ role, setRole ] = useState('user')
    const [ error, setError ] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = { userID, password, role }

        const response = await fetch('/api', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            // reset the form
            setUserID('')
            setPassword('')
            // reset the error
            setError(null)
            console.log('new user added', json)
        }
    }

    return (
        <form className="create" onSubmit={ handleSubmit }>
            <h3>Add a New User</h3>
            <label>User ID:</label>
            <input
                type="text"
                onChange={(e) => setUserID(e.target.value)}
                value={ userID }
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={ password }
            />
            <button>Add User</button>
            { error && <div className='error'>{ error }</div>}
        </form>
    )
}

export default UserForm