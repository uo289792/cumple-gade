export function Dragon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 140"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M78 85Q12 27 30 99L67 110M111 84Q169 23 157 94L128 113"
        fill="#a96b43"
        stroke="#dfb875"
        strokeWidth="2"
      />
      <path d="m36 92 10-32 18 39m67-6 14-33 2 38" stroke="#e8ba7a" />
      <path
        d="M125 103q43 31 40 4-10 13-23-2M55 101q-13 30 23 26h43q22-4 9-28"
        fill="#557467"
        stroke="#d3ba7b"
        strokeWidth="2"
      />
      <path d="M58 52 51 20l24 16m37 3 20-22-1 37" fill="#d9ad6d" />
      <path
        d="M52 60q-1-33 39-32 42 0 43 34l-5 28q-8 27-39 25-34 0-38-28Z"
        fill="#668976"
        stroke="#d8bc7e"
        strokeWidth="2"
      />
      <ellipse cx="70" cy="66" rx="10" ry="13" fill="#efd9a2" />
      <ellipse cx="113" cy="66" rx="10" ry="13" fill="#efd9a2" />
      <ellipse cx="73" cy="66" rx="4" ry="9" fill="#1a302b" />
      <ellipse cx="110" cy="66" rx="4" ry="9" fill="#1a302b" />
      <path
        d="M80 88q11 12 23 0m-21-40 9-9 10 9"
        stroke="#314d3d"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="62" cy="86" r="6" fill="#be8060" />
      <circle cx="122" cy="86" r="6" fill="#be8060" />
      <path d="m86 109 7-7 9 7-8 10Z" fill="#e2c68a" />
    </svg>
  );
}
export function Landscape({ variant = 0 }: { variant?: number }) {
  return (
    <svg viewBox="0 0 400 300" className="landscape" aria-hidden="true">
      <defs>
        <linearGradient id={`sky${variant}`} x2="0" y2="1">
          <stop stopColor={variant % 2 ? "#6c7771" : "#a47c55"} />
          <stop offset="1" stopColor="#ead3a4" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky${variant})`} />
      <circle cx="280" cy="78" r="28" fill="#ecd4a0" />
      <path d="m0 180 100-110 100 130 100-90 100 70v120H0" fill="#718478" />
      <path d="m0 240 120-100 120 100 100-70 60 70v60H0" fill="#344c3c" />
      <path d="M145 300q95-85 44-111 104 44 44 111" fill="#c8b287" />
      {[20, 65, 345, 380].map((x, i) => (
        <g key={x} transform={`translate(${x} ${110 + (i % 2) * 30})`}>
          <path
            d="M0 0-40 120h25l-30 35H45l-30-35h25Z"
            fill={i % 2 ? "#a35f38" : "#203d32"}
          />
          <path d="M0 50v140" stroke="#35261e" strokeWidth="5" />
        </g>
      ))}
      <path d="m265 220 35-29 36 29v43h-71Z" fill="#624535" />
      <path d="m255 220 45-40 47 40Z" fill="#372e29" />
      <rect x="291" y="225" width="16" height="19" fill="#ebbc69" />
    </svg>
  );
}
