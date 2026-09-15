/**
 * ─── Reference visive generate da codice ───
 *
 * Nessun file immagine: ogni campione è composto a runtime con i caratteri
 * del progetto (Aquawax Fx e Automat Grotesk). Vantaggi per un quiz dal vivo:
 * nessun problema di licenze, nessun asset da gestire, resa nitida a
 * qualsiasi risoluzione di proiezione e coerenza con l'identità del quiz.
 *
 * Ogni campione è registrato con una chiave; le domande in `questions.ts`
 * la citano tramite i campi `visual` (immagine nella domanda) e
 * `answerVisuals` (quattro opzioni visive al posto del testo).
 */

import type { CSSProperties, ReactElement } from 'react';

/** Parola con crenatura regolabile coppia per coppia. */
function KernedWord({ word, gaps, size = '1em' }: { word: string; gaps: number[]; size?: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--ff-display)',
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        color: 'inherit',
      }}
    >
      {word.split('').map((ch, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : `${gaps[i - 1] ?? 0}em` }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  color: 'inherit',
};

const PARAGRAFO =
  'La tipografia è la voce del progetto: decide il tono prima ancora che il testo venga letto.';

/** Blocco di testo con interlinea regolabile. */
function LeadingBlock({ lineHeight }: { lineHeight: number }) {
  return (
    <div style={{ ...fill, padding: '0 0.4em' }}>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--ff-body)',
          fontWeight: 400,
          fontSize: 'clamp(12px, 1.02cqw, 20px)',
          lineHeight,
          maxWidth: '24ch',
          textAlign: 'left',
          color: 'inherit',
        }}
      >
        {PARAGRAFO}
      </p>
    </div>
  );
}

/** Riga di testo composta con una famiglia e una spaziatura specifiche. */
function SpecimenLine({
  family,
  weight = 400,
  tracking = 0,
  text = 'Milano 1911 — wifi illimitato',
}: {
  family: string;
  weight?: number;
  tracking?: number;
  text?: string;
}) {
  return (
    <div style={fill}>
      <span
        style={{
          fontFamily: family,
          fontWeight: weight,
          fontSize: 'clamp(15px, 1.35cqw, 27px)',
          letterSpacing: `${tracking}em`,
          whiteSpace: 'nowrap',
          color: 'inherit',
        }}
      >
        {text}
      </span>
    </div>
  );
}

/** Mini impaginato occhiello / titolo / testo, con gerarchia regolabile. */
function HierarchyBlock({
  eyebrow,
  title,
  body,
}: {
  eyebrow: CSSProperties;
  title: CSSProperties;
  body: CSSProperties;
}) {
  return (
    <div style={{ ...fill, flexDirection: 'column', alignItems: 'flex-start', gap: '0.35em', padding: '0 0.3em' }}>
      <span style={{ fontFamily: 'var(--ff-body)', textTransform: 'uppercase', color: 'inherit', ...eyebrow }}>
        Life Design Festival
      </span>
      <span style={{ fontFamily: 'var(--ff-display)', lineHeight: 1.05, color: 'inherit', ...title }}>
        Lascia il segno
      </span>
      <span style={{ fontFamily: 'var(--ff-body)', lineHeight: 1.35, color: 'inherit', ...body }}>
        Tre giorni di incontri, workshop e progetti.
      </span>
    </div>
  );
}

export const VISUALS: Record<string, () => ReactElement> = {
  // ── Crenatura: la parola "TAVOLO" (coppie critiche T-A e A-V) ──
  'kern-ok': () => (
    <div style={fill}>
      <KernedWord word="TAVOLO" gaps={[-0.045, -0.035, 0, 0, 0]} size="clamp(26px, 3.1cqw, 60px)" />
    </div>
  ),
  'kern-aperto': () => (
    <div style={fill}>
      <KernedWord word="TAVOLO" gaps={[0.07, 0.06, 0, 0, 0]} size="clamp(26px, 3.1cqw, 60px)" />
    </div>
  ),
  'kern-stretto': () => (
    <div style={fill}>
      <KernedWord word="TAVOLO" gaps={[-0.15, -0.14, -0.02, 0, 0]} size="clamp(26px, 3.1cqw, 60px)" />
    </div>
  ),
  'kern-irregolare': () => (
    <div style={fill}>
      <KernedWord word="TAVOLO" gaps={[-0.13, 0.09, -0.07, 0.06, 0]} size="clamp(26px, 3.1cqw, 60px)" />
    </div>
  ),

  // ── Interlinea ──
  'lead-ok': () => <LeadingBlock lineHeight={1.45} />,
  'lead-stretta': () => <LeadingBlock lineHeight={0.92} />,
  'lead-larga': () => <LeadingBlock lineHeight={2.5} />,
  'lead-compressa': () => <LeadingBlock lineHeight={1.05} />,

  // ── Monospaziato contro proporzionale ──
  'mono-vero': () => <SpecimenLine family="var(--ff-mono)" />,
  'mono-falso-body': () => <SpecimenLine family="var(--ff-body)" />,
  'mono-falso-display': () => <SpecimenLine family="var(--ff-display)" />,
  'mono-falso-medium': () => <SpecimenLine family="var(--ff-body)" weight={500} />,

  // ── Tracking sulle maiuscole ──
  'caps-ok': () => (
    <SpecimenLine family="var(--ff-body)" weight={600} tracking={0.16} text="LASCIA IL SEGNO" />
  ),
  'caps-zero': () => (
    <SpecimenLine family="var(--ff-body)" weight={600} tracking={-0.04} text="LASCIA IL SEGNO" />
  ),
  'caps-eccessivo': () => (
    <SpecimenLine family="var(--ff-body)" weight={600} tracking={0.55} text="LASCIA IL SEGNO" />
  ),
  'caps-negativo': () => (
    <SpecimenLine family="var(--ff-body)" weight={600} tracking={-0.08} text="LASCIA IL SEGNO" />
  ),

  // ── Gerarchia tipografica ──
  'gerarchia-ok': () => (
    <HierarchyBlock
      eyebrow={{ fontSize: 'clamp(7px, 0.55cqw, 11px)', fontWeight: 600, letterSpacing: '0.18em', opacity: 0.7 }}
      title={{ fontSize: 'clamp(18px, 1.7cqw, 34px)', fontWeight: 800 }}
      body={{ fontSize: 'clamp(10px, 0.8cqw, 16px)', fontWeight: 400 }}
    />
  ),
  'gerarchia-piatta': () => (
    <HierarchyBlock
      eyebrow={{ fontSize: 'clamp(11px, 0.92cqw, 18px)', fontWeight: 400, letterSpacing: 0 }}
      title={{ fontSize: 'clamp(11px, 0.92cqw, 18px)', fontWeight: 400 }}
      body={{ fontSize: 'clamp(11px, 0.92cqw, 18px)', fontWeight: 400 }}
    />
  ),
  'gerarchia-invertita': () => (
    <HierarchyBlock
      eyebrow={{ fontSize: 'clamp(16px, 1.45cqw, 29px)', fontWeight: 800, letterSpacing: 0 }}
      title={{ fontSize: 'clamp(10px, 0.8cqw, 16px)', fontWeight: 400 }}
      body={{ fontSize: 'clamp(14px, 1.25cqw, 25px)', fontWeight: 700 }}
    />
  ),
  'gerarchia-rumorosa': () => (
    <HierarchyBlock
      eyebrow={{ fontSize: 'clamp(13px, 1.15cqw, 23px)', fontWeight: 800, letterSpacing: '0.3em' }}
      title={{ fontSize: 'clamp(15px, 1.35cqw, 27px)', fontWeight: 800 }}
      body={{ fontSize: 'clamp(13px, 1.15cqw, 23px)', fontWeight: 700 }}
    />
  ),

  // ── Campione a corredo della domanda (non delle risposte) ──
  'giustificato-difettoso': () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(10px, 1.1cqw, 22px) clamp(14px, 1.5cqw, 30px)',
        border: '2px solid var(--c-warm-gray)',
        borderRadius: 'var(--radius-card)',
        background: 'var(--c-white)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--ff-body)',
          fontWeight: 400,
          fontSize: 'clamp(12px, 1.05cqw, 21px)',
          lineHeight: 1.5,
          textAlign: 'justify',
          width: '17ch',
          wordSpacing: '0.9em',
          color: 'var(--c-coal)',
        }}
      >
        La composizione giustificata su una colonna troppo stretta apre voragini tra le parole.
      </p>
    </div>
  ),
};

/** Restituisce il campione richiesto, o null se la chiave non esiste. */
export function renderVisual(key: string | undefined | null) {
  if (!key) return null;
  const V = VISUALS[key];
  if (!V) {
    if (import.meta.env.DEV) console.warn(`[visuals] chiave sconosciuta: "${key}"`);
    return null;
  }
  return <V />;
}
