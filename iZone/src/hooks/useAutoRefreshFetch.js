import { useState, useEffect, useCallback, useRef } from "react";
import { fetchApi } from "../apiService";

/**
 * useAutoRefreshFetch is a custom React hook for fetching data from an API endpoint.
 * It automatically refreshes the data every 10 seconds and manages loading and error state.
 * Returns the latest data, loading status, error, and a manual refetch function.
 */
export default function useAutoRefreshFetch(url) {
	// State for fetched data, loading status, and error
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const intervalRef = useRef();

	// fetchData fetches data from the API and updates state
	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const result = await fetchApi(url);
			setData(result);
			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [url]);

	useEffect(() => {
		let isMounted = true;
		// Fetch data immediately on mount
		fetchData();
		// Set up interval to auto-refresh every 10 seconds
		intervalRef.current = setInterval(() => {
			if (isMounted) fetchData();
		}, 10000);
		// Clean up interval and prevent state updates after unmount
		return () => {
			isMounted = false;
			clearInterval(intervalRef.current);
		};
	}, [url, fetchData]);

	// Return latest data, loading, error, and manual refetch
	return { data, loading, error, refetch: fetchData };
}
