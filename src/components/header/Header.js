import { useNavigate } from 'react-router-dom';

function Header(props) {

    const navigate = useNavigate();

    function handleSignup() {
        navigate('/register');
    }

    function handleLogin() {
        navigate('/login');
    }

    function handleLogout() {
        navigate('/logout');
    }

    return (
        <header>
            <div className="card-footer">
                <span> </span>
                <button className="btn" onClick={handleSignup}>Sign up</button>
                <span> </span>
                <button className="btn" onClick={handleLogin}>Login</button>
                <span> </span>
                <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );

}

export default Header;