import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CharacterListPage from './pages/CharacterListPage';
import CharacterDetails from './pages/CharacterDetailsPage';


function App() {
  return (
    <section style={{ padding: '1em', maxWidth: '1440px', margin: '0 auto' }}>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/character" replace />} />
          <Route path="/character" element={<CharacterListPage />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </section>
  );
}

export default App;