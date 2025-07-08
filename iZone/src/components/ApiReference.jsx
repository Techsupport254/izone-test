import React, { useState } from "react";

// List of API endpoints used by the dashboard widgets
const apiEndpoints = [
	{
		widget: "Crypto Prices",
		method: "GET",
		endpoint:
			"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",
		description: "Get current BTC & ETH prices in USD (CoinGecko public API)",
		example:
			"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",
	},
	{
		widget: "Exchange Rates",
		method: "GET",
		endpoint: "https://api.frankfurter.app/latest?from=USD",
		description: "Get latest USD exchange rates (Frankfurter public API)",
		example: "https://api.frankfurter.app/latest?from=USD",
	},
	{
		widget: "Trending GitHub Repos",
		method: "GET",
		endpoint:
			"https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=5",
		description:
			"Get trending GitHub repos with >10,000 stars (GitHub REST API)",
		example:
			"https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=5",
	},
];

/**
 * ApiReference component displays a collapsible, responsive section
 * documenting all APIs used by the dashboard widgets.
 */
function ApiReference() {
	// Track open/closed state for the collapsible section
	const [open, setOpen] = useState(false);

	return (
		// Responsive container for the API Reference section
		<div className="w-full max-w-full sm:max-w-2xl mx-auto mt-8 sm:mt-12 px-2 sm:px-0">
			{/* Toggle button for showing/hiding API documentation */}
			<button
				className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-indigo-400 to-pink-400 text-white font-bold rounded-t-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all text-base sm:text-lg"
				onClick={() => setOpen((prev) => !prev)}
				aria-expanded={open}
				aria-controls="api-docs"
			>
				<span>API Reference (Used in This Dashboard)</span>
				<svg
					className={`w-5 h-5 transform transition-transform duration-300 ${
						open ? "rotate-180" : "rotate-0"
					}`}
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{open && (
				// Collapsible content: list of API endpoints
				<div
					id="api-docs"
					className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-b-2xl shadow-xl px-4 sm:px-6 py-4 sm:py-6 animate-fade-in"
				>
					<ul className="space-y-4 sm:space-y-6">
						{apiEndpoints.map((api, idx) => (
							<li
								key={idx}
								className="flex flex-col gap-1 p-2 sm:p-4 rounded-lg bg-indigo-50/60 border border-indigo-100 shadow-sm"
							>
								{/* Widget name and HTTP method */}
								<div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-1">
									<span className="font-bold text-indigo-700 text-base sm:text-lg">
										{api.widget}
									</span>
									<span
										className={`inline-block font-mono font-bold px-2 py-1 rounded text-xs sm:text-sm ${
											api.method === "GET"
												? "bg-green-100 text-green-700"
												: api.method === "POST"
												? "bg-blue-100 text-blue-700"
												: api.method === "PUT"
												? "bg-yellow-100 text-yellow-700"
												: "bg-red-100 text-red-700"
										}`}
									>
										{api.method}
									</span>
								</div>
								{/* Endpoint URL and example link */}
								<div className="flex flex-col md:flex-row md:items-center md:gap-2">
									<span className="font-mono text-indigo-800 text-xs break-all">
										{api.endpoint}
									</span>
									<a
										href={api.example}
										target="_blank"
										rel="noopener noreferrer"
										className="ml-0 md:ml-2 text-xs sm:text-sm text-blue-600 underline hover:text-blue-800"
									>
										Example
									</a>
								</div>
								{/* Description of the API */}
								<span className="text-gray-600 text-xs sm:text-sm mt-1">
									{api.description}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default ApiReference;
