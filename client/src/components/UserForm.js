import React, { useState } from 'react'
import { useUsersContext } from '../hooks/UseUsersContext'

const UserForm = () => {
    const { dispatch } = useUsersContext()

    const [userID, setUserID] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = { userID, password, role }

        const response = await fetch('/api/users', {
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
            // reset the error
            setError(null)
            // reset the form
            setUserID('')
            setPassword('')
            // console.log('new user added: ', json)
            dispatch({ type: 'CREATE_USER', payload: json })
        }
    }

    return (
        <form className="mt-8" onSubmit={handleSubmit}>
            <h3 className="mb-4 text-2xl font-bold">Add a New User</h3>
            <label className="block">User ID:</label>
            <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                onChange={(e) => setUserID(e.target.value)}
                value={userID}
            />

            <label className="block">Password:</label>
            <input
                type="password"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button className="bg-primary text-white py-2 px-4 font-semibold rounded cursor-pointer">
                Add User
            </button>
            {error && (
                <div className="mt-5 py-2 px-4 bg-red-100 border border-red-500 text-red-500 rounded">
                    {error}
                </div>
            )}
        </form>
    )
}

export default UserForm