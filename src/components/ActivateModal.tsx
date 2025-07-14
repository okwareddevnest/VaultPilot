import { useState } from 'react'
import { X, Zap } from 'lucide-react'

interface VaultProps {
  id: string
  name: string
  strategy: string
  apy: string
  tvl: string
  lastExecution: string
  status: 'active' | 'inactive'
  description: string
}

interface ActivateModalProps {
  isOpen: boolean
  onClose: () => void
  vault: VaultProps
}

const ActivateModal = ({ isOpen, onClose, vault }: ActivateModalProps) => {
  const [isActivating, setIsActivating] = useState(false)
  
  const guiFee = '50' // Mock fee in GUI tokens

  const handleActivate = async () => {
    setIsActivating(true)
    
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert(`${vault.name} activated successfully!`)
    setIsActivating(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Activate Strategy</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-900 mb-2">{vault.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{vault.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Expected APY:</span>
                <span className="font-medium text-green-600 ml-1">{vault.apy}</span>
              </div>
              <div>
                <span className="text-gray-600">Strategy:</span>
                <span className="font-medium text-gray-900 ml-1">{vault.strategy}</span>
              </div>
            </div>
          </div>

          <div className="border border-primary-turquoise/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Activation Fee:</span>
              <div className="flex items-center">
                <span className="font-semibold text-primary-purple">{guiFee} GUI</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Fee is burned to reduce GUI supply and benefit all holders
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleActivate}
            disabled={isActivating}
            className="w-full flex items-center justify-center py-3 bg-primary-turquoise text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {isActivating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Activating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Pay & Start Strategy
              </>
            )}
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActivateModal