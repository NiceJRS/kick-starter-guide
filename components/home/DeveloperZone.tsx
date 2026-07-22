import { IconCode, IconKey, IconApi, IconWebhook } from '@tabler/icons-react'

const DEV_CARDS = [
  { icon: IconKey,     label: 'Getting Started', sub: 'App Setup, OAuth 2.1, Scopes',          tag: 'Auth',   count: '3 guides' },
  { icon: IconApi,     label: 'REST APIs',        sub: 'Users, Channels, Chat, Moderation…',    tag: 'API',    count: '10 endpoints' },
  { icon: IconWebhook, label: 'Events & Webhooks', sub: 'Subscribe, Payloads, Realtime',        tag: 'Events', count: '4 guides' },
]

export default function DeveloperZone({
  locale,
  onSwitchMode,
}: {
  locale: string
  onSwitchMode: () => void
}) {
  return (
    <div
      className="rounded-xl overflow-hidden mt-3"
      style={{ background: 'var(--surface-page)', border: '0.5px solid var(--blue-25)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2.5"
        style={{ background: '#050d14', borderBottom: '1px solid rgba(55,138,221,0.15)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--blue-10)' }}>
            <IconCode size={13} style={{ color: 'var(--blue)' }} />
          </div>
          <div>
            <div className="text-[12px] font-medium" style={{ color: '#cfd8cc' }}>Developer Zone — KICK Public API</div>
            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>OAuth 2.1 · REST API · Webhooks</div>
          </div>
        </div>
        <span
          className="text-[9px] px-2 py-0.5 rounded font-medium"
          style={{ background: 'var(--blue-10)', color: 'var(--blue)', border: '1px solid var(--blue-25)' }}
        >
          Dev Mode
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-[7px] p-3">
        {DEV_CARDS.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.label}
              className="p-2.5 rounded-lg"
              style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-6 h-6 rounded-md flex items-center justify-center mb-1.5" style={{ background: 'var(--blue-10)' }}>
                <Icon size={12} style={{ color: 'var(--blue)' }} />
              </div>
              <div className="text-[10px] font-medium mb-0.5" style={{ color: '#cfd8cc' }}>{c.label}</div>
              <div className="text-[9px] mb-1.5" style={{ color: 'var(--text-muted)' }}>{c.sub}</div>
              <div className="flex items-center justify-between">
                <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'var(--blue-10)', color: 'var(--blue)' }}>{c.tag}</span>
                <span className="text-[8px]" style={{ color: 'var(--text-muted)' }}>{c.count}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-3 pb-3">
        <button
          onClick={onSwitchMode}
          className="w-full py-1.5 rounded-lg text-[10px] font-medium transition-all hover:opacity-90"
          style={{ background: 'var(--blue-10)', color: 'var(--blue)', border: '1px solid var(--blue-25)' }}
        >
          {locale === 'th' ? 'สลับไป Developer mode →' : 'Switch to Developer mode →'}
        </button>
      </div>
    </div>
  )
}
