import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import ApiReference from "./components/ApiReference";

/**
 * App component provides the main layout for the dashboard application.
 * Handles page transitions, header, main content, and footer.
 * Uses responsive design for all sections.
 */
function App() {
	// Track if the app has finished loading for transition effects
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		// Main container: vertical flex, gradient background, responsive transitions
		<div
			className={`min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 flex flex-col transition-all duration-1000 ease-out ${
				isLoaded ? "opacity-100" : "opacity-0"
			}`}
		>
			{/* Header section: title, subtitle, and profile card */}
			<header
				className={`w-full flex flex-col items-center py-8 sm:py-10 md:py-12 mb-6 md:mb-10 transition-all duration-1000 ease-out delay-300 ${
					isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}
			>
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 drop-shadow-lg text-center">
					SaaS Analytics Dashboard
				</h1>
				<p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-indigo-600 font-medium text-center opacity-80">
					Real-time widgets with auto-refreshing data
				</p>
				{/* Profile card: responsive, centered below title */}
				<div className="mt-6 sm:mt-8 flex justify-center w-full px-2 sm:px-0">
					<div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-br from-white/80 via-indigo-50 to-purple-50/80 backdrop-blur-lg rounded-2xl shadow-2xl px-4 sm:px-8 md:px-10 py-4 sm:py-6 border border-white/60 hover:shadow-indigo-200 hover:-translate-y-1 hover:scale-105 transition-all duration-500 group w-full max-w-md md:max-w-2xl">
						{/* Profile image with badge overlay */}
						<div className="relative mb-2 sm:mb-0">
							<img
								src="https://www.sasatech.co.ke/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdvczs0agl%2Fimage%2Fupload%2Fv1747905759%2F20250522_121650_kkxcz2.jpg&w=3840&q=75"
								alt="Profile"
								className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-indigo-200 shadow-lg object-cover bg-white group-hover:ring-4 group-hover:ring-indigo-200 transition-all duration-500"
							/>
							<span className="absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 flex items-center justify-center shadow-md border-2 border-white">
								<svg
									className="w-3 h-3 sm:w-4 sm:h-4 text-white"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</span>
						</div>
						<div className="flex flex-col items-center sm:items-start text-center sm:text-left">
							<span className="font-extrabold text-indigo-800 text-lg sm:text-2xl leading-tight tracking-tight">
								Victor Kirui
							</span>
							<div className="w-8 sm:w-10 border-b-2 border-indigo-100 my-1 sm:my-2"></div>
							<span className="text-indigo-500 text-xs sm:text-base font-medium tracking-wide">
								kiruivictor097@gmail.com
							</span>
						</div>
					</div>
				</div>
			</header>

			{/* Main content: dashboard and API reference */}
			<main
				className={`flex-1 w-full max-w-full md:container md:max-w-8xl mx-auto px-2 sm:px-4 md:px-8 flex flex-col items-center justify-center transition-all duration-1000 ease-out delay-500 ${
					isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}
			>
				<div className="w-full rounded-2xl md:rounded-3xl bg-white/60 shadow-2xl backdrop-blur-lg p-2 sm:p-4 md:p-8 border border-indigo-100 transition-all duration-500 hover:shadow-3xl relative overflow-visible">
					<Dashboard />
				</div>
				<ApiReference />
			</main>

			{/* Footer: copyright notice */}
			<footer
				className={`w-full py-4 sm:py-6 mt-8 sm:mt-12 bg-transparent flex items-center justify-center transition-all duration-1000 ease-out delay-700 ${
					isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}
			>
				<span className="text-xs sm:text-sm text-gray-400 tracking-wide">
					© 2025 SaaS Dashboard Demo
				</span>
			</footer>
		</div>
	);
}

export default App;
