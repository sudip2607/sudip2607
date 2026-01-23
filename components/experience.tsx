'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react'

const experiences = [
  {
    title: 'Solution Architect / Tech Lead',
    company: 'Tata Consultancy Services (TCS)',
    project: 'J&J NA Commercial Data Platform (RADAR)',
    location: 'New Jersey, USA',
    period: 'Sept 2022 – Present',
    achievements: [
      'Led 3 major vendor integrations (Clarivate, AcuityMD, SourceView) delivering enterprise data models and materialized serving views',
      'Designed SourceView contract compliance validation framework with Analytics & Time-of-Compliance logic',
      'Implemented Data Quality controls: validation rules, automated file-level rejection with Control-M scheduling',
      'Architected scalable data products on RADAR platform; aligned ingestion, storage, curation, and serving layers',
      'Delivered customer master integration: onboarded 20+ CMDM objects into PostgreSQL and Amazon Redshift',
      'Built customer unification logic using MedTech_ID-based matching for 6+ analytics teams',
    ],
  },
  {
    title: 'Technical Lead',
    company: 'Tata Consultancy Services (TCS)',
    project: 'J&J Payment Validation Automation',
    location: 'New Jersey, USA',
    period: 'Mar 2022 – Aug 2022',
    achievements: [
      'Automated payment validation by standardizing multi-source Excel inputs with rule-driven checks',
      'Delivered Alteryx-based validation solution with estimated savings of ~4,800 hours/year',
    ],
  },
  {
    title: 'Development Lead',
    company: 'Tata Consultancy Services (TCS)',
    project: 'J&J Enterprise Data Warehouse – Supply Chain',
    location: 'New Jersey, USA',
    period: 'Jan 2019 – Feb 2022',
    achievements: [
      'Designed and delivered EDW solutions across planning/forecasting/sales, inventory, and non-conformance',
      'Built ETL using Informatica + Unix scripting on Teradata; led SIT/UAT support, releases, and migration',
    ],
  },
  {
    title: 'Data Warehousing Specialist',
    company: 'Tata Consultancy Services (TCS)',
    project: 'J&J Fidelity Reliability Analytics',
    location: 'Kolkata, India',
    period: 'Jul 2016 – Dec 2018',
    achievements: [
      'Delivered data warehousing enhancements for Orthopaedics metrics (OTIF, inventory, forecast)',
      'Developed Informatica mappings and Teradata queries; built Tableau dashboards',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'Tata Consultancy Services (TCS)',
    project: 'Banking and Insurance Data Platforms',
    location: 'Bangalore, Kolkata, Netherlands',
    period: 'July 2011 – Jul 2016',
    achievements: [
      'Insurance (Reaal N.V.): coordinated platform migration, production support (Informatica/Oracle/ServiceNow)',
      'Banking (American Express): delivered ETL query performance tuning on payments/settlement platform',
    ],
  },
]

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

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
              className={`relative mb-8 md:mb-12 ${index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-0 md:mr-auto md:w-1/2' : 'md:pl-8 md:ml-auto md:w-1/2'} pl-8 md:pl-0`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0 md:left-auto md:-right-3' : 'left-0 md:-left-3'} w-6 h-6 rounded-full bg-gradient-to-br from-[#E35336] to-[#A0522D] flex items-center justify-center`}>
                <div className="w-2 h-2 rounded-full bg-background" />
              </div>

              <div className="group glass p-6 rounded-2xl hover:shadow-lg hover:shadow-[#E35336]/10 transition-all duration-300">
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

                <h3 className="text-xl font-bold mb-1 group-hover:text-[#E35336] transition-colors">
                  {exp?.title ?? ''}
                </h3>
                <p className="text-[#E35336] font-medium mb-1">{exp?.company ?? ''}</p>
                <p className="text-sm text-muted-foreground mb-4">{exp?.project ?? ''}</p>

                <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                  {exp?.achievements?.map?.((achievement, achIndex) => (
                    <li key={achIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-[#E35336] flex-shrink-0 mt-0.5" />
                      <span>{achievement ?? ''}</span>
                    </li>
                  )) ?? []}
                </ul>
              </div>
            </motion.div>
          )) ?? []}
        </div>
      </div>
    </section>
  )
}
