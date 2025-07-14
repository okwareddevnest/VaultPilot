import { TrendingUp, TrendingDown } from 'lucide-react'

interface TokenBalanceProps {
  symbol: string
  balance: string
  value: string
  change: string
  changePercent: string
  logo?: string
}

const TokenBalance = ({ symbol, balance, value, change, changePercent }: TokenBalanceProps) => {
  const isPositive = change.startsWith('+')

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-purple to-primary-turquoise rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">{symbol.slice(0, 2)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{symbol}</h3>
            <p className="text-sm text-gray-600">{balance}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-semibold text-gray-900">{value}</p>
          <div className={`flex items-center text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span>{change} ({changePercent})</span>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary-purple to-primary-turquoise h-2 rounded-full" 
          style={{ width: '65%' }}
        ></div>
      </div>
    </div>
  )
}

export default TokenBalance