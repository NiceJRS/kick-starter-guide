import { IconExternalLink } from '@tabler/icons-react'

interface RefItem {
  label: string
  url: string
}

export default function References({ items }: { items: RefItem[] }) {
  return (
    <div className="mt-2 mb-1">
      <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
        References
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] transition-all hover:opacity-90 group"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#4ade80',
              textDecoration: 'none',
            }}
          >
            <IconExternalLink size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} className="group-hover:text-[--kick-green]" />
            <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(74,222,128,0.3)', textUnderlineOffset: '2px' }}>
              {item.label}
            </span>
            <span className="ml-auto text-[10px] truncate max-w-[180px]" style={{ color: 'var(--text-muted)' }}>
              {item.url.replace(/^https?:\/\//, '')}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
