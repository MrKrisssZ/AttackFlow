import { useUsersContext } from '../hooks/UseUsersContext'

const UserDetails = ({ user }) => {
    const { dispatch } = useUsersContext()

    const handleClick = async () => {
        const response = await fetch('/api/users/' + user._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_USER', payload: json })
        }
    }

    return (
        <div className="bg-white rounded-md my-4 p-4 shadow-md">
            <h4 className="mb-2 text-primary text-xl font-bold">{user.userID}</h4>
            <p className="mb-2">
                <strong>Role: </strong>
                {user.role}
            </p>
            <p className="mb-0">
                <strong>Joined since </strong>
                {user.createdAt}
            </p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default UserDetails