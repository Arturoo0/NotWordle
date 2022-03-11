import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './pages/Auth.js';
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
