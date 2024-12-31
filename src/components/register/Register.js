import { useState } from "react";
import Header from '../header/Header';

function Register(props) {
    const [formData, setFormData] = useState({ "email": "", "password": "" });

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        
        console.log(formData);
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        register(formData.email, formData.password);
    }

    const register = (email, password) => {
        fetch("/api/v1/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "email": email, "password": password })
            })
            .then((response) => response.json(), (response) => console.log("register req is rejected: " + response))
            .catch((reason) => console.log("reason: " + reason));
    }

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={handleFormSubmit}>
                    <div style={{ textAlign: 'center', margin: '10px' }}>
                        <input className="input-group-text" type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div style={{ textAlign: 'center', margin: '10px' }}>
                        <input className="input-group-text" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                    </div>
                    <div style={{ textAlign: 'center', margin: '30px' }}>
                        <button type="submit" className="btn btn-info">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Register;