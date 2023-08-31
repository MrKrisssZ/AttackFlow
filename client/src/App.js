import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Annotation from './pages/Annotation'
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
              path='/annotation'
              element={<Annotation />}
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

export default App;