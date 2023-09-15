import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/UseAuthContext'
import { Link, useLocation } from 'react-router-dom'

// components
import DropdownMenu from '../components/DropDownMenu'

const Annotation = () => {
    const { user } = useAuthContext()
    const location = useLocation()
    
    return (
        <>
            { user && 
                <>
                    <DropdownMenu></DropdownMenu>
                </>
            }
            { !user && 
                <>
                    <h3 className="text-lg font-semibold mb-4">Not signed in</h3>
                    <p>
                    <Link to='/login' state={{ redirectTo: location }}>
                        <button className='text-primary'>
                            Login
                        </button>
                    </Link>
                    {' '}to use the annotation function.</p>
                </>
            }
        </>
    )
}

export default Annotation