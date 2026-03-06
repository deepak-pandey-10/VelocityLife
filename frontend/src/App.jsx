import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tournaments from './pages/Tournaments'
import Login from './pages/Login'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import './App.css'







function App() {
  return (



    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex flex-col max-w-full overflow-x-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
