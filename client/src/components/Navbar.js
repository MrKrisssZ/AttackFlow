import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header class="bg-white">
            <div class="max-w-7xl mx-auto p-5 flex items-center justify-between">
                <Link to="/" class="text-black no-underline">
                    <h1 class="text-4xl font-bold">Attack Flow</h1>
                </Link>
                <Link to="/annotation" class="text-black no-underline">
                    <h1 class="text-4xl font-bold">Annotation</h1>
                </Link>
            </div>
        </header>

    )
}

export default Navbar