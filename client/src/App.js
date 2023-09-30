import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Annotation from './pages/Annotation'
import Visualization from './pages/Visualization'
import Report from './pages/Report'
import Login from './pages/Login'
import Signup from './pages/Signup'

// components
import Navbar from './components/Navbar'


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='max-w-7xl mx-auto p-4'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/Login'
              element={<Login />}
            />
            <Route
              path='/Signup'
              element={<Signup />}
            />
            <Route
              path='/annotation'
              element={<Annotation />}
            />
            <Route
              path='/visualization'
              element={<Visualization />}
            />
            <Route
              path='/report'
              element={<Report />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
  // const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, [])

  // return (
  //   <div>
  //     {(typeof backendData.users === 'undefined') ? (
  //       <p>Loading...</p>
  //     ) : (
  //       backendData.users.map((user, i) =>
  //         <p key={i}>{user}</p>)
  //     )}
  //   </div>
  // )
}

export default App