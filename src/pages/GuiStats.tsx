import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Flame, Users, Zap, TrendingUp } from 'lucide-react'

const GuiStats = () => {
  const mockStats = {
    burnedTokens: '125,847.32',
    activeUsers: '1,284',
    totalActivations: '8,947',
    marketCap: '$18.2M',
    price: '$3.45',
    priceChange: '+12.4%',
    volume24h: '$2.1M',
    circulatingSupply: '5,274,152'
  }

  const mockBurnHistory = [
    { date: '2024-01-15', amount: '1,250.00', reason: 'Strategy Activations' },
    { date: '2024-01-14', amount: '890.50', reason: 'Platform Fees' },
    { date: '2024-01-13', amount: '2,100.25', reason: 'Strategy Activations' },
    { date: '2024-01-12', amount: '750.80', reason: 'Governance Proposal' },
    { date: '2024-01-11', amount: '1,850.75', reason: 'Strategy Activations' }
  ]

  const mockActivationData = [
    { month: 'Sep', activations: 650 },
    { month: 'Oct', activations: 820 },
    { month: 'Nov', activations: 1240 },
    { month: 'Dec', activations: 1680 },
    { month: 'Jan', activations: 2140 }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Topbar />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">$GUI Token Statistics</h1>
              <p className="text-gray-600">Track GUI token metrics, burns, and platform usage</p>
            </div>

            {/* Token Price Card */}
            <div className="bg-gradient-to-r from-primary-purple to-primary-turquoise p-8 rounded-lg text-white mb-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm opacity-90 mb-1">GUI Price</p>
                  <p className="text-3xl font-bold">{mockStats.price}</p>
                  <p className="text-sm text-green-300">{mockStats.priceChange} 24h</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">Market Cap</p>
                  <p className="text-2xl font-bold">{mockStats.marketCap}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">24h Volume</p>
                  <p className="text-2xl font-bold">{mockStats.volume24h}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">Circulating Supply</p>
                  <p className="text-2xl font-bold">{mockStats.circulatingSupply}</p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Flame className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tokens Burned</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.burnedTokens}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.activeUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-3 bg-primary-turquoise/10 rounded-lg">
                    <Zap className="w-6 h-6 text-primary-turquoise" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Activations</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.totalActivations}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-green-600">+28.5%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Burn History */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Token Burns</h2>
                <div className="space-y-4">
                  {mockBurnHistory.map((burn, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Flame className="w-5 h-5 text-red-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{burn.amount} GUI</p>
                          <p className="text-sm text-gray-600">{burn.reason}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{burn.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategy Activations Chart */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Strategy Activations Over Time</h2>
                <div className="space-y-4">
                  {mockActivationData.map((data, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-12 text-sm text-gray-600">{data.month}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div 
                            className="bg-gradient-to-r from-primary-purple to-primary-turquoise h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${(data.activations / 2500) * 100}%` }}
                          >
                            <span className="text-xs text-white font-medium">{data.activations}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Token Economics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">2.3%</div>
                  <div className="text-gray-600">Tokens Burned (Total Supply)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-turquoise mb-2">15.8%</div>
                  <div className="text-gray-600">Average Vault APY</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-purple mb-2">68.2%</div>
                  <div className="text-gray-600">User Retention Rate</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default GuiStats