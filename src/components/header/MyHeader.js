import { useNavigate } from 'react-router-dom';

const MyHeader = (props) => {
    const navigate = useNavigate();

    function handleLogout() {
        navigate('/logout');
    }

    return (
        <header>
            <div className="card-footer">
                
                <span> </span>
                <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );

}

export default MyHeader;