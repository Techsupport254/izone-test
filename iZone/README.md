<div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 2; margin: 0.5in;">

# SaaS Analytics Dashboard

## Overview

This project is a modular analytics dashboard built with React and Tailwind CSS. It displays multiple real-time widgets, each fetching data from a public API and auto-refreshing every 10 seconds. The codebase is designed for extensibility, maintainability, and rapid prototyping.

## Features

- Modular widget system: Add, remove, or modify widgets via a single configuration file.
- Auto-refreshing data: Each widget fetches and updates its data every 10 seconds using a custom React hook.
- Centralized API handling: All API calls are managed through a single service for consistency and error handling.
- Responsive, modern UI: Built with Tailwind CSS utility classes.
- Easy extensibility: Add new widgets or data sources with minimal code changes.

## Technologies Used

- React: Component-based UI library.
- Tailwind CSS: Utility-first CSS framework for styling.
- Vite: Development server and build tool.
- Custom React Hooks: For auto-refreshing API data.

## Project Structure

```
iZone/
├── src/
│   ├── apiService.js             # Centralized API fetch logic (with detailed comments)
│   ├── App.jsx                   # Main app layout, transitions, and responsive design
│   ├── components/
│   │   ├── Dashboard.jsx         # Renders all widgets in a responsive grid, with animation
│   │   ├── Widget.jsx            # Generic widget component, data fetching, error/loading UI
│   │   ├── widgetConfigs.jsx     # Widget configuration (type, title, icon, API url)
│   │   └── ApiReference.jsx      # Collapsible API documentation section
│   ├── hooks/
│   │   └── useAutoRefreshFetch.js # Custom hook for auto-refreshing API calls
│   ├── index.css                 # Tailwind and custom styles
│   └── main.jsx                  # React entry point
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Main Files and Their Roles

- **App.jsx**: Main layout, header, main content, and footer. Handles page transitions and responsive design. See code comments for section breakdowns.
- **Dashboard.jsx**: Renders widgets in a responsive grid. Animates widget appearance. See comments for grid and animation logic.
- **Widget.jsx**: Displays a single widget, fetches data, handles loading and error states, and adapts layout for all screen sizes. Comments explain each widget type and responsive logic.
- **widgetConfigs.jsx**: Array of widget definitions. Each object specifies type, title, icon, and API endpoint. Comments explain how to add new widgets.
- **useAutoRefreshFetch.js**: Custom React hook for fetching and auto-refreshing data every 10 seconds. Comments detail state management and refresh logic.
- **apiService.js**: Centralized API call handler. Ensures consistent error handling and response parsing. Comments explain error management and usage.
- **ApiReference.jsx**: Collapsible, responsive section documenting all APIs used by the dashboard widgets.

## Modular Widget System

- Widget Configuration: All widget definitions (type, title, icon, API URL) are in `src/components/widgetConfigs.jsx`. To add a widget, add a new object to the exported array.
- Dashboard: Imports the widget config and maps over it to render a `<Widget />` for each entry. This makes the dashboard layout flexible and scalable.
- Widget: Receives all config as props and handles its own data fetching and display logic.

## Auto-Refreshing Data

- Custom Hook: `useAutoRefreshFetch` (in `src/hooks/useAutoRefreshFetch.js`)
  - Fetches data from a given API endpoint on mount and every 10 seconds thereafter.
  - Uses `setInterval` within a `useEffect` to schedule repeated fetches.
  - Cleans up the interval on component unmount to prevent memory leaks.
  - Returns `{ data, loading, error, refetch }` for use in any component.

## Centralized API Handling

- API Service: `fetchApi` (in `src/apiService.js`)
  - All API requests are routed through this function.
  - Handles HTTP errors and parses JSON responses.
  - Provides a single point for error handling and future enhancements (e.g., authentication, logging).

## Default Widgets and APIs

| Widget         | API Endpoint & Method                                                                            | Description                                 |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| Crypto Prices  | `GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`       | Get current BTC & ETH prices (CoinGecko)    |
| Exchange Rates | `GET https://api.frankfurter.app/latest?from=USD`                                                | Get latest USD exchange rates (Frankfurter) |
| GitHub Repos   | `GET https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=5` | Trending GitHub repos (GitHub REST API)     |

## Setup and Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser to the local server URL (default: http://localhost:5173).

## Adding or Modifying Widgets

1. Open `src/components/widgetConfigs.jsx`.
2. Add a new object to the exported array with the following properties:
   - `type`: unique string identifier
   - `title`: display name
   - `icon`: JSX for the icon
   - `url`: API endpoint
3. The dashboard will automatically render the new widget.

## API Reference

The in-app "API Reference" section provides live documentation of all APIs used by the dashboard, including example links.

## Developer Notes

- All styling is done with Tailwind CSS utility classes; no traditional CSS files are used.
- All API calls are handled centrally for maintainability and consistency.
- The codebase is designed for easy extension and rapid prototyping.
- The auto-refresh interval can be adjusted in `useAutoRefreshFetch.js` if needed.

## Author

Victor Kirui
kiruivictor097@gmail.com

## License

MIT

</div>
