import { useState, useEffect } from 'react'
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
    { title: 'Instant turf booking', icon: iconBooking },
    { title: 'Secure UPI payments', icon: iconPayment },
    { title: 'Trusted review', icon: iconReview },
    { title: 'Owner support', icon: iconSupport },
];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2700);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="pt-32 px-6 pb-12">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Heading - Always first */}
                <div className="order-1 md:col-start-1 md:row-start-1">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                        Experience <span className="text-green-500">Pro-Level</span> Football
                    </h1>
                </div>

                {/* Auto-Scrolling Carousel - Second on mobile, Right side on desktop */}
                <div className="order-2 md:col-start-2 md:row-span-2 relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20 border border-gray-800 group">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Turf view ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                    ))}

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-green-500 w-6' : 'bg-white/50 hover:bg-white'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Description and Button - Third on mobile, Below heading on desktop */}
                <div className="order-3 md:col-start-1 md:row-start-2 space-y-6">
                    <p className="text-lg text-gray-400 leading-relaxed">
                        Velocity Life brings you a turf first time in pithoragarh designed for high-performance gaming.
                        Whether it's a night match under premium floodlights or a competitive tournament,
                        our facility offers the perfect ground for your passion.
                        Book your slot now and dominate the field.
                    </p>
                    <button className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black text-lg font-bold rounded-full transition-all shadow-lg shadow-green-900/20 hover:scale-105 w-full md:w-auto">
                        Book Now
                    </button>
                </div>
            </div>

            {/* Features Section - Full Width below Hero */}
            <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-white/10">
                <h2 className="text-3xl font-extrabold mb-10 text-white flex items-center justify-center md:justify-start gap-3">
                    <span className="w-12 h-1.5 bg-green-500 rounded-full"></span>
                    Our Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-gray-900/40 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-[2.5rem] flex flex-col items-center gap-5 group hover:border-green-500/40 hover:bg-gray-900/60 transition-all duration-300 shadow-xl">
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-500 ring-4 ring-white/5 group-hover:ring-green-500/20">
                                <img src={feature.icon} alt={feature.title} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-base md:text-lg font-bold text-gray-200 text-center leading-tight group-hover:text-white transition-colors">
                                {feature.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Home
