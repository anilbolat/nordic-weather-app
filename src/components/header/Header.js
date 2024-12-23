import { useNavigate } from 'react-router-dom';

function Header(props) {

    const navigate = useNavigate();

    function handleSignup() {
        navigate('/register');
    }

    function handleLogin() {
        navigate('/login');
    }

    return (
        <header>
            <div className="card-footer">
                <span> </span>
                <button className="btn" onClick={handleSignup}>Sign up</button>
                <span> </span>
                <button className="btn" onClick={handleLogin}>Login</button>
            </div>
        </header>
    );

}

export default Header;