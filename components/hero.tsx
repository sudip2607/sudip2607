'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Mail, FileText, Github, Linkedin, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E35336]/10 via-background to-[#A0522D]/10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -right-32 w-96 h-96 bg-[#F4A460]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#A0522D]/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E35336] via-[#F4A460] to-[#A0522D] p-1 animate-pulse">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                  <Image
                    src="/images/profile.jpg"
                    alt="Sudip Sen"
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-[#E35336]">
              <MapPin className="w-4 h-4" />
              New Jersey, USA
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
          >
            Sudip <span className="gradient-text">Sen</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground mb-6"
          >
            Data Architect
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            14+ years delivering{' '}
            <span className="text-[#E35336] font-semibold">modern data platforms</span> and enterprise data products across MedTech, Consumer, Supply Chain, Insurance, and Banking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="#contact"
              className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#E35336] to-[#A0522D] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#E35336]/25 transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </Link>
            <Link
              href="#about"
              className="group flex items-center gap-2 px-8 py-3 glass font-semibold rounded-full hover:bg-secondary transition-all duration-300"
            >
              <FileText className="w-5 h-5" />
              View My Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <a
              href="https://github.com/sudip2607"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full hover:bg-secondary hover:scale-110 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/sudip-sen-ctrl-o"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full hover:bg-secondary hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="#about" className="inline-block animate-bounce">
              <ArrowDown className="w-8 h-8 text-muted-foreground" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
