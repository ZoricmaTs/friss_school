import {createFileRoute, Outlet} from '@tanstack/react-router'
import {WhatsAppWidget} from '../../widgets/whatsApp';

export const Route = createFileRoute('/_regular')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <WhatsAppWidget/>
    <Outlet/>
  </>
}
