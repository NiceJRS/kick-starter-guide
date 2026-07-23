export default function SubSteps({ items }: { items: string[] }) {
  return (
    <ol className="mt-2 space-y-1.5 pl-0 list-none">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span
            className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
            style={{ background: 'var(--surface-card2)', border: '1px solid var(--border-strong)', color: 'var(--text-muted)' }}
          >
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </li>
      ))}
    </ol>
  )
}
