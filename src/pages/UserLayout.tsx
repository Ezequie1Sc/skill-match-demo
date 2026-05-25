import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/UserNavBar'

function UserLayout() {
  return (
    <>
      <UserNavbar />

      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default UserLayout