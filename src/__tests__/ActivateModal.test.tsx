import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ActivateModal from '../components/ActivateModal'
import * as pricing from '../utils/pricing'

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

// Mock useAptosWallet hook
jest.mock('../hooks/useAptosWallet', () => ({
  useAptosWallet: () => ({
    signAndSubmitTransaction: jest.fn().mockResolvedValue({
      hash: '0x123',
      success: true,
    }),
    isConnected: true,
  }),
}))

// Mock pricing utility
jest.spyOn(pricing, 'fetchTokenPrices').mockResolvedValue({
  gui_usd: 3.45,
  apt_usd: 18.50,
  gui_apt: 0.186,
})

const mockVault = {
  id: '1',
  name: 'Test Vault',
  strategy: 'Arbitrage',
  apy: '24.5%',
  tvl: '$854K',
  lastExecution: '2m ago',
  status: 'inactive' as const,
  description: 'Test vault description',
}

describe('ActivateModal', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not render when closed', () => {
    render(
      <ActivateModal
        isOpen={false}
        onClose={mockOnClose}
        vault={mockVault}
      />
    )

    expect(screen.queryByText('Activate Strategy')).not.toBeInTheDocument()
  })

  it('should render when open', () => {
    render(
      <ActivateModal
        isOpen={true}
        onClose={mockOnClose}
        vault={mockVault}
      />
    )

    expect(screen.getByText('Activate Strategy')).toBeInTheDocument()
    expect(screen.getByText(mockVault.name)).toBeInTheDocument()
    expect(screen.getByText(mockVault.description)).toBeInTheDocument()
  })

  it('should display fee calculation with USD equivalent', async () => {
    render(
      <ActivateModal
        isOpen={true}
        onClose={mockOnClose}
        vault={mockVault}
      />
    )

    // Wait for price data to load
    await waitFor(() => {
      expect(screen.getByText('50.000000 GUI')).toBeInTheDocument()
    })

    // Should show USD equivalent
    await waitFor(() => {
      expect(screen.getByText(/≈ \$172\.50/)).toBeInTheDocument()
    })
  })

  it('should show two-step approval flow', async () => {
    const user = userEvent.setup()
    
    render(
      <ActivateModal
        isOpen={true}
        onClose={mockOnClose}
        vault={mockVault}
      />
    )

    // Step 1: Should show approve button
    expect(screen.getByText('Approve GUI Spend')).toBeInTheDocument()
    expect(screen.getByText('Step 1: Approve GUI token spending')).toBeInTheDocument()

    // Click approve button
    await user.click(screen.getByText('Approve GUI Spend'))

    // Wait for step 2
    await waitFor(() => {
      expect(screen.getByText('Execute Strategy')).toBeInTheDocument()
      expect(screen.getByText('Step 2: Execute strategy activation')).toBeInTheDocument()
    })
  })

  it('should handle close button click', async () => {
    const user = userEvent.setup()
    
    render(
      <ActivateModal
        isOpen={true}
        onClose={mockOnClose}
        vault={mockVault}
      />
    )

    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should handle cancel button click', async () => {
    const user = userEvent.setup()
    
    render(
      <ActivateModal
        isOpen={true}
        onClose={mockOnClose}
        vault={mockVault}
      />
    )

    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should complete full activation flow', async () => {
    const user = userEvent.setup()
    
    render(
      <ActivateModal
        isOpen={true}
        onClose={mockOnClose}
        vault={mockVault}
      />
    )

    // Step 1: Approve
    await user.click(screen.getByText('Approve GUI Spend'))

    // Wait for step 2
    await waitFor(() => {
      expect(screen.getByText('Execute Strategy')).toBeInTheDocument()
    })

    // Step 2: Execute
    await user.click(screen.getByText('Execute Strategy'))

    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText('Strategy Activated!')).toBeInTheDocument()
    })
  })
})