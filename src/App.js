// Default react imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Pages
import Homepage from "./pages/Homepage";
import Login from './pages/Auth/Login';
//Styles
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;