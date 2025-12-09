import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import '@fontsource/montserrat/400.css';      // Regular
import '@fontsource/montserrat/700.css';      // Bold
import '@fontsource/montserrat/400-italic.css'; // Italic
import './typografy.scss';
import {createRouter, RouterProvider} from '@tanstack/react-router';

import './main.scss';
// Import the generated route tree
import {routeTree} from './routeTree.gen'

// Create a new router instance
const router = createRouter({routeTree, basepath: '/friss_school/'})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>,
  )
}