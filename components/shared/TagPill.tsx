export default function TagPill({ label, active = false, onClick }: {
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] border transition-colors ${
        active
          ? 'bg-[--kick-green-10] border-[--kick-green-22] text-[--kick-green]'
          : 'bg-white/[0.04] border-white/[0.07] text-[--text-secondary] hover:border-white/[0.12]'
      }`}
    >
      {label}
    </button>
  )
}
