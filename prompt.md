You are an expert front-end engineer with strong experience in building professional-grade DeFi dashboards. I want you to generate a clean, production-ready frontend scaffold for a project called "VaultPilot" — an autonomous DeFi strategy engine on the Aptos blockchain that uses $GUI as its utility token.

📌 Build the following in **React** (using **Vite** + **Tailwind CSS**) with **TypeScript**:

---

## 🔧 Pages to Scaffold:
1. **Landing Page (/)**  
   - Headline, feature highlights, and call-to-action button ("Enter App")
   - Brand colors: Dark purple, turquoise, and white
   - Include hero section with a shield-style logo (placeholder ok)

2. **Dashboard Page (/dashboard)**  
   - Sidebar navigation with:
     - Vaults
     - Wallet
     - $GUI Stats
     - Settings
   - Topbar showing wallet address, token balance, and connect wallet button

3. **Vaults Page (/vaults)**  
   - Table or card grid of strategy vaults (Arbitrage, Yield Farming, NFT Flipper)
   - Each vault has: name, APY, TVL, last execution, “Activate” button
   - Clicking “Activate” triggers a modal that:
     - Shows fee in $GUI
     - Has “Pay & Start” button
     - Connects to Aptos wallet (e.g., Petra)

4. **Wallet Page (/wallet)**  
   - Show token balances (APT, USDC, GUI)
   - Allow staking $GUI and withdrawing from vaults

5. **$GUI Stats Page (/gui-stats)**  
   - Burned tokens
   - Active users
   - Strategy activations over time
   - (Static/mock data for now)

---

## 🧩 Components:
- `Sidebar.tsx` – Navigation layout
- `VaultCard.tsx` – Reusable vault display component
- `TokenBalance.tsx` – Wallet token balances
- `ConnectWallet.tsx` – Button to connect Aptos wallet (use Petra SDK or Wallet Adapter)
- `ActivateModal.tsx` – Triggered from vault card for starting strategy with $GUI

---

## ✅ Requirements:
- Tailwind CSS for styling (use a clean, grid-based layout)
- Routing via `react-router-dom`
- Wallet connection via Aptos Wallet Adapter
- Optional: mock context for wallet and strategy data

---

Output only working React + TypeScript + Tailwind code, no pseudocode or placeholders. Do not hallucinate packages or blockchain functions. Include only valid code, especially for modal, routing, and wallet connection.
