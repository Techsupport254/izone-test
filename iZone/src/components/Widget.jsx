import React, { useState, useEffect } from "react";
import {
	FaExclamationTriangle,
	FaFire,
	FaMoneyBillWave,
	FaChartLine,
} from "react-icons/fa";
import useAutoRefreshFetch from "../hooks/useAutoRefreshFetch";

// SkeletonLoader provides loading placeholders for each widget type
const SkeletonLoader = ({ type }) => {
	if (type === "crypto") {
		return (
			<div className="text-center animate-pulse">
				<h4 className="text-indigo-900 mb-2 font-semibold text-base sm:text-lg">
					Current Prices
				</h4>
				<div className="flex justify-center gap-2 sm:gap-4 mb-2">
					<div className="bg-slate-100 rounded-lg px-4 sm:px-6 py-2 sm:py-3 w-20 sm:w-24 h-14 sm:h-16">
						<div className="bg-slate-200 rounded h-4 w-8 mb-2"></div>
						<div className="bg-slate-200 rounded h-6 w-12 sm:w-16"></div>
					</div>
					<div className="bg-slate-100 rounded-lg px-4 sm:px-6 py-2 sm:py-3 w-20 sm:w-24 h-14 sm:h-16">
						<div className="bg-slate-200 rounded h-4 w-8 mb-2"></div>
						<div className="bg-slate-200 rounded h-6 w-12 sm:w-16"></div>
					</div>
				</div>
			</div>
		);
	}
	if (type === "exchange") {
		return (
			<div className="animate-pulse">
				<h4 className="text-indigo-900 mb-2 font-semibold text-base sm:text-lg">
					Major Exchange Rates
				</h4>
				<ul className="space-y-1">
					{["EUR", "GBP", "JPY", "INR", "ZAR"].map((cur) => (
						<li key={cur} className="flex justify-between">
							<span className="bg-slate-200 rounded h-4 w-8"></span>
							<span className="bg-slate-200 rounded h-4 w-12"></span>
						</li>
					))}
				</ul>
			</div>
		);
	}
	if (type === "github") {
		return (
			<div className="text-left animate-pulse">
				<h4 className="text-indigo-900 mb-2 font-semibold text-center text-base sm:text-lg">
					Top Trending
				</h4>
				<ul className="space-y-2">
					{[1, 2].map((i) => (
						<li key={i} className="border-b border-slate-100 pb-1">
							<div className="bg-slate-200 rounded h-4 w-24 sm:w-32 mb-1"></div>
							<div className="bg-slate-200 rounded h-3 w-32 sm:w-48 mb-1"></div>
							<div className="bg-slate-200 rounded h-3 w-12 sm:w-16"></div>
						</li>
					))}
				</ul>
			</div>
		);
	}
	return null;
};

/**
 * Widget component displays a single dashboard widget.
 * Fetches data from a given API, auto-refreshes, and handles loading/error states.
 * Layout and font sizes are fully responsive.
 */
export default function Widget({ type, title, icon, url }) {
	// Fetches data and manages loading/error state, auto-refreshes every 10s
	const { data, loading, error, refetch } = useAutoRefreshFetch(url);
	const [isVisible, setIsVisible] = useState(false);
	const [randomRepos, setRandomRepos] = useState([]); // Used for GitHub widget

	// For GitHub widget: select two random repos from the fetched data
	useEffect(() => {
		if (type === "github" && data && data.items) {
			const shuffled = [...data.items].sort(() => 0.5 - Math.random());
			setRandomRepos(shuffled.slice(0, 2));
		}
	}, [type, data]);

	// Fade-in animation for widget appearance
	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	// Renders the main content for each widget type
	function renderWidgetContent() {
		// Crypto widget: BTC and ETH prices
		if (type === "crypto" && data) {
			const btc = data.bitcoin?.usd;
			const eth = data.ethereum?.usd;
			return (
				<div className="text-center">
					<h4 className="text-indigo-900 mb-2 font-semibold text-base sm:text-lg">
						Current Prices
					</h4>
					{/* Responsive flex: stacks vertically on mobile, horizontally on larger screens */}
					<div className="flex flex-col xs:flex-row justify-center gap-2 sm:gap-4 mb-2 w-full max-w-xs mx-auto">
						<div className="bg-slate-100 rounded-lg px-3 sm:px-6 py-2 sm:py-3 min-w-0 flex-1 overflow-x-auto">
							<span className="text-yellow-600 font-bold text-base sm:text-lg block">
								BTC
							</span>
							<div className="text-lg sm:text-2xl font-black break-words">
								${btc?.toLocaleString()}
							</div>
						</div>
						<div className="bg-slate-100 rounded-lg px-3 sm:px-6 py-2 sm:py-3 min-w-0 flex-1 overflow-x-auto">
							<span className="text-purple-600 font-bold text-base sm:text-lg block">
								ETH
							</span>
							<div className="text-lg sm:text-2xl font-black break-words">
								${eth?.toLocaleString()}
							</div>
						</div>
					</div>
				</div>
			);
		}
		// Exchange widget: major currency rates
		if (type === "exchange" && data && data.rates) {
			const currencies = ["EUR", "GBP", "JPY", "INR", "ZAR"];
			return (
				<div>
					<h4 className="text-indigo-900 mb-2 font-semibold text-base sm:text-lg">
						Major Exchange Rates
					</h4>
					<ul className="space-y-1">
						{currencies.map((cur) => (
							<li
								key={cur}
								className="flex justify-between text-indigo-700 font-medium"
							>
								<span>{cur}</span>
								<span>
									{data.rates[cur] !== undefined
										? Number(data.rates[cur]).toLocaleString(undefined, {
												maximumFractionDigits: 5,
										  })
										: "-"}
								</span>
							</li>
						))}
					</ul>
				</div>
			);
		}
		// GitHub widget: trending repositories
		if (type === "github" && data && randomRepos.length > 0) {
			return (
				<div className="text-left">
					<h4 className="text-indigo-900 mb-2 font-semibold text-center text-base sm:text-lg">
						Top Trending
					</h4>
					<ul className="text-indigo-700 text-xs sm:text-sm space-y-2">
						{randomRepos.map((repo) => (
							<li
								key={repo.html_url}
								className="border-b border-slate-100 pb-1"
							>
								<a
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold text-blue-700 hover:underline flex items-center gap-2"
								>
									<FaFire className="text-xs text-green-500" />
									{repo.full_name}
								</a>
								<p className="text-slate-600 text-xs mb-1 line-clamp-2">
									{repo.description}
								</p>
								<span className="text-yellow-600 text-xs font-mono">
									★ {repo.stargazers_count?.toLocaleString()}
								</span>
							</li>
						))}
					</ul>
				</div>
			);
		}
		return null;
	}

	return (
		<div
			className={`bg-white/40 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-2xl border border-transparent p-4 sm:p-6 md:p-10 min-w-[180px] sm:min-w-[220px] md:min-w-[260px] w-full flex flex-col items-center justify-center transition-all duration-700 ease-out hover:shadow-3xl hover:-translate-y-2 hover:scale-105 group cursor-pointer font-sans relative h-[340px] sm:h-[380px] md:h-[400px] ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
			}`}
			style={{ minHeight: undefined }}
		>
			{/* Icon at the top of the widget */}
			{icon && (
				<div className="mb-3 animate-fade-in drop-shadow-lg scale-110 group-hover:scale-125 transition-transform duration-300">
					{icon}
				</div>
			)}
			{/* Widget title */}
			<h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-indigo-800 mb-3 sm:mb-5 tracking-tight text-center group-hover:text-indigo-600 transition-colors duration-200">
				{title}
			</h3>
			{/* Main content area: loading, error, or data */}
			<div
				className="relative w-full flex-1 flex items-center justify-center"
				style={{ minHeight: "100px" }}
			>
				{/* Loading state: show skeleton loader */}
				{loading && (
					<div className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out">
						<SkeletonLoader type={type} />
					</div>
				)}
				{/* Error state: show error message and retry button */}
				{error && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-lg p-2 sm:p-4 w-full transition-all duration-500 ease-in-out">
						<FaExclamationTriangle className="text-xl sm:text-2xl text-red-400 mb-2" />
						<p className="text-red-600 font-semibold mb-1 text-xs sm:text-sm">
							Something went wrong
						</p>
						<p className="text-red-500 text-xs mb-2">{error.message}</p>
						<button
							onClick={refetch}
							className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-medium transition-colors duration-200"
						>
							Retry
						</button>
					</div>
				)}
				{/* Data state: show widget content */}
				{!loading && !error && data && (
					<div className="w-full transition-all duration-500 ease-in-out animate-fade-in">
						{renderWidgetContent()}
					</div>
				)}
			</div>
		</div>
	);
}
