import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Scanner from './pages/Scanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
      </Routes>
    </Router>
  );
}

export default App;
