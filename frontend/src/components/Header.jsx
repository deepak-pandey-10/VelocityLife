import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            if (token && userData) {
                setIsLoggedIn(true);
                setUser(JSON.parse(userData));
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkAuth();
        // Add event listener for storage changes (for same-tab login/logout)
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group shrink-0">
                    <div className="relative">
                        <img
                            src={logo}
                            alt="Velocity Life Logo"
                            className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-heading font-bold text-lg sm:text-xl tracking-tight block">
                        Velocity<span className="text-primary">Life</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {[
                        { to: "/", label: "Home" },
                        { to: "/tournaments", label: "Tournaments" },
                        { to: "/booking", label: "Book Now" },
                    ].map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-xs font-heading font-bold uppercase tracking-widest transition-all duration-200 relative group ${isActive ? 'text-white' : 'text-zinc-500 hover:text-white'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.label}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Login/User Section */}
                <div className="hidden lg:flex items-center">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <Link
                                to="/profile"
                                className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/5 hover:border-primary/50 text-xs font-heading font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 text-white flex items-center gap-2"
                            >
                                <UserIcon size={14} className="text-primary" />
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2.5 rounded-full bg-zinc-900 hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 text-zinc-400 hover:text-red-500 transition-all duration-300"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/5 hover:border-primary/50 text-xs font-heading font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 text-white"
                        >
                            Establish Link
                        </NavLink>
                    )}
                </div>

                {/* Mobile Menu Button - Visible on lg and below */}
                <button
                    className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/tournaments", label: "Tournaments" },
                                { to: "/booking", label: "Book Now" },
                            ].map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) => `text-lg font-heading font-black uppercase tracking-tight p-2 transition-colors ${isActive ? 'text-primary' : 'text-zinc-300 hover:text-white'}`}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <div className="h-px bg-white/10 my-2"></div>
                            {isLoggedIn ? (
                                <div className="space-y-4">
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-center py-4 rounded-xl bg-zinc-800 border border-white/5 text-white font-heading font-black uppercase tracking-widest text-sm hover:bg-zinc-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <UserIcon size={18} className="text-primary" />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                        className="w-full py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-heading font-black uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            ) : (
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-center py-4 rounded-xl bg-primary text-black font-heading font-black uppercase tracking-widest text-sm hover:bg-primary/90 transition-all"
                                >
                                    Establish Link
                                </NavLink>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header
