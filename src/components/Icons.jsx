import React from 'react';

const Icon = ({ children, size = 24, className = '', ...props }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {children}
  </svg>
);

export const MoonIcon = (props) => <Icon {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /></Icon>;
export const SparklesIcon = (props) => <Icon {...props}><path d="m12 3-1.2 3.1L8 7.5l2.8 1.4L12 12l1.2-3.1L16 7.5l-2.8-1.4L12 3Z" /><path d="m5 14-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14Z" /><path d="m19 13-.7 1.8-1.8.7 1.8.7.7 1.8.7-1.8 1.8-.7-1.8-.7L19 13Z" /></Icon>;
export const LockIcon = (props) => <Icon {...props}><rect x="4" y="10" width="16" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>;
export const VolumeIcon = (props) => <Icon {...props}><path d="M11 5 6 9H2v6h4l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18 6a8.5 8.5 0 0 1 0 12" /></Icon>;
export const VolumeOffIcon = (props) => <Icon {...props}><path d="M11 5 6 9H2v6h4l5 4V5Z" /><path d="m22 9-6 6" /><path d="m16 9 6 6" /></Icon>;
export const CameraIcon = (props) => <Icon {...props}><path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3h5Z" /><circle cx="12" cy="13" r="4" /></Icon>;
export const ArrowIcon = (props) => <Icon {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Icon>;
export const CloseIcon = (props) => <Icon {...props}><path d="m6 6 12 12" /><path d="m18 6-12 12" /></Icon>;
export const CheckIcon = (props) => <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
export const ShieldIcon = (props) => <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></Icon>;
export const RefreshIcon = (props) => <Icon {...props}><path d="M20 12a8 8 0 1 1-2.3-5.7L20 8" /><path d="M20 3v5h-5" /></Icon>;
export const GlobeIcon = (props) => <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" /></Icon>;
