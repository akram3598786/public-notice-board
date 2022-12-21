import './App.css';
import Login from './Components/Authentication/LoginPage';
import Homepage from './Components/Home/Notices';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Contexts/AuthContext';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const {isAuth} = useContext(AuthContext);

  return (
    <div className="App">
       {isAuth ? <Navbar/> : null}
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
