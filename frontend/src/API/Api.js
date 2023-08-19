import { createStatBody } from "../Helpers/Helpers";

const API_BASE_URL = 'http://localhost:8000';

const api = {
    deleteSessionIdFromLocalStorage() {
        if (localStorage.getItem('sessionid')) {
          localStorage.removeItem('sessionid');
        }
    },
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    },
    async register(data) {
        try {
            return await fetch("http://localhost:8000/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });  
        } catch (error) {
            console.log(error)
            return error;
        }
    },
    async login(data) {
        try {
            const csrfToken = this.getCookie('csrftoken');
            return await fetch(`${API_BASE_URL}/login/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data),
            });
        } catch(error) {
            console.log('login error: ', error)
        }
    },
    async logout() {
        try {
            const csrfToken = this.getCookie('csrftoken');
            const response = await fetch(`${API_BASE_URL}/logout/`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            this.deleteSessionIdFromLocalStorage();
            return 
        } catch(error) {
            console.log('logout error: ')
        }
    },
    async createIntervalSession() {
        try {
            console.log('creating interval session')
            const csrfToken = this.getCookie('csrftoken');
            const response = await fetch(`${API_BASE_URL}/intervals/create/`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            
            if (!response.ok)
                return null;

            return await response.json();

        } catch (error) {
            console.log('error: ', error)
        }
    },
    async updateIntervalSession(sessionID, correct, incorrect, stats) {
        try {
            console.log('updating interval session')
            const body = createStatBody(sessionID, correct, incorrect, stats)
            const csrfToken = this.getCookie('csrftoken');
            const response = await fetch(`${API_BASE_URL}/intervals/update/`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok)
                return null;

            return await response.json();

        } catch (error) {
            console.log('update interval session error: ', error)
        }
    },
    async createChordSession() {
        try {
            console.log('creating chord session')
            const csrfToken = this.getCookie('csrftoken');
            const response = await fetch(`${API_BASE_URL}/chords/create/`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            
            if (!response.ok)
                return null;

            return await response.json();

        } catch (error) {
            console.log('error: ', error)
        }
    },
    async updateChordSession(sessionID, correct, incorrect, stats) {
        try {
            console.log('updating interval session')
            const body = createStatBody(sessionID, correct, incorrect, stats)
            const csrfToken = this.getCookie('csrftoken');
            const response = await fetch(`${API_BASE_URL}/chords/update/`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok)
                return null;

            return await response.json();

        } catch (error) {
            console.log('update interval session error: ', error)
        }
    },
    async getUserStats() {
        try {
            console.log('getting stats')
            const csrfToken = this.getCookie('csrftoken');
            const response = await fetch(`${API_BASE_URL}/stats/`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            
            if (!response.ok)
                return null;

            return await response.json();

        } catch (error) {
            console.log('error: ', error)
        }
    }
};

export default api;

