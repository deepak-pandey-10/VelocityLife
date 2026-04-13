import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Users, Clock, Trophy } from 'lucide-react'

import turf1 from '../assets/turf1.jpg'
import turf2 from '../assets/turf2.png'
import turf3 from '../assets/turf3.jpg'
import turf4 from '../assets/turf4.jpg'
import turf5 from '../assets/turf5.jpg'
import iconBooking from '../assets/feature_booking.png'
import iconPayment from '../assets/feature_payment.png'
import iconReview from '../assets/feature_review.png'
import iconSupport from '../assets/feature_support.png'

const images = [turf4, turf2, turf3, turf1, turf5];

const features = [
    { title: 'Instant Booking', desc: 'Secure your slot in seconds', icon: iconBooking },
    { title: 'Secure Payments', desc: 'UPI & Card supported', icon: iconPayment },
    { title: 'Verified Reviews', desc: 'Community trusted ratings', icon: iconReview },
    { title: '24/7 Support', desc: 'Always here to help', icon: iconSupport },
];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20">
                {/* Background Carousel */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={images[currentImageIndex]}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="w-full h-full object-cover"
                            alt="Turf Background"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 md:space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs sm:text-sm tracking-wide uppercase">
                            <Trophy size={14} /> Pithoragarh's #1 Sports Arena
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold tracking-tighter text-white uppercase transform -skew-x-3 leading-[0.9]">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-500 filter drop-shadow-lg">
                                DOMINATE
                            </span>
                            <span className="block mt-[-0.1em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary animate-[shine_4s_ease-in-out_infinite] bg-[length:200%_auto]">
                                THE FIELD
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
                            Experience pro-level football and cricket on FIFA-standard grass.
                            Premium floodlights. Competitive vibes. Unstoppable action.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-8 w-full sm:w-auto">
                            <Link
                                to="/booking"
                                className="group relative px-8 py-4 bg-zinc-800 text-white font-bold text-base rounded-md overflow-hidden transition-all hover:bg-zinc-700 border-l-4 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-xs sm:text-sm">
                                    Initialize Booking <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </Link>

                            <Link
                                to="/tournaments"
                                className="group px-8 py-4 bg-transparent border border-zinc-700 text-gray-300 font-bold text-base rounded-md transition-all hover:border-white/50 hover:text-white flex items-center justify-center tracking-widest uppercase text-xs sm:text-sm"
                            >
                                Tournaments
                            </Link>
                        </div>
                    </motion.div>

                    {/* Floating Glass Card (Optional Stats or Highlight) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="hidden lg:block"
                    >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-sm ml-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Prime Location</h3>
                                    <p className="text-sm text-gray-400">Tildhukari, Pithoragarh</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-white/5">
                                    <span className="text-gray-400 text-sm">Turf Type</span>
                                    <span className="text-white font-medium">Pro Grade</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-white/5">
                                    <span className="text-gray-400 text-sm">Sports</span>
                                    <span className="text-white font-medium">Football & Cricket</span>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <span className="text-gray-400 text-sm">Rate</span>
                                    <span className="text-primary font-bold text-lg">₹800/hr</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-24 bg-black relative">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Why Choose Us?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">Everything you need for the perfect game, from seamless booking to premium facilities.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
                            >
                                <div className="w-14 h-14 md:w-16 md:h-16 mb-6 rounded-2xl bg-black/50 p-3 group-hover:scale-110 transition-transform duration-300">
                                    <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section className="py-16 md:py-24 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
                        {/* Blob Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="grid lg:grid-cols-2 gap-12 relative z-10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                                    The Ultimate <span className="text-primary">Arena</span>
                                </h2>
                                <p className="text-gray-400 leading-relaxed mb-8 text-sm sm:text-base">
                                    Velocity Life offers a top-tier playing field designed to experience non-stop football and cricket action.
                                    It brings players together with great vibes and a passion for the sport that never stops.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm sm:text-base">15 Players Capacity</h4>
                                            <p className="text-xs sm:text-sm text-gray-500">Perfect for 7v7 matches</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm sm:text-base">Open Late Night</h4>
                                            <p className="text-xs sm:text-sm text-gray-500">Play under premium floodlights</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/40 rounded-3xl p-6 md:p-8 border border-white/5">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-6">Facility Highlights</h3>
                                <ul className="space-y-4">
                                    {['FIFA Standard Grass', 'Night Match Lighting', 'Clean Changing Rooms', 'Equipment Rental Available'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <span className="w-2 h-2 rounded-full bg-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-gray-500 text-xs sm:text-sm">Starting from</p>
                                            <p className="text-2xl sm:text-3xl font-bold text-white">₹800<span className="text-sm font-normal text-gray-500">/hr</span></p>
                                        </div>
                                        <Link to="/booking" className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white text-black font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors">
                                            Book Slot
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Location Section */}
            <section className="py-16 md:py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-bottom-left scale-110" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Locate The Action</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">Join us at the heart of Pithoragarh. Easy access, ample parking, and pure sporting vibes.</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-5 gap-8 bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Map Area */}
                        <div className="lg:col-span-3 h-[300px] sm:h-[400px] lg:h-auto min-h-[300px] relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.659639795269!2d80.216425!3d29.584504900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a125003dca0995%3A0x5c325d85ddedd908!2sVelocity%20life%20turf!5e0!3m2!1sen!2sin!4v1776055346524!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="transition-all duration-500 group-hover:filter-none"
                            ></iframe>
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-transparent pointer-events-none lg:hidden" />
                        </div>

                        {/* Info Area */}
                        <div className="lg:col-span-2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-8 bg-zinc-900">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">Velocity Life Arena</h3>
                                <p className="text-primary font-medium text-sm sm:text-base">Professional Sports Facility</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/50 transition-colors shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                            Velocity life turf,<br />
                                            Tildhukari, Pithoragarh,<br />
                                            Uttarakhand 262501
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/50 transition-colors shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-gray-300 text-sm sm:text-base">Open Daily: <span className="text-white font-bold">6:00 AM - 11:00 PM</span></p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://www.google.com/maps/place/Velocity+life+turf/@29.5845049,80.216425,17z"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 group text-sm sm:text-base"
                            >
                                Get Directions <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
