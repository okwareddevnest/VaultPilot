import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import TokenBalance from '../components/TokenBalance'
import { Send, Plus, Minus, Zap } from 'lucide-react'

const mockTokens = [
  {
    symbol: 'APT',
    balance: '45.80',
    value: '$847.20',
    change: '+$12.45',
    changePercent: '+1.5%'
  },
  {
    symbol: 'USDC',
    balance: '2,847.32',
    value: '$2,847.32',
    change: '+$0.12',
    changePercent: '+0.004%'
  },
  {
    symbol: 'GUI',
    balance: '1,250.50',
    value: '$3,751.50',
    change: '+$125.30',
    changePercent: '+3.5%'
  }
]

const mockVaultPositions = [
  {
    name: 'Arbitrage Bot Alpha',
    invested: '$2,500.00',
    current: '$2,847.32',
    profit: '+$347.32',
    profitPercent: '+13.9%'
  },
  {
    name: 'Yield Farm Pro',
    invested: '$5,000.00',
    current: '$5,642.18',
    profit: '+$642.18',
    profitPercent: '+12.8%'
  },
  {
    name: 'Stablecoin Yield',
    invested: '$3,200.00',
    current: '$3,358.40',
    profit: '+$158.40',
    profitPercent: '+5.0%'
  }
]

const Wallet = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Topbar />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet</h1>
              <p className="text-gray-600">Manage your tokens and vault positions</p>
            </div>

            {/* Total Portfolio Value */}
            <div className="bg-gradient-to-r from-primary-purple to-primary-turquoise p-8 rounded-lg text-white mb-8">
              <h2 className="text-lg font-medium mb-2">Total Portfolio Value</h2>
              <p className="text-4xl font-bold mb-4">$18,294.52</p>
              <div className="flex items-center text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  +$1,147.23 (+6.7%) 24h
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Token Balances */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Token Balances</h2>
                  <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 bg-primary-turquoise text-white rounded-lg hover:bg-opacity-90 transition-colors">
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </button>
                    <button className="flex items-center px-4 py-2 bg-primary-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Receive
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {mockTokens.map((token) => (
                    <TokenBalance key={token.symbol} {...token} />
                  ))}
                </div>

                {/* Vault Positions */}
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Vault Positions</h2>
                <div className="space-y-4">
                  {mockVaultPositions.map((position) => (
                    <div key={position.name} className="bg-white p-6 rounded-lg shadow-sm border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{position.name}</h3>
                        <button className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                          <Minus className="w-4 h-4 mr-1" />
                          Withdraw
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Invested</p>
                          <p className="font-semibold text-gray-900">{position.invested}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Current Value</p>
                          <p className="font-semibold text-gray-900">{position.current}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Profit/Loss</p>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">$GUI Staking</h2>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-primary-turquoise" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Stake GUI Tokens</h3>
                    <p className="text-sm text-gray-600">Earn additional rewards by staking your GUI tokens</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Available to Stake</span>
                        <span className="font-semibold">1,250.50 GUI</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Currently Staked</span>
                        <span className="font-semibold">850.00 GUI</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Staking APY</span>
                        <span className="font-semibold text-green-600">8.5%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="Amount to stake"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-turquoise focus:border-primary-turquoise"
                      />
                      <button className="w-full py-3 bg-primary-turquoise text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                        Stake GUI
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rewards */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Rewards</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Staking Rewards</span>
                      <span className="font-semibold">12.45 GUI</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Vault Fees</span>
                      <span className="font-semibold">8.32 GUI</span>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Pending</span>
                      <span className="font-bold text-primary-turquoise">20.77 GUI</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-3 bg-primary-purple text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
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