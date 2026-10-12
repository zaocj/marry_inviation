import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { invitation } from '@/config/invitation'
import SectionHeading from '@/components/sections/SectionHeading'

interface PersonCardProps {
  role: string
  name: string
  fullName: string
  father: string
  mother: string
  delay: number
}

function PersonCard({ role, name, fullName, father, mother, delay }: PersonCardProps) {
  return (
    <motion.div
      className="paper-texture relative flex-1 overflow-hidden rounded-2xl border border-champagne/70 bg-white/70 p-8 text-center shadow-lg shadow-primary/5"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 头像占位：可替换成新人照片 */}
      <div className="relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-champagne bg-blush">
        <img
          src="/assets/qj_flower-decoration.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 mix-blend-multiply"
        />
        <span className="relative font-calligraphy text-4xl text-primary">{name}</span>
      </div>

      <p className="mt-5 text-xs tracking-[0.4em] text-gold">{role}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-[0.15em] text-ink">{fullName}</h3>

      <div className="mx-auto mt-5 h-px w-16 bg-primary/20" />

      <dl className="mt-5 space-y-2 text-sm text-ink/70">
        <div className="flex justify-center gap-3">
          <dt className="text-sand">父亲</dt>
          <dd>{father}</dd>
        </div>
        <div className="flex justify-center gap-3">
          <dt className="text-sand">母亲</dt>
          <dd>{mother}</dd>
        </div>
      </dl>
    </motion.div>
  )
}

/** 新人介绍 + 双方家庭信息 */
export default function Couple() {
  return (
    <section className="relative bg-blush py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="The Couple" title="新人介绍" />

        <div className="relative flex flex-col items-stretch gap-6 sm:flex-row sm:gap-10">
          <PersonCard
            role="新郎 GROOM"
            name={invitation.groom.name}
            fullName={invitation.groom.fullName}
            father={invitation.groom.father}
            mother={invitation.groom.mother}
            delay={0}
          />
          <PersonCard
            role="新娘 BRIDE"
            name={invitation.bride.name}
            fullName={invitation.bride.fullName}
            father={invitation.bride.father}
            mother={invitation.bride.mother}
            delay={0.15}
          />

          <div className="absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-cream shadow-lg sm:flex">
            <Heart className="h-5 w-5 fill-current" />
          </div>
        </div>
      </div>
    </section>
  )
}
