import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Mail,
    MapPin,
    BookOpen,
    Camera,
    Edit2,
    Save,
    X,
    LogOut,
    Loader2,
    CheckCircle2,
    ChevronRight,
    Shield,
    Calendar,
    Clock
} from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        bio: '',
        location: '',
        avatar: ''
    });
    const [bookings, setBookings] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || '/api';

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            // Fetch Profile
            const response = await fetch(`${API_URL}/users/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');

            setProfile({
                name: data.name || '',
                email: data.email || '',
                bio: data.bio || '',
                location: data.location || '',
                avatar: data.avatar || ''
            });

            // Fetch Bookings
            const bookingsRes = await fetch(`${API_URL}/bookings/my`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const bookingsData = await bookingsRes.json();
            if (bookingsRes.ok) {
                setBookings(bookingsData);
            }
        } catch (err) {
            setError(err.message);
            if (err.message.includes('Token')) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setLoading(false);
            setBookingsLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profile)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update profile');

            setSuccess('Profile protocol updated successfully');
            setIsEditing(false);
            // Update local storage user if needed
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...storedUser, ...data.user }));
        } catch (err) {
            setError(err.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="text-primary animate-spin" size={48} />
            </div>
        );
    }

    return (
        <main className="pt-32 px-4 pb-20 min-h-screen bg-black relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Sidebar / Quick Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 rounded-full border-2 border-primary/30 p-1 bg-zinc-950 overflow-hidden mx-auto group-hover:border-primary transition-colors duration-500">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                            <User size={64} className="text-zinc-600" />
                                        </div>
                                    )}
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 p-2 bg-primary text-black rounded-full shadow-lg hover:scale-110 transition-transform">
                                        <Camera size={16} />
                                    </button>
                                )}
                            </div>

                            <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight truncate">
                                {profile.name || 'Anonymous User'}
                            </h2>
                            <p className="text-zinc-500 font-mono text-[10px] tracking-widest mb-6">
                                {profile.email}
                            </p>

                            <div className="pt-6 border-t border-white/5 space-y-3">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-zinc-950 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 border border-white/5 rounded-xl transition-all font-mono text-[10px] uppercase font-bold"
                                >
                                    <LogOut size={14} /> Terminate Session
                                </button>
                            </div>
                        </div>

                        {/* Security Card */}
                        <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                                    <Shield size={16} className="text-primary" />
                                </div>
                                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Security Protocol</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[10px] font-mono">
                                    <span className="text-zinc-500">STATUS</span>
                                    <span className="text-emerald-500 flex items-center gap-1 font-bold">
                                        VERIFIED <CheckCircle2 size={10} />
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-mono">
                                    <span className="text-zinc-500">ENCRYPTION</span>
                                    <span className="text-white">AES-256</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Settings */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-heading font-black text-white uppercase tracking-tight">Identity Profile</h3>
                                    <p className="text-zinc-500 font-mono text-[9px] tracking-[0.2em] uppercase">Modify Core Parameters</p>
                                </div>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 py-2 px-4 bg-primary text-black rounded-lg font-mono text-[10px] font-black uppercase hover:scale-105 transition-transform"
                                    >
                                        <Edit2 size={14} /> Edit Identity
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setIsEditing(false); setError(''); }}
                                            className="p-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {(error || success) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`mb-6 p-4 rounded-xl border font-mono text-[10px] uppercase text-center ${error ? 'bg-red-500/5 border-red-500/20 text-red-500' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500'
                                        }`}
                                >
                                    {error ? `ERROR: ${error}` : success}
                                </motion.div>
                            )}

                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest ml-1">Callsign / Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User size={16} className="text-zinc-600" />
                                            </div>
                                            <input
                                                type="text"
                                                disabled={!isEditing || updating}
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 bg-zinc-950/50 border border-white/5 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-primary/50 transition-all font-mono text-[11px] disabled:opacity-50"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest ml-1">Terminal Location</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <MapPin size={16} className="text-zinc-600" />
                                            </div>
                                            <input
                                                type="text"
                                                disabled={!isEditing || updating}
                                                value={profile.location}
                                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 bg-zinc-950/50 border border-white/5 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-primary/50 transition-all font-mono text-[11px] disabled:opacity-50"
                                                placeholder="e.g. New Delhi, IN"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest ml-1">Manifesto / Bio</label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                                            <BookOpen size={16} className="text-zinc-600" />
                                        </div>
                                        <textarea
                                            disabled={!isEditing || updating}
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            rows={4}
                                            className="w-full pl-12 pr-4 py-3 bg-zinc-950/50 border border-white/5 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-primary/50 transition-all font-mono text-[11px] resize-none disabled:opacity-50"
                                            placeholder="Write something about yourself..."
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="pt-4"
                                    >
                                        <button
                                            type="submit"
                                            disabled={updating}
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-black rounded-xl font-heading font-black uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                                        >
                                            {updating ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Update Matrix Data</>}
                                        </button>
                                    </motion.div>
                                )}
                            </form>
                        </div>

                        {/* Booking History Section */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-heading font-black text-white uppercase tracking-tight">Booking History</h3>
                                    <p className="text-zinc-500 font-mono text-[9px] tracking-[0.2em] uppercase">Recent Slot Allocations</p>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                                    <BookOpen size={16} className="text-primary" />
                                </div>
                            </div>

                            {bookingsLoading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="text-zinc-700 animate-spin" size={24} />
                                </div>
                            ) : bookings.length > 0 ? (
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <div key={booking.id} className="bg-zinc-950/50 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-xl border ${booking.status === 'confirmed' ? 'bg-primary/5 border-primary/10 text-primary' : 'bg-red-500/5 border-red-500/10 text-red-500'}`}>
                                                    <Calendar size={20} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-bold text-white uppercase tracking-tight">{booking.date}</span>
                                                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${booking.status === 'confirmed' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                                            {booking.status.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-zinc-500">
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={10} />
                                                            <span className="text-[10px] font-mono">{Array.isArray(booking.slots) ? booking.slots.join(', ') : JSON.parse(booking.slots || '[]').join(', ')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-black text-white">₹{booking.totalPrice}</div>
                                                <div className="text-[9px] font-mono text-zinc-600 uppercase">Paid via Protocol</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-zinc-950/30 rounded-2xl border border-dashed border-white/5">
                                    <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">No active session records found</p>
                                    <Link to="/booking" className="inline-block mt-4 text-primary text-[10px] font-bold uppercase hover:underline">Establish New Link</Link>
                                </div>
                            )}
                        </div>

                        {/* Tournament Stats Section */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-zinc-900/70 transition-colors group cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-white uppercase tracking-tight">Tournament Stats</h4>
                                    <p className="text-[9px] font-mono text-zinc-500 uppercase">View performance metrics</p>
                                </div>
                                <ChevronRight size={16} className="text-zinc-700 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default Profile;
