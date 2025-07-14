import { useState, useEffect } from 'react'
import { X, ExternalLink, Download } from 'lucide-react'

const WalletBanner = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if Petra wallet is installed
    const hasWallet = typeof window !== 'undefined' && 'aptos' in window
    const wasDismissed = localStorage.getItem('vaultpilot-wallet-banner-dismissed') === 'true'
    
    if (!hasWallet && !wasDismissed) {
      setShowBanner(true)
    }
  }, [])

  const handleDismiss = () => {
    setShowBanner(false)
    setDismissed(true)
    localStorage.setItem('vaultpilot-wallet-banner-dismissed', 'true')
  }

  const handleInstallPetra = () => {
    window.open('https://petra.app/', '_blank')
  }

  if (!showBanner || dismissed) return null

  return (
    <div className="bg-gradient-to-r from-primary-purple to-primary-turquoise text-white px-4 py-3 relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <Download className="w-5 h-5" />
          <div>
            <p className="font-medium">
              Install Petra Wallet for the complete experience
            </p>
            <p className="text-sm opacity-90">
              Currently using demo mode. Install Petra to connect your real wallet.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleInstallPetra}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium">Install Petra</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WalletBanner