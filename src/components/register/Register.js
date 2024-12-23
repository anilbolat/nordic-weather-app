function Register(props) {

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(event);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleFormSubmit}>
                <div style={{ textAlign: 'center', margin: '10px' }}>
                    <input className="input-group-text" type="text" name="username" placeholder="Username" />
                </div>
                <div style={{ textAlign: 'center', margin: '10px' }}>
                    <input className="input-group-text" type="password" name="password" placeholder="Password" />
                </div>
                <div style={{ textAlign: 'center', margin: '30px' }}>
                    <button type="submit" className="btn btn-info">Sign up</button>
                </div>
            </form>
        </div>
    );

}

export default Register;