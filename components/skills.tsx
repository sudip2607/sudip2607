'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Cloud, Code, Database, BarChart3, Settings, Server, Workflow, Layers } from 'lucide-react'

const skillCategories = [
  {
    title: 'Cloud & Platforms',
    icon: Cloud,
    skills: ['AWS (Redshift, S3, EC2)', 'Azure (Data Lake, Data Factory, Databricks)', 'Microsoft Fabric'],
    color: 'from-[#E35336] to-[#A0522D]',
  },
  {
    title: 'Languages',
    icon: Code,
    skills: ['SQL (Advanced)', 'Python', 'Unix/Shell', 'Oracle PL/SQL', 'DB2', 'COBOL'],
    color: 'from-[#F4A460] to-[#A0522D]',
  },
  {
    title: 'Data Integration',
    icon: Workflow,
    skills: ['Databricks', 'SQL Script', 'Python Scripting', 'dbt core', 'PySpark', 'Unix/Shell', 'Alteryx', 'Informatica PowerCenter'],
    color: 'from-[#A0522D] to-[#E35336]',
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['Amazon Redshift', 'PostgreSQL', 'Teradata', 'Snowflake', 'Oracle'],
    color: 'from-[#E35336] to-[#F4A460]',
  },
  {
    title: 'Analytics & BI',
    icon: BarChart3,
    skills: ['Power BI', 'Tableau'],
    color: 'from-[#A0522D] to-[#F4A460]',
  },
  {
    title: 'Data Architecture',
    icon: Layers,
    skills: ['Data Modeling (3NF, Dimensional)', 'SCD/SCD2', 'Historical Versioning', 'Data Quality Rules'],
    color: 'from-[#F4A460] to-[#E35336]',
  },
  {
    title: 'Data Management',
    icon: Settings,
    skills: ['Customer Master & ID Unification', 'Validation & Exception Handling', 'Data Lineage'],
    color: 'from-[#E35336] to-[#A0522D]',
  },
  {
    title: 'Operations',
    icon: Server,
    skills: ['SLA-driven Operations', 'Incident/Change Management', 'Performance Optimization'],
    color: 'from-[#A0522D] to-[#E35336]',
  },
]

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across the modern data stack
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories?.map?.((category, index) => {
            const Icon = category?.icon ?? Database
            return (
              <motion.div
                key={category?.title ?? index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group p-6 glass rounded-2xl hover:shadow-lg hover:shadow-[#E35336]/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category?.color ?? 'from-[#E35336] to-[#A0522D]'} bg-opacity-20 mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-4 group-hover:text-[#E35336] transition-colors">
                  {category?.title ?? ''}
                </h3>
                <ul className="space-y-2">
                  {category?.skills?.map?.((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E35336]" />
                      {skill ?? ''}
                    </li>
                  )) ?? []}
                </ul>
              </motion.div>
            )
          }) ?? []}
        </div>
      </div>
    </section>
  )
}
