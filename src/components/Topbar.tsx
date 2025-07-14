// UPDATED: Added network switch, theme toggle, and mobile responsive design
import { useState } from 'react'
import { Menu, Sun, Moon, ChevronDown } from 'lucide-react'
import ConnectWallet from './ConnectWallet'
import { useAptosWallet, type Network } from '../hooks/useAptosWallet'
import { useTheme } from '../hooks/useTheme'

interface TopbarProps {
  onMobileMenuToggle?: () => void
}

const Topbar = ({ onMobileMenuToggle }: TopbarProps) => {
  const { network, switchNetwork } = useAptosWallet()
  const { theme, toggleTheme } = useTheme()
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false)

  const handleNetworkSwitch = async (newNetwork: Network) => {
    await switchNetwork(newNetwork)
    setShowNetworkDropdown(false)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <h1 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-white">VaultPilot Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-2 lg:space-x-6">
        {/* Balances - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-300">GUI:</span>
            <span className="font-semibold text-primary-purple dark:text-primary-turquoise ml-1">1,250.50</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-300">APT:</span>
            <span className="font-semibold text-primary-purple dark:text-primary-turquoise ml-1">45.80</span>
          </div>
        </div>
        
        {/* Network Switch */}
        <div className="relative">
          <button
            onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors min-h-[44px]"
          >
            <span className="text-sm font-medium capitalize">{network}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showNetworkDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
              <button
                onClick={() => handleNetworkSwitch('mainnet')}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg ${
                  network === 'mainnet' ? 'bg-primary-turquoise/10 text-primary-turquoise' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Mainnet
              </button>
              <button
                onClick={() => handleNetworkSwitch('testnet')}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg ${
                  network === 'testnet' ? 'bg-primary-turquoise/10 text-primary-turquoise' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Testnet
              </button>
            </div>
          )}
        </div>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        
        <ConnectWallet />
      </div>
    </header>
  )
}

export default Topbar