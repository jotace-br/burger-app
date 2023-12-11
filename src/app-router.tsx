import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@components/header';
import { Menu } from '@pages/menu';
import { NotFound } from '@pages/not-found';
import { CategoryProvider } from '@contexts/category-context';
import { CheckoutProvider } from '@contexts/checkout-content';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route
            index
            element={
              <CategoryProvider>
                <CheckoutProvider>
                  <Menu.Menu />
                </CheckoutProvider>
              </CategoryProvider>
            }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};
