import type { HelpType } from '../types';

interface Props {
  helpsUsed: { fifty: boolean; audience: boolean; pug: boolean };
  allowed: boolean;
  dark?: boolean;
  onUse: (h: HelpType) => void;
}

const helps: { key: HelpType; label: string; sub: string; shortcut: string }[] = [
  { key: 'fifty', label: '50:50', sub: '', shortcut: 'F' },
  { key: 'audience', label: '♟', sub: 'Pubblico', shortcut: 'A' },
  { key: 'pug', label: 'P', sub: 'PUG!', shortcut: 'P' },
];

export default function HelpButtons({ helpsUsed, allowed, dark = false, onUse }: Props) {
  return (
    <div style={{ display: 'flex', gap: 'clamp(6px,0.8vw,12px)', alignItems: 'center' }}>
      {helps.map(h => {
        const used = helpsUsed[h.key];
        return (
          <button
            key={h.key}
            className={`help-btn${used ? ' used' : ''}`}
            disabled={used || !allowed}
            onClick={() => !used && allowed && onUse(h.key)}
            title={`[${h.shortcut}] ${h.key === 'fifty' ? '50:50' : h.key === 'audience' ? 'Voce dal pubblico' : 'Chiedi al PUG!'}`}
            style={{
              width: 'clamp(44px,5vw,64px)',
              height: 'clamp(44px,5vw,64px)',
              fontSize: h.key === 'fifty' ? 'clamp(0.55rem,0.9vw,0.9rem)' : 'clamp(0.75rem,1.2vw,1.2rem)',
            }}
          >
            <span style={{ lineHeight: 1, fontWeight: 800 }}>{h.label}</span>
            <span style={{ fontSize: '0.65em', fontWeight: 400 }}>{h.shortcut}</span>
          </button>
        );
      })}
    </div>
  );
}
