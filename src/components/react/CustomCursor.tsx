import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = document.querySelector<HTMLElement>('.cursor-dot');
    const ring = document.querySelector<HTMLElement>('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let rafId: number;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    // ringX/Y use exponential smoothing so the cursor lags the dot for a magnetic feel
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      rafId = requestAnimationFrame(tick);
    };

    const HOVER_SELECTOR = 'a, button, .project-card, .skill-group, .nav-pill, .theme-toggle';
    const enter = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER_SELECTOR)) ring.classList.add('hover');
    };
    const leave = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest && t.closest(HOVER_SELECTOR)) ring.classList.remove('hover');
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
