import { useState } from "react";
import Header from '../header/Header';
import { WEATHER_API_BASE_URL } from '../../config.js'

function Register(props) {
    const [formData, setFormData] = useState({ "email": "", "password": "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        register(formData.email, formData.password);
    }

    const register = (email, password) => {
        fetch(`${WEATHER_API_BASE_URL}/api/v1/auth/register`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "email": email, "password": password })
            })
            .then((response) => response.json(), (response) => console.log("register req is rejected: " + response))
            .catch((reason) => console.log("reason: " + reason));
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex justify-center items-center h-[calc(100vh-4rem)] px-4">
            <form
                onSubmit={handleFormSubmit}
                className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

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

                <div className="mb-6">
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

                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                Sign up
                </button>
            </form>
            </div>
        </div>
    );


}

export default Register;