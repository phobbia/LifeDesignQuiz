interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  titolo?: string;
  testo?: string;
  conferma?: string;
}

export default function ResetConfirm({
  onConfirm,
  onCancel,
  titolo = 'Resettare la partita?',
  testo = 'Tutti i progressi andranno persi.',
  conferma = 'Reimposta',
}: Props) {
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
        zIndex: 200,
      }}
    >
      <div style={{
        background: 'var(--c-ivory)',
        borderRadius: 'var(--radius-card)',
        border: '2px solid var(--c-orange)',
        padding: '3.5% 5%',
        textAlign: 'center',
        maxWidth: '40cqw',
      }}>
        <p style={{ margin: '0 0 0.5em', fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-answer)', fontWeight: 700, color: 'var(--c-coal)' }}>
          {titolo}
        </p>
        <p style={{ margin: '0 0 1.8em', fontSize: 'var(--fs-label)', color: 'var(--c-coal)' }}>
          {testo}
        </p>
        <div style={{ display: 'flex', gap: '1em', justifyContent: 'center' }}>
          <button
            className="btn-secondary"
            style={{ padding: '0.7em 2em', fontSize: 'var(--fs-label)' }}
            onClick={onCancel}
          >
            Annulla
          </button>
          <button
            className="btn-primary"
            style={{ padding: '0.7em 2em', fontSize: 'var(--fs-label)', background: 'var(--c-orange)', borderColor: 'var(--c-orange)' }}
            onClick={onConfirm}
          >
            {conferma}
          </button>
        </div>
      </div>
    </div>
  );
}
