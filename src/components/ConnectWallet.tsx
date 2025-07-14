import { useState } from 'react'
import { Wallet } from 'lucide-react'

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && 'aptos' in window) {
        const wallet = (window as any).aptos
        const response = await wallet.connect()
        setWalletAddress(response.address)
        setIsConnected(true)
      } else {
        alert('Petra wallet not found. Please install Petra wallet extension.')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress('')
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">{formatAddress(walletAddress)}</span>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-turquoise text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  )
}

export default ConnectWallet