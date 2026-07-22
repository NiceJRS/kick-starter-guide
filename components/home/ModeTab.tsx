'use client'

import { IconBroadcast, IconCode } from '@tabler/icons-react'

type Mode = 'streamer' | 'developer'

export default function ModeTab({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="flex gap-1 p-[3px] rounded-lg border"
      style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
      {(['streamer', 'developer'] as Mode[]).map((m) => {
        const active = mode === m
        const isStreamer = m === 'streamer'
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] transition-all ${
              active
                ? isStreamer
                  ? 'bg-[--kick-green-10] text-[--kick-green] border border-[--kick-green-22]'
                  : 'bg-[--blue-10] text-[--blue] border border-[--blue-25]'
                : 'text-[--text-secondary] border border-transparent'
            }`}
          >
            {isStreamer ? <IconBroadcast size={12} /> : <IconCode size={12} />}
            {isStreamer ? 'Streamer' : 'Developer'}
          </button>
        )
      })}
    </div>
  )
}
