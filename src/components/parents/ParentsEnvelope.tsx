import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { invitation } from '@/config/invitation'
import './parents.css'

/** 父母版独立封面；打开折页后才移交给正文，不影响新人版信封。 */
export default function ParentsEnvelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false)
  const reducedMotion = useReducedMotion()
  const children = invitation.brideFirst
    ? [invitation.bride, invitation.groom]
    : [invitation.groom, invitation.bride]

  return (
    <motion.section
      className="parents-cover"
      aria-label="婚礼请柬信封"
      initial={false}
      animate={{ opacity: opening ? 0 : 1, y: opening && !reducedMotion ? -32 : 0 }}
      transition={{ duration: reducedMotion ? 0.15 : 0.65, delay: opening && !reducedMotion ? 0.45 : 0 }}
      onAnimationComplete={() => { if (opening) onOpen() }}
    >
      <div className="parents-cover-frame" aria-hidden="true" />
      <div className={`parents-envelope${opening ? ' is-opening' : ''}`}>
        <div className="parents-envelope-letter">
          <p className="parents-envelope-title">婚礼请柬</p>
          <p className="parents-envelope-wish">两姓缔良缘 · 一帖邀至亲</p>
          <span className="parents-envelope-happiness" aria-hidden="true">囍</span>
          <p className="parents-envelope-roles">{invitation.envelopeRoles}</p>
          <p className="parents-envelope-names">
            {children[0].name}<span aria-hidden="true"> · </span>{children[1].name}
          </p>
          <p className="parents-envelope-date">{invitation.dateText} · {invitation.weekdayText}</p>
          {invitation.hostLine && <p className="parents-envelope-hosts">{invitation.hostLine}</p>}
        </div>
        <div className="parents-envelope-fold" aria-hidden="true" />
        <div className="parents-envelope-flap" aria-hidden="true" />
        <button
          type="button"
          className="parents-envelope-open"
          onClick={() => setOpening(true)}
          disabled={opening}
          aria-label="开启喜帖"
        >
          <span className="parents-envelope-seal" aria-hidden="true">囍</span>
          <span>{opening ? '喜帖开启中' : '开启喜帖'}</span>
          <ArrowDown size={15} aria-hidden="true" />
        </button>
      </div>
      <p className="parents-cover-note">一封喜帖，一份诚挚的邀请</p>
    </motion.section>
  )
}
