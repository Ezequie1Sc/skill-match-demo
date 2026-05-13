import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function AdminLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AdminLayout