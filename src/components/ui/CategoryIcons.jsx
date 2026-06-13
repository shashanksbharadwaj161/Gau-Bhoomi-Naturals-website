// Uniform line-art category icons (stroke-based, 24x24 viewBox, strokeWidth 1.5).

export const AllIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
)

export const GheeIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 21h8a1 1 0 001-1V10H7v10a1 1 0 001 1z"/>
    <path d="M7 10V8a1 1 0 011-1h8a1 1 0 011 1v2"/>
    <path d="M10 7V5a1 1 0 011-1h2a1 1 0 011 1v2"/>
    <line x1="7" y1="14" x2="17" y2="14"/>
  </svg>
)

export const OilsIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3c0 0-4 4-4 8a4 4 0 008 0c0-4-4-8-4-8z"/>
    <path d="M17 7c0 0-2.5 2.5-2.5 5a2.5 2.5 0 005 0c0-2.5-2.5-5-2.5-5z"/>
  </svg>
)

export const RiceIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18"/>
    <path d="M12 6l4-2"/>
    <path d="M12 10l4-2"/>
    <path d="M12 14l4-2"/>
    <path d="M12 6l-4-2"/>
    <path d="M12 10l-4-2"/>
    <path d="M12 14l-4-2"/>
  </svg>
)

export const MasalaIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0 2 3 2 6s-2 4-2 4-2-1-2-4 2-6 2-6z"/>
    <ellipse cx="12" cy="18" rx="7" ry="3"/>
    <path d="M5 18v1a1 1 0 001 1h12a1 1 0 001-1v-1"/>
    <line x1="12" y1="12" x2="12" y2="15"/>
  </svg>
)

export const HoneyIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L19 7v8l-7 4-7-4V7z"/>
    <path d="M12 3v6m0 0l7 4m-7-4l-7 4"/>
    <path d="M12 9v6"/>
  </svg>
)

export const DryFruitsIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="15" rx="6" ry="7"/>
    <path d="M12 8c0 0 3-3 4-6"/>
    <path d="M12 12c2-1 4-1 5 0"/>
    <path d="M12 12c-2-1-4-1-5 0"/>
  </svg>
)

export const SeedsIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12"/>
    <path d="M12 12C12 12 7 9 6 4c4 0 6 3 6 8z"/>
    <path d="M12 16C12 16 17 13 18 8c-4 0-6 3-6 8z"/>
  </svg>
)

export const OtherIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
    <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>
  </svg>
)
