import { useEffect, useRef } from 'react'
import { ArrowDown, Navigation } from 'lucide-react'
import { invitation } from '@/config/invitation'
import { useCountdown } from '@/hooks/useCountdown'
import ParentsGallery from './ParentsGallery'
import './parents.css'

function ParentsCountdown() {
  const { days, hours, minutes, seconds, past } = useCountdown(invitation.date)
  return (
    <div className="parents-countdown">
      <p>{past ? '良缘已缔，喜乐长存' : '静候佳期 · 与您相聚'}</p>
      {!past && <div className="parents-countdown-values" aria-label={`距离婚礼还有${days}天${hours}时${minutes}分${seconds}秒`}>
        {[[days, '天'], [hours, '时'], [minutes, '分'], [seconds, '秒']].map(([value, label]) => (
          <div key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>
        ))}
      </div>}
    </div>
  )
}

/** 红金父母请柬：与新人版使用独立结构和样式，文案来自对应家庭配置。 */
export default function ParentsInvitation({ opened }: { opened: boolean }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const children = invitation.brideFirst
    ? [invitation.bride, invitation.groom]
    : [invitation.groom, invitation.bride]
  const navigationUrl = `https://uri.amap.com/search?keyword=${encodeURIComponent(invitation.amap.keyword)}&city=${encodeURIComponent(invitation.amap.city)}&callnative=1`

  useEffect(() => {
    if (opened) headingRef.current?.focus({ preventScroll: true })
  }, [opened])

  return (
    <article className="parents-invitation">
      <div className="parents-page-frame" aria-hidden="true" />
      <header className="parents-hero">
        <figure className="parents-hero-photo">
          <img src="/photos/header.webp" alt={`${invitation.groom.name}与${invitation.bride.name}的婚纱合照`} width="1400" height="1867" fetchPriority="high" />
          <figcaption>家有<span>囍</span>事</figcaption>
        </figure>
        <div className="parents-hero-copy">
          <h1 ref={headingRef} tabIndex={-1}>婚礼邀请函</h1>
          <p className="parents-hero-blessing">吾家有喜 · 喜结良缘<br />谨备薄酒 · 恭候亲友</p>
          <div className="parents-children">
            {children.map((child) => <p key={child.role}><span>{child.role}</span><strong>{child.name}</strong></p>)}
          </div>
          <div className="parents-hero-date">
            <p>{invitation.dateText}</p>
            <p>{invitation.lunarText} · {invitation.weekdayText}</p>
          </div>
          <p className="parents-hero-venue">{invitation.banquet.venue}</p>
          {invitation.hostLine && <p className="parents-host-signature">{invitation.hostLine}</p>}
          <a className="parents-scroll-link" href="#parents-welcome">恭请光临<ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </header>

      <section className="parents-welcome" id="parents-welcome">
        <span className="parents-small-happiness" aria-hidden="true">囍</span>
        <h2>以喜为名，诚邀您来</h2>
        <p>亲爱的亲朋好友：</p>
        <p>良辰已定，吉日待访。<br />{children[0].role}{children[0].name}与{children[1].role}{children[1].name}即将喜结连理，<br className="parents-mobile-break" />开启人生新的篇章。</p>
        <p>承蒙您一直以来的关心与厚爱，<br />我们诚挚地邀请您拨冗莅临，<br />共饮喜酒，同叙情谊，见证孩子们的幸福。</p>
        <div className="parents-welcome-signature"><p>{invitation.hostLine || '敬备喜宴 · 恭候光临'}</p><span>携家人 敬上</span></div>
      </section>

      <section className="parents-event" aria-labelledby="parents-event-title">
        <div className="parents-event-heading"><h2 id="parents-event-title">喜宴之约</h2><p>佳期已许，敬候君来</p></div>
        <div className="parents-event-details">
          <div className="parents-event-date"><strong>{invitation.dateText}</strong><span>{invitation.lunarText} · {invitation.weekdayText}</span></div>
          <dl>
            <div><dt>迎宾入席</dt><dd>{invitation.banquet.reception.replace(/^迎宾\s*/, '')}</dd></div>
            <div><dt>喜宴开席</dt><dd>{invitation.banquet.time}</dd></div>
            <div><dt>婚宴地点</dt><dd>{invitation.banquet.venue}<small>{invitation.banquet.address}</small></dd></div>
          </dl>
          <a className="parents-navigation" href={navigationUrl}><Navigation size={18} aria-hidden="true" />查看婚宴导航</a>
        </div>
      </section>

      <ParentsGallery opened={opened} />
      <ParentsCountdown />

      <footer className="parents-footer">
        <span className="parents-small-happiness" aria-hidden="true">囍</span>
        <h2>有您赴约，喜更圆满</h2>
        <p>一席喜宴，满心欢喜<br />期待与您，共度良辰</p>
        {invitation.hostLine && <p className="parents-footer-hosts">{invitation.hostLine}</p>}
        <p className="parents-footer-names">{children[0].name} · {children[1].name}</p>
        <p className="parents-footer-date">{invitation.dateText}</p>
        <div className="parents-legal"><span>© {invitation.date.slice(0, 4)} {invitation.icp.owner} · 婚礼请柬</span><a href={invitation.icp.href} target="_blank" rel="noopener noreferrer nofollow">{invitation.icp.number}</a></div>
      </footer>
    </article>
  )
}
