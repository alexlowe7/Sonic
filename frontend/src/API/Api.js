const API_BASE_URL = 'http://localhost:8000';

const api = {
    async getNewAccessToken(refreshToken, login) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                const { access } = data;

                // Update the access token in the AuthContext
                login(access, refreshToken);

                return access;
            } else {
                // Refresh token is expired or invalid
                return null;
            }
        } catch (error) {
            console.error('Error refreshing access token:', error);
            return null;
        }
    },
    async postIntervalSessionData(stats) {
        try {
            console.log('sending stats')
            const response = await fetch(`${API_BASE_URL}/intervals/post/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stats),
            });
        } catch (error) {
            console.log('error')
        }
    }
};

export default api;

