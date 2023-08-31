import { Link } from 'react-router-dom'

const Navbar = () => {
    
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Attack Flow</h1>
                </Link>
                <Link to='/annotation'>
                    <h1>Annotation</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar