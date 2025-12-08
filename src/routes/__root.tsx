import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {Navbar} from '../widgets/navbar';

const RootLayout = () => (
  <>
    <div style={{position: 'relative', backgroundColor: 'var(--bg-color)', zIndex: 2}}>
      <Navbar/>
      <Outlet/>
      <TanStackRouterDevtools/>
    </div>
  </>
)

export const Route = createRootRoute({component: RootLayout})