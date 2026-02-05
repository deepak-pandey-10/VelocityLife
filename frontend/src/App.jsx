import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Tournaments from './pages/Tournaments'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
