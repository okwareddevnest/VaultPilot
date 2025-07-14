// UPDATED: Added fee calculation, USD equivalent, and two-step approval flow
import { useState, useEffect } from 'react'
import { X, Zap, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAptosWallet } from '../hooks/useAptosWallet'
import { fetchTokenPrices, formatCurrency, formatTokenAmount, type PriceData } from '../utils/pricing'

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

type ActivationStep = 'approve' | 'execute' | 'completed'

const ActivateModal = ({ isOpen, onClose, vault }: ActivateModalProps) => {
  const [currentStep, setCurrentStep] = useState<ActivationStep>('approve')
  const [isLoading, setIsLoading] = useState(false)
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loadingPrices, setLoadingPrices] = useState(true)
  
  const { signAndSubmitTransaction, isConnected } = useAptosWallet()
  const guiFee = 50 // GUI tokens

  // Fetch live prices on modal open
  useEffect(() => {
    if (isOpen) {
      setCurrentStep('approve')
      setLoadingPrices(true)
      fetchTokenPrices()
        .then(setPriceData)
        .catch(() => {
          // Fallback already handled in fetchTokenPrices
          setPriceData({
            gui_usd: 3.45,
            apt_usd: 18.50,
            gui_apt: 0.186
          })
        })
        .finally(() => setLoadingPrices(false))
    }
  }, [isOpen])

  const handleApprove = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      await signAndSubmitTransaction({
        type: 'entry_function_payload',
        function: '0x1::gui_token::approve_spend',
        arguments: [guiFee.toString()]
      })
      
      toast.success('GUI spend approved!')
      setCurrentStep('execute')
    } catch (error) {
      toast.error('Failed to approve GUI spend')
      console.error('Approval failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExecute = async () => {
    setIsLoading(true)
    try {
      await signAndSubmitTransaction({
        type: 'entry_function_payload',
        function: '0x1::vault::activate_strategy',
        arguments: [vault.id, guiFee.toString()]
      })
      
      toast.success(`${vault.name} activated successfully!`)
      setCurrentStep('completed')
      
      // Auto close after 2 seconds
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      toast.error('Failed to execute strategy')
      console.error('Execution failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const feeUsd = priceData ? priceData.gui_usd * guiFee : 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md md:max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Activate Strategy</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Vault Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{vault.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{vault.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Expected APY:</span>
                <span className="font-medium text-green-600 ml-1">{vault.apy}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Strategy:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">{vault.strategy}</span>
              </div>
            </div>
          </div>

          {/* Fee Information */}
          <div className="border border-primary-turquoise/20 dark:border-primary-turquoise/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Activation Fee:</span>
              <div className="text-right">
                <div className="font-semibold text-primary-purple dark:text-primary-turquoise">
                  {formatTokenAmount(guiFee, 'GUI')}
                </div>
                {!loadingPrices && priceData && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ≈ {formatCurrency(feeUsd)}
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Fee is burned to reduce GUI supply and benefit all holders
            </p>
          </div>

          {/* Step Progress */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                currentStep === 'approve' 
                  ? 'bg-primary-turquoise text-white' 
                  : currentStep === 'execute' || currentStep === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep === 'execute' || currentStep === 'completed' ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <div className={`w-12 h-0.5 ${currentStep === 'execute' || currentStep === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                currentStep === 'execute' 
                  ? 'bg-primary-turquoise text-white'
                  : currentStep === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep === 'completed' ? <Check className="w-4 h-4" /> : '2'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {currentStep === 'approve' && (
              <>
                <button
                  onClick={handleApprove}
                  disabled={isLoading || !isConnected}
                  className="w-full flex items-center justify-center py-3 bg-primary-turquoise text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 min-h-[44px]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Approving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Approve GUI Spend
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Step 1: Approve GUI token spending
                </p>
              </>
            )}

            {currentStep === 'execute' && (
              <>
                <button
                  onClick={handleExecute}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center py-3 bg-primary-turquoise text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 min-h-[44px]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Executing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Execute Strategy
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Step 2: Execute strategy activation
                </p>
              </>
            )}

            {currentStep === 'completed' && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Strategy Activated!</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {vault.name} is now running and will start generating returns.
                </p>
              </div>
            )}

            {currentStep !== 'completed' && (
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors min-h-[44px]"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivateModal