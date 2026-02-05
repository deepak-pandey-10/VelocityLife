const Login = () => {
    return (
        <main className="pt-32 px-6 pb-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-8 shadow-2xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-gray-400 mt-2">Sign in to your Velocity Life account</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                    <button className="w-full py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]">
                        Sign In
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    Don't have an account? <a href="#" className="text-green-500 hover:underline">Sign up</a>
                </div>
            </div>
        </main>
    )
}

export default Login
