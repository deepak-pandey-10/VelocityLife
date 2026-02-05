const Tournaments = () => {
    return (
        <main className="pt-32 px-6 pb-12">
            <div className="max-w-7xl mx-auto text-center space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Upcoming <span className="text-green-500">Tournaments</span>
                </h1>
                <p className="text-xl text-gray-400">
                    Stay tuned! Exciting tournaments are coming soon to Velocity Life.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl space-y-4">
                            <div className="h-40 bg-gray-800 rounded-xl mb-4"></div>
                            <h3 className="text-2xl font-semibold">Tournament {i}</h3>
                            <p className="text-gray-400 text-sm">Join the most anticipated football event of the season.</p>
                            <button className="w-full py-2 bg-green-600/10 text-green-500 border border-green-600/20 rounded-lg hover:bg-green-600 hover:text-white transition-all">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Tournaments
