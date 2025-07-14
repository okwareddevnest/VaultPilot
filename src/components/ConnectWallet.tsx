// UPDATED: Replaced with useAptosWallet hook integration
import { Wallet } from 'lucide-react'
import { useAptosWallet } from '../hooks/useAptosWallet'

const ConnectWallet = () => {
  const { account, isConnected, isConnecting, connect, disconnect } = useAptosWallet()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div>
      {isConnected && account ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">{formatAddress(account.address)}</span>
          <button
            onClick={disconnect}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors min-h-[44px]"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          disabled={isConnecting}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-turquoise text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 min-h-[44px]"
        >
          <Wallet className="w-4 h-4" />
          <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
        </button>
      )}
    </div>
  )
}

export default ConnectWallet