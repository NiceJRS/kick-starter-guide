interface CellProps {
  supported: boolean
  text: string
  outstanding?: boolean
}

interface Row {
  feature: string
  kb: CellProps
  br: CellProps
}

const rowsEn: Row[] = [
  {
    feature: 'Core Specialty',
    kb: { supported: true, text: 'AI TTS + VOD Clipping' },
    br: { supported: true, text: 'Alerts Overlay + Moderation' },
  },
  {
    feature: 'Custom Commands + Cooldown',
    kb: { supported: true, text: 'Easy setup + Cooldown support' },
    br: { supported: true, text: 'Easy setup + Cooldown support' },
  },
  {
    feature: 'Timers (Auto-broadcast)',
    kb: { supported: true, text: 'Interval timers + AI voice readout' },
    br: { supported: true, text: 'Interval timers + Min Chat Lines rule' },
  },
  {
    feature: 'Link Protection',
    kb: { supported: true, text: 'Basic spam & link filtering' },
    br: { supported: true, text: 'Role-based exemptions (Subs/Mods)', outstanding: true },
  },
  {
    feature: 'Emote Limit Protection',
    kb: { supported: true, text: 'Text spam blocking' },
    br: { supported: true, text: 'Max emotes per message threshold', outstanding: true },
  },
  {
    feature: 'Highlight Feature',
    kb: { supported: true, text: 'AI TTS — 150+ natural voices', outstanding: true },
    br: { supported: true, text: 'Stream Alerts Overlay (Follow/Sub)', outstanding: true },
  },
  {
    feature: 'Gimmick Commands (!roll)',
    kb: { supported: true, text: '$(random.1-100) variable' },
    br: { supported: true, text: '$(rand.1-100) variable' },
  },
  {
    feature: 'Chat Overlay Widget',
    kb: { supported: true, text: 'Transparent background / themes' },
    br: { supported: true, text: 'Floating chat overlay themes' },
  },
  {
    feature: 'Music Overlay (!sr)',
    kb: { supported: false, text: 'Requires external media player' },
    br: { supported: true, text: '!sr YouTube queue + Now Playing OBS', outstanding: true },
  },
]

const rowsTh: Row[] = [
  {
    feature: 'จุดเด่นหลัก',
    kb: { supported: true, text: 'AI เสียงอ่านแชต + ตัดคลิป VOD' },
    br: { supported: true, text: 'กรอบแจ้งเตือน + จัดการแชต' },
  },
  {
    feature: 'Custom Commands + Cooldown',
    kb: { supported: true, text: 'ตั้งง่าย + รองรับ Cooldown' },
    br: { supported: true, text: 'ตั้งง่าย + รองรับ Cooldown' },
  },
  {
    feature: 'Timers (ประกาศอัตโนมัติ)',
    kb: { supported: true, text: 'ตั้งเวลา + AI อ่านข้อความที่โพสต์' },
    br: { supported: true, text: 'ตั้งเวลา + เงื่อนไขขั้นต่ำ Chat Lines' },
  },
  {
    feature: 'ระบบกันสแปมลิงก์',
    kb: { supported: true, text: 'บล็อกสแปมและลิงก์ทั่วไป' },
    br: { supported: true, text: 'ปลดล็อกสิทธิ์แยกยศ (Sub/Mod)', outstanding: true },
  },
  {
    feature: 'จำกัดจำนวน Emote',
    kb: { supported: true, text: 'บล็อกสแปมข้อความซ้ำ' },
    br: { supported: true, text: 'กำหนดสูงสุด Emote ต่อข้อความ', outstanding: true },
  },
  {
    feature: 'ฟีเจอร์เด่น',
    kb: { supported: true, text: 'AI TTS — เสียงธรรมชาติ 150+ เสียง', outstanding: true },
    br: { supported: true, text: 'กรอบแจ้งเตือน Follow/Sub บน OBS', outstanding: true },
  },
  {
    feature: 'คำสั่งมินิเกม (!roll)',
    kb: { supported: true, text: 'Variable $(random.1-100)' },
    br: { supported: true, text: 'Variable $(rand.1-100)' },
  },
  {
    feature: 'กรอบแชตบนหน้าจอ',
    kb: { supported: true, text: 'ปรับธีม / พื้นหลังโปร่งใส' },
    br: { supported: true, text: 'ธีมกรอบแชตลอยสวยงาม' },
  },
  {
    feature: 'Music Overlay (!sr)',
    kb: { supported: false, text: 'ต้องใช้แอปเล่นเพลงภายนอก' },
    br: { supported: true, text: '!sr คิวเพลง YouTube + Now Playing OBS', outstanding: true },
  },
]

export default function BotComparisonTable({ lang = 'en' }: { lang?: 'en' | 'th' }) {
  const rows = lang === 'th' ? rowsTh : rowsEn
  const featureHeader = lang === 'th' ? 'ฟังก์ชั่น' : 'Feature'

  return (
    <div className="overflow-x-auto my-6 rounded-lg" style={{ border: '1px solid var(--border-default)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
        <thead>
          <tr style={{ background: 'var(--surface-card)' }}>
            <th style={{ width: '38%', padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-default)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {featureHeader}
            </th>
            <th style={{ width: '31%', padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid var(--border-default)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>KickBot</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>kickbot.com</span>
                <span style={{ display: 'inline-block', marginTop: '2px', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, background: 'rgba(151,196,89,0.15)', color: '#5a9e2a' }}>
                  {lang === 'th' ? 'AI TTS & ตัดคลิป' : 'AI TTS & Clipping'}
                </span>
              </div>
            </th>
            <th style={{ width: '31%', padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid var(--border-default)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>BotRix</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>botrix.live</span>
                <span style={{ display: 'inline-block', marginTop: '2px', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, background: 'rgba(251,191,36,0.15)', color: '#b87c08' }}>
                  {lang === 'th' ? 'Alerts & Overlay' : 'Alerts & Overlays'}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border-default)' : undefined }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-card)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={{ padding: '8px 12px', fontWeight: 500, color: 'var(--text-primary)' }}>{row.feature}</td>
              <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>
                <CellContent {...row.kb} />
              </td>
              <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>
                <CellContent {...row.br} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CellContent({ supported, text, outstanding }: CellProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
      <span style={{ flexShrink: 0, marginTop: '1px' }}>
        {supported
          ? <span style={{ color: '#5a9e2a', fontWeight: 700 }}>✓</span>
          : <span style={{ color: '#cc3333' }}>✗</span>
        }
      </span>
      <span>
        {text}
        {outstanding && (
          <span style={{
            display: 'inline-block',
            marginLeft: '5px',
            padding: '1px 5px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 600,
            background: 'rgba(251,191,36,0.15)',
            color: '#b87c08',
            verticalAlign: 'middle',
          }}>★</span>
        )}
      </span>
    </div>
  )
}
