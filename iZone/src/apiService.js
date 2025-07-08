// Centralized API service for all fetch requests
// Use this function for all API calls to ensure consistent error handling and response parsing.
export async function fetchApi(url, options = {}) {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			// Build error message from status and (if available) error body
			let message = `Error: ${response.status}`;
			try {
				const errorData = await response.json();
				message += errorData.message ? ` - ${errorData.message}` : "";
			} catch {
				/* ignore JSON parse errors for error body */
			}
			throw new Error(message);
		}
		// Return parsed JSON data
		return await response.json();
	} catch (err) {
		// Network or parsing error
		throw new Error(err.message || "Unknown error occurred");
	}
}
