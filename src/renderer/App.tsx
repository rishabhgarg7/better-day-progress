import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import 'tailwindcss/tailwind.css';
import { SettingsProvider } from './context/SettingsContext';
import Settings from './components/Settings.jsx';

function Hello() {
  return (
    <div className="min-h-screen w-screen bg-red-200">
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
