import { useState, useEffect, useRef } from 'react'
import { useSpring } from 'react-spring'

export interface VaultData {
  id: string
  name: string
  strategy: string
  apy: number
  tvl: number
  lastExecution: string
  status: 'active' | 'inactive'
  description: string
}

interface UseVaultData {
  vaults: VaultData[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// Mock API call
const fetchVaultData = async (): Promise<VaultData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Generate slightly random data to simulate real-time changes
  const baseVaults: VaultData[] = [
    {
      id: '1',
      name: 'Arbitrage Bot Alpha',
      strategy: 'Arbitrage',
      apy: 24.5 + (Math.random() - 0.5) * 2,
      tvl: 854000 + Math.random() * 100000,
      lastExecution: '2m ago',
      status: 'active',
      description: 'Automated arbitrage trading between Liquidswap and PancakeSwap for APT/USDC pairs'
    },
    {
      id: '2',
      name: 'Yield Farm Pro',
      strategy: 'Yield Farming',
      apy: 18.2 + (Math.random() - 0.5) * 1.5,
      tvl: 1200000 + Math.random() * 200000,
      lastExecution: '5m ago',
      status: 'active',
      description: 'Optimized liquidity provision across multiple Aptos DeFi protocols'
    },
    {
      id: '3',
      name: 'NFT Flip Master',
      strategy: 'NFT Flipper',
      apy: 45.8 + (Math.random() - 0.5) * 5,
      tvl: 320000 + Math.random() * 50000,
      lastExecution: '1h ago',
      status: 'inactive',
      description: 'Automated NFT trading bot for popular Aptos NFT collections'
    },
    {
      id: '4',
      name: 'MEV Extractor',
      strategy: 'MEV',
      apy: 32.1 + (Math.random() - 0.5) * 3,
      tvl: 680000 + Math.random() * 80000,
      lastExecution: 'Never',
      status: 'inactive',
      description: 'Advanced MEV extraction strategies for maximum value capture'
    },
    {
      id: '5',
      name: 'Stablecoin Yield',
      strategy: 'Yield Farming',
      apy: 12.8 + (Math.random() - 0.5) * 1,
      tvl: 2100000 + Math.random() * 300000,
      lastExecution: '3m ago',
      status: 'active',
      description: 'Low-risk stablecoin yield farming across lending protocols'
    },
    {
      id: '6',
      name: 'Momentum Trader',
      strategy: 'Trading',
      apy: 28.7 + (Math.random() - 0.5) * 2.5,
      tvl: 450000 + Math.random() * 60000,
      lastExecution: 'Never',
      status: 'inactive',
      description: 'Momentum-based trading strategies for trending tokens'
    }
  ]
  
  return baseVaults
}

export const useVaultData = (): UseVaultData => {
  const [vaults, setVaults] = useState<VaultData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const refetch = async () => {
    try {
      setError(null)
      const data = await fetchVaultData()
      setVaults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vault data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    refetch()

    // Set up polling every 15 seconds
    intervalRef.current = setInterval(refetch, 15000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    vaults,
    loading,
    error,
    refetch
  }
}

// Hook for animated numbers
export const useAnimatedNumber = (value: number, decimals: number = 1) => {
  const { number } = useSpring({
    number: value,
    config: { tension: 200, friction: 50 }
  })
  
  return number.to(n => n.toFixed(decimals))
}