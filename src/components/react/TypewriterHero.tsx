import { useState, useEffect } from 'react';

interface SocialLink {
  url: string;
  display: string;
}

interface Props {
  phrases: string[];
  social: { github: SocialLink; linkedin: SocialLink };
  heroGreeting: string[];
}

export default function TypewriterHero({ phrases, social, heroGreeting }: Props) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text === '') {
      setDeleting(false);
      setPhraseIdx((phraseIdx + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting
          ? current.substring(0, text.length - 1)
          : current.substring(0, text.length + 1));
      }, deleting ? 50 : 90);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIdx, phrases]);

  return (
    <section id="home" className="tm-hero">
      <div className="tm-comment">
        <span className="tm-c">{'// ~/about-me.md · last edited 4m ago'}</span>
      </div>
      <h1 className="tm-hero-title">
        <span className="tm-prompt">$</span> {text}<span className="tm-caret">▌</span>
      </h1>
      <pre className="tm-hero-code">{heroGreeting.join('\n')}</pre>
      <div className="tm-hero-cta">
        <a className="tm-btn" href="#experience">./view-experience</a>
        <div className="contact-links">
          <a href={social.github.url} aria-label="GitHub" title="GitHub" target="_blank" rel="noopener noreferrer">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
            </svg>
          </a>
          <a href={social.linkedin.url} aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
