export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="12" fill="#181B19" />
      <rect x="14" y="14" width="36" height="36" rx="5" fill="none" stroke="#F5F3EE" strokeWidth="3.5" />
      <circle cx="32" cy="32" r="9" fill="#D96C36" />
    </svg>
  );
}

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3" data-testid="brand-wordmark">
      <LogoMark />
      <span className="leading-none">
        <span className={`block text-[15px] font-extrabold tracking-[0.14em] ${dark ? 'text-graphite' : 'text-white'}`}>
          SINDHU
        </span>
        <span className={`mt-1 block font-mono text-[9px] font-medium uppercase tracking-[0.3em] ${dark ? 'text-steel' : 'text-smoke'}`}>
          Cement Works
        </span>
      </span>
    </span>
  );
}

