import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { API_URL } from './config';
import { logIn } from './redux/userRedux';

import MainLayout from './components/layout/MainLayout/MainLayout';
import HomePage from './components/pages/HomePage/HomePage';
import BulletinPage from './components/pages/BulletinPage/BulletinPage';
import AddBulletin from './components/features/AddBulletin/AddBulletin';
import EditBulletin from './components/features/EditBulletin/EditBulletin';
import LoginPage from './components/pages/LoginPage/LoginPage';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import LogoutPage from './components/pages/LogoutPage/LogoutPage';
import DeleteBulletin from './components/pages/DeleteBulletin/DeleteBulletin';
import SearchResult from './components/pages/SearchResult/SearchResult';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {

    const isLoggedIn = !!localStorage.getItem('token');
     if (isLoggedIn || process.env.NODE_ENV !== 'production') {
        if(process.env.NODE_ENV !== 'production'){
        const options ={
          method: 'GET'
        };
        fetch(`${API_URL}/auth/user`, options)
        .then(res => {
          if (res.status === 200) {
            res.json().then(user => dispatch(logIn(user)));
          }else{
            return null;
          }
        })
        }else {
          const options = {
            method: 'GET',
            credentials: 'include'
          };
          fetch(`${API_URL}/auth/user`, options)
          .then((res) => {
            if (res.status === 200) {
              res.json().then(user => dispatch(logIn(user)));
            } else {
              return null;
            }
        })
     }
  }
  },[dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bulletins/:id" element={<BulletinPage />} />
        <Route path="/bulletins/add" element={<AddBulletin /> } />
        <Route path="/bulletins/edit/:id" element={<EditBulletin />} />
        <Route path="/bulletins/delete/:id" element={<DeleteBulletin />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/logout" element={<LogoutPage />} />
        <Route path="/search-results/:searchPhrase" element={<SearchResult />} />
        <Route element={<h1>404</h1>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
