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
      className="rounded-xl overflow-hidden mt-4"
      style={{ background: 'var(--surface-page)', border: '0.5px solid var(--blue-25)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: 'var(--blue-10)', borderBottom: '1px solid var(--blue-25)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--blue-10)' }}>
            <IconCode size={15} style={{ color: 'var(--blue)' }} />
          </div>
          <div>
            <div className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>Developer Zone — KICK Public API</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>OAuth 2.1 · REST API · Webhooks</div>
          </div>
        </div>
        <span
          className="text-xs px-2.5 py-0.5 rounded font-medium"
          style={{ background: 'var(--blue-10)', color: 'var(--blue)', border: '1px solid var(--blue-25)' }}
        >
          Dev Mode
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-2 p-4">
        {DEV_CARDS.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.label}
              className="p-3 rounded-lg"
              style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
            >
              <div className="w-7 h-7 rounded-md flex items-center justify-center mb-2" style={{ background: 'var(--blue-10)' }}>
                <Icon size={14} style={{ color: 'var(--blue)' }} />
              </div>
              <div className="text-sm font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>{c.label}</div>
              <div className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>{c.sub}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--blue-10)', color: 'var(--blue)' }}>{c.tag}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.count}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <button
          onClick={onSwitchMode}
          className="w-full py-2 rounded-lg text-sm font-semibold transition-all hover:bg-[--blue-25] hover:shadow-[0_0_12px_rgba(55,138,221,0.35)] hover:text-white"
          style={{ background: 'var(--blue-10)', color: 'var(--blue)', border: '1px solid var(--blue-25)' }}
        >
          {locale === 'th' ? 'สลับไป Developer mode →' : 'Switch to Developer mode →'}
        </button>
      </div>
    </div>
  )
}
