import {Route, Routes} from 'react-router-dom';

import DetailNews from './pages/DetailNews';
import FilterNewsPage from './pages/FilterNewsPage';
import Home from './pages/Home';
import MainPage from './pages/MainPage';
import TickerNotFoundPage from './components/TickerNotFoundPage';

//import React from 'react';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/stockAnalysis/:id" element={<DetailNews />} />
      {/* <Route path="/stockAnalysis/:id" element={<DetailNewsPopupCard />} /> */}
      <Route path="/stockAnalysis/ticker/:ticker" element={<FilterNewsPage />} />
      <Route path="/ticker-not-found" element={<TickerNotFoundPage />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;
 