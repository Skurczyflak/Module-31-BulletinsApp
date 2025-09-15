import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoggedUserRequest } from './redux/userRedux';

import MainLayout from './components/layout/MainLayout/MainLayout';
import HomePage from './components/pages/HomePage/HomePage';
import BulletinPage from './components/pages/BulletinPage/BulletinPage';
import AddBulletin from './components/features/AddBulletin/AddBulletin';
import EditBulletin from './components/features/EditBulletin/EditBulletin';
import LoginPage from './components/pages/LoginPage/LoginPage';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedUserRequest());  
  },[dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bulletins/:id" element={<BulletinPage />} />
        <Route path="/bulletins/add" element={<AddBulletin />} />
        <Route path="/bulletins/edit/:id" element={<EditBulletin />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/search-results/:searchPhrase" element={<h1>Search</h1>} />
        <Route element={<h1>404</h1>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
