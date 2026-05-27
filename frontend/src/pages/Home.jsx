function Home() {

  // Temporary login state
  const isLoggedIn = false;

  return (

    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl font-bold text-blue-400 mb-6">
          Azure Resume Verification System
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          Secure Cloud-Based Resume Storage & Verification
        </p>

        {/* Show buttons ONLY if logged out */}
        {!isLoggedIn && (
          <div className="flex gap-4 justify-center">

            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl">
              Login
            </button>

            <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl">
              Register
            </button>

          </div>
        )}

        {/* Show welcome message if logged in */}
        {isLoggedIn && (
          <div>

            <p className="text-green-400 text-xl font-semibold mb-4">
              Welcome Back!
            </p>

            <p className="text-gray-400">
              You are logged into the system.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default Home;