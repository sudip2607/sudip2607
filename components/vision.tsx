'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Lightbulb, Package, Brain, Boxes } from 'lucide-react'

const visionItems = [
  {
    icon: Boxes,
    title: 'Modern Data Stack',
    description: 'Moving beyond legacy silos toward unified Lakehouse architectures (Databricks/Microsoft Fabric)',
  },
  {
    icon: Package,
    title: 'Data as a Product',
    description: 'Shifting from "managing databases" to "delivering high-quality data products" for end-users',
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    description: 'Exploring Generative AI and Metadata Management to automate data discovery and governance',
  },
  {
    icon: Lightbulb,
    title: 'Modular Architecture',
    description: 'Designing decoupled, cloud-native systems—swap ETL tools or integrate new platforms without business disruption',
  },
]

export default function Vision() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background -z-10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vision & <span className="gradient-text">Trends</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Staying ahead by embracing modern data patterns and emerging technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {visionItems?.map?.((item, index) => {
            const Icon = item?.icon ?? Lightbulb
            return (
              <motion.div
                key={item?.title ?? index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                className="group p-6 glass rounded-2xl hover:shadow-lg hover:shadow-[#E35336]/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#E35336]/20 to-[#A0522D]/20 group-hover:from-[#E35336]/30 group-hover:to-[#A0522D]/30 transition-colors">
                    <Icon className="w-6 h-6 text-[#E35336]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#E35336] transition-colors">
                      {item?.title ?? ''}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item?.description ?? ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          }) ?? []}
        </div>
      </div>
    </section>
  )
}
