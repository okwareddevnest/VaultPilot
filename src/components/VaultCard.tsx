import { useState } from 'react'
import { TrendingUp, Clock, DollarSign } from 'lucide-react'
import ActivateModal from './ActivateModal'

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

const VaultCard = ({ vault }: { vault: VaultProps }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              vault.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            <h3 className="text-lg font-semibold text-gray-900">{vault.name}</h3>
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-primary-turquoise/10 text-primary-turquoise rounded-full">
            {vault.strategy}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{vault.description}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            </div>
            <p className="text-xs text-gray-600">APY</p>
            <p className="font-semibold text-green-600">{vault.apy}</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4 text-primary-purple mr-1" />
            </div>
            <p className="text-xs text-gray-600">TVL</p>
            <p className="font-semibold text-gray-900">{vault.tvl}</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-gray-500 mr-1" />
            </div>
            <p className="text-xs text-gray-600">Last Run</p>
            <p className="font-semibold text-gray-900">{vault.lastExecution}</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            vault.status === 'active'
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-primary-turquoise text-white hover:bg-opacity-90'
          }`}
          disabled={vault.status === 'active'}
        >
          {vault.status === 'active' ? 'Running' : 'Activate'}
        </button>
      </div>

      <ActivateModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        vault={vault}
      />
    </>
  )
}

export default VaultCard