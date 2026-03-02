import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { NewProject } from './pages/NewProject';
import { ProjectDashboard } from './pages/ProjectDashboard';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="logo">ERIQ</Link>
        <nav>
          <Link to="/">Projects</Link>
          <Link to="/new">New assessment</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewProject />} />
          <Route path="/project/:id" element={<ProjectDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
