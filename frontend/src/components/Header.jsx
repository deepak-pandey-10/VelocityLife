import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-gray-300 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left Side: Logo & Navigation */}
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Velocity Life Logo" className="h-12 w-auto object-contain rounded-full" />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 p-2 rounded-lg ${isActive ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-200/50'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/tournaments"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 p-2 rounded-lg ${isActive ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-200/50'
                                }`
                            }
                        >
                            Tournaments
                        </NavLink>
                    </nav>
                </div>

                {/* Right Side: Login */}
                <div className="flex items-center">
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `text-sm font-medium px-6 py-2 rounded-full transition-colors flex items-center gap-2 ${isActive ? 'bg-green-500 text-black font-semibold' : 'bg-gray-100 text-black hover:bg-green-500/80 hover:font-semibold'
                            }`
                        }
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header
