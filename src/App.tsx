import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Vaults from './pages/Vaults'
import Wallet from './pages/Wallet'
import GuiStats from './pages/GuiStats'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vaults" element={<Vaults />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/gui-stats" element={<GuiStats />} />
    </Routes>
  )
}

export default App