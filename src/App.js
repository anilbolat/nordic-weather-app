import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Location from "./components/location/Location";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { loginData } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={loginData ? <Navigate to='/mylocation' /> : <Home />} />
          <Route path="/register" element={loginData ? <Navigate to='/mylocation' /> : <Register />} />
          <Route path="/login" element={loginData ? <Navigate to='/mylocation' /> : <Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/mylocation" element={loginData ? <Location /> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
