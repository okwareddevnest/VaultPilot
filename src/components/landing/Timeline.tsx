import { motion } from 'framer-motion'
import { Check, Clock, Star } from 'lucide-react'
import { roadmapData } from '../../data/landingData'

const Timeline = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-500" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />
      default:
        return <Star className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Roadmap
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our journey to revolutionize DeFi automation on Aptos
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

            {roadmapData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${getStatusColor(item.status)} flex items-center justify-center z-10 mr-8`}>
                  {getStatusIcon(item.status)}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : item.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.quarter}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Milestone goals for {item.quarter}
                  </p>

                  {item.items && item.items.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        Key Features:
                      </h4>
                      <ul className="space-y-1">
                        {item.items.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 bg-primary-turquoise rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-purple to-primary-turquoise p-8 rounded-2xl text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Join Our Journey
            </h3>
            <p className="text-lg sm:text-xl mb-6 opacity-90">
              Be part of the future of DeFi automation. Stay updated on our progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-semibold min-h-[48px]">
                Join Newsletter
              </button>
              <button className="px-8 py-4 bg-white text-primary-purple rounded-lg hover:bg-gray-100 transition-colors font-semibold min-h-[48px]">
                Follow Updates
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline