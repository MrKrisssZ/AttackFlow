const UserDetails = ({ user }) => {
    return (
        <div className="user-details">
            <h4>{ user.userID }</h4>
            <p><strong>Role: </strong>{ user.role }</p>
            <p><strong>Joined since </strong>{ user.createdAt }</p>
        </div>
    )
}

export default UserDetails