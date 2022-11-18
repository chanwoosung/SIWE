import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ROUTE_PATH } from './constant';
import Home from './pages/Home';
import NFTDetail from './pages/NFTDetail';
import { useAppDispatch, useAppSelector } from './store/config';
import { logOut } from './store/slices/authSlice';
function App() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(state => state.auth);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimestamp = new Date().getTime();
      const refreshTokenExpiresAt = localStorage.getItem('expires_in');
      if (
        refreshTokenExpiresAt !== null &&
        currentTimestamp < Number(refreshTokenExpiresAt)
      ) {
        return;
      } else {
        dispatch(logOut());
        clearInterval(interval);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [accessToken, dispatch]);

  return (
    <div className='App min-h-[100vh] bg-white flex justify-center'>
      <Routes>
        <Route path={ROUTE_PATH.HOME} element={<Home />}>
          <Route path={ROUTE_PATH.DETAIL} element={<NFTDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
