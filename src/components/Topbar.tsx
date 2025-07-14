import ConnectWallet from './ConnectWallet'

const Topbar = () => {
  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-800">VaultPilot Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-gray-600">GUI Balance:</span>
            <span className="font-semibold text-primary-purple ml-1">1,250.50</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">APT Balance:</span>
            <span className="font-semibold text-primary-purple ml-1">45.80</span>
          </div>
        </div>
        
        <ConnectWallet />
      </div>
    </header>
  )
}

export default Topbar