import { FaFire, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

// widgetConfigs defines all widgets to be rendered in the dashboard.
// Each object specifies the widget's type, title, icon, and API endpoint.
// To add a new widget, add a new object to this array.
const widgetConfigs = [
	{
		type: "crypto",
		title: "Crypto Prices (BTC/ETH)",
		icon: (
			<span className="flex justify-center gap-2 mb-2">
				<FaFire className="text-2xl text-yellow-500" />
				<FaFire className="text-2xl text-purple-500" />
			</span>
		),
		url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",
	},
	{
		type: "exchange",
		title: "Exchange Rates (USD)",
		icon: <FaMoneyBillWave className="text-3xl text-green-500 mb-2" />,
		url: "https://api.frankfurter.app/latest?from=USD",
	},
	{
		type: "github",
		title: "Trending GitHub Repos",
		icon: <FaChartLine className="text-3xl text-blue-500 mb-2" />,
		url: "https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=5",
	},
];

export default widgetConfigs;
