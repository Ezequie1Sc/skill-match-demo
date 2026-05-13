import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import StudentHome from './pages/StudentHome'
import AdminHome from './pages/AdminHome'
import Register from './pages/Register'
import Participants from './pages/Participants'
import Generator from './pages/Generator'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <Routes>
            <Route path="/" element={<Navigate to="/student" />} />

            <Route path="/register" element={<StudentHome />} />
            <Route path="/register/form" element={<Register />} />

            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/participantes" element={<Participants />} />
            <Route path="/admin/generador" element={<Generator />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App