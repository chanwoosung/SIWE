import { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ROUTE_PATH } from './constant/constant';
import Home from './pages/Home';
import NFTDetail from './pages/NFTDetail';
function App() {
  return (
    <div className='App min-h-[100vh] bg-slate-800 flex justify-center'>
      <Suspense>
        <Routes>
          <Route path={ROUTE_PATH.HOME} element={<Home />}>
            <Route path={ROUTE_PATH.DETAIL} element={<NFTDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
