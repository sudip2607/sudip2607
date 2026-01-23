'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, GraduationCap, Calendar, BadgeCheck } from 'lucide-react'

const certifications = [
  {
    title: 'Microsoft Certified: Fabric Data Engineer Associate',
    issuer: 'Microsoft',
    date: 'July 2025',
    category: 'Cloud & Data Engineering',
  },
  {
    title: 'Microsoft Certified: Azure Data Fundamentals',
    issuer: 'Microsoft',
    date: 'June 2021',
    category: 'Cloud & Data Engineering',
  },
  {
    title: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'June 2021',
    category: 'Cloud & Data Engineering',
  },
  {
    title: 'Teradata Certified: Vantage Associate Certification',
    issuer: 'Teradata',
    date: 'May 2020',
    category: 'Databases',
  },
  {
    title: 'Certified Python Developer',
    issuer: 'Professional Certification',
    date: 'February 2019',
    category: 'Programming',
  },
  {
    title: 'Oracle PL/SQL Developer Certified Associate',
    issuer: 'Oracle',
    date: 'March 2015',
    category: 'Databases',
  },
  {
    title: 'IBM Certified Database Associate - DB2 10.1 Fundamentals',
    issuer: 'IBM',
    date: 'February 2014',
    category: 'Databases',
  },
  {
    title: 'ITIL Foundation',
    issuer: 'ITIL',
    date: 'March 2013',
    category: 'IT Service Management',
  },
]

const education = {
  degree: 'Master of Technology (M. Tech)',
  field: 'Computer Science & Engineering',
  institution: 'University of Calcutta',
  location: 'Kolkata, India',
  year: '2011',
}

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="certifications" className="py-20 md:py-32 relative">
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
            Certifications & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and academic background
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-[#E35336]" />
            <h3 className="text-2xl font-bold">Education</h3>
          </div>
          
          <div className="glass rounded-2xl p-6 hover:shadow-lg hover:shadow-[#E35336]/10 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold mb-1">{education?.degree ?? ''}</h4>
                <p className="text-[#E35336] font-medium mb-1">{education?.field ?? ''}</p>
                <p className="text-muted-foreground">
                  {education?.institution ?? ''}, {education?.location ?? ''}
                </p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{education?.year ?? ''}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-[#E35336]" />
            <h3 className="text-2xl font-bold">Certifications</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications?.map?.((cert, index) => (
              <motion.div
                key={cert?.title ?? index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + 0.05 * index }}
                className="group glass rounded-xl p-5 hover:shadow-lg hover:shadow-[#E35336]/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#E35336]/20 to-[#A0522D]/20 flex-shrink-0">
                    <BadgeCheck className="w-5 h-5 text-[#E35336]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 group-hover:text-[#E35336] transition-colors text-sm">
                      {cert?.title ?? ''}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">{cert?.issuer ?? ''}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#E35336]/10 text-[#E35336]">
                        {cert?.category ?? ''}
                      </span>
                      <span className="text-xs text-muted-foreground">{cert?.date ?? ''}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) ?? []}
          </div>
        </div>
      </div>
    </section>
  )
}
