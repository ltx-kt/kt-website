import { useState } from 'react';

export interface Job {
  order: number;
  years: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  details: string[];
  stack: string[];
}

interface Props {
  jobs: Job[];
}

export default function ExperienceTimeline({ jobs }: Props) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="experience" className="section experience">
      <div className="section-head" data-animate>
        <span className="section-label">02 — WORK EXPERIENCE</span>
        <h2 className="section-title" data-accent="b">
          The road <span className="pill-outline-sm" data-accent="b">so far</span>
        </h2>
      </div>

      <div className="timeline" data-animate-stagger>
        {jobs.map((job, i) => {
          const isOpen = openIdx === i;
          const accentVar = i % 2 === 0 ? 'var(--accent-a)' : 'var(--accent-b)';
          return (
            <div key={job.order} className={`tl-item${isOpen ? ' open' : ''}`}>
              <div className="tl-rail">
                <span className="tl-dot" style={{ background: accentVar }} />
                {i < jobs.length - 1 && <span className="tl-line" />}
              </div>
              <button
                className="tl-head"
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <div className="tl-when">
                  <span className="tl-years">{job.years}</span>
                  <span className="tl-company">{job.company}</span>
                  <span className="tl-loc">{job.location}</span>
                </div>
                <div className="tl-what">
                  <h3 className="tl-role">{job.role}</h3>
                  <p className="tl-summary">{job.summary}</p>
                </div>
                <span className="tl-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <div className="tl-body" style={{ maxHeight: isOpen ? '1200px' : '0' }}>
                <div className="tl-body-inner">
                  <ul className="tl-bullets">
                    {job.details.map((d, j) => <li key={j}>{d}</li>)}
                  </ul>
                  <div className="tl-stack">
                    {job.stack.map((s) => <span key={s} className="chip-stack">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
