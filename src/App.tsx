import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// ─── STUDENT ─────────────────────────────────────
import StudentLayout from './pages/StudentLayout'
import StudentHome from './pages/student-side/StudentHome'
import Register from './pages/student-side/Register'
import Login from './pages/student-side/login' 


// ─── ADMIN ───────────────────────────────────────
import AdminLayout from './pages/AdminLayout'
import AdminHome from './pages/admin-side/AdminHome'
import Participants from './pages/admin-side/Participants'
import Generator from './pages/admin-side/Generator'
import Dashboard from './pages/admin-side/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ─── REDIRECT ───────────────────────── */}
        <Route path="/" element={<Navigate to="/landing-page" />} />

        {/* ─── STUDENT ROUTES ─────────────────── */}
        <Route element={<StudentLayout />}>
          <Route path="/landing-page" element={<StudentHome />} />
          <Route path="/landing/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} /> 
          
        </Route>

        {/* ─── ADMIN ROUTES ───────────────────── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="participants" element={<Participants />} />
          <Route path="generator" element={<Generator />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* RUTAS DE LOS USUARIOS*/}
        <Route path='/user' element={<></>}>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App