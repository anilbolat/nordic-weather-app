import { useState } from "react";

function Login(props) {
    const [formData, setFormData] = useState({ "email": "", "password": "" });

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        login(formData.email, formData.password);
    }

    const login = (email, password) => {
        fetch("/api/v1/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "email": email, "password": password })

            })
            .then((response) => response.json(), (response) => console.log("login req is rejected: " + response))
            .catch((reason) => console.log("reason: " + reason));
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