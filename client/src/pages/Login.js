import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useLogin } from '../hooks/UseLogin'
import { useAuthContext } from '../hooks/UseAuthContext'

const Login = () => {
    const [ userID, setUserID ] = useState('')
    const [ password, setPassword ] = useState('')
    const { login, error, isLoading } = useLogin()
    const { user } = useAuthContext()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(userID, password)
    }

    return (
        <>
            {!user &&
                <form className='bg-white max-w-md my-10 mx-auto mt-8 p-5 rounded-2xl' onSubmit={ handleSubmit }>
                    <h3 className="text-lg font-semibold mb-4">Log in</h3>
        
                    <label className='block'>User ID:</label>
                    <input
                        className='w-full p-2 mb-4 border border-gray-300 rounded'
                        type='text'
                        onChange={(e) => setUserID(e.target.value)}
                        value={ userID }
                    />
                    <label>Password:</label>
                    <input
                        className='w-full p-2 mb-4 border border-gray-300 rounded'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={ password }
                    />
                    <button className='bg-primary text-white py-2 px-4 font-semibold rounded cursor-pointer' disabled={ isLoading }>
                        Log in
                    </button>
                    { error && <div className='mt-5 py-2 px-4 bg-red-100 border border-red-500 text-red-500 rounded'>{ error }</div>}
                </form>
            }
            {user &&
                <>
                    <h3 className="text-lg font-semibold mb-4">Welcome back! { user.userID }</h3>
                    <Link to ='/' state={{ redirectTo: location }}>
                        <button className='text-primary'>
                            Back to Homepage
                        </button>
                    </Link>
                </>
            } 
        </>
    )
}

export default Login