// Mock pricing API - in production would use CoinGecko API
export interface PriceData {
  gui_usd: number
  apt_usd: number
  gui_apt: number
}

export const fetchTokenPrices = async (): Promise<PriceData> => {
  try {
    // Mock API call with fallback data
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Simulate some price variation
    const baseGuiPrice = 3.45
    const baseAptPrice = 18.50
    
    const guiUsd = baseGuiPrice + (Math.random() - 0.5) * 0.2
    const aptUsd = baseAptPrice + (Math.random() - 0.5) * 1.0
    
    return {
      gui_usd: guiUsd,
      apt_usd: aptUsd,
      gui_apt: guiUsd / aptUsd
    }
  } catch (error) {
    // Fallback prices
    console.warn('Failed to fetch live prices, using fallback:', error)
    return {
      gui_usd: 3.45,
      apt_usd: 18.50,
      gui_apt: 0.186
    }
  }
}

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : undefined,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(amount)
}

export const formatTokenAmount = (amount: number, symbol: string): string => {
  return `${amount.toFixed(6)} ${symbol}`
}