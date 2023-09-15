import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/UseLogout'
import { useAuthContext } from '../hooks/UseAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    
    const handleClick = () => {
        logout()
    }

    return (
        <header className="bg-white">
            <div className="max-w-7xl mx-auto p-5 flex items-center justify-between">
                <Link to="/" className="text-black no-underline">
                    <h1 className="text-4xl font-bold">Attack Flow</h1>
                </Link>
                <Link to="/annotation" className="text-black no-underline">
                    <h1 className="text-4xl font-bold">Annotation</h1>
                </Link>
                <Link to='/visualization'>
                    <h1 className="text-4xl font-bold">Visualization</h1>
                </Link>
                <Link to='/report'>
                    <h1 className="text-4xl font-bold">Report</h1>
                </Link>
                <nav>
                    { user && (
                        <div>
                            <span>{ user.userID }</span>
                            <button className='bg-white text-primary py-2 px-4 font-semibold rounded cursor-pointer' onClick={ handleClick }>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div className='space-x-5'>
                            <Link to='/login'>Login</Link>
                            <Link to='/signup'>Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>

    )
}

export default Navbar