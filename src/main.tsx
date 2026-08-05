import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { configureMetaPixel, MetaPixel, MetaPixelProvider } from '@jussimirvfx/meta-pixel-tracking';
import App from './App.tsx';
import './index.css';

configureMetaPixel({
  PIXEL_ID: import.meta.env.VITE_META_PIXEL_ID,
  ACCESS_TOKEN: import.meta.env.VITE_META_API_ACCESS_TOKEN,
  TEST_EVENT_CODE: import.meta.env.VITE_META_TEST_EVENT_CODE,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MetaPixelProvider>
      <App />
      <MetaPixel />
    </MetaPixelProvider>
  </StrictMode>,
);
