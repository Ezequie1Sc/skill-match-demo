import { useState } from 'react'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import Participants from './pages/Participants'
import Generator from './pages/Generator'
import Dashboard from './pages/Dashboard'

type Page = 'home' | 'participants' | 'generator' | 'dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  return (
    <>
      <NavBar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {currentPage === 'home' && <Home />}
          {currentPage === 'participants' && <Participants />}
          {currentPage === 'generator' && <Generator />}
          {currentPage === 'dashboard' && <Dashboard />}
        </div>
      </main>
    </>
  )
}

export default App