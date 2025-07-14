export const heroData = {
  title: "Autonomous DeFi",
  subtitle: "Strategy Engine",
  description: "VaultPilot automatically executes sophisticated DeFi strategies on Aptos blockchain. Earn yield while you sleep with our AI-powered vault system.",
  cta: "Launch VaultPilot",
  stats: [
    { value: "$2.5M+", label: "Total Value Locked" },
    { value: "15.8%", label: "Average APY" },
    { value: "1,250+", label: "Active Users" }
  ]
}

export const featuresData = [
  {
    icon: "TrendingUp",
    title: "Smart Arbitrage",
    description: "Automatically detect and execute profitable arbitrage opportunities across Aptos DEXs",
    color: "text-green-500"
  },
  {
    icon: "Zap",
    title: "Yield Farming",
    description: "Optimize liquidity provision across multiple protocols for maximum yield",
    color: "text-primary-turquoise"
  },
  {
    icon: "Lock",
    title: "Secure & Audited",
    description: "Battle-tested smart contracts with multiple security audits and safety mechanisms",
    color: "text-primary-purple"
  }
]

export const faqData = [
  {
    question: "How do VaultPilot strategies work?",
    answer: "VaultPilot uses automated smart contracts to execute DeFi strategies on your behalf. Simply deposit funds, pay a small GUI fee, and our algorithms handle the rest - from arbitrage to yield farming."
  },
  {
    question: "Is my wallet safe?",
    answer: "Yes! VaultPilot never holds your private keys. All transactions are executed through your connected wallet (like Petra), and you maintain full control of your funds at all times."
  },
  {
    question: "What are gas fees?",
    answer: "Gas fees are small transaction costs paid to the Aptos network. VaultPilot optimizes strategies to minimize gas usage, and our batch transactions reduce overall costs."
  },
  {
    question: "How is $GUI used?",
    answer: "GUI tokens are used to activate strategies (fees are burned), stake for rewards, and boost APY. The more GUI you hold, the better rates you receive on all vaults."
  },
  {
    question: "Can I withdraw anytime?",
    answer: "Most strategies allow instant withdrawal. Some yield farming positions may have short lock periods (typically 24-48h) for optimal returns, clearly indicated before activation."
  },
  {
    question: "What's the minimum deposit?",
    answer: "Minimum deposits vary by strategy: Arbitrage (10 APT), Yield Farming (5 APT), NFT Flipper (25 APT). All minimums are designed to ensure profitable execution after fees."
  }
]

export const vaultsData = [
  {
    id: "arbitrage",
    title: "Arbitrage Engine",
    subtitle: "Cross-DEX Price Discovery",
    description: "Automatically identifies and executes profitable price differences across Liquidswap, PancakeSwap, and other Aptos DEXs",
    features: [
      "Real-time price monitoring across 5+ DEXs",
      "Sub-second execution for maximum profit",
      "Risk-free arbitrage with guaranteed returns",
      "Automated slippage protection"
    ],
    stats: {
      apy: "24.5%",
      tvl: "$854K",
      uptime: "99.8%",
      trades: "1,247"
    },
    riskLevel: "Low",
    icon: "ArrowRightLeft"
  },
  {
    id: "yield",
    title: "Yield Optimizer",
    subtitle: "Multi-Protocol Farming",
    description: "Dynamically allocates liquidity across lending protocols and farms to maximize yield while minimizing impermanent loss",
    features: [
      "Auto-compound every 8 hours",
      "Impermanent loss protection",
      "Multi-protocol diversification",
      "Gas-optimized rebalancing"
    ],
    stats: {
      apy: "18.2%",
      tvl: "$1.2M",
      uptime: "99.5%",
      trades: "892"
    },
    riskLevel: "Medium",
    icon: "Sprout"
  },
  {
    id: "nft",
    title: "NFT Flipper Bot",
    subtitle: "Automated NFT Trading",
    description: "Uses machine learning to identify undervalued NFTs and execute profitable flips on Aptos NFT marketplaces",
    features: [
      "ML-powered price prediction",
      "Floor price tracking & alerts",
      "Automated bid management",
      "Cross-marketplace arbitrage"
    ],
    stats: {
      apy: "45.8%",
      tvl: "$320K",
      uptime: "97.2%",
      trades: "156"
    },
    riskLevel: "High",
    icon: "Image"
  }
]

export const tokenomicsData = {
  totalSupply: 10000000,
  distribution: [
    { label: "Community Rewards", value: 40, color: "#00CED1" },
    { label: "Team & Advisors", value: 20, color: "#2D1B69" },
    { label: "Treasury", value: 15, color: "#8B5CF6" },
    { label: "Liquidity", value: 15, color: "#06B6D4" },
    { label: "Private Sale", value: 10, color: "#10B981" }
  ],
  utility: [
    {
      title: "Strategy Activation",
      description: "Pay fees in GUI to activate vault strategies",
      mechanism: "Burn"
    },
    {
      title: "Staking Rewards",
      description: "Stake GUI tokens to earn additional yield",
      mechanism: "Stake"
    },
    {
      title: "APY Boost",
      description: "Higher GUI holdings unlock better rates",
      mechanism: "Hold"
    },
    {
      title: "Governance",
      description: "Vote on protocol upgrades and new strategies",
      mechanism: "Vote"
    }
  ]
}

export const roadmapData = [
  {
    quarter: "Q4 2024",
    title: "Foundation",
    status: "completed",
    items: [
      "Core arbitrage engine deployed",
      "Basic yield farming strategies",
      "GUI token launch",
      "Petra wallet integration"
    ]
  },
  {
    quarter: "Q1 2025",
    title: "Expansion",
    status: "active",
    items: [
      "NFT flipper bot launch",
      "Advanced yield optimization",
      "Mobile app beta",
      "Cross-chain bridge planning"
    ]
  },
  {
    quarter: "Q2 2025",
    title: "Intelligence",
    status: "planned",
    items: [
      "AI-powered strategy creation",
      "Automated portfolio rebalancing",
      "Social trading features",
      "DAO governance activation"
    ]
  },
  {
    quarter: "Q3 2025",
    title: "Ecosystem",
    status: "planned",
    items: [
      "Third-party strategy marketplace",
      "Institutional vault products",
      "Cross-chain strategy execution",
      "VaultPilot SDK release"
    ]
  }
]