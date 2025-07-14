// UPDATED: Added dark mode support and improved mobile accessibility
import { Link, useLocation } from 'react-router-dom'
import { Shield, Vault, Wallet, BarChart3, Settings } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Shield },
    { path: '/vaults', label: 'Vaults', icon: Vault },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
    { path: '/gui-stats', label: '$GUI Stats', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="w-64 bg-primary-purple dark:bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <img src="/VaultPilot.png" alt="VaultPilot" className="w-8 h-8" />
          <span className="text-xl font-bold">VaultPilot</span>
        </div>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-primary-turquoise text-primary-purple dark:text-primary-purple'
                      : 'hover:bg-purple-700 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar