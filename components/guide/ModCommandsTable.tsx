'use client'

const rowsEn = [
  { category: 'User Moderation', rowSpanCat: 4, command: '/ban', example: '/ban nicejrs profanity', description: 'Permanently ban user from chat', permission: 'Streamer / Mod' },
  { category: null, command: '/unban', example: '/unban nicejrs', description: 'Lift ban from a user', permission: 'Streamer / Mod' },
  { category: null, command: '/timeout', example: '/timeout nicejrs 600 spamming', description: 'Restrict chat temporarily (seconds — 600 = 10 min)', permission: 'Streamer / Mod' },
  { category: null, command: '/untimeout', example: '/untimeout nicejrs', description: 'Cancel an active timeout early', permission: 'Streamer / Mod' },
  { category: 'Chat Control', rowSpanCat: 6, command: '/clear', example: '/clear', description: 'Purge all visible chat messages', permission: 'Streamer / Mod' },
  { category: null, command: '/slow', example: '/slow 10', description: 'Rate limit (seconds between messages)', permission: 'Streamer / Mod' },
  { category: null, command: '/slowoff', example: '/slowoff', description: 'Turn off slow mode', permission: 'Streamer / Mod' },
  { category: null, command: '/followers', example: '/followers 15', description: 'Followers-only chat (min follow minutes)', permission: 'Streamer / Mod' },
  { category: null, command: '/subscribers', example: '/subscribers', description: 'Subscribers-only chat', permission: 'Streamer / Mod' },
  { category: null, command: '/emotesonly', example: '/emotesonly', description: 'Emotes-only chat', permission: 'Streamer / Mod' },
  { category: 'Role Assignment', rowSpanCat: 2, command: '/mod / /unmod', example: '/mod nicejrs', description: 'Assign or revoke Moderator role', permission: 'Streamer Only' },
  { category: null, command: '/vip / /unvip', example: '/vip nicejrs', description: 'Assign or revoke VIP role', permission: 'Streamer Only' },
  { category: 'Interactive', rowSpanCat: 3, command: '/raid', example: '/raid target_channel', description: 'Transfer viewers to another stream', permission: 'Streamer / Mod' },
  { category: null, command: '/poll', example: '/poll Question | Option1 | Option2', description: 'Launch instant viewer poll', permission: 'Streamer / Mod' },
  { category: null, command: '/prediction', example: '/prediction Win? | Win | Loss', description: 'Channel Points prediction event', permission: 'Streamer / Mod' },
]

const rowsTh = [
  { category: 'จัดการผู้ใช้', rowSpanCat: 4, command: '/ban', example: '/ban nicejrs profanity', description: 'แบนผู้ใช้ออกจากแชทถาวร', permission: 'Streamer / Mod' },
  { category: null, command: '/unban', example: '/unban nicejrs', description: 'ยกเลิกการแบนผู้ใช้', permission: 'Streamer / Mod' },
  { category: null, command: '/timeout', example: '/timeout nicejrs 600 spamming', description: 'จำกัดสิทธิ์แชทชั่วคราว (วินาที — 600 = 10 นาที)', permission: 'Streamer / Mod' },
  { category: null, command: '/untimeout', example: '/untimeout nicejrs', description: 'ยกเลิก timeout ก่อนหมดเวลา', permission: 'Streamer / Mod' },
  { category: 'ควบคุมแชท', rowSpanCat: 6, command: '/clear', example: '/clear', description: 'ล้างข้อความแชททั้งหมด', permission: 'Streamer / Mod' },
  { category: null, command: '/slow', example: '/slow 10', description: 'จำกัดความเร็วแชท (วินาทีต่อข้อความ)', permission: 'Streamer / Mod' },
  { category: null, command: '/slowoff', example: '/slowoff', description: 'ปิด Slow Mode', permission: 'Streamer / Mod' },
  { category: null, command: '/followers', example: '/followers 15', description: 'แชทเฉพาะผู้ติดตาม (ระบุนาทีขั้นต่ำ)', permission: 'Streamer / Mod' },
  { category: null, command: '/subscribers', example: '/subscribers', description: 'แชทเฉพาะ Subscriber', permission: 'Streamer / Mod' },
  { category: null, command: '/emotesonly', example: '/emotesonly', description: 'แชทได้เฉพาะ Emote', permission: 'Streamer / Mod' },
  { category: 'มอบยศ', rowSpanCat: 2, command: '/mod / /unmod', example: '/mod nicejrs', description: 'มอบหรือถอดถอนยศ Moderator', permission: 'Streamer เท่านั้น' },
  { category: null, command: '/vip / /unvip', example: '/vip nicejrs', description: 'มอบหรือถอดถอนยศ VIP', permission: 'Streamer เท่านั้น' },
  { category: 'กิจกรรม Interactive', rowSpanCat: 3, command: '/raid', example: '/raid target_channel', description: 'ส่งคนดูไปช่องอื่น', permission: 'Streamer / Mod' },
  { category: null, command: '/poll', example: '/poll Question | Option1 | Option2', description: 'เปิดโหวตทันที', permission: 'Streamer / Mod' },
  { category: null, command: '/prediction', example: '/prediction Win? | Win | Loss', description: 'เปิด Prediction ใช้ Channel Points', permission: 'Streamer / Mod' },
]

const headers = {
  en: { category: 'Category', command: 'Command', example: 'Example', description: 'Description', permission: 'Permission' },
  th: { category: 'หมวดหมู่', command: 'คำสั่ง', example: 'ตัวอย่าง', description: 'คำอธิบาย', permission: 'สิทธิ์' },
}

export default function ModCommandsTable({ lang = 'en' }: { lang?: 'en' | 'th' }) {
  const rows = lang === 'th' ? rowsTh : rowsEn
  const h = headers[lang]

  return (
    <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
      <table style={{ width: '100%', fontSize: '0.8125rem', borderCollapse: 'collapse', tableLayout: 'auto' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 10px 8px 0', fontWeight: 600, whiteSpace: 'nowrap', borderBottom: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>{h.category}</th>
            <th style={{ textAlign: 'left', padding: '8px 10px 8px 0', fontWeight: 600, whiteSpace: 'nowrap', borderBottom: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>{h.command}</th>
            <th style={{ textAlign: 'left', padding: '8px 10px 8px 0', fontWeight: 600, borderBottom: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>{h.example}</th>
            <th style={{ textAlign: 'left', padding: '8px 10px 8px 0', fontWeight: 600, borderBottom: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>{h.description}</th>
            <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600, whiteSpace: 'nowrap', borderBottom: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>{h.permission}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.category !== null && (
                <td
                  rowSpan={row.rowSpanCat}
                  style={{ padding: '7px 10px 7px 0', fontWeight: 500, verticalAlign: 'top', borderBottom: '1px solid hsl(var(--border) / 0.35)', color: 'hsl(var(--foreground)))', whiteSpace: 'nowrap' }}
                >
                  {row.category}
                </td>
              )}
              <td style={{ padding: '7px 10px 7px 0', borderBottom: '1px solid hsl(var(--border) / 0.35)' }}>
                <code style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: 'hsl(var(--muted))', padding: '1px 5px', borderRadius: '4px' }}>{row.command}</code>
              </td>
              <td style={{ padding: '7px 10px 7px 0', borderBottom: '1px solid hsl(var(--border) / 0.35)' }}>
                <code style={{ fontFamily: 'monospace', fontSize: '0.75rem', background: 'hsl(var(--muted))', padding: '1px 5px', borderRadius: '4px' }}>{row.example}</code>
              </td>
              <td style={{ padding: '7px 10px 7px 0', borderBottom: '1px solid hsl(var(--border) / 0.35)', color: 'hsl(var(--muted-foreground))' }}>{row.description}</td>
              <td style={{ padding: '7px 0', whiteSpace: 'nowrap', borderBottom: '1px solid hsl(var(--border) / 0.35)', color: 'hsl(var(--muted-foreground))' }}>{row.permission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
