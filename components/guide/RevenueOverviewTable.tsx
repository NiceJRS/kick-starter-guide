'use client'

const rowsEn = [
  {
    source: 'KICK Subscriptions (Sub)',
    share: '95 / 5',
    shareNote: '(95% to Streamer)',
    payment: 'Credit/Debit Card, Google Pay, Apple Pay, TrueMoney Mastercard (via Web Browser)',
    payout: 'Direct payout to Thai bank via Stripe Connect Thailand',
    highlight: true,
  },
  {
    source: 'Gifted Subs',
    share: '95 / 5',
    shareNote: '(95% to Streamer)',
    payment: 'Credit/Debit Card, TrueMoney Mastercard',
    payout: 'Direct payout to Thai bank via Stripe Connect Thailand',
    highlight: false,
  },
  {
    source: 'Direct Tips / Donations (PromptPay)',
    share: '100%',
    shareNote: '(0% Platform Fee)',
    payment: 'PromptPay QR Code (via TipMe / BotRix)',
    payout: 'Real-time transfer directly to Thai bank account',
    highlight: true,
  },
]

const rowsTh = [
  {
    source: 'KICK Subscriptions (Sub)',
    share: '95 / 5',
    shareNote: '(สตรีมเมอร์ได้ 95%)',
    payment: 'บัตรเครดิต/เดบิต, Google Pay, Apple Pay, TrueMoney Mastercard (ผ่าน Web Browser)',
    payout: 'โอนตรงเข้าธนาคารไทยผ่าน Stripe Connect Thailand',
    highlight: true,
  },
  {
    source: 'Gifted Subs (แจกซับ)',
    share: '95 / 5',
    shareNote: '(สตรีมเมอร์ได้ 95%)',
    payment: 'บัตรเครดิต/เดบิต, TrueMoney Mastercard',
    payout: 'โอนตรงเข้าธนาคารไทยผ่าน Stripe Connect Thailand',
    highlight: false,
  },
  {
    source: 'โดเนท PromptPay (Direct Tips)',
    share: '100%',
    shareNote: '(ไม่โดน KICK หัก)',
    payment: 'สแกน QR Code พร้อมเพย์ (ผ่าน TipMe / BotRix)',
    payout: 'เงินเข้าบัญชีธนาคารไทยทันทีแบบ Real-time',
    highlight: true,
  },
]

const headersEn = ['Revenue Source', 'Share', 'Viewer Payment Methods', 'Thai Bank Payout']
const headersTh = ['ช่องทางรายได้', 'ส่วนแบ่ง', 'ระบบชำระเงินคนดู', 'ช่องทางโอนเข้าธนาคารไทย']

export default function RevenueOverviewTable({ lang = 'en' }: { lang?: 'en' | 'th' }) {
  const rows = lang === 'th' ? rowsTh : rowsEn
  const headers = lang === 'th' ? headersTh : headersEn

  return (
    <div className="overflow-x-auto my-6 rounded-lg" style={{ border: '1px solid var(--border-default)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
        <thead>
          <tr style={{ background: 'var(--surface-card)' }}>
            {headers.map((h) => (
              <th key={h} style={{
                padding: '9px 12px',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: '11px',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)',
                borderBottom: '1px solid var(--border-default)',
              }}>{h}</th>
            ))}
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
              <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                {row.source}
              </td>
              <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{
                    fontWeight: 700,
                    fontSize: '14px',
                    color: row.highlight ? '#5a9e2a' : 'var(--text-primary)',
                  }}>{row.share}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{row.shareNote}</span>
                </div>
              </td>
              <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{row.payment}</td>
              <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{row.payout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
