import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

const Booking = () => {
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('morning')
    const [selectedSlots, setSelectedSlots] = useState([])
    const [dates, setDates] = useState([])
    const [loading, setLoading] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
    const [bookedSlots, setBookedSlots] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const scrollRef = useRef(null)

    const API_URL = import.meta.env.VITE_API_URL || '/api';
    const RATE_PER_HOUR = 800

    const handleConfirm = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    date: selectedDate,
                    slots: selectedSlots,
                    totalPrice: selectedSlots.length * RATE_PER_HOUR
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to establish booking');

            setSuccess(true);
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setBookingLoading(false);
        }
    };

    const fetchBookedSlots = async (date) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/bookings/booked-slots?date=${date}`);
            const data = await response.json();
            if (response.ok) {
                setBookedSlots(data);
            }
        } catch (err) {
            console.error('Failed to fetch availability:', err);
        } finally {
            setLoading(false);
        }
    };

    const slots = {
        morning: { icon: '🌅', label: 'Morning', times: ['7 AM - 8 AM', '8 AM - 9 AM', '9 AM - 10 AM', '10 AM - 11 AM', '11 AM - 12 PM'] },
        noon: { icon: '☀️', label: 'Noon', times: ['12 PM - 1 PM', '1 PM - 2 PM', '2 PM - 3 PM', '3 PM - 4 PM'] },
        evening: { icon: '🌆', label: 'Evening', times: ['4 PM - 5 PM', '5 PM - 6 PM', '6 PM - 7 PM', '7 PM - 8 PM'] },
        night: { icon: '🌙', label: 'Night', times: ['9 PM - 10 PM', '10 PM - 11 PM'] }
    }

    useEffect(() => {
        // Generate next 14 days
        const days = []
        for (let i = 0; i < 14; i++) {
            const date = new Date()
            date.setDate(date.getDate() + i)
            days.push({
                full: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                month: date.toLocaleDateString('en-US', { month: 'short' }),
                displayDate: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
            })
        }
        setDates(days)
        setSelectedDate(days[0].full)
    }, [])

    useEffect(() => {
        if (selectedDate) {
            fetchBookedSlots(selectedDate);
            setSelectedSlots([]);
        }
    }, [selectedDate]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current
            const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    const isSlotPassed = (timeString) => {
        if (!selectedDate) return false;
        
        const today = new Date();
        const selected = new Date(selectedDate);
        
        // If selected date is strictly in the future, slot hasn't passed
        if (selected.setHours(0,0,0,0) > today.setHours(0,0,0,0)) return false;
        
        // If selected date is in the past (shouldn't happen with our calendar gen, but to be sure)
        if (selected.setHours(0,0,0,0) < today.setHours(0,0,0,0)) return true;

        // Date is today. We parse the start hour of the slot.
        // Example timeString: '7 AM - 8 AM' or '12 PM - 1 PM'
        const match = timeString.match(/^(\d+)\s+(AM|PM)/);
        if (!match) return false;

        let hour = parseInt(match[1]);
        const period = match[2];

        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;

        const currentHour = new Date().getHours();
        return hour <= currentHour;
    };

    const toggleSlot = (time) => {
        setSelectedSlots(prev =>
            prev.includes(time)
                ? prev.filter(t => t !== time)
                : [...prev, time]
        )
    }

    return (
        <main className="pt-24 px-4 pb-12 min-h-screen bg-black text-gray-200">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 md:mb-12">
                    <Link to="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <div className="p-2.5 sm:p-3 rounded-full bg-zinc-900 border border-white/10 group-hover:border-primary/50 transition-colors">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-heading font-bold tracking-wider uppercase text-[10px] sm:text-xs">Return to Base</span>
                    </Link>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight uppercase">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Session</span> Protocol
                        </h1>
                        <p className="text-primary font-mono text-[10px] tracking-widest mt-1">SECURE_YOUR_SLOT_V2.0</p>
                    </div>
                </header>

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 relative">
                    {/* Main Selection Area */}
                    <div className="lg:col-span-8 space-y-8 order-1">

                        {/* Date Selector */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 font-bold text-white tracking-wide uppercase text-xs sm:text-sm">
                                    <Calendar size={14} className="text-primary" /> Phase 1: Select Date
                                </h2>
                                <div className="flex gap-2">
                                    <button onClick={() => scroll('left')} className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-md transition-colors">
                                        <ArrowLeft size={14} />
                                    </button>
                                    <button onClick={() => scroll('right')} className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-md transition-colors transform rotate-180">
                                        <ArrowLeft size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="w-full overflow-hidden">
                                <div
                                    ref={scrollRef}
                                    className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x w-full"
                                    style={{ touchAction: 'pan-x', overscrollBehaviorX: 'contain' }}
                                >
                                    {dates.map((d) => (
                                        <button
                                            key={d.full}
                                            onClick={() => { setSelectedDate(d.full); setSelectedSlots([]); }}
                                            className={`flex-shrink-0 w-20 md:w-24 py-4 rounded-lg flex flex-col items-center gap-1 transition-all duration-300 border-2 relative overflow-hidden group snap-start ${selectedDate === d.full
                                                ? 'bg-zinc-800 border-primary text-white shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]'
                                                : 'bg-zinc-900/50 border-white/5 text-gray-400 hover:border-white/20 hover:bg-zinc-900'
                                                }`}
                                        >
                                            <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-300 ${selectedDate === d.full ? 'bg-primary' : 'bg-transparent'}`} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{d.day}</span>
                                            <span className="text-xl md:text-2xl font-black font-heading">{d.date}</span>
                                            <span className="text-[10px] font-mono opacity-60">{d.month}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Time Slot Selection */}
                        <section className="space-y-6">
                            <h2 className="flex items-center gap-2 font-bold text-white tracking-wide uppercase text-[10px] sm:text-xs">
                                <Clock size={14} className="text-primary" /> Phase 2: Select Time(s)
                            </h2>

                            {/* Category Tabs */}
                            <div className="flex p-1 bg-zinc-900/80 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
                                {Object.entries(slots).map(([key, cat]) => (
                                    <button
                                        key={key}
                                        onClick={() => { setSelectedCategory(key); }}
                                        className={`flex-1 min-w-[80px] py-3 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${selectedCategory === key
                                            ? 'bg-zinc-800 text-white shadow-lg border border-white/10'
                                            : 'text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        <span className="text-sm">{cat.icon}</span> <span className="hidden sm:inline">{cat.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Slots Grid */}
                            <motion.div
                                key={selectedCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
                            >
                                {slots[selectedCategory].times.map((time) => {
                                    const isSelected = selectedSlots.includes(time);
                                    const isBooked = bookedSlots.includes(time);
                                    const isPassed = isSlotPassed(time);

                                    const isDisabled = isBooked || isPassed;

                                    return (
                                        <button
                                            key={time}
                                            disabled={isDisabled}
                                            onClick={() => toggleSlot(time)}
                                            className={`relative group px-4 py-4 md:py-6 rounded-xl border-l-4 transition-all duration-200 flex flex-col items-start gap-1 overflow-hidden ${isPassed
                                                ? 'bg-zinc-900 border-zinc-700 opacity-40 cursor-not-allowed'
                                                : isBooked
                                                    ? 'bg-zinc-950 border-red-500/20 opacity-50 cursor-not-allowed'
                                                    : isSelected
                                                        ? 'bg-zinc-800 border-primary shadow-lg'
                                                        : 'bg-zinc-900/50 border-white/10 hover:bg-zinc-900 hover:border-white/30'
                                                }`}
                                        >
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isPassed ? 'text-zinc-600' : isBooked ? 'text-red-500' : isSelected ? 'text-primary' : 'text-gray-500'}`}>
                                                {isPassed ? 'Passed' : isBooked ? 'Unavailable' : 'Available'}
                                            </span>
                                            <span className={`text-base md:text-lg font-heading font-bold ${isDisabled ? 'text-zinc-600' : isSelected ? 'text-white' : 'text-gray-300'}`}>
                                                {time}
                                            </span>

                                            {/* Selection Indicator */}
                                            {isSelected && !isDisabled && (
                                                <motion.div
                                                    layoutId={`check-${time}`}
                                                    className="absolute top-3 right-3 text-primary"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </motion.div>
                                            )}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </section>
                    </div>

                    {/* Summary Sidebar (Right) */}
                    <div className="lg:col-span-4 mt-0 order-2">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-zinc-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
                            >
                                {/* Ticket Design Elements */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-zinc-800 via-primary to-zinc-800 opacity-50" />
                                <div className="absolute -left-3 top-1/2 w-6 h-6 bg-black rounded-full hidden sm:block" />
                                <div className="absolute -right-3 top-1/2 w-6 h-6 bg-black rounded-full hidden sm:block" />
                                <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-gray-800 hidden sm:block" />

                                <h3 className="text-lg md:text-xl font-heading font-black text-white uppercase mb-6 flex justify-between items-center">
                                    Summary <span className="text-[10px] font-mono text-gray-500">ID: #TMP-884</span>
                                </h3>

                                <div className="space-y-4 md:space-y-6 relative z-10 bg-zinc-900/90 py-4">
                                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                                        <span className="text-xs text-gray-400 font-mono">DATE</span>
                                        <span className="text-white font-bold text-right text-xs md:text-sm">
                                            {selectedDate ? dates.find(d => d.full === selectedDate)?.displayDate : 'Select Date'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start pb-3 border-b border-white/10">
                                        <span className="text-xs text-gray-400 font-mono">TIME</span>
                                        <div className="flex flex-col items-end gap-1">
                                            {selectedSlots.length > 0 ? (
                                                selectedSlots.map(slot => (
                                                    <span key={slot} className="font-bold text-primary text-right text-xs md:text-sm">
                                                        {slot}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-zinc-700 font-bold text-xs">-- : --</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs text-gray-400 font-mono">TOTAL</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white">₹{selectedSlots.length * RATE_PER_HOUR}</span>
                                            <p className="text-[10px] text-gray-500">({selectedSlots.length} hour{selectedSlots.length !== 1 ? 's' : ''})</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 space-y-4">
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[11px] font-mono flex items-center gap-2"
                                        >
                                            <AlertCircle size={14} />
                                            ERROR: {error.toUpperCase()}
                                        </motion.div>
                                    )}

                                    {success && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[11px] font-mono flex items-center gap-2"
                                        >
                                            <CheckCircle2 size={14} />
                                            PROTOCOL_ESTABLISHED: REDIRECTING...
                                        </motion.div>
                                    )}

                                    <button
                                        onClick={handleConfirm}
                                        disabled={selectedSlots.length === 0 || bookingLoading || success}
                                        className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${selectedSlots.length > 0 && !bookingLoading && !success
                                            ? 'bg-primary text-black hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-primary/20'
                                            : 'bg-zinc-800 text-gray-600 cursor-not-allowed border border-white/5'
                                            }`}
                                    >
                                        {bookingLoading ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : success ? (
                                            'Confirmed'
                                        ) : selectedSlots.length > 0 ? (
                                            `Confirm (₹${selectedSlots.length * RATE_PER_HOUR})`
                                        ) : (
                                            'Select Slot(s)'
                                        )}
                                    </button>
                                    <p className="text-[9px] text-gray-600 text-center mt-3 font-mono">
                                        ESTABLISH_SESSION_PROTOCOL
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Booking
