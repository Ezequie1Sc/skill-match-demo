import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import StudentLayout from './pages/StudentLayout'
import StudentHome from './pages/student-side/StudentHome'
import Register from './pages/student-side/Register'

import AdminLayout from './pages/AdminLayout'
import AdminHome from './pages//admin-side/AdminHome'
import Participants from './pages//admin-side/Participants'
import Generator from './pages//admin-side/Generator'
import Dashboard from './pages//admin-side/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student" />} />

        <Route element={<StudentLayout />}>
          <Route path="/register" element={<StudentHome />} />
          <Route path="/register/form" element={<Register />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="participants" element={<Participants />} />
          <Route path="generator" element={<Generator />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App