// Uniform line-art category icons (stroke-based, same visual weight).

export const AllIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="5" width="9" height="9" rx="2" />
    <rect x="18" y="5" width="9" height="9" rx="2" />
    <rect x="5" y="18" width="9" height="9" rx="2" />
    <rect x="18" y="18" width="9" height="9" rx="2" />
  </svg>
)

export const GheeIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="12" width="16" height="14" rx="3" />
    <rect x="11" y="8" width="10" height="5" rx="2" />
    <line x1="8" y1="18" x2="24" y2="18" />
  </svg>
)

export const OilsIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8 C12 8 8 14 8 18 a4 4 0 0 0 8 0 C16 14 12 8 12 8z" />
    <path d="M22 12 C22 12 19 16 19 18.5 a3 3 0 0 0 6 0 C25 16 22 12 22 12z" />
  </svg>
)

export const RiceIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16" y1="4" x2="16" y2="28" />
    <line x1="16" y1="8" x2="22" y2="5" />
    <line x1="16" y1="12" x2="22" y2="9" />
    <line x1="16" y1="16" x2="22" y2="13" />
    <line x1="16" y1="8" x2="10" y2="5" />
    <line x1="16" y1="12" x2="10" y2="9" />
    <line x1="16" y1="16" x2="10" y2="13" />
  </svg>
)

export const MasalaIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="16" cy="22" rx="10" ry="5" />
    <path d="M8 22 L10 14 Q16 10 22 14 L24 22" />
    <line x1="13" y1="22" x2="13" y2="14" />
    <line x1="16" y1="22" x2="16" y2="12" />
    <line x1="19" y1="22" x2="19" y2="14" />
  </svg>
)

export const HoneyIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="16,4 22,8 22,16 16,20 10,16 10,8" />
    <polygon points="16,12 19,14 19,18 16,20 13,18 13,14" />
    <line x1="16" y1="20" x2="16" y2="28" />
  </svg>
)

export const DryFruitsIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="16" cy="18" rx="8" ry="10" />
    <path d="M16 8 Q20 4 22 6" />
    <line x1="16" y1="12" x2="16" y2="24" />
    <line x1="10" y1="16" x2="22" y2="20" />
  </svg>
)

export const SeedsIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 26 L16 14" />
    <path d="M16 14 C16 14 10 10 8 6 C12 6 16 10 16 14" />
    <path d="M16 18 C16 18 22 14 24 10 C20 10 16 14 16 18" />
  </svg>
)

export const OtherIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4 L16 8" />
    <path d="M24 8 L21 11" />
    <path d="M28 16 L24 16" />
    <path d="M24 24 L21 21" />
    <path d="M16 28 L16 24" />
    <path d="M8 24 L11 21" />
    <path d="M4 16 L8 16" />
    <path d="M8 8 L11 11" />
    <circle cx="16" cy="16" r="4" />
  </svg>
)
