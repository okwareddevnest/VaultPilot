import { Link } from 'react-router-dom'
import { Shield, Zap, TrendingUp, Lock } from 'lucide-react'
import WalletBanner from '../components/WalletBanner'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-purple via-purple-800 to-primary-turquoise">
      <WalletBanner />
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-3">
            <img src="/VaultPilot.png" alt="VaultPilot" className="w-10 h-10" />
            <span className="text-2xl font-bold text-white">VaultPilot</span>
          </div>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-primary-turquoise text-primary-purple font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Enter App
          </Link>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-white/10 rounded-full backdrop-blur-sm">
              <Shield className="w-16 h-16 text-primary-turquoise" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Autonomous DeFi
            <span className="block text-primary-turquoise">Strategy Engine</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            VaultPilot automatically executes sophisticated DeFi strategies on Aptos blockchain. 
            Earn yield while you sleep with our AI-powered vault system.
          </p>
          
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-primary-turquoise text-primary-purple font-bold text-lg rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Launch VaultPilot
            <Zap className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-12 h-12 text-primary-turquoise mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Smart Arbitrage</h3>
            <p className="text-gray-200">
              Automatically detect and execute profitable arbitrage opportunities across Aptos DEXs
            </p>
          </div>
          
          <div className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm">
            <Zap className="w-12 h-12 text-primary-turquoise mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Yield Farming</h3>
            <p className="text-gray-200">
              Optimize liquidity provision across multiple protocols for maximum yield
            </p>
          </div>
          
          <div className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm">
            <Lock className="w-12 h-12 text-primary-turquoise mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Secure & Audited</h3>
            <p className="text-gray-200">
              Battle-tested smart contracts with multiple security audits and safety mechanisms
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-turquoise mb-2">$2.5M+</div>
            <div className="text-gray-200">Total Value Locked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-turquoise mb-2">15.8%</div>
            <div className="text-gray-200">Average APY</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-turquoise mb-2">1,250+</div>
            <div className="text-gray-200">Active Users</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage