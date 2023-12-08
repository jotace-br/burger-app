import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { Menu } from './pages/menu';
import { NotFound } from './pages/not-found/not-found';
import { fetchRestaurantDetails } from './api/api';
import { useDataFetcher } from './hooks/use-data-fetcher';
import { Restaurant } from './types/types';
import { Suspense } from 'react';

export const AppRouter = () => {
  const { data } = useDataFetcher<Restaurant>(fetchRestaurantDetails);

  if (!data) {
    // TODO: Make a spinner
    return <Suspense fallback={<div>loading...</div>}></Suspense>;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header restaurantDetails={data} />}>
          <Route index element={<Menu />} />
          <Route path='login' element={<Menu />} />
          <Route path='contact' element={<Menu />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};