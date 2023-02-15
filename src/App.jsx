/* eslint-disable import/named */
import { Route, Routes } from 'react-router-dom';
import Home from 'src/pages/Home';
import About from 'src/pages/About';
import Register from 'src/pages/Register';
import Login from 'src/pages/Login';
import 'src/App.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
