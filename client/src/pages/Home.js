import { useEffect } from 'react'
// import { useState } from 'react'
import { useUsersContext } from '../hooks/UseUsersContext'


// components
import UserDetails from '../components/UserDetails'
import UserForm from '../components/UserForm'

const Home = () => {
    // const [ users, setUsers ] = useState(null)
    const { users, dispatch } = useUsersContext()

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api')
            const json = await response.json()

            if (response.ok) {
                // setUsers(json)
                dispatch({ type: 'SET_USERS', payload: json })
            }
        }

        fetchUsers()
    }, [dispatch])

    return (
        <div className="home">
            <div className='users'>
                { users && users.map(user => (
                    <UserDetails key={ user._id } user={ user }/>
                ))}
            </div>
            <UserForm />
        </div>
    )
}

export default Home