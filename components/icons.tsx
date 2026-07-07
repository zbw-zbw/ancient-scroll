"use client";

import React from "react";

interface IconProps {
 className?: string;
 size?: number;
}

const IconBase: React.FC<IconProps & { children: React.ReactNode }> = ({
 className = "h-4 w-4",
 size,
 children,
}) => (
 <svg
 xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={className}
 style={size ? { width: size, height: size } : undefined}
 aria-hidden="true"
 >
 {children}
 </svg>
);

export const IconSearch = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <circle cx="11" cy="11" r="8" />
 <path d="m21 21-4.3-4.3" />
 </IconBase>
);

export const IconHeart = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
 </IconBase>
);

export const IconHeartOutline = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
 </IconBase>
);

export const IconBookOpen = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
 <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
 </IconBase>
);

export const IconChat = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
 </IconBase>
);

export const IconPaw = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <circle cx="9" cy="8" r="2" />
 <circle cx="15" cy="8" r="2" />
 <circle cx="6" cy="14" r="2" />
 <circle cx="18" cy="14" r="2" />
 <path d="M12 10c-3 0-5 3-5 5 0 2.5 2 4 5 4s5-1.5 5-4c0-2-2-5-5-5Z" />
 </IconBase>
);

export const IconBird = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" />
 <path d="M16 10h5l-3 3 1 3" />
 <path d="M8 14c-2 1-3 3-3 5h6" />
 </IconBase>
);

export const IconFish = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M6.5 12c4.5-7 13-7 13-7s-2 5-2 7 2 7 2 7-8.5 0-13-7Z" />
 <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
 <path d="M2 9s2 3 2 3-2 3-2 3" />
 </IconBase>
);

export const IconSnake = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M4 7c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" />
 <path d="M4 11c0 3.3 2.7 6 6 6s6-2.7 6-6" />
 <path d="M16 11c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4" />
 <circle cx="19" cy="11" r="1" fill="currentColor" stroke="none" />
 </IconBase>
);

export const IconClose = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M18 6 6 18" />
 <path d="m6 6 12 12" />
 </IconBase>
);

export const IconTrophy = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
 <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
 <path d="M4 22h16" />
 <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
 <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
 <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
 </IconBase>
);

export const IconSparkles = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="m12 3-1.9 5.8H4.2l5 3.6-1.9 5.8 4.7-3.4 4.7 3.4-1.9-5.8 5-3.6h-6L12 3Z" />
 </IconBase>
);

export const IconUser = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
 <circle cx="12" cy="7" r="4" />
 </IconBase>
);

export const IconScroll = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M8 21h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H8" />
 <path d="M4 21V5a2 2 0 0 1 2-2h10v10" />
 <path d="M16 3v7" />
 <path d="M10 7h2" />
 <path d="M10 11h6" />
 </IconBase>
);

export const IconArrowRight = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </IconBase>
);

export const IconArrowLeft = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </IconBase>
);

export const IconRefresh = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
  </IconBase>
);

export const IconBot = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M12 8V4H8" />
 <rect width="20" height="14" x="2" y="8" rx="2" />
 <path d="M2 12h20" />
 <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none" />
 <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none" />
 </IconBase>
);

export const IconDownload = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
 <polyline points="7 10 12 15 17 10" />
 <line x1="12" y1="15" x2="12" y2="3" />
 </IconBase>
);

export const IconCopy = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
 <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
 </IconBase>
);

export const IconShare = ({ className, size }: IconProps) => (
 <IconBase className={className} size={size}>
 <circle cx="18" cy="5" r="3" />
 <circle cx="6" cy="12" r="3" />
 <circle cx="18" cy="19" r="3" />
 <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
 <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
 </IconBase>
);

export const IconBook = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </IconBase>
);

export const IconMountain = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="m3 20 6-10 4 6 3-4 5 8H3z" />
  </IconBase>
);

export const IconFlower = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" />
    <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(72 12 12)" />
    <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(144 12 12)" />
    <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(216 12 12)" />
    <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(288 12 12)" />
    <circle cx="12" cy="12" r="1.5" />
  </IconBase>
);

export const IconPalette = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M12 2a10 10 0 0 0 0 20 4 4 0 0 0 0-8 2 2 0 0 1 0-4 10 10 0 0 0 0-8z" />
    <circle cx="8.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="17.5" cy="11" r="1" fill="currentColor" stroke="none" />
  </IconBase>
);

export const IconLantern = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <line x1="12" y1="2" x2="12" y2="5" />
    <rect x="6" y="5" width="12" height="12" rx="3" />
    <path d="M9 9h6" />
    <path d="M9 13h6" />
    <path d="M12 17v2" />
    <path d="M10 21h4" />
  </IconBase>
);

export const IconFire = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10z" />
    <path d="M12 14a2 2 0 0 0-2 2c0 1 1 2 2 2s2-1 2-2a2 2 0 0 0-2-2z" />
  </IconBase>
);

export const IconBooks = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="m16 6 4 14" />
    <path d="M12 6v14" />
    <path d="M8 8v12" />
    <path d="M4 4v16" />
  </IconBase>
);

export const IconGem = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M6 3h12l3 6-9 12L3 9l3-6z" />
    <path d="M3 9h18" />
    <path d="M9 3l3 6 3-6" />
  </IconBase>
);

export const IconCalendar = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </IconBase>
);

export const IconPencil = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </IconBase>
);

export const IconDragon = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M12 2C8 6 6 8 6 12c0 4 2 6 6 6s6-2 6-6c0-4-2-6-6-10z" />
    <path d="M9 12h.01" />
    <path d="M15 12h.01" />
    <path d="M8 5l-2-2" />
    <path d="M16 5l2-2" />
  </IconBase>
);

export const IconFox = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <path d="M12 2L6 8v8a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V8l-6-6z" />
    <path d="M9 12h.01" />
    <path d="M15 12h.01" />
    <path d="M11 15h2" />
  </IconBase>
);

export const IconLock = ({ className, size }: IconProps) => (
  <IconBase className={className} size={size}>
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </IconBase>
);
