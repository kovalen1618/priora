// React
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/home/Home';
import Create from './pages/create/Create';

// Styles
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
