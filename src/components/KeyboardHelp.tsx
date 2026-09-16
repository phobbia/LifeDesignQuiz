interface Props { onClose: () => void }

const shortcuts = [
  ['1 / 2 / 3 / 4', 'Seleziona risposta A / B / C / D'],
  ['Invio', 'Conferma risposta'],
  ['Esc', 'Annulla / Chiudi overlay'],
  ['Spazio', 'Avvia o pausa timer'],
  ['F', 'Aiuto 50:50'],
  ['A', 'Voce dal pubblico'],
  ['P', 'Chiedi al PUG!'],
  ['→', 'Avanza'],
  ['H', 'Mostra / nasconde scorciatoie'],
  ['R', 'Reset (con conferma)'],
  ['F', 'Schermo intero (fuori dalle domande)'],
];

export default function KeyboardHelp({ onClose }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(38,38,38,0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--c-ivory)',
          borderRadius: 'var(--radius-card)',
          border: '2px solid var(--c-coal)',
          padding: '3% 4%',
          minWidth: '36cqw',
          maxWidth: '52cqw',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5em' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-answer)', color: 'var(--c-coal)', fontWeight: 700 }}>
            Scorciatoie da tastiera
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em', color: 'var(--c-coal)', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6em' }}>
          {shortcuts.map(([key, desc]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
              <kbd style={{
                fontFamily: 'var(--ff-mono)',
                fontSize: 'var(--fs-tiny)',
                background: 'var(--c-coal)',
                color: 'var(--c-ivory)',
                borderRadius: '6px',
                padding: '0.25em 0.7em',
                minWidth: '4em',
                textAlign: 'center',
                flexShrink: 0,
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}>
                {key}
              </kbd>
              <span style={{ fontSize: 'var(--fs-label)', color: 'var(--c-coal)' }}>{desc}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1.5em', fontSize: 'var(--fs-tiny)', color: 'var(--c-coal)', textAlign: 'center' }}>
          Premi H o clicca fuori per chiudere
        </p>
      </div>
    </div>
  );
}
