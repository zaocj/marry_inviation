import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  dark?: boolean
}

/** 区块标题：英文花体小字 + 中文衬线标题 + 装饰分隔 */
export default function SectionHeading({ eyebrow, title, dark }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-12 flex flex-col items-center gap-3 text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={cn('font-script text-2xl', dark ? 'text-champagne/80' : 'text-gold')}>
        {eyebrow}
      </span>
      <h2
        className={cn(
          'text-3xl font-bold tracking-[0.2em] sm:text-4xl',
          dark ? 'text-cream' : 'text-primary',
        )}
      >
        {title}
      </h2>
      <div className="mt-1 flex items-center gap-3">
        <span className={cn('h-px w-12', dark ? 'bg-champagne/40' : 'bg-primary/30')} />
        <span className={cn('text-xs', dark ? 'text-champagne' : 'text-primary')}>❦</span>
        <span className={cn('h-px w-12', dark ? 'bg-champagne/40' : 'bg-primary/30')} />
      </div>
    </motion.div>
  )
}
