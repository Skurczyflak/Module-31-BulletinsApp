import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';

import HomePage from './components/pages/HomePage/HomePage';
import BulletinPage from './components/pages/BulletinPage/BulletinPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bulletins/:id" element={<BulletinPage />} />
        <Route path="/bulletins/add" element={<h1>New Bulletin</h1>} />
        <Route path="/bulletins/edit/:id" element={<h1>Edit Bulletin</h1>} />
        <Route path="/auth/login" element={<h1>Login</h1>} />
        <Route path="/auth/register" element={<h1>Register</h1>} />
        <Route path="/search-results/:searchPhrase" element={<h1>Search</h1>} />
        <Route element={<h1>404</h1>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
