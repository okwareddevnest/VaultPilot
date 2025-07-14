// UPDATED: Added animated numbers, dark mode support, and mobile responsive design
import { useState } from 'react'
import { TrendingUp, Clock, DollarSign } from 'lucide-react'
import { animated } from 'react-spring'
import ActivateModal from './ActivateModal'
import { useAnimatedNumber } from '../hooks/useVaultData'

interface VaultProps {
  id: string
  name: string
  strategy: string
  apy: number | string
  tvl: number | string
  lastExecution: string
  status: 'active' | 'inactive'
  description: string
}

const VaultCard = ({ vault }: { vault: VaultProps }) => {
  const [showModal, setShowModal] = useState(false)
  
  // Convert string percentages to numbers for animation
  const apyNumber = typeof vault.apy === 'string' ? 
    parseFloat(vault.apy.replace('%', '')) : vault.apy
  const tvlNumber = typeof vault.tvl === 'string' ? 
    parseFloat(vault.tvl.replace(/[$K,M]/g, '')) : vault.tvl

  const animatedApy = useAnimatedNumber(apyNumber, 1)
  const animatedTvl = useAnimatedNumber(tvlNumber, 0)

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              vault.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{vault.name}</h3>
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-primary-turquoise/10 text-primary-turquoise rounded-full self-start sm:self-center">
            {vault.strategy}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{vault.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">APY</p>
            <animated.p className="font-semibold text-green-600">
              {animatedApy.to(n => `${n}%`)}
            </animated.p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4 text-primary-purple dark:text-primary-turquoise mr-1" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">TVL</p>
            <animated.p className="font-semibold text-gray-900 dark:text-white">
              {animatedTvl.to(n => {
                const num = Number(n)
                return typeof vault.tvl === 'string' && vault.tvl.includes('K') 
                  ? `$${num.toFixed(0)}K`
                  : typeof vault.tvl === 'string' && vault.tvl.includes('M')
                  ? `$${num.toFixed(1)}M`
                  : `$${num.toFixed(0)}`
              })}
            </animated.p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-gray-500 mr-1" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Last Run</p>
            <p className="font-semibold text-gray-900 dark:text-white">{vault.lastExecution}</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className={`w-full py-3 rounded-lg font-medium transition-colors min-h-[44px] ${
            vault.status === 'active'
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
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
        vault={{
          ...vault,
          apy: typeof vault.apy === 'number' ? `${vault.apy}%` : vault.apy,
          tvl: typeof vault.tvl === 'number' ? `$${vault.tvl}K` : vault.tvl,
        }}
      />
    </>
  )
}

export default VaultCard