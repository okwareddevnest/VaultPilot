import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import VaultCard from '../components/VaultCard'

const mockVaults = [
  {
    id: '1',
    name: 'Arbitrage Bot Alpha',
    strategy: 'Arbitrage',
    apy: '24.5%',
    tvl: '$854K',
    lastExecution: '2m ago',
    status: 'active' as const,
    description: 'Automated arbitrage trading between Liquidswap and PancakeSwap for APT/USDC pairs'
  },
  {
    id: '2',
    name: 'Yield Farm Pro',
    strategy: 'Yield Farming',
    apy: '18.2%',
    tvl: '$1.2M',
    lastExecution: '5m ago',
    status: 'active' as const,
    description: 'Optimized liquidity provision across multiple Aptos DeFi protocols'
  },
  {
    id: '3',
    name: 'NFT Flip Master',
    strategy: 'NFT Flipper',
    apy: '45.8%',
    tvl: '$320K',
    lastExecution: '1h ago',
    status: 'inactive' as const,
    description: 'Automated NFT trading bot for popular Aptos NFT collections'
  },
  {
    id: '4',
    name: 'MEV Extractor',
    strategy: 'MEV',
    apy: '32.1%',
    tvl: '$680K',
    lastExecution: 'Never',
    status: 'inactive' as const,
    description: 'Advanced MEV extraction strategies for maximum value capture'
  },
  {
    id: '5',
    name: 'Stablecoin Yield',
    strategy: 'Yield Farming',
    apy: '12.8%',
    tvl: '$2.1M',
    lastExecution: '3m ago',
    status: 'active' as const,
    description: 'Low-risk stablecoin yield farming across lending protocols'
  },
  {
    id: '6',
    name: 'Momentum Trader',
    strategy: 'Trading',
    apy: '28.7%',
    tvl: '$450K',
    lastExecution: 'Never',
    status: 'inactive' as const,
    description: 'Momentum-based trading strategies for trending tokens'
  }
]

const Vaults = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Topbar />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Strategy Vaults</h1>
              <p className="text-gray-600">Choose and activate automated DeFi strategies</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Available Strategies</h3>
                <p className="text-3xl font-bold text-gray-900">{mockVaults.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total TVL</h3>
                <p className="text-3xl font-bold text-primary-turquoise">$5.6M</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Average APY</h3>
                <p className="text-3xl font-bold text-green-600">26.9%</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button className="border-b-2 border-primary-turquoise text-primary-turquoise py-2 px-1 text-sm font-medium">
                    All Strategies
                  </button>
                  <button className="border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-sm font-medium">
                    Active
                  </button>
                  <button className="border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-sm font-medium">
                    Inactive
                  </button>
                  <button className="border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-sm font-medium">
                    High Yield
                  </button>
                </nav>
              </div>
            </div>

            {/* Vaults Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVaults.map((vault) => (
                <VaultCard key={vault.id} vault={vault} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Vaults