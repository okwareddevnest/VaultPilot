import { useState, useEffect } from 'react'
import { useAptosWallet } from './useAptosWallet'

export interface TokenBalance {
  symbol: string
  balance: string
  value: string
  change: string
  changePercent: string
}

export const useTokenBalances = () => {
  const { account, isConnected, network } = useAptosWallet()
  const [balances, setBalances] = useState<TokenBalance[]>([])
  const [loading, setLoading] = useState(false)

  const fetchBalances = async () => {
    if (!account || !isConnected) {
      // Show demo balances when not connected
      setBalances([
        {
          symbol: 'APT',
          balance: '45.80',
          value: '$847.20',
          change: '+$12.45',
          changePercent: '+1.5%'
        },
        {
          symbol: 'USDC',
          balance: '50.00',
          value: '$50.00',
          change: '+$0.12',
          changePercent: '+0.24%'
        },
        {
          symbol: 'GUI',
          balance: '150.50',
          value: '$518.23',
          change: '+$15.30',
          changePercent: '+3.0%'
        }
      ])
      return
    }

    setLoading(true)
    try {
      // For demo purposes, we'll simulate API calls to get balances
      // In a real app, you'd call the Aptos API or use the wallet adapter
      
      // Simulate realistic testnet balances
      const aptBalance = network === 'testnet' ? '5.124' : '45.80'
      const aptValue = network === 'testnet' ? '$94.79' : '$847.20'
      
      const mockBalances: TokenBalance[] = [
        {
          symbol: 'APT',
          balance: aptBalance,
          value: aptValue,
          change: '+$2.15',
          changePercent: '+2.3%'
        },
        {
          symbol: 'USDC',
          balance: network === 'testnet' ? '25.00' : '2,847.32',
          value: network === 'testnet' ? '$25.00' : '$2,847.32',
          change: '+$0.05',
          changePercent: '+0.2%'
        },
        {
          symbol: 'GUI',
          balance: network === 'testnet' ? '75.25' : '1,250.50',
          value: network === 'testnet' ? '$259.36' : '$4,313.23',
          change: '+$8.15',
          changePercent: '+3.2%'
        }
      ]

      setBalances(mockBalances)
    } catch (error) {
      console.error('Failed to fetch balances:', error)
      // Fallback to demo data
      setBalances([
        {
          symbol: 'APT',
          balance: '5.124',
          value: '$94.79',
          change: '+$2.15',
          changePercent: '+2.3%'
        },
        {
          symbol: 'USDC',
          balance: '25.00',
          value: '$25.00',
          change: '+$0.05',
          changePercent: '+0.2%'
        },
        {
          symbol: 'GUI',
          balance: '75.25',
          value: '$259.36',
          change: '+$8.15',
          changePercent: '+3.2%'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalances()
  }, [account, isConnected, network])

  return {
    balances,
    loading,
    refetch: fetchBalances,
    aptBalance: balances.find(b => b.symbol === 'APT')?.balance || '0',
    guiBalance: balances.find(b => b.symbol === 'GUI')?.balance || '0'
  }
}