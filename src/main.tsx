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
import {createDynamicStore, DynamicStoreContext} from './providers/dynamicStore.ts';

// Create a new router instance
const router = createRouter({routeTree, basepath: '/'})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

async function main() {
  const dynamicData = await fetch('/friss_school/dynamic/config.json').then(async (res) => {
    return await res.json();
  });

  const dynamicStore = createDynamicStore(dynamicData);

  const rootElement = document.getElementById('root')!
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <StrictMode>
        <DynamicStoreContext value={dynamicStore}>
          <RouterProvider router={router}/>
        </DynamicStoreContext>
      </StrictMode>,
    )
  }
}

main().catch(null);