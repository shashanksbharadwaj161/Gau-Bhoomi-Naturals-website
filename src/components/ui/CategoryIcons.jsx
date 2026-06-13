// Clean, consistent stroke-based category icons (24x24 viewBox, strokeWidth 1.6).

export const AllIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
)

export const GheeIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21h6a1 1 0 001-1V9H8v11a1 1 0 001 1z"/>
    <path d="M8 9V7.5A1.5 1.5 0 019.5 6h5A1.5 1.5 0 0116 7.5V9"/>
    <path d="M10.5 6V4.5A.5.5 0 0111 4h2a.5.5 0 01.5.5V6"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
  </svg>
)

export const OilsIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c0 0-5 5.5-5 10a5 5 0 0010 0C17 8.5 12 3 12 3z"/>
    <path d="M9.5 13.5c.5-1.5 2-2.5 2.5-2.5"/>
  </svg>
)

export const RiceIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22"/>
    <path d="M12 5l4.5-2.5"/>
    <path d="M12 9l4.5-2.5"/>
    <path d="M12 13l4.5-2.5"/>
    <path d="M12 5l-4.5-2.5"/>
    <path d="M12 9l-4.5-2.5"/>
    <path d="M12 13l-4.5-2.5"/>
  </svg>
)

export const MasalaIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c1 2 3 5 3 8s-1.5 4-3 4-3-1-3-4 2-6 3-8z"/>
    <line x1="12" y1="14" x2="12" y2="17"/>
    <ellipse cx="12" cy="19.5" rx="6" ry="2.5"/>
  </svg>
)

export const HoneyIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9z"/>
    <line x1="12" y1="2" x2="12" y2="20"/>
    <line x1="4" y1="6.5" x2="20" y2="6.5"/>
    <line x1="4" y1="15.5" x2="20" y2="15.5"/>
  </svg>
)

export const DryFruitsIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21c-3.5 0-6-3-6-7s2-7 6-7 6 3 6 7-2.5 7-6 7z"/>
    <path d="M12 7c0-2 1-4 3-5"/>
    <path d="M9 11c-1.5 0-3-.5-3.5-2"/>
    <path d="M15 11c1.5 0 3-.5 3.5-2"/>
  </svg>
)

export const SeedsIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V11"/>
    <path d="M12 11C12 11 6.5 8 6 3c4.5 0 6 4 6 8z"/>
    <path d="M12 15C12 15 17.5 12 18 7c-4.5 0-6 4-6 8z"/>
  </svg>
)

export const OtherIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
    <path d="M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83"/>
    <path d="M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
)
