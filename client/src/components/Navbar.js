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
                <Link to='/visuaulization'>
                    <h1>Visualization</h1>
                </Link>
                <Link to='/report'>
                    <h1>Report</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar