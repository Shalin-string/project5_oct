import { useState } from 'react'
import './App.css'
import './routes/Approutes.jsx'
import AppRoutes from './routes/Approutes.jsx'
// import Navbar from './components/Navbar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <AppRoutes></AppRoutes>
    </>
  )
}

export default App
