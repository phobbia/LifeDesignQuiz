import Logo from '../components/Logo';

interface Props { onBack: () => void; onPlay: () => void }

const levels = [
  { num: '01', name: 'Occhio allenato', color: 'var(--c-violet)' },
  { num: '02', name: 'Mente progettuale', color: 'var(--c-pink)' },
  { num: '03', name: 'Design Master', color: 'var(--c-orange)' },
  { num: '04', name: 'Super Hero Designer', color: 'var(--c-violet)', special: true },
];

const helps = [
  { key: '50:50', desc: 'Elimina due risposte errate', shortcut: 'F' },
  { key: 'Pubblico', desc: 'Chiedi una voce dal pubblico', shortcut: 'A' },
  { key: 'PUG!', desc: 'Indizio da uno degli organizzatori ', shortcut: 'P' },
];

export default function RulesScreen({ onBack, onPlay }: Props) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--c-ivory)',
      display: 'flex',
      flexDirection: 'column',
      padding: '3.5% 6%',
      paddingTop: '2%',
      paddingBottom: '2%',
      rowGap: '2%',
      columnGap: '3%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background arc */}
      <svg style={{ position: 'absolute', bottom: '-5%', right: '-3%', width: '35%', height: '50%', pointerEvents: 'none' }} viewBox="0 0 400 400" preserveAspectRatio="xMaxYMax meet">
        <path d="M 400 0 Q 100 200 200 400" fill="none" stroke="var(--c-violet)" strokeWidth="1" opacity="0.15" />
        <circle cx="350" cy="200" r="120" fill="none" stroke="var(--c-warm-gray)" strokeWidth="1" opacity="0.2" />
      </svg>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <div style={{ width: 85, flexShrink: 0 }}>
            <Logo color="var(--c-coal)" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 style={{ margin: 0, fontFamily: 'Aquawax Fx, sans-serif', fontSize: 64, lineHeight: '100px', fontWeight: 800, color: 'var(--c-coal)', paddingTop: 0, paddingBottom: 0 }}>
        Regolamento
      </h2>

      {/* Main rule */}
      <p style={{
        margin: 0,
        fontFamily: 'Aquawax Fx, sans-serif',
        fontSize: 'var(--fs-question)',
        fontWeight: 700,
        color: 'var(--c-coal)',
        maxWidth: '60vw',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
      }}>
        Una domanda. Quattro risposte.{' '}
        <span style={{ color: 'var(--c-violet)' }}>Una sola lascia il segno.</span>
      </p>

      {/* Content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0%', columnGap: '0px', paddingTop: 32, flex: '0 0 auto', height: 'fit-content' }}>
        {/* Levels */}
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 24, columnGap: 17, alignItems: 'flex-start', justifyContent: 'flex-start', width: 'fit-content' }}>
          <p style={{ margin: 0, fontSize: 19, fontWeight: 600, color: 'var(--c-coal)', letterSpacing: '0.1px', textTransform: 'uppercase', fontFamily: 'Automat Grotesk, sans-serif' }}>
            La scalata
          </p>
          {levels.map(l => (
            <div key={l.num} style={{
              display: 'flex', alignItems: 'center', gap: 'clamp(10px,1.5vw,20px)',
              paddingRight: 24, paddingLeft: 24,
              ...(l.num === '03' ? { fontFamily: '"Automat Grotesk"' } : {}),
              ...(l.special ? {
                paddingTop: 12, paddingBottom: 12,
                backgroundColor: 'rgb(191, 58, 58)',
                borderRadius: 100,
              } : {}),
            }}>
              <div style={{
                fontFamily: 'Aquawax Fx, sans-serif',
                fontWeight: 800,
                fontSize: 'var(--fs-title)',
                color: l.special ? 'var(--c-ivory)' : l.color,
                lineHeight: 1,
                minWidth: '3vw',
              }}>
                {l.num}
              </div>
              <div>
                <p style={{
                  margin: 0,
                  fontFamily: 'Automat Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: 'var(--fs-answer)',
                  color: l.special ? 'var(--c-ivory)' : 'var(--c-coal)',
                  lineHeight: 1,
                }}>
                  {l.name}
                </p>
                {l.special && (
                  <p style={{ margin: '0.2em 0 0', fontSize: 'var(--fs-tiny)', color: 'var(--c-ivory)', fontWeight: 600 }}>
                    Domanda suprema — vinci il premio
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Helps + Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 24, columnGap: 20, alignItems: 'flex-start', justifyContent: 'flex-start', width: 'fit-content' }}>
          <p style={{ margin: 0, fontSize: 19, fontWeight: 600, color: 'var(--c-coal)', letterSpacing: '0.1px', textTransform: 'uppercase' }}>
            I tre aiuti
          </p>
          {helps.map(h => (
            <div key={h.key} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.2vw,16px)' }}>
              <div style={{
                width: 'clamp(36px,4vw,52px)',
                height: 'clamp(36px,4vw,52px)',
                borderRadius: '50%',
                border: '2px solid var(--c-coal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontFamily: 'Automat Grotesk, sans-serif',
                fontWeight: 800,
                fontSize: h.key === '50:50' ? 14 : 26,
                lineHeight: h.shortcut === 'P' ? '39px' : undefined,
                color: 'var(--c-coal)',
              }}>
                {h.key === '50:50' ? '50:50' : h.shortcut}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 22, color: 'var(--c-coal)', paddingTop: 0, paddingBottom: 0 }}>{h.key}</p>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 500, color: 'var(--c-coal)', }}>{h.desc}</p>
              </div>
            </div>
          ))}

          {/* Notes */}
          <div style={{ marginTop: '1em', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
            {[
              'Risposta sbagliata → la scalata si interrompe',
              'Tre corrette consecutive → Super Hero Designer',
              'Ogni aiuto può essere usato una sola volta',
            ].map(note => (
              <div key={note} style={{ display: 'flex', gap: '0.6em', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--c-violet)', fontWeight: 700, flexShrink: 0, borderStyle: 'solid', borderWidth: '0px', height: 'fit-content' }}>—</span>
                <p style={{ margin: 0, fontSize: 'var(--fs-label)', fontWeight: 600, color: 'var(--c-coal)', width: '100%' }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em' }}>
        <button
          className="btn-secondary"
          style={{ paddingTop: 'clamp(12px,1.3vw,18px)', paddingBottom: 'clamp(12px,1.3vw,18px)', paddingRight: 'clamp(36px, 4vw, 64px)', paddingLeft: 'clamp(36px, 4vw, 64px)', fontSize: 'var(--fs-answer)', letterSpacing: '0.1px', fontWeight: 700, borderRadius: 0 }}
          onClick={onBack}
        >
          ← IMPOSTAZIONI
        </button>
        <button
          className="btn-primary"
          style={{ paddingTop: 'clamp(12px,1.3vw,18px)', paddingBottom: 'clamp(12px,1.3vw,18px)', paddingRight: 'clamp(36px, 4vw, 64px)', paddingLeft: 'clamp(36px, 4vw, 64px)', fontSize: 'var(--fs-answer)', letterSpacing: '0.1px', fontWeight: 700, borderRadius: 0, alignItems: undefined }}
          onClick={onPlay}
        >
          GIOCHIAMO
        </button>
      </div>
    </div>
  );
}
