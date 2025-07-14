import { renderHook, act } from '@testing-library/react'
import { useAptosWallet } from '../hooks/useAptosWallet'

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('useAptosWallet', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset window.aptos mock
    const mockWallet = {
      connect: jest.fn(),
      disconnect: jest.fn(),
      isConnected: jest.fn(),
      account: jest.fn(),
      signAndSubmitTransaction: jest.fn(),
    }
    Object.defineProperty(window, 'aptos', {
      value: mockWallet,
      writable: true,
    })
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAptosWallet())

    expect(result.current.account).toBeNull()
    expect(result.current.isConnected).toBe(false)
    expect(result.current.isConnecting).toBe(false)
    expect(result.current.network).toBe('mainnet')
  })

  it('should connect wallet successfully', async () => {
    const mockAccount = {
      address: '0x123',
      publicKey: '0xabc',
    }

    const mockWallet = (window as any).aptos
    mockWallet.connect.mockResolvedValue(mockAccount)

    const { result } = renderHook(() => useAptosWallet())

    await act(async () => {
      await result.current.connect()
    })

    expect(result.current.account).toEqual(mockAccount)
    expect(result.current.isConnected).toBe(true)
    expect(mockWallet.connect).toHaveBeenCalledTimes(1)
  })

  it('should handle connect wallet error', async () => {
    const mockWallet = (window as any).aptos
    mockWallet.connect.mockRejectedValue(new Error('Connection failed'))

    const { result } = renderHook(() => useAptosWallet())

    await expect(async () => {
      await act(async () => {
        await result.current.connect()
      })
    }).rejects.toThrow('Connection failed')

    expect(result.current.account).toBeNull()
    expect(result.current.isConnected).toBe(false)
  })

  it('should disconnect wallet', () => {
    const { result } = renderHook(() => useAptosWallet())

    // First set a connected state
    act(() => {
      // Simulate connected state
      result.current.connect()
    })

    act(() => {
      result.current.disconnect()
    })

    expect(result.current.account).toBeNull()
    expect(result.current.isConnected).toBe(false)
  })

  it('should sign and submit transaction', async () => {
    const mockAccount = {
      address: '0x123',
      publicKey: '0xabc',
    }

    const mockTransaction = {
      type: 'entry_function_payload',
      function: '0x1::coin::transfer',
      arguments: ['0x456', '1000'],
    }

    const { result } = renderHook(() => useAptosWallet())

    // Set connected state
    act(() => {
      // @ts-ignore - accessing private state for testing
      result.current.account = mockAccount
    })

    const transactionResult = await act(async () => {
      return await result.current.signAndSubmitTransaction(mockTransaction)
    })

    expect(transactionResult).toMatchObject({
      hash: expect.any(String),
      success: true,
      gas_used: expect.any(Number),
      vm_status: 'Executed successfully',
    })
  })

  it('should switch network', async () => {
    const { result } = renderHook(() => useAptosWallet())

    await act(async () => {
      await result.current.switchNetwork('testnet')
    })

    expect(result.current.network).toBe('testnet')
  })
})