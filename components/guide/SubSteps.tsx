export default function SubSteps({ items }: { items: string[] }) {
  return (
    <ol className="mt-2 space-y-1.5 pl-0 list-none">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span
            className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-muted)' }}
          >
            {i + 1}
          </span>
          <span className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </li>
      ))}
    </ol>
  )
}
