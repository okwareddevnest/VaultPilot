// UPDATED: Enhanced with demo wallet support and better UX
import { useEffect, useState } from 'react'
import { Wallet, Download } from 'lucide-react'
import { useAptosWallet } from '../hooks/useAptosWallet'

const ConnectWallet = () => {
  const { account, isConnected, isConnecting, connect, disconnect } = useAptosWallet()
  const [hasWallet, setHasWallet] = useState(true)

  useEffect(() => {
    setHasWallet(typeof window !== 'undefined' && 'aptos' in window)
  }, [])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleInstallWallet = () => {
    window.open('https://petra.app/', '_blank')
  }

  return (
    <div className="flex items-center space-x-2">
      {isConnected && account ? (
        <>
          <div className="flex items-center space-x-2">
            {!hasWallet && (
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 px-2 py-1 rounded">
                Demo
              </span>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {formatAddress(account.address)}
            </span>
          </div>
          <button
            onClick={disconnect}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors min-h-[44px] text-sm"
          >
            Disconnect
          </button>
        </>
      ) : (
        <>
          <button
            onClick={connect}
            disabled={isConnecting}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-turquoise text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 min-h-[44px]"
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isConnecting ? 'Connecting...' : hasWallet ? 'Connect Wallet' : 'Demo Wallet'}
            </span>
          </button>
          
          {!hasWallet && (
            <button
              onClick={handleInstallWallet}
              className="hidden md:flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors min-h-[44px] text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Install Petra</span>
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default ConnectWallet