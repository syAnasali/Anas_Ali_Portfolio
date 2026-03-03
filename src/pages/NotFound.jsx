export const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#070815] overflow-hidden text-white">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.15),transparent_60%)]" />

      {/* Floating Blur Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/30 blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/30 blur-3xl rounded-full animate-pulse" />

      {/* Main Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-12 shadow-2xl flex flex-col items-center text-center max-w-md">
        <h1 className="text-[8rem] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600 select-none">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Lost In The Void
        </h2>
        <p className="text-gray-400 mb-8">
          The Page You’re Searching For Doesn’t Exist — Maybe It Drifted Away
          Into The Stars.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full font-medium text-white shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105">
          Back to Home
        </a>
      </div>

      {/* Subtle Footer Text */}
      <p className="absolute bottom-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Anas Ali
      </p>
    </div>
  );
};
