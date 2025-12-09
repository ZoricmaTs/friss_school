import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {Navbar} from '../widgets/navbar';
import {WhatsAppWidget} from '../widgets/whatsApp';

const RootLayout = () => (
  <>
    <div style={{position: 'relative', backgroundColor: 'var(--bg-color)', zIndex: 2, paddingTop: '8rem', minHeight: '100vh'}}>
      <Navbar/>
      <WhatsAppWidget/>
      <Outlet/>
      <TanStackRouterDevtools/>
    </div>
  </>
)

export const Route = createRootRoute({component: RootLayout})