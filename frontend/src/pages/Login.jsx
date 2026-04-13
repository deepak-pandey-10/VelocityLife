import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck, User, Phone } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();

    // Auth State
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || '/api';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Authentication failed');

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Trigger storage event for Header update in the same tab
            window.dispatchEvent(new Event('storage'));

            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="pt-24 px-4 pb-12 min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Industrial Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full z-10"
            >
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    {/* Header Decorative Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <div className="text-center space-y-2 mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                                <ShieldCheck size={32} className="text-primary" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-heading font-black text-white uppercase tracking-tight">
                            {isLogin ? 'Access Protocol' : 'New Identity'}
                        </h1>
                        <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">
                            {isLogin ? 'AUTHENTICATE_SESSION' : 'ESTABLISH_PROFILE'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-zinc-600 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-12 pr-4 py-4 bg-zinc-950/50 border border-white/5 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-mono"
                                        placeholder="user@velocity.life"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Passcode</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-zinc-600 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-12 pr-4 py-4 bg-zinc-950/50 border border-white/5 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-mono"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {!isLogin && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User size={18} className="text-zinc-600 group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="block w-full pl-12 pr-4 py-4 bg-zinc-950/50 border border-white/5 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-mono"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Phone size={18} className="text-zinc-600 group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="block w-full pl-12 pr-4 py-4 bg-zinc-950/50 border border-white/5 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-mono"
                                                placeholder="+91 99999 88888"
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg text-red-500 text-[11px] font-mono text-center"
                            >
                                ERROR: {error.toUpperCase()}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !formData.email || !formData.password}
                            className="w-full group relative overflow-hidden py-4 bg-primary text-black font-heading font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? <Loader2 size={20} className="animate-spin" /> : <>{isLogin ? 'Initiate Sequence' : 'Create Record'} <ArrowRight size={18} /></>}
                            </span>
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                                className="text-[10px] font-mono text-zinc-500 hover:text-white uppercase underline underline-offset-4"
                            >
                                {isLogin ? '[ Create New Account ]' : '[ Return to Login ]'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </main>
    );
};

export default Login;
