'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, MapPin, Calendar, ChevronRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'

// Component to parse and render achievement text with bold and color styling
const AchievementText = ({ text }: { text: string }) => {
  const parts = text.split(/(<strong>.*?<\/strong>)/);
  return (
    <span className="inline">
      {parts.map((part, i) => {
        if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
          const content = part.replace(/<\/?strong>/g, '');
          return (
            <span key={i} className="font-bold text-[#E35336]">
              {content}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const experiences = [
  {
    title: 'Solution Architect / Tech Lead',
    company: 'Tata Consultancy Services (TCS)',
    project: 'J&J NA Commercial Data Platform (RADAR)',
    location: 'New Jersey, USA',
    period: 'Sept 2022 – Present',
    achievements: [
      'Led a cross-functional team of <strong>15+ engineers</strong> and analysts to integrate <strong>3 major vendors</strong> (Clarivate, AcuityMD, SourceView), delivering enterprise data models and materialized serving views on-time and under budget',
      'Mentored <strong>5+ junior developers</strong> in SQL best practices, improving code review cycle time by <strong>40%</strong> and establishing reusable design patterns',
      'Designed SourceView contract compliance validation framework with Analytics & Time-of-Compliance logic, reducing manual audit efforts by <strong>40%</strong> and improving job efficiency by <strong>66%</strong>',
      'Implemented Data Quality framework with validation rules and automated file-level rejection, achieving <strong>98% data accuracy</strong> across ingestion pipelines',
      'Collaborated with <strong>6+ analytics teams</strong> and business stakeholders to architect scalable data products on RADAR platform; aligned ingestion, storage, curation, and serving layers',
      'Delivered customer master integration: onboarded <strong>20+</strong> Commercial Master Data Management (CMDM) objects into PostgreSQL and Amazon Redshift, serving <strong>50+ business users</strong> across NA Commercial Analytics',
    ],
  },
  {
    title: 'Technical Lead',
    company: 'Tata Consultancy Services (TCS)',
    project: 'J&J Payment Validation Automation',
    location: 'New Jersey, USA',
    period: 'Mar 2022 – Aug 2022',
    achievements: [
      'Led stakeholder workshops with Finance and Operations teams to identify pain points, translating business requirements into technical validation rules',
      'Automated payment validation by standardizing <strong>15+ multi-source</strong> Excel inputs with rule-driven checks, eliminating <strong>4,800 manual hours</strong> annually',
      'Delivered Alteryx-based solution with <strong>95% automation rate</strong>, enabling Finance team to redirect efforts toward strategic analysis',
    ],
  },
  {
    title: 'Development Lead',
    company: 'Tata Consultancy Services (TCS)',
    project: 'J&J Enterprise Data Warehouse – Supply Chain',
    location: 'New Jersey, USA',
    period: 'Jan 2019 – Feb 2022',
    achievements: [
      'Managed a team of <strong>6 ETL developers</strong> to design and deliver EDW solutions across planning, forecasting, sales, inventory, and non-conformance, supporting <strong>$2B+ supply chain</strong> operations',
      'Built ETL pipelines using Informatica + Unix scripting on Teradata; led SIT/UAT coordination with <strong>10+ business analysts</strong>, ensuring zero-defect releases',
      'Resolved stakeholder conflicts by facilitating alignment sessions between Supply Chain, IT, and Analytics teams, ensuring project milestones were met',
    ],
  },
  {
    title: 'Data Warehousing Specialist',
    company: 'Tata Consultancy Services (TCS)',
    project: 'J&J Fidelity Reliability Analytics',
    location: 'Kolkata, India',
    period: 'Jul 2016 – Dec 2018',
    achievements: [
      'Delivered data warehousing enhancements for Orthopaedics metrics (OTIF, inventory, forecast), improving forecast accuracy by <strong>15%</strong>',
      'Developed Informatica mappings and Teradata queries; built <strong>5+ Tableau dashboards</strong> consumed by <strong>20+ business users</strong> in Field Sales and Operations',
      'Mentored offshore team members in dimensional modeling and ETL troubleshooting, reducing production incidents by <strong>25%</strong>',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'Tata Consultancy Services (TCS)',
    project: 'Banking and Insurance Data Platforms',
    location: 'Bangalore, Kolkata, Netherlands',
    period: 'July 2011 – Jul 2016',
    achievements: [
      'Insurance (Reaal N.V.): Coordinated platform migration with <strong>99.9% uptime</strong>, providing 24/7 production support via ServiceNow; reduced yearly 50+ P1 incidents to <strong>< 5 incidents</strong>',
      'Banking (American Express): Delivered ETL query performance tuning on Credit Card payments/settlement platform. Developed COBOL based interface automation reducing issue analysis time by <strong>45%</strong>',
    ],
  },
]

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="py-20 md:py-32 relative">
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
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A journey through enterprise data platforms across multiple industries
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E35336] via-[#F4A460] to-[#A0522D]" />

          {experiences?.map?.((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`relative mb-8 md:mb-12 ${index % 2 === 0 ? 'md:pr-8 md:ml-0 md:mr-auto md:w-1/2' : 'md:pl-8 md:ml-auto md:w-1/2'} pl-8 md:pl-0`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0 md:left-auto md:-right-3' : 'left-0 md:-left-3'} w-6 h-6 rounded-full bg-gradient-to-br from-[#E35336] to-[#A0522D] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`} onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                <div className="w-2 h-2 rounded-full bg-background" />
              </div>

              <div
                className="group glass p-6 rounded-2xl hover:shadow-lg hover:shadow-[#E35336]/10 transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className={`flex flex-wrap items-center gap-2 mb-2 text-sm text-muted-foreground ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {exp?.period ?? ''}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp?.location ?? ''}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-[#E35336] transition-colors">
                      {exp?.title ?? ''}
                    </h3>
                    <p className="text-[#E35336] font-medium mb-1">{exp?.company ?? ''}</p>
                    <p className="text-sm text-muted-foreground mb-4">{exp?.project ?? ''}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#E35336] flex-shrink-0 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ 
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98]
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-muted-foreground/20">
                        <ul className="space-y-2">
                          {exp?.achievements?.map?.((achievement, achIndex) => (
                            <li key={achIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-[#E35336] flex-shrink-0 mt-0.5" />
                              <AchievementText text={achievement} />
                            </li>
                          )) ?? []}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )) ?? []}
        </div>
      </div>
    </section>
  )
}
