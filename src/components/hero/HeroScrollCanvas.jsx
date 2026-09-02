import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TOTAL_FRAMES = 240;
const FRAME_PATH = '/scroll-animation/ezgif-frame-';

/* ── Motivational messages overlaid on the scroll canvas ── */
const MESSAGES = [
  { text: 'Welcome to', subtext: 'THE ROYAL CLUB', startPct: 0.05, endPct: 0.18 },
  { text: 'सम्मान बाँटो,', subtext: 'प्यार अपने आप मिलेगा', startPct: 0.22, endPct: 0.36 },
  { text: 'Unity in', subtext: 'Diversity', startPct: 0.40, endPct: 0.54 },
  { text: 'Together', subtext: 'We Rise', startPct: 0.58, endPct: 0.72 },
  { text: 'Every Voice', subtext: 'Matters', startPct: 0.76, endPct: 0.88 },
];

/**
 * HeroScrollCanvas
 *
 * Renders 240 JPG frames onto a sticky <canvas> element,
 * scrubbed by GSAP ScrollTrigger + Lenis smooth scroll.
 * Frames are preloaded with a progress indicator before
 * the sequence begins.
 */
const HeroScrollCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef({ value: 0 });
  const scrollTriggerRef = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMessage, setActiveMessage] = useState(-1);

  /* ── Pad frame number to 3 digits ── */
  const padNumber = (n) => String(n).padStart(3, '0');

  /* ── Draw a specific frame on the canvas ── */
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    /* Fill canvas with dark green, then draw the frame centered/covering */
    ctx.fillStyle = '#0F2E26';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerX = (canvas.width - img.width * ratio) / 2;
    const centerY = (canvas.height - img.height * ratio) / 2;

    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerX, centerY, img.width * ratio, img.height * ratio
    );
  }, []);

  /* ── Preload all frames ── */
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}${padNumber(i)}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  /* ── Size the canvas to fill viewport ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    const resize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // On mobile, scrolling hides/shows the address bar, changing innerHeight slightly.
      // This causes constant canvas clearing and redraw flashing.
      // We only resize if width changes or height changes significantly (>100px).
      // We also check if it's the default canvas size (300) to force initial resize.
      if (currentWidth !== lastWidth || Math.abs(currentHeight - lastHeight) > 100 || canvas.width === 300) {
        lastWidth = currentWidth;
        lastHeight = currentHeight;
        
        canvas.width = currentWidth;
        canvas.height = currentHeight;
        
        if (isLoaded) {
          drawFrame(Math.round(frameIndexRef.current.value));
        }
      }
    };

    // Force initial resize on mount
    resize();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isLoaded, drawFrame]);

  /* ── Setup GSAP ScrollTrigger once loaded ── */
  useEffect(() => {
    if (!isLoaded) return;

    /* Draw first frame immediately */
    drawFrame(0);

    const obj = frameIndexRef.current;
    obj.value = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          /* Update active message based on scroll progress */
          const progress = self.progress;
          let newActive = -1;
          for (let i = 0; i < MESSAGES.length; i++) {
            if (progress >= MESSAGES[i].startPct && progress <= MESSAGES[i].endPct) {
              newActive = i;
              break;
            }
          }
          setActiveMessage(newActive);
        },
      },
    });

    /* Store ref so we only kill our own ScrollTrigger on cleanup */
    scrollTriggerRef.current = tl.scrollTrigger;

    tl.to(obj, {
      value: TOTAL_FRAMES - 1,
      ease: 'none',
      onUpdate: () => {
        drawFrame(Math.round(obj.value));
      },
    });

    return () => {
      tl.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [isLoaded, drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '500vh' }}
    >
      {/* Sticky canvas viewport */}
      <div className="sticky top-0 left-0 w-full overflow-hidden" style={{ height: '100dvh' }}>
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ background: '#0F2E26' }}
        />

        {/* ── Loading overlay ── */}
        {!isLoaded && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
            style={{ background: '#0F2E26' }}
          >
            <h2
              className="font-display text-3xl md:text-4xl text-cream mb-8 tracking-wider uppercase"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E6' }}
            >
              THE ROYAL CLUB
            </h2>

            {/* Progress bar */}
            <div
              className="w-64 h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(245, 240, 230, 0.15)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${loadProgress}%`,
                  background: 'linear-gradient(90deg, #8B6914, #C9A227)',
                }}
              />
            </div>

            <p
              className="mt-4 text-sm tracking-widest uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(245, 240, 230, 0.5)',
              }}
            >
              Loading experience — {loadProgress}%
            </p>
          </div>
        )}

        {/* ── Motivational message overlays ── */}
        {isLoaded &&
          MESSAGES.map((msg, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-500 ease-out"
              style={{
                opacity: activeMessage === i ? 1 : 0,
              }}
            >
              {/* Golden-bordered container to differentiate from canvas */}
              <div
                style={{
                  border: '2px solid transparent',
                  borderImage: 'linear-gradient(135deg, #8B6914, #C9A227, #E8D48B, #C9A227, #8B6914) 1',
                  padding: '2rem 3rem',
                  background: 'rgba(15, 46, 38, 0.45)',
                  backdropFilter: 'blur(4px)',
                  textAlign: 'center',
                }}
              >
                <p
                  className="text-lg md:text-xl tracking-widest uppercase mb-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#C9A227',
                    letterSpacing: '0.25em',
                  }}
                >
                  {msg.text}
                </p>
                <h2
                  className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#F5F0E6',
                    lineHeight: 0.95,
                    textShadow: '0 2px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  {msg.subtext}
                </h2>
              </div>
            </div>
          ))}

        {/* ── Scroll indicator at the very beginning ── */}
        {isLoaded && activeMessage === -1 && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce"
            style={{ opacity: 0.6 }}
          >
            <p
              className="text-xs tracking-widest uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#F5F0E6',
              }}
            >
              Scroll to explore
            </p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A227"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroScrollCanvas;
