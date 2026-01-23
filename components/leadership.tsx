'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Target, Brain, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const leadershipSkills = [
  {
    icon: Users,
    title: 'Cross-Functional Team Leadership',
    description: 'Managing diverse teams of engineers, analysts, and business stakeholders to deliver complex data projects on time and under budget.',
  },
  {
    icon: Target,
    title: 'Stakeholder Management',
    description: 'Translating complex technical requirements into business value; aligning executives, product teams, and technical teams toward shared goals.',
  },
  {
    icon: Brain,
    title: 'Technical Mentoring',
    description: 'Guiding junior developers and offshore teams in data modeling, ETL best practices, and troubleshooting; improving productivity and code quality.',
  },
]

export default function Leadership() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background -z-10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          ref={ref}
          onClick={() => setIsExpanded(!isExpanded)}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full text-center mb-0 group hover:opacity-80 transition-opacity"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 cursor-pointer group-hover:text-[#E35336] transition-colors">
              Leadership & <span className="gradient-text">Soft Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Click to expand: Core competencies for driving cross-functional collaboration
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-[#E35336] font-medium">{isExpanded ? 'Collapse' : 'Expand'}</span>
              <ChevronDown className={`w-5 h-5 text-[#E35336] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                {leadershipSkills?.map?.((item, index) => {
                  const Icon = item?.icon ?? Target
                  return (
                    <motion.div
                      key={item?.title ?? index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 + 0.05 * index }}
                      className="group p-6 glass rounded-2xl hover:shadow-lg hover:shadow-[#E35336]/10 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-[#E35336]/20 to-[#A0522D]/20 group-hover:from-[#E35336]/30 group-hover:to-[#A0522D]/30 transition-colors flex-shrink-0">
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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 pt-8 border-t border-muted-foreground/20"
              >
                <p className="text-muted-foreground text-center mb-6">
                  Additional leadership competencies demonstrated across 14+ years of career:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 glass rounded-xl">
                    <h4 className="font-semibold text-[#E35336] mb-2">Business-to-Technical Translation</h4>
                    <p className="text-sm text-muted-foreground">Bridging the gap between business stakeholders and engineering teams; communicating complex data concepts in accessible language.</p>
                  </div>
                  <div className="p-4 glass rounded-xl">
                    <h4 className="font-semibold text-[#E35336] mb-2">Conflict Resolution</h4>
                    <p className="text-sm text-muted-foreground">Facilitating alignment sessions and resolving disagreements between Supply Chain, IT, and Analytics teams; ensuring project success.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
