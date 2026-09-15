import Logo from '../components/Logo';
import Traces from '../components/Traces';

interface Props { onBack: () => void; onPlay: () => void }

const levels = [
  { num: '01', name: 'Occhio allenato', color: 'var(--c-violet)' },
  { num: '02', name: 'Mente progettuale', color: 'var(--c-pink)' },
  { num: '03', name: 'Design Master', color: 'var(--c-orange)' },
  { num: '04', name: 'Super Hero Designer', color: 'var(--c-pink)', special: true },
];

const helps = [
  { key: '50:50', desc: 'Elimina due risposte errate', shortcut: 'F' },
  { key: 'Pubblico', desc: 'Chiedi una voce dal pubblico', shortcut: 'A' },
  { key: 'PUG!', desc: 'Indizio da uno degli organizzatori', shortcut: 'P' },
];

export default function RulesScreen({ onBack, onPlay }: Props) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--c-ivory)',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(16px, 2.2cqw, 42px) clamp(24px, 5cqw, 96px)',
      rowGap: 'clamp(8px, 1.2cqw, 24px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background arc */}
      <Traces variant="calm" />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 'clamp(56px, 4.4cqw, 85px)', flexShrink: 0 }}>
          <Logo color="var(--c-coal)" />
        </div>
      </div>

      {/* Title */}
      <h2 style={{ margin: 0, fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-title)', lineHeight: 1.05, fontWeight: 800, color: 'var(--c-coal)' }}>
        Regolamento
      </h2>

      {/* Main rule */}
      <p style={{
        margin: 0,
        fontFamily: 'var(--ff-display)',
        fontSize: 'var(--fs-question)',
        fontWeight: 700,
        color: 'var(--c-coal)',
        maxWidth: '72cqw',
        lineHeight: 1.2,
      }}>
        Una domanda. Quattro risposte.{' '}
        <span style={{ color: 'var(--c-violet)' }}>Una sola lascia il segno.</span>
      </p>

      {/* Content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 'clamp(16px, 2.5cqw, 48px)', paddingTop: 'clamp(12px, 1.7cqw, 32px)', flex: 1, minHeight: 0 }}>
        {/* Levels */}
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 'clamp(8px, 1.25cqw, 24px)', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <p style={{ margin: 0, fontSize: 'var(--fs-label)', fontWeight: 600, color: 'var(--c-coal)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--ff-body)' }}>
            La scalata
          </p>
          {levels.map(l => (
            <div key={l.num} style={{
              display: 'flex', alignItems: 'center', gap: 'clamp(10px,1.5cqw,20px)',
              paddingRight: 'clamp(10px, 1.25cqw, 24px)',
              paddingLeft: 'clamp(10px, 1.25cqw, 24px)',
              ...(l.special ? {
                paddingTop: 'clamp(6px, 0.63cqw, 12px)',
                paddingBottom: 'clamp(6px, 0.63cqw, 12px)',
                backgroundColor: 'var(--c-coal)',
                borderRadius: 100,
              } : {}),
            }}>
              <div style={{
                fontFamily: 'var(--ff-display)',
                fontWeight: 800,
                fontSize: 'var(--fs-title)',
                color: l.special ? 'var(--c-ivory)' : l.color,
                lineHeight: 1,
                minWidth: '3cqw',
              }}>
                {l.num}
              </div>
              <div>
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-answer)',
                  color: l.special ? 'var(--c-ivory)' : 'var(--c-coal)',
                  lineHeight: 1.05,
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
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 'clamp(8px, 1.25cqw, 24px)', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <p style={{ margin: 0, fontSize: 'var(--fs-label)', fontWeight: 600, color: 'var(--c-coal)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--ff-body)' }}>
            I tre aiuti
          </p>
          {helps.map(h => (
            <div key={h.key} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.2cqw,16px)' }}>
              <div style={{
                width: 'clamp(36px,4cqw,52px)',
                height: 'clamp(36px,4cqw,52px)',
                borderRadius: '50%',
                border: '2px solid var(--c-coal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontFamily: 'var(--ff-display)',
                fontWeight: 800,
                fontSize: h.key === '50:50' ? 'clamp(10px, 0.73cqw, 14px)' : 'clamp(16px, 1.35cqw, 26px)',
                lineHeight: 1,
                color: 'var(--c-coal)',
              }}>
                {h.key === '50:50' ? '50:50' : h.shortcut}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(13px, 1.15cqw, 22px)', color: 'var(--c-coal)' }}>{h.key}</p>
                <p style={{ margin: 0, fontSize: 'clamp(12px, 1.05cqw, 20px)', fontWeight: 400, color: 'var(--c-coal)' }}>{h.desc}</p>
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
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(10px, 1cqw, 20px)', paddingTop: 'clamp(8px, 1cqw, 20px)' }}>
        <button
          className="btn-secondary"
          style={{ paddingTop: 'clamp(12px,1.3cqw,18px)', paddingBottom: 'clamp(12px,1.3cqw,18px)', paddingRight: 'clamp(36px, 4cqw, 64px)', paddingLeft: 'clamp(36px, 4cqw, 64px)', fontSize: 'var(--fs-answer)', letterSpacing: '0.04em', fontWeight: 700, borderRadius: 0 }}
          onClick={onBack}
        >
          ← IMPOSTAZIONI
        </button>
        <button
          className="btn-primary"
          style={{ paddingTop: 'clamp(12px,1.3cqw,18px)', paddingBottom: 'clamp(12px,1.3cqw,18px)', paddingRight: 'clamp(36px, 4cqw, 64px)', paddingLeft: 'clamp(36px, 4cqw, 64px)', fontSize: 'var(--fs-answer)', letterSpacing: '0.04em', fontWeight: 700, borderRadius: 0 }}
          onClick={onPlay}
        >
          GIOCHIAMO
        </button>
      </div>
    </div>
  );
}
