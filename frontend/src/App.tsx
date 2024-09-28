import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursePage from './pages/CoursePage.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoursePage />} />
      </Routes>
    </Router>
  )
}

export default App
