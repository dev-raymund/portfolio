/*
  Drawn illustration of the PPD back office with made-up data.
  The real app is internal, so no screenshots or real data are used.
*/
const ROWS = [
  ['R-1042', 'Cardiology', 'North', '4', 'Reviewed'],
  ['R-1043', 'Oncology', 'South', '5', 'Reviewed'],
  ['R-1044', 'Cardiology', 'East', '3', 'Needs check'],
  ['R-1045', 'Neurology', 'West', '4', 'Reviewed'],
  ['R-1046', 'Oncology', 'North', '2', 'Needs check'],
  ['R-1047', 'Cardiology', 'South', '5', 'Reviewed'],
  ['R-1048', 'Neurology', 'East', '4', 'Reviewed'],
]
const COLS = [300, 470, 680, 860, 1010]
const EDIT_ROW = 2

export default function BackOfficeIllustration({ className = '', label = true }) {
  return (
    <svg className={`bo-illustration ${className}`.trim()} viewBox="0 0 1440 900" role="img" aria-label="Illustration of a back-office table with editable cells, filters and a Generate report button, using made-up data">
      <rect width="1440" height="900" rx="0" fill="#EEF0F3" />
      {/* top bar */}
      <rect width="1440" height="72" fill="#1E2430" />
      <rect x="32" y="22" width="28" height="28" rx="7" fill="#5B8DEF" />
      <text x="76" y="44" fill="#fff" fontSize="20" fontWeight="600">Survey data</text>
      <circle cx="1392" cy="36" r="16" fill="#3A4252" />
      {/* sidebar */}
      <rect y="72" width="232" height="828" fill="#F8F9FB" />
      {['Responses', 'Reports', 'Insights', 'Settings'].map((item, i) => (
        <g key={item}>
          {i === 0 && <rect x="16" y={104 + i * 52} width="200" height="40" rx="8" fill="#E3EAFB" />}
          <text x="40" y={130 + i * 52} fill={i === 0 ? '#2F5FD0' : '#5A6170'} fontSize="17" fontWeight={i === 0 ? 600 : 400}>{item}</text>
        </g>
      ))}
      {/* heading and filters */}
      <text x="276" y="132" fill="#1E2430" fontSize="30" fontWeight="600">Survey responses</text>
      {[['Specialty: Cardiology', 276, 214], ['Region: All', 506, 140], ['Last 30 days', 662, 146]].map(([t, x, w]) => (
        <g key={t}>
          <rect x={x} y="160" width={w} height="40" rx="20" fill="#fff" stroke="#C9CED8" />
          <text x={x + 18} y="186" fill="#343A46" fontSize="15">{t}  ▾</text>
        </g>
      ))}
      <rect x="1196" y="158" width="210" height="44" rx="22" fill="#1E2430" />
      <text x="1301" y="186" fill="#fff" fontSize="16" fontWeight="600" textAnchor="middle">Generate report</text>
      {/* table */}
      <rect x="276" y="228" width="1130" height="560" rx="14" fill="#fff" stroke="#DADEE5" />
      <rect x="276" y="228" width="1130" height="52" rx="14" fill="#F4F6F9" />
      <rect x="276" y="262" width="1130" height="18" fill="#F4F6F9" />
      {['ID', 'Specialty', 'Region', 'Score', 'Status'].map((h, i) => (
        <text key={h} x={COLS[i]} y="260" fill="#5A6170" fontSize="15" fontWeight="600">{h}</text>
      ))}
      {ROWS.map((row, r) => {
        const y = 280 + r * 64
        return (
          <g key={row[0]}>
            <line x1="276" x2="1406" y1={y + 64} y2={y + 64} stroke="#EEF0F3" />
            {row.map((cell, c) => {
              if (r === EDIT_ROW && c === 3) {
                return (
                  <g key={c}>
                    <rect x={COLS[c] - 14} y={y + 12} width="110" height="40" rx="8" fill="#fff" stroke="#2F5FD0" strokeWidth="2.5" />
                    <text x={COLS[c]} y={y + 39} fill="#1E2430" fontSize="17">4</text>
                    <rect x={COLS[c] + 13} y={y + 22} width="2" height="21" fill="#2F5FD0" />
                  </g>
                )
              }
              if (c === 4) {
                const ok = cell === 'Reviewed'
                return (
                  <g key={c}>
                    <rect x={COLS[c] - 10} y={y + 18} width={ok ? 104 : 124} height="28" rx="14" fill={ok ? '#E3F4EA' : '#FFF1DB'} />
                    <text x={COLS[c] + 4} y={y + 37} fill={ok ? '#1E7A45' : '#9A5B00'} fontSize="14" fontWeight="600">{cell}</text>
                  </g>
                )
              }
              return <text key={c} x={COLS[c]} y={y + 39} fill={c === 0 ? '#5A6170' : '#1E2430'} fontSize="16">{cell}</text>
            })}
          </g>
        )
      })}
      <text x="300" y="768" fill="#5A6170" fontSize="15">Showing 1–7 of 2,431 responses</text>
      {/* made-up data label */}
      {label && (
        <g>
          <rect x="1166" y="826" width="240" height="40" rx="20" fill="#1E2430" opacity=".9" />
          <text x="1286" y="852" fill="#fff" fontSize="15" fontWeight="600" textAnchor="middle">Illustration · made-up data</text>
        </g>
      )}
    </svg>
  )
}
