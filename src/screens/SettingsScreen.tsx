import { useEffect, useRef, useState } from 'react';
import Traces from '../components/Traces';
import type { Settings } from '../types';
import Logo from '../components/Logo';

interface Props {
  settings: Settings;
  onChange: (s: Partial<Settings>) => void;
  onBack: () => void;
  onStart: () => void;
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <div className={`toggle-track${on ? ' on' : ''}`} onClick={onClick} role="switch" aria-checked={on}>
      <div className="toggle-thumb" />
    </div>
  );
}

export default function SettingsScreen({ settings, onChange, onBack, onStart }: Props) {
  const [participantInput, setParticipantInput] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState('');
  const extractTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (extractTimer.current) clearInterval(extractTimer.current);
  }, []);

  const addParticipant = () => {
    const names = participantInput.split('\n').map(n => n.trim()).filter(Boolean);
    if (names.length) {
      onChange({ participants: [...new Set([...settings.participants, ...names])] });
      setParticipantInput('');
    }
  };

  const removeParticipant = (name: string) => {
    onChange({ participants: settings.participants.filter(p => p !== name) });
  };

  const extract = () => {
    if (settings.participants.length === 0) return;
    setExtracting(true);
    setExtracted('');
    let count = 0;
    const interval = setInterval(() => {
      setExtracted(settings.participants[Math.floor(Math.random() * settings.participants.length)]);
      count++;
      if (count > 16) {
        clearInterval(interval);
        extractTimer.current = null;
        const final = settings.participants[Math.floor(Math.random() * settings.participants.length)];
        setExtracted(final);
        onChange({ playerName: final });
        setExtracting(false);
      }
    }, 180);
    extractTimer.current = interval;
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--c-ivory)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(16px, 1.9cqw, 36px) clamp(24px, 3.2cqw, 62px)',
      gap: 'clamp(10px, 1.3cqw, 26px)',
      position: 'relative',
    }}>
      {/* Decorative curve */}
      <Traces variant="calm" nodes={false} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3em' }}>
          <div style={{ width: 'clamp(56px, 4.4cqw, 85px)', flexShrink: 0 }}><Logo color="var(--c-coal)" /></div>
          <h1 style={{ margin: 0, paddingTop: 'clamp(12px, 1.6cqw, 32px)', fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--c-coal)', lineHeight: 1 }}>
            Impostazioni
          </h1>
        </div>
        <button className="btn-secondary" style={{ padding: '0.5em 1.5em', fontSize: 'var(--fs-label)' }} onClick={onBack}>
          ← Indietro
        </button>
      </div>

      {/* Settings grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 'clamp(20px, 4cqw, 76px)', flex: 1, minHeight: 0 }}>
        {/* Left col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.2cqw,22px)', minHeight: 0, overflowY: 'auto' }}>
          {/* Player name */}
          <Field label="Nome partecipante / team">
            <input
              className="quiz-input"
              placeholder="Es. Team Alfa"
              value={settings.playerName}
              onChange={e => onChange({ playerName: e.target.value })}
              style={{ fontSize: 'var(--fs-label)', borderRadius: 8 }}
            />
          </Field>

          {/* Timer */}
          <Field label="Timer">
            <div style={{ display: 'flex', gap: '0.6em', flexWrap: 'wrap' }}>
              {([0, 20, 30, 45] as const).map(t => (
                <button
                  key={t}
                  onClick={() => onChange({ timerSeconds: t })}
                  style={{
                    borderRadius: 'var(--radius-btn)',
                    border: `2px solid ${settings.timerSeconds === t ? 'var(--c-violet)' : 'var(--c-warm-gray)'}`,
                    background: settings.timerSeconds === t ? 'var(--c-violet)' : 'transparent',
                    color: settings.timerSeconds === t ? 'white' : 'var(--c-coal)',
                    padding: '0.4em 1em',
                    fontSize: 'var(--fs-label)',
                    cursor: 'pointer',
                    fontFamily: 'var(--ff-body)',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t === 0 ? 'Nessuno' : `${t}s`}
                </button>
              ))}
            </div>
          </Field>

          {/* Toggles */}
          {[
            { key: 'randomOrder' as const, label: 'Ordine casuale domande' },
            { key: 'helpChallenge' as const, label: 'Sfida da superare per sbloccare gli aiuti' },
            { key: 'allowHelpInFinal' as const, label: 'Aiuti disponibili in finale' },
          ].map(({ key, label }) => (
            <Field key={key} label={label} row>
              <Toggle on={settings[key] as boolean} onClick={() => onChange({ [key]: !settings[key] })} />
            </Field>
          ))}

        </div>

        {/* Right col: participants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2cqw,16px)' }}>
          <p style={{ margin: 0, fontSize: 'var(--fs-label)', fontWeight: 600, color: 'var(--c-coal)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Lista partecipanti (opzionale)
          </p>
          <textarea
            className="quiz-input"
            style={{ fontSize: 'var(--fs-label)', borderRadius: 8, resize: 'none', height: 'clamp(80px,10cqw,130px)', lineHeight: 1.6 }}
            placeholder="Un nome per riga&#10;Es.&#10;Marco&#10;Giulia&#10;Team Rosso"
            value={participantInput}
            onChange={e => setParticipantInput(e.target.value)}
          />
          <button
            className="btn-secondary"
            style={{ padding: '0.5em 1.5em', fontSize: 'var(--fs-label)', alignSelf: 'flex-start' }}
            onClick={addParticipant}
          >
            + Aggiungi
          </button>

          {settings.participants.length > 0 && (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em', maxHeight: 'clamp(60px,8cqw,110px)', overflow: 'auto' }}>
                {settings.participants.map(name => (
                  <span
                    key={name}
                    style={{
                      background: 'var(--c-white)',
                      border: '1.5px solid var(--c-warm-gray)',
                      borderRadius: 'var(--radius-btn)',
                      padding: '0.3em 0.8em',
                      fontSize: 'var(--fs-tiny)',
                      color: 'var(--c-coal)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5em',
                    }}
                  >
                    {name}
                    <button
                      onClick={() => removeParticipant(name)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-orange)', fontWeight: 700, lineHeight: 1, padding: 0 }}
                    >×</button>
                  </span>
                ))}
              </div>

              {/* Extraction */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6em', alignItems: 'flex-start' }}>
                <button
                  className="btn-primary"
                  style={{ padding: '0.6em 1.8em', fontSize: 'var(--fs-label)' }}
                  onClick={extract}
                  disabled={extracting}
                >
                  Estrai concorrente
                </button>
                {extracted && (
                  <div style={{
                    padding: '0.6em 1.2em',
                    borderRadius: 'var(--radius-card)',
                    border: '2px solid var(--c-violet)',
                    background: 'color-mix(in srgb, var(--c-violet) 10%, white)',
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 800,
                    fontSize: 'var(--fs-answer)',
                    color: 'var(--c-coal)',
                    animation: 'scale-in 0.3s ease',
                  }}>
                    {extracted}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>


      {/* Bottom CTA */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0%' }}>
        <button
          className="btn-primary"
          style={{ padding: 'clamp(10px,1.2cqw,16px) clamp(28px,3cqw,48px)', fontSize: 'var(--fs-answer)', fontWeight: 700 }}
          onClick={onStart}
        >
          AVANTI →
        </button>
      </div>
    </div>
  );
}

function Field({ label, children, row = false, style }: { label: string; children: React.ReactNode; row?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', flexDirection: row ? 'row' : 'column', gap: '0.5em', alignItems: row ? 'center' : 'flex-start', justifyContent: row ? 'space-between' : 'flex-start', ...style }}>
      <label style={{ fontFamily: 'var(--ff-body)', fontSize: 'var(--fs-label)', fontWeight: 600, color: 'var(--c-coal)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {label}
      </label>
      {children}
    </div>
  );
}
