const rows = [
  {
    quality: { th: '1080p 60fps', en: '1080p 60fps' },
    tag: { th: 'คมชัดสูงสุด', en: 'Maximum Clarity' },
    bitrate: '6,000 – 8,000',
    rateControl: 'CBR',
    keyframe: '2s',
    preset: 'P5: Slow',
    audioBitrate: '160 – 320 Kbps',
    upload: '15 – 20 Mbps',
    note: { th: 'เหมาะสำหรับคอมสเปกแรง เน็ตไฟเบอร์', en: 'High-end PC + fiber connection' },
    highlight: false,
  },
  {
    quality: { th: '1080p 30fps', en: '1080p 30fps' },
    tag: { th: 'ประหยัดสเปก', en: 'Low Hardware Load' },
    bitrate: '4,500 – 6,000',
    rateControl: 'CBR',
    keyframe: '2s',
    preset: 'P4: Medium',
    audioBitrate: '160 Kbps',
    upload: '10 – 15 Mbps',
    note: { th: 'Just Chatting หรือเกมช้า', en: 'Just Chatting or slow-paced games' },
    highlight: false,
  },
  {
    quality: { th: '720p 60fps', en: '720p 60fps' },
    tag: { th: 'ลื่นไหล มาตรฐาน', en: 'Smooth / Standard' },
    bitrate: '4,500 – 6,000',
    rateControl: 'CBR',
    keyframe: '2s',
    preset: 'P4: Medium',
    audioBitrate: '128 – 160 Kbps',
    upload: '10 – 12 Mbps',
    note: { th: 'แนะนำสำหรับมือใหม่ คอมสเปกปานกลาง', en: 'Recommended for beginners, mid-tier PC' },
    highlight: true,
  },
  {
    quality: { th: '720p 30fps', en: '720p 30fps' },
    tag: { th: 'เซฟสเปก/เน็ตช้า', en: 'Entry Level' },
    bitrate: '3,000 – 4,000',
    rateControl: 'CBR',
    keyframe: '2s',
    preset: 'P3: Fast',
    audioBitrate: '128 Kbps',
    upload: '6 – 8 Mbps',
    note: { th: 'โน้ตบุ๊กทั่วไป หรือเน็ตช้า', en: 'Low-spec laptop or slow upload' },
    highlight: false,
  },
]

export default function BitrateTable({ locale = 'en' }: { locale?: string }) {
  const th = locale === 'th'
  const headers = th
    ? ['คุณภาพ', 'Bitrate (Kbps)', 'Rate Control', 'Keyframe', 'Preset', 'Audio', 'Upload ขั้นต่ำ', 'คำแนะนำ']
    : ['Quality', 'Bitrate (Kbps)', 'Rate Control', 'Keyframe', 'Preset', 'Audio', 'Min Upload', 'Notes']

  return (
    <div className="my-4">
      <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
        {th ? '📊 ตารางเปรียบเทียบ Bitrate สำหรับ KICK' : '📊 Stream Quality & Bitrate Comparison for KICK'}
      </p>
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border-default)' }}>
        <table className="w-full text-sm border-collapse min-w-[640px]">
          <thead>
            <tr style={{ background: 'var(--surface-card2)', borderBottom: '1px solid var(--border-default)' }}>
              {headers.map((h) => (
                <th key={h} className="text-left px-3 py-2 font-medium whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                style={{
                  background: row.highlight ? 'var(--kick-green-10)' : i % 2 === 0 ? 'transparent' : 'var(--surface-card2)',
                  borderBottom: i < rows.length - 1 ? '1px solid var(--border-default)' : undefined,
                }}
              >
                <td className="px-3 py-2.5">
                  <div className="font-semibold" style={{ color: row.highlight ? 'var(--kick-green)' : 'var(--text-primary)' }}>
                    {row.quality[th ? 'th' : 'en']}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{row.tag[th ? 'th' : 'en']}</div>
                  {row.highlight && (
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold" style={{ background: 'var(--kick-green-10)', color: 'var(--kick-green)', border: '1px solid var(--kick-green-22)' }}>
                      {th ? 'แนะนำ' : 'Recommended'}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2.5 font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{row.bitrate}</td>
                <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.rateControl}</td>
                <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.keyframe}</td>
                <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.preset}</td>
                <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.audioBitrate}</td>
                <td className="px-3 py-2.5 font-mono" style={{ color: 'var(--text-secondary)' }}>{row.upload}</td>
                <td className="px-3 py-2.5 text-xs" style={{ color: 'var(--text-muted)' }}>{row.note[th ? 'th' : 'en']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
