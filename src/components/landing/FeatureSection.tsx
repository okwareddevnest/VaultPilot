import { motion } from 'framer-motion'
import { TrendingUp, Zap, Lock } from 'lucide-react'
import { featuresData } from '../../data/landingData'

const iconMap = {
  TrendingUp,
  Zap,
  Lock
}

const FeatureSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Intelligent DeFi Strategies
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Our autonomous vault system executes sophisticated strategies while you sleep,
            maximizing returns and minimizing risk across the Aptos ecosystem.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {featuresData.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`w-16 h-16 mx-auto mb-6 p-4 rounded-full bg-white dark:bg-gray-700 shadow-lg ${feature.color}`}
                  >
                    <IconComponent className="w-full h-full" />
                  </motion.div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-turquoise transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-700"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by DeFi Pioneers
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Audited by leading security firms and backed by top-tier investors
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60"
          >
            {['Certik', 'Consensys', 'Trail of Bits', 'OpenZeppelin'].map((partner, index) => (
              <div
                key={index}
                className="text-center text-gray-500 dark:text-gray-400 font-semibold text-lg"
              >
                {partner}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureSection