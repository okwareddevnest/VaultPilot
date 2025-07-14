import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileNavProps {
  currentPath: string
}

const MobileNav = ({ currentPath }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/token', label: '$GUI Token' },
    { path: '/docs', label: 'Docs', external: true }
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-primary-purple dark:bg-gray-900 z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <img src="/VaultPilot.png" alt="VaultPilot" className="w-8 h-8" />
                    <span className="text-xl font-bold text-white">VaultPilot</span>
                  </div>
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-4">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        {item.external ? (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              // Would redirect to actual docs
                              toggleMenu()
                            }}
                            className="flex items-center justify-between py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors min-h-[44px]"
                          >
                            <span className="text-lg">{item.label}</span>
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={toggleMenu}
                            className={`block py-3 px-4 text-lg rounded-lg transition-colors min-h-[44px] flex items-center ${
                              currentPath === item.path
                                ? 'bg-primary-turquoise text-primary-purple font-semibold'
                                : 'text-white hover:bg-white/10'
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* CTA */}
                <div className="p-6 border-t border-white/10">
                  <Link
                    to="/dashboard"
                    onClick={toggleMenu}
                    className="block w-full py-4 bg-primary-turquoise text-primary-purple font-bold text-center rounded-lg hover:bg-opacity-90 transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    Launch App
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileNav