import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const Logout = (props) => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    }, [dispatch, navigate]);
};

export default Logout;