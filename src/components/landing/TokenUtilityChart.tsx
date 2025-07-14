import { useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { tokenomicsData } from '../../data/landingData'

ChartJS.register(ArcElement, Tooltip, Legend)

const TokenUtilityChart = () => {
  const chartRef = useRef<ChartJS<"doughnut">>(null)

  const data = {
    labels: tokenomicsData.distribution.map(item => item.label),
    datasets: [
      {
        data: tokenomicsData.distribution.map(item => item.value),
        backgroundColor: tokenomicsData.distribution.map(item => item.color),
        borderColor: tokenomicsData.distribution.map(item => item.color),
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
          },
          color: '#6B7280',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || ''
            const value = context.parsed || 0
            return `${label}: ${value}%`
          }
        }
      }
    },
    cutout: '60%',
  }

  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            $GUI Token Distribution
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A carefully designed tokenomics model that aligns incentives and drives long-term value
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Chart */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="relative h-80 sm:h-96">
                <Doughnut ref={chartRef} data={data} options={options} />
                
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      10M
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Supply
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Utility Breakdown */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Token Utility
            </h3>
            
            <div className="space-y-6">
              {tokenomicsData.utility.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                      item.mechanism === 'Burn' ? 'bg-red-500' :
                      item.mechanism === 'Stake' ? 'bg-green-500' :
                      item.mechanism === 'Hold' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`}>
                      {item.mechanism.charAt(0)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <span className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                      item.mechanism === 'Burn' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                      item.mechanism === 'Stake' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                      item.mechanism === 'Hold' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                    }`}>
                      {item.mechanism}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Token Metrics */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Tokens Burned', value: '125.8K', change: '+2.3%' },
            { label: 'Staking APY', value: '8.5%', change: '+0.2%' },
            { label: 'Holders', value: '1,284', change: '+15.7%' },
            { label: 'Market Cap', value: '$18.2M', change: '+12.4%' }
          ].map((metric, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                {metric.change} 24h
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TokenUtilityChart