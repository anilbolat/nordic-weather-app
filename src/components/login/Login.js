import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [formData, setFormData] = useState({ "email": "", "password": "" });
    const { dispatch } = useAuthContext();
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
        const response = await fetch("/api/v1/auth/login", {
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
            navigate('/mylocation')
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleFormSubmit}>
                <div style={{ textAlign: 'center', margin: '10px' }}>
                    <input className="input-group-text" type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div style={{ textAlign: 'center', margin: '10px' }}>
                    <input className="input-group-text" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div style={{ textAlign: 'center', margin: '30px' }}>
                    <button type="submit" className="btn btn-info">Login</button>
                </div>
            </form>
        </div>
    );

}

export default Login;