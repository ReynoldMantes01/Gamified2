import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5000/api/auth';

class AuthService {
    async login(email, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'An error occurred during login';
        }
    }

    async signup(email, password, name) {
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                email,
                password,
                name
            });
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'An error occurred during signup';
        }
    }

    async googleLogin(tokenId) {
        try {
            const decoded = jwtDecode(tokenId);
            const response = await axios.post(`${API_URL}/google`, {
                email: decoded.email,
                name: decoded.name,
                googleId: decoded.sub,
                profilePicture: decoded.picture
            });
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'An error occurred during Google login';
        }
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getToken() {
        const user = this.getCurrentUser();
        return user?.token;
    }
}

export default new AuthService();
