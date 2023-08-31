const UserDetails = ({ user }) => {
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
        </div>
    )
}

export default UserDetails