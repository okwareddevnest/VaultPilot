// UPDATED: Added staking functionality and mobile responsive design
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import TokenBalance from '../components/TokenBalance'
import { Send, Plus, Minus, Zap } from 'lucide-react'
import { useStaking } from '../hooks/useStaking'
import { useTokenBalances } from '../hooks/useTokenBalances'
import { useAptosWallet } from '../hooks/useAptosWallet'
import toast from 'react-hot-toast'


// Mock vault positions - adjust based on network
const getMockVaultPositions = (isTestnet: boolean) => [
  {
    name: 'Arbitrage Bot Alpha',
    invested: isTestnet ? '$50.00' : '$2,500.00',
    current: isTestnet ? '$57.95' : '$2,847.32',
    profit: isTestnet ? '+$7.95' : '+$347.32',
    profitPercent: '+15.9%'
  },
  {
    name: 'Yield Farm Pro',
    invested: isTestnet ? '$75.00' : '$5,000.00',
    current: isTestnet ? '$84.60' : '$5,642.18',
    profit: isTestnet ? '+$9.60' : '+$642.18',
    profitPercent: '+12.8%'
  },
  {
    name: 'Stablecoin Yield',
    invested: isTestnet ? '$25.00' : '$3,200.00',
    current: isTestnet ? '$26.25' : '$3,358.40',
    profit: isTestnet ? '+$1.25' : '+$158.40',
    profitPercent: '+5.0%'
  }
]

const Wallet = () => {
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const { stakingData, isStaking, isUnstaking, stakeGui, unstakeGui, claimRewards } = useStaking()
  const { balances } = useTokenBalances()
  const { network } = useAptosWallet()
  
  const mockVaultPositions = getMockVaultPositions(network === 'testnet')

  const handleStake = async () => {
    const amount = parseFloat(stakeAmount)
    if (isNaN(amount)) {
      toast.error('Please enter a valid amount')
      return
    }
    
    await stakeGui(amount)
    setStakeAmount('')
  }

  const handleUnstake = async () => {
    const amount = parseFloat(unstakeAmount)
    if (isNaN(amount)) {
      toast.error('Please enter a valid amount')
      return
    }
    
    await unstakeGui(amount)
    setUnstakeAmount('')
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 ${showMobileSidebar ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowMobileSidebar(false)}></div>
        <div className="relative w-64">
          <Sidebar />
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col">
        <Topbar onMobileMenuToggle={() => setShowMobileSidebar(!showMobileSidebar)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">Wallet</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your tokens and vault positions</p>
            </div>

            {/* Total Portfolio Value */}
            <div className="bg-gradient-to-r from-primary-purple to-primary-turquoise p-6 lg:p-8 rounded-lg text-white mb-8">
              <h2 className="text-lg font-medium mb-2">Total Portfolio Value</h2>
              <p className="text-3xl lg:text-4xl font-bold mb-4">
                {network === 'testnet' ? '$378.15' : '$18,294.52'}
              </p>
              <div className="flex items-center text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {network === 'testnet' ? '+$25.78 (+7.3%) 24h' : '+$1,147.23 (+6.7%) 24h'}
                </span>
              </div>
              {network === 'testnet' && (
                <p className="text-xs mt-2 opacity-75">
                  🧪 Testnet balances - Perfect for testing VaultPilot features!
                </p>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Token Balances */}
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Token Balances</h2>
                  <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 bg-primary-turquoise text-white rounded-lg hover:bg-opacity-90 transition-colors min-h-[44px]">
                      <Send className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                    <button className="flex items-center px-4 py-2 bg-primary-purple text-white rounded-lg hover:bg-opacity-90 transition-colors min-h-[44px]">
                      <Plus className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Receive</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {balances.map((token) => (
                    <TokenBalance key={token.symbol} {...token} />
                  ))}
                </div>

                {/* Vault Positions */}
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Active Vault Positions</h2>
                <div className="space-y-4">
                  {mockVaultPositions.map((position) => (
                    <div key={position.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{position.name}</h3>
                        <button className="flex items-center px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors min-h-[44px]">
                          <Minus className="w-4 h-4 mr-1" />
                          Withdraw
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Invested</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{position.invested}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Current Value</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{position.current}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Profit/Loss</p>
                          <p className="font-semibold text-green-600">{position.profit}</p>
                          <p className="text-sm text-green-600">{position.profitPercent}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staking Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">$GUI Staking</h2>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-primary-turquoise" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Stake GUI Tokens</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Earn additional rewards by staking your GUI tokens</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Available to Stake</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{stakingData.availableBalance.toFixed(2)} GUI</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Currently Staked</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{stakingData.stakedAmount.toFixed(2)} GUI</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Staking APY</span>
                        <span className="font-semibold text-green-600">{stakingData.stakingApy}%</span>
                      </div>
                    </div>

                    {/* Staking Form */}
                    <div className="space-y-2">
                      <input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="Amount to stake"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-turquoise focus:border-primary-turquoise min-h-[44px]"
                      />
                      <button 
                        onClick={handleStake}
                        disabled={isStaking || !stakeAmount}
                        className="w-full py-3 bg-primary-turquoise text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 min-h-[44px]"
                      >
                        {isStaking ? 'Staking...' : 'Stake GUI'}
                      </button>
                    </div>

                    {/* Unstaking Form */}
                    {stakingData.stakedAmount > 0 && (
                      <div className="space-y-2 border-t dark:border-gray-600 pt-4">
                        <input
                          type="number"
                          value={unstakeAmount}
                          onChange={(e) => setUnstakeAmount(e.target.value)}
                          placeholder="Amount to unstake"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-turquoise focus:border-primary-turquoise min-h-[44px]"
                        />
                        <button 
                          onClick={handleUnstake}
                          disabled={isUnstaking || !unstakeAmount}
                          className="w-full py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 min-h-[44px]"
                        >
                          {isUnstaking ? 'Unstaking...' : 'Unstake GUI'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rewards */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Rewards</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Staking Rewards</span>
                      <span className="font-semibold text-gray-900 dark:text-white">12.45 GUI</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Vault Fees</span>
                      <span className="font-semibold text-gray-900 dark:text-white">8.32 GUI</span>
                    </div>
                    <hr className="dark:border-gray-600" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 dark:text-white">Total Pending</span>
                      <span className="font-bold text-primary-turquoise">{stakingData.pendingRewards.toFixed(2)} GUI</span>
                    </div>
                  </div>

                  <button 
                    onClick={claimRewards}
                    disabled={stakingData.pendingRewards <= 0}
                    className="w-full mt-4 py-3 bg-primary-purple text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 min-h-[44px]"
                  >
                    Claim Rewards
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Wallet