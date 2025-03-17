// ipHelper.js
export const IpHelper = {
    // Default API (ipfy) to get the IP address
    getIpAddress: async () => {
        try {
            const response = await fetch("https://api4.ipify.org?format=json");
            const data = await response.json(); // Parse JSON correctly
            return data.ip; // Assuming 'ip' is the key in the response
        } catch (error) {
            console.error("Error fetching IP from ipfy:", error);
            return null;
        }
    },

    // Fallback API (ipapi) to get the IP address if IPv6 is detected
    getIpAddressFromIpApi: async () => {
        try {
            const response = await fetch("https://api.ipapi.com/api/check?access_key=YOUR_API_KEY");
            const data = await response.json();
            return data.ip; // Assuming 'ip' is the key in the response
        } catch (error) {
            console.error("Error fetching IP from ipapi:", error);
            return null;
        }
    }
};
