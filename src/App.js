// React
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/home/Home';
import Create from './pages/create/Create';

// Styles
import './App.css';
import { useAuthContext } from './hooks/useAuthContext';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
