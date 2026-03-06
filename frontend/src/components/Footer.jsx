import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-black/80 border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-6 sm:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="Velocity Life" className="h-10 w-auto rounded-full" />
                            <span className="font-heading font-bold text-xl">Velocity<span className="text-primary">Life</span></span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Pithoragarh's premier sports facility designed for pro-level football and cricket action.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">Home</Link></li>
                            <li><Link to="/tournaments" className="text-gray-400 hover:text-primary transition-colors text-sm">Tournaments</Link></li>
                            <li><Link to="/booking" className="text-gray-400 hover:text-primary transition-colors text-sm">Book a Slot</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-primary transition-colors text-sm">Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-bold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                                <span>Near Stadium, Pithoragarh,<br />Uttarakhand, 262501</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <Phone size={18} className="text-primary shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <Mail size={18} className="text-primary shrink-0" />
                                <span className="break-all">support@velocitylife.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h4 className="font-heading font-bold text-white mb-6">Stay Updated</h4>
                        <form className="space-y-3 max-w-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                            />
                            <button className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-2.5 rounded-lg text-sm transition-all shadow-lg shadow-primary/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Velocity Life. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
