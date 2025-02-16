import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CharacterListPage from './pages/CharacterListPage';
import CharacterDetails from './pages/CharacterDetailsPage';
import { ROUTES } from './config/routes';


function App() {
  return (
    <section style={{ padding: '1em', maxWidth: '1440px', margin: '0 auto' }}>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.CHARACTERS} replace />} />
          <Route path={ROUTES.CHARACTERS} element={<CharacterListPage />} />
          <Route path={ROUTES.CHARACTER_DETAILS()} element={<CharacterDetails />} />
        </Routes>
      </Router>
    </section>
  );
}

export default App;