import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "@fontsource/montserrat/400.css";      // Regular
import "@fontsource/montserrat/700.css";      // Bold
import "@fontsource/montserrat/400-italic.css"; // Italic
import App from './App.tsx';
import "./typografy.scss";
import './App.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
