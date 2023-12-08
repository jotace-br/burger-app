import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { Menu } from './pages/menu';
import { NotFound } from './pages/not-found/not-found';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Menu />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};
