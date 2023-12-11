import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchRestaurantDetails } from '@api/api';
import { WebSettings } from '@/types/types';

interface WebSettingsProviderProps {
  children: React.ReactNode;
}

const defaultWebSettingsContext = {
  id: 5854,
  venueId: 7602,
  bannerImage:
    'https://preodemo.gumlet.io/usr/venue/7602/web/646fbf3abf9d0.png',
  backgroundColour: '#ffffff',
  primaryColour: '#4f372f',
  primaryColourHover: '#4f372f',
  navBackgroundColour: '#4f372f',
};

const WebSettingsContext = createContext<WebSettings | undefined>(
  defaultWebSettingsContext
);

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSettings = () => useContext(WebSettingsContext);

export const WebSettingsProvider = ({ children }: WebSettingsProviderProps) => {
  const [webSettings, setWebSettings] = useState<WebSettings>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchRestaurantDetails();
        const { webSettings } = response;
        setWebSettings(webSettings);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setWebSettings(defaultWebSettingsContext);
      }
    };

    fetchData();
  }, []);

  return (
    <WebSettingsContext.Provider value={webSettings}>
      {children}
    </WebSettingsContext.Provider>
  );
};
