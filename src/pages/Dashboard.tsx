import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { TrendingUp, Vault, DollarSign, Users } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Topbar />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Monitor your DeFi strategies and performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-3 bg-primary-turquoise/10 rounded-lg">
                    <DollarSign className="w-6 h-6 text-primary-turquoise" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Portfolio</p>
                    <p className="text-2xl font-bold text-gray-900">$12,547.80</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">24h PnL</p>
                    <p className="text-2xl font-bold text-green-600">+$247.32</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-3 bg-primary-purple/10 rounded-lg">
                    <Vault className="w-6 h-6 text-primary-purple" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Vaults</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">GUI Tokens</p>
                    <p className="text-2xl font-bold text-gray-900">1,250.50</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Strategies */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Strategies</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Arbitrage Bot #1</p>
                      <p className="text-sm text-gray-600">APT/USDC - Liquidswap ↔ PancakeSwap</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+$89.45</p>
                    <p className="text-sm text-gray-600">24h</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Yield Farm #2</p>
                      <p className="text-sm text-gray-600">USDC-APT LP - Liquidswap</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+$124.87</p>
                    <p className="text-sm text-gray-600">24h</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">NFT Flipper #1</p>
                      <p className="text-sm text-gray-600">Aptos Monkeys Collection</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-yellow-600">+$33.00</p>
                    <p className="text-sm text-gray-600">24h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Performance</h2>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart will be implemented with a charting library</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard