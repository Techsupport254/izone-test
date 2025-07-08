import React, { useState, useEffect } from "react";
import Widget from "./Widget";
import widgetConfigs from "./widgetConfigs.jsx";

/**
 * Dashboard component renders all widgets in a responsive grid.
 * Animates widget appearance and adapts layout for mobile, tablet, and desktop.
 */
function Dashboard() {
	// Track which widgets are visible for staggered animation
	const [visibleWidgets, setVisibleWidgets] = useState(
		widgetConfigs.map(() => false)
	);

	useEffect(() => {
		// Stagger the widget animations for a smooth entrance effect
		const timers = [];
		visibleWidgets.forEach((_, index) => {
			const timer = setTimeout(() => {
				setVisibleWidgets((prev) => {
					const newState = [...prev];
					newState[index] = true;
					return newState;
				});
			}, index * 200); // 200ms delay between each widget
			timers.push(timer);
		});

		return () => timers.forEach((timer) => clearTimeout(timer));
	}, []);

	return (
		// Responsive grid: 1 column on mobile, 2 on tablets, 3 on large screens
		<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
			{widgetConfigs.map((config, idx) => (
				<div
					key={config.type}
					// Animate each widget's entrance with opacity and translate
					className={`transition-all duration-700 ease-out${
						idx > 0 ? ` delay-${idx * 200}` : ""
					} ${
						visibleWidgets[idx]
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					{/* Render each widget with its config */}
					<Widget {...config} />
				</div>
			))}
		</div>
	);
}

export default Dashboard;
