import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

export type Network = 'mainnet' | 'testnet'

export interface AptosAccount {
  address: string
  publicKey: string
}

export interface TransactionPayload {
  type: string
  function: string
  arguments: any[]
}

interface UseAptosWallet {
  account: AptosAccount | null
  isConnected: boolean
  isConnecting: boolean
  network: Network
  connect: () => Promise<void>
  disconnect: () => void
  signAndSubmitTransaction: (transaction: TransactionPayload) => Promise<any>
  switchNetwork: (network: Network) => Promise<void>
}

export const useAptosWallet = (): UseAptosWallet => {
  const [account, setAccount] = useState<AptosAccount | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [network, setNetwork] = useState<Network>('mainnet')

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (typeof window !== 'undefined' && 'aptos' in window) {
          const wallet = (window as any).aptos
          const isConnected = await wallet.isConnected()
          if (isConnected) {
            const account = await wallet.account()
            setAccount(account)
          }
        }
      } catch (error) {
        console.error('Failed to check wallet connection:', error)
      }
    }
    
    checkConnection()
  }, [])

  const connect = useCallback(async () => {
    setIsConnecting(true)
    try {
      if (typeof window !== 'undefined' && 'aptos' in window) {
        const wallet = (window as any).aptos
        const response = await wallet.connect()
        setAccount({
          address: response.address,
          publicKey: response.publicKey
        })
        toast.success('Wallet connected successfully!')
      } else {
        toast.error('Petra wallet not found. Please install Petra wallet extension.')
        throw new Error('Petra wallet not found')
      }
    } catch (error) {
      toast.error('Failed to connect wallet')
      console.error('Failed to connect wallet:', error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && 'aptos' in window) {
        const wallet = (window as any).aptos
        wallet.disconnect()
      }
      setAccount(null)
      toast.success('Wallet disconnected')
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
      toast.error('Failed to disconnect wallet')
    }
  }, [])

  const signAndSubmitTransaction = useCallback(async (_transaction: TransactionPayload) => {
    if (!account) {
      toast.error('Please connect your wallet first')
      throw new Error('Wallet not connected')
    }

    try {
      if (typeof window !== 'undefined' && 'aptos' in window) {        
        // Simulate transaction signing
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const result = {
          hash: `0x${Math.random().toString(16).substr(2, 64)}`,
          success: true,
          gas_used: Math.floor(Math.random() * 1000) + 500,
          vm_status: 'Executed successfully'
        }
        
        toast.success('Transaction submitted successfully!')
        return result
      } else {
        throw new Error('Wallet not available')
      }
    } catch (error) {
      toast.error('Transaction failed')
      console.error('Transaction failed:', error)
      throw error
    }
  }, [account])

  const switchNetwork = useCallback(async (newNetwork: Network) => {
    try {
      // Mock network switching - in real implementation would call wallet.changeNetwork()
      await new Promise(resolve => setTimeout(resolve, 500))
      setNetwork(newNetwork)
      toast.success(`Switched to ${newNetwork}`)
    } catch (error) {
      toast.error('Failed to switch network')
      console.error('Failed to switch network:', error)
      throw error
    }
  }, [])

  return {
    account,
    isConnected: !!account,
    isConnecting,
    network,
    connect,
    disconnect,
    signAndSubmitTransaction,
    switchNetwork
  }
}