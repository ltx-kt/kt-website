import { useState } from 'react';

export interface Project {
  order: number;
  name: string;
  tag: string;
  blurb: string;
  details: string;
  stack: string[];
  meta: string;
}

interface Props {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="projects" className="section projects">
      <div className="section-head" data-animate>
        <span className="section-label">03 — PROJECTS</span>
        <h2 className="section-title" data-accent="a">
          Things I&apos;ve <span className="pill-outline-sm" data-accent="a">built</span>
        </h2>
      </div>

      <div className="projects-grid" data-animate-stagger>
        {projects.map((p, i) => {
          const isOpen = openIdx === i;
          const accentVar = i % 2 === 0 ? 'var(--accent-a)' : 'var(--accent-b)';
          return (
            <article
              key={p.order}
              className={`project-card${isOpen ? ' open' : ''}`}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              style={{ '--card-accent': accentVar } as React.CSSProperties}
            >
              <div className="pc-thumb">
                <div className="pc-thumb-bg" style={{ background: accentVar }} />
                <span className="pc-tag">{p.tag}</span>
                <span className="pc-meta">{p.meta}</span>
              </div>
              <div className="pc-body">
                <h3 className="pc-name">{p.name}</h3>
                <p className="pc-blurb">{p.blurb}</p>
                <div className="pc-stack">
                  {p.stack.map((s) => <span key={s} className="chip-stack">{s}</span>)}
                </div>
                <div className="pc-details" style={{ maxHeight: isOpen ? '200px' : '0' }}>
                  <p>{p.details}</p>
                </div>
                <button className="pc-toggle" tabIndex={-1} aria-hidden="true">
                  {isOpen ? 'Less' : 'More'}{' '}
                  <span className="arrow">{isOpen ? '↑' : '↓'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
