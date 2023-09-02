import { useUsersContext } from '../hooks/UseUsersContext'

const UserDetails = ({ user }) => {
    const { dispatch } = useUsersContext()

    const handleClick = async () => {
        const response = await fetch('/api/users/'+user._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_USER', payload: json})
        }
    }

    return (
        <div className="user-details">
            <h4>{ user.userID }</h4>
            <p><strong>Role: </strong>{ user.role }</p>
            <p><strong>Joined since </strong>{ user.createdAt }</p>
            <span onClick={ handleClick }>delete</span>
        </div>
    )
}

export default UserDetails