// Default react imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Protected Router Wrapper
import ProtectRoutes from "./routes/ProtectRoutes";
// Pages
import Homepage from "./pages/Homepage";
import Login from './pages/Auth/Login';
import Dashboard from "./pages/Base/Dashboard";
//Styles
import './App.scss';
import UserProfile from "./pages/Users/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Homepage />} />
        {/* Protected Routes */}
        <Route element={<ProtectRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;