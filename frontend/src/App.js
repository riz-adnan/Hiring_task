// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Importing components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import TitleCard from './components/TitleCard';
// Importing context
import { ThemeProvider } from './context/themeContext.jsx';
import { AccountProvider } from './context/WalletContext.jsx';
function App() {
  return (
    <AccountProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/titlecard" element={<TitleCard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </AccountProvider>
  );
}

export default App;
