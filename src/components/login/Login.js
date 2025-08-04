import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { WEATHER_API_BASE_URL } from '../../config.js';

function Login(props) {
    const [formData, setFormData] = useState({ "email": "", "password": "" });
    const { setEmail, dispatch } = useAuthContext();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        login(formData.email, formData.password);
    }

    const login = async (email, password) => {
        const response = await fetch(`${WEATHER_API_BASE_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "email": email, "password": password })
        });
        const data = await response.json();

        if (!response.ok) {
            console.log("login is rejected: " + response);
        }

        if (response.ok && data.token) {
            dispatch({ type: 'LOGIN', payload: JSON.stringify(data) });
            setEmail(email);
            navigate('/mylocation');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">

            <form onSubmit={handleFormSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );


}

export default Login;