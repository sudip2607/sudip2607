'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Star, GitFork, ExternalLink, Code2, Loader2, ChevronDown } from 'lucide-react'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
}

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  default: '#6e7681',
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sudip2607/repos?sort=updated&per_page=100')
        if (!response?.ok) {
          throw new Error('Failed to fetch repositories')
        }
        const data = await response?.json?.()
        setRepos(data ?? [])
      } catch (err) {
        setError('Unable to load GitHub repositories')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date?.toLocaleDateString?.('en-US', { month: 'short', year: 'numeric' }) ?? ''
    } catch {
      return ''
    }
  }

  return (
    <section id="projects" className="py-20 md:py-32 relative">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 cursor-pointer group-hover:text-[#E35336] transition-colors">
              GitHub <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Click to expand: Explore my open-source contributions and personal projects
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/sudip2607"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full hover:bg-secondary transition-all duration-300 text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5" />
                View GitHub Profile
                <ExternalLink className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#E35336] font-medium">{isExpanded ? 'Collapse' : 'Expand'}</span>
                <ChevronDown className={`w-5 h-5 text-[#E35336] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
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
              className="overflow-hidden mt-16"
            >
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-[#E35336]" />
                  <span className="ml-3 text-muted-foreground">Loading repositories...</span>
                </div>
              )}

              {error && (
                <div className="text-center py-20">
                  <Code2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{error}</p>
                </div>
              )}

              {!loading && !error && repos?.length === 0 && (
                <div className="text-center py-20">
                  <Code2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No public repositories found</p>
                </div>
              )}

              {!loading && !error && (repos?.length ?? 0) > 0 && (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos?.slice?.(0, 3)?.map?.((repo, index) => (
                      <motion.div
                        key={repo?.id ?? index}
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.05 * Math.min(index, 10) }}
                        className="group glass rounded-2xl p-6 hover:shadow-lg hover:shadow-[#E35336]/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Github className="w-5 h-5 text-muted-foreground" />
                            <h3 className="font-semibold text-lg truncate group-hover:text-[#E35336] transition-colors">
                              {repo?.name ?? 'Untitled'}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                          {repo?.description ?? 'No description provided'}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          {repo?.language && (
                            <span className="flex items-center gap-1">
                              <span
                                className="w-3 h-3 rounded-full language-indicator"
                                data-color={languageColors?.[repo?.language] ?? languageColors?.default ?? '#6e7681'}
                              />
                              {repo?.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {repo?.stargazers_count ?? 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            {repo?.forks_count ?? 0}
                          </span>
                        </div>

                        {(repo?.topics?.length ?? 0) > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {repo?.topics?.slice?.(0, 3)?.map?.((topic, topicIndex) => (
                              <span
                                key={topicIndex}
                                className="px-2 py-1 text-xs rounded-full bg-[#E35336]/10 text-[#E35336]"
                              >
                                {topic ?? ''}
                              </span>
                            )) ?? []}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                          <span className="text-xs text-muted-foreground">
                            Updated {formatDate(repo?.updated_at ?? '')}
                          </span>
                          <div className="flex items-center gap-2">
                            <a
                              href={repo?.html_url ?? '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-secondary rounded-lg transition-colors"
                              aria-label="View on GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                            {repo?.homepage && (
                              <a
                                href={repo?.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                aria-label="View live demo"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )) ?? []}
                  </div>

                  {(repos?.length ?? 0) > 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-center mt-12"
                    >
                      <a
                        href="https://github.com/sudip2607?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E35336]/30 hover:bg-[#E35336]/10 transition-colors text-[#E35336] font-medium"
                      >
                        <span>View All {repos.length} Projects</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
