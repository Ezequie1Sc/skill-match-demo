import { Outlet } from 'react-router-dom'
import StudentNavbar from '../components/StudentNavBar'

function StudentLayout() {
  return (
    <>
      <StudentNavbar />

      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default StudentLayout