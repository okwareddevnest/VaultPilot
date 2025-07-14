import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAptosWallet } from './useAptosWallet'

interface StakingData {
  availableBalance: number
  stakedAmount: number
  pendingRewards: number
  stakingApy: number
}

interface UseStaking {
  stakingData: StakingData
  isStaking: boolean
  isUnstaking: boolean
  stakeGui: (amount: number) => Promise<void>
  unstakeGui: (amount: number) => Promise<void>
  claimRewards: () => Promise<void>
  refreshData: () => void
}

export const useStaking = (): UseStaking => {
  const { network } = useAptosWallet()
  
  // Use realistic testnet amounts
  const isTestnet = network === 'testnet'
  
  const [stakingData, setStakingData] = useState<StakingData>({
    availableBalance: isTestnet ? 75.25 : 1250.50,
    stakedAmount: isTestnet ? 25.00 : 850.00,
    pendingRewards: isTestnet ? 3.42 : 20.77,
    stakingApy: 8.5
  })
  
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  
  const { signAndSubmitTransaction, isConnected } = useAptosWallet()

  const stakeGui = async (amount: number) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (amount <= 0 || amount > stakingData.availableBalance) {
      toast.error('Invalid staking amount')
      return
    }

    setIsStaking(true)
    try {
      await signAndSubmitTransaction({
        type: 'entry_function_payload',
        function: '0x1::gui_staking::stake',
        arguments: [amount.toString()]
      })
      
      // Update local state
      setStakingData(prev => ({
        ...prev,
        availableBalance: prev.availableBalance - amount,
        stakedAmount: prev.stakedAmount + amount
      }))
      
      toast.success(`Successfully staked ${amount} GUI tokens!`)
    } catch (error) {
      toast.error('Failed to stake GUI tokens')
      console.error('Staking failed:', error)
    } finally {
      setIsStaking(false)
    }
  }

  const unstakeGui = async (amount: number) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (amount <= 0 || amount > stakingData.stakedAmount) {
      toast.error('Invalid unstaking amount')
      return
    }

    setIsUnstaking(true)
    try {
      await signAndSubmitTransaction({
        type: 'entry_function_payload',
        function: '0x1::gui_staking::unstake',
        arguments: [amount.toString()]
      })
      
      // Update local state
      setStakingData(prev => ({
        ...prev,
        availableBalance: prev.availableBalance + amount,
        stakedAmount: prev.stakedAmount - amount
      }))
      
      toast.success(`Successfully unstaked ${amount} GUI tokens!`)
    } catch (error) {
      toast.error('Failed to unstake GUI tokens')
      console.error('Unstaking failed:', error)
    } finally {
      setIsUnstaking(false)
    }
  }

  const claimRewards = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (stakingData.pendingRewards <= 0) {
      toast.error('No rewards to claim')
      return
    }

    try {
      await signAndSubmitTransaction({
        type: 'entry_function_payload',
        function: '0x1::gui_staking::claim_rewards',
        arguments: []
      })
      
      // Update local state
      const rewardAmount = stakingData.pendingRewards
      setStakingData(prev => ({
        ...prev,
        availableBalance: prev.availableBalance + rewardAmount,
        pendingRewards: 0
      }))
      
      toast.success(`Successfully claimed ${rewardAmount.toFixed(2)} GUI rewards!`)
    } catch (error) {
      toast.error('Failed to claim rewards')
      console.error('Claim rewards failed:', error)
    }
  }

  const refreshData = () => {
    // In a real app, this would fetch fresh data from the blockchain
    // For now, simulate some small changes
    setStakingData(prev => ({
      ...prev,
      pendingRewards: prev.pendingRewards + Math.random() * 0.1
    }))
  }

  return {
    stakingData,
    isStaking,
    isUnstaking,
    stakeGui,
    unstakeGui,
    claimRewards,
    refreshData
  }
}