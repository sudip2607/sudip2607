'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Database, Layers, Shield, Workflow, Target, Award } from 'lucide-react'

const highlights = [
  {
    icon: Database,
    title: 'End-to-End Data Products',
    description: 'Source onboarding through warehouse/lake storage, curation, and serving layers for BI and field reporting.',
  },
  {
    icon: Layers,
    title: 'Modern Data Platforms',
    description: 'Deep expertise in data architecture, modeling (3NF, dimensional), and master data integration (HCP/HCO).',
  },
  {
    icon: Shield,
    title: 'Data Governance & Quality',
    description: 'DQ frameworks, validation rules, exception handling, and audit trails for compliance support.',
  },
  {
    icon: Workflow,
    title: 'Reliable DataOps',
    description: 'Control-M orchestration, operational monitoring, SLA-driven incident/change management.',
  },
]

const stats = [
  { value: 14, suffix: '+', label: 'Years Experience' },
  { value: 7, suffix: '+', label: 'Data Products' },
  { value: 10, suffix: '+', label: 'Projects Delivered' },
  { value: 6, suffix: '+', label: 'Analytics Teams Supported' },
  { value: 8, suffix: '', label: 'Certifications' },
]

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="text-4xl md:text-5xl font-bold gradient-text"
    >
      {inView ? (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {value}{suffix}
        </motion.span>
      ) : (
        '0'
      )}
    </motion.span>
  )
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-20 md:py-32 relative">
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
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Data & Analytics Architect with extensive experience delivering modern data platforms 
            and enterprise data products across MedTech commercial analytics, consumer, supply chain, 
            insurance, and banking domains.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats?.map?.((stat, index) => (
            <motion.div
              key={stat?.label ?? index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="text-center p-6 glass rounded-2xl hover:shadow-lg hover:shadow-[#E35336]/10 transition-all duration-300"
            >
              <AnimatedCounter value={stat?.value ?? 0} suffix={stat?.suffix ?? ''} />
              <p className="text-muted-foreground mt-2 text-sm md:text-base">{stat?.label ?? ''}</p>
            </motion.div>
          )) ?? []}
        </motion.div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 gap-6">
          {highlights?.map?.((item, index) => {
            const Icon = item?.icon ?? Target
            return (
              <motion.div
                key={item?.title ?? index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
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
