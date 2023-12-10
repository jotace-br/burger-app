import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@components/header';
import { Menu } from '@pages/menu';
import { NotFound } from '@pages/not-found/not-found';
import { CategoryProvider } from '@contexts/category-context';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route
            index
            element={
              <CategoryProvider>
                <Menu />
              </CategoryProvider>
            }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};
