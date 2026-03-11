import React, { useRef, useEffect, useState, useCallback } from 'react';
import './JuegoPolilla.css';

// ── Configuración ───────────────────────────────────────────────
const MOTH_SIZE  = 34;    // radio "semialas" en px
const SPEED_BASE = 260;   // px/s al moverse
const STILL_MIN  = 2800;  // ms quieta mínimo
const STILL_MAX  = 4600;  // ms quieta máximo

// ── Dibujar fondo de pared estucada con pasta de muro ─────────
function buildWall(w, h) {
  const oc = document.createElement('canvas');
  oc.width = w;
  oc.height = h;
  const c = oc.getContext('2d');

  // ── 1. Base: color crema/blanco roto cálido ──────────────────
  c.fillStyle = '#ddd6cb';
  c.fillRect(0, 0, w, h);

  // ── 2. Textura pixel a pixel (ruido de grano de estuco) ──────
  const img  = c.getImageData(0, 0, w, h);
  const data = img.data;
  // Usamos un LCG simple para ruido determinístico rápido
  let seed = 42;
  const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };

  for (let i = 0; i < data.length; i += 4) {
    const n = (rand() - 0.5) * 22; // variación ±11 niveles
    data[i]     = Math.max(0, Math.min(255, data[i]     + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n * 0.95));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n * 0.85));
  }
  c.putImageData(img, 0, 0);

  // ── 3. Manchas suaves de variación de espesor (llagueado) ────
  for (let i = 0; i < 120; i++) {
    const px = rand() * w;
    const py = rand() * h;
    const rx = 30 + rand() * 90;
    const ry = 20 + rand() * 60;
    const alpha = rand() * 0.055;
    const light = rand() > 0.55;

    const g = c.createRadialGradient(px, py, 0, px, py, rx);
    g.addColorStop(0, light ? `rgba(255,250,240,${alpha})` : `rgba(160,145,125,${alpha})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.beginPath();
    c.ellipse(px, py, rx, ry, rand() * Math.PI, 0, Math.PI * 2);
    c.fill();
  }

  // ── 4. Marcas de llana / espátula (líneas diagonales tenues) ─
  c.strokeStyle = 'rgba(180,165,148,0.1)';
  c.lineWidth = 1.2;
  for (let i = 0; i < 60; i++) {
    const x0 = rand() * w;
    const y0 = rand() * h;
    const len = 30 + rand() * 80;
    const ang = -0.4 + rand() * 0.8; // principalmente horizontal
    c.globalAlpha = 0.4 + rand() * 0.6;
    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x0 + Math.cos(ang) * len, y0 + Math.sin(ang) * len);
    c.stroke();
  }
  c.globalAlpha = 1;

  // ── 5. Microhendiduras de pasta seca (grietas finas) ─────────
  c.strokeStyle = 'rgba(140,125,108,0.18)';
  c.lineWidth = 0.6;
  for (let i = 0; i < 18; i++) {
    const x0 = rand() * w;
    const y0 = rand() * h;
    c.beginPath();
    c.moveTo(x0, y0);
    let cx = x0, cy = y0;
    const segs = 3 + Math.floor(rand() * 4);
    for (let s = 0; s < segs; s++) {
      cx += (rand() - 0.5) * 28;
      cy += (rand() - 0.5) * 14;
      c.lineTo(cx, cy);
    }
    c.stroke();
  }

  // ── 6. Viñeta muy suave en bordes ────────────────────────────
  const vg = c.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(100,85,68,0.12)');
  c.fillStyle = vg;
  c.fillRect(0, 0, w, h);

  return oc;
}

// ── Dibujar polilla ───────────────────────────────────────────
// wingAngle: -1..1 (0=alas planas, 1=alas arriba, -1=abajo)
function drawMoth(ctx, cx, cy, wingAngle, size) {
  const s = size;
  const wa = wingAngle;

  ctx.save();
  ctx.translate(cx, cy);

  // Colores
  const cWTop  = '#6b4e22';  // ala superior — marrón oscuro, contrasta con estuco
  const cWTop2 = '#3e2a0c';  // patrón ala
  const cWBot  = '#352010';  // ala inferior
  const cBody  = '#180c02';
  const cTho   = '#2a1808';

  // Sombra suave bajo la polilla (más tenue sobre fondo claro)
  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = '#5a3a18';
  ctx.beginPath();
  ctx.ellipse(3, s * 0.22, s * 0.82, s * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ── ALAS INFERIORES (detrás) ────────────────────────────────
  const lwY = s * 0.12;
  const lwX = s * 0.5 + wa * s * 0.12;

  // Izquierda inferior
  ctx.beginPath();
  ctx.moveTo(0, lwY);
  ctx.bezierCurveTo(-s * 0.28, lwY - wa * s * 0.18,
                    -lwX,      lwY + s * 0.38,
                    -s * 0.08, lwY + s * 0.52);
  ctx.closePath();
  ctx.fillStyle = cWBot;
  ctx.fill();

  // Derecha inferior
  ctx.beginPath();
  ctx.moveTo(0, lwY);
  ctx.bezierCurveTo(s * 0.28, lwY - wa * s * 0.18,
                    lwX,      lwY + s * 0.38,
                    s * 0.08, lwY + s * 0.52);
  ctx.closePath();
  ctx.fillStyle = cWBot;
  ctx.fill();

  // ── ALAS SUPERIORES (frente) ───────────────────────────────
  const tipY = -wa * s * 0.52 - s * 0.05;
  const uwW  = s * 0.85;

  // Izquierda superior
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-s * 0.38, tipY - s * 0.22,
                    -uwW,       tipY,
                    -uwW * 0.65, s * 0.3);
  ctx.bezierCurveTo(-s * 0.38, s * 0.35, -s * 0.1, s * 0.18, 0, s * 0.12);
  ctx.closePath();
  ctx.fillStyle = cWTop;
  ctx.fill();

  // Derecha superior
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(s * 0.38, tipY - s * 0.22,
                    uwW,       tipY,
                    uwW * 0.65, s * 0.3);
  ctx.bezierCurveTo(s * 0.38, s * 0.35, s * 0.1, s * 0.18, 0, s * 0.12);
  ctx.closePath();
  ctx.fillStyle = cWTop;
  ctx.fill();

  // Manchas de ala (patrón)
  ctx.fillStyle = cWTop2;
  ctx.beginPath();
  ctx.ellipse(-uwW * 0.48, tipY + s * 0.12, s * 0.1, s * 0.065, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(uwW * 0.48, tipY + s * 0.12, s * 0.1, s * 0.065, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // Punto ocular en ala (confunde predadores — incluyendo gatos)
  ctx.fillStyle = 'rgba(40,20,5,0.55)';
  ctx.beginPath();
  ctx.arc(-uwW * 0.45, tipY + s * 0.12, s * 0.06, 0, Math.PI * 2);
  ctx.arc(uwW * 0.45, tipY + s * 0.12, s * 0.06, 0, Math.PI * 2);
  ctx.fill();

  // Contorno fino de alas superiores
  ctx.strokeStyle = 'rgba(30,16,4,0.45)';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-s * 0.38, tipY - s * 0.22, -uwW, tipY, -uwW * 0.65, s * 0.3);
  ctx.bezierCurveTo(-s * 0.38, s * 0.35, -s * 0.1, s * 0.18, 0, s * 0.12);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(s * 0.38, tipY - s * 0.22, uwW, tipY, uwW * 0.65, s * 0.3);
  ctx.bezierCurveTo(s * 0.38, s * 0.35, s * 0.1, s * 0.18, 0, s * 0.12);
  ctx.closePath();
  ctx.stroke();

  // Venas de ala
  ctx.strokeStyle = 'rgba(30,16,4,0.22)';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-uwW * 0.55, tipY + s * 0.22);
  ctx.moveTo(0, s * 0.08);
  ctx.lineTo(-uwW * 0.3, s * 0.28);
  ctx.moveTo(0, 0);
  ctx.lineTo(uwW * 0.55, tipY + s * 0.22);
  ctx.moveTo(0, s * 0.08);
  ctx.lineTo(uwW * 0.3, s * 0.28);
  ctx.stroke();

  // ── CUERPO ─────────────────────────────────────────────────
  // Abdomen
  ctx.beginPath();
  ctx.ellipse(0, s * 0.22, s * 0.1, s * 0.4, 0, 0, Math.PI * 2);
  ctx.fillStyle = cBody;
  ctx.fill();

  // Segmentos del abdomen
  ctx.strokeStyle = 'rgba(200,160,80,0.12)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 4; i++) {
    const sy = s * 0.06 + i * s * 0.115;
    ctx.beginPath();
    ctx.moveTo(-s * 0.085, sy);
    ctx.lineTo(s * 0.085, sy);
    ctx.stroke();
  }

  // Tórax
  ctx.beginPath();
  ctx.arc(0, -s * 0.03, s * 0.115, 0, Math.PI * 2);
  ctx.fillStyle = cTho;
  ctx.fill();

  // Cabeza
  ctx.beginPath();
  ctx.arc(0, -s * 0.2, s * 0.082, 0, Math.PI * 2);
  ctx.fillStyle = cBody;
  ctx.fill();

  // Ojos (brillo rojo — las polillas los tienen reflectivos)
  [-1, 1].forEach(side => {
    const ex = side * s * 0.036;
    const ey = -s * 0.21;
    const g = ctx.createRadialGradient(ex, ey, 0, ex, ey, s * 0.032);
    g.addColorStop(0, 'rgba(255,60,10,0.95)');
    g.addColorStop(1, 'rgba(255,60,10,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(ex, ey, s * 0.032, 0, Math.PI * 2);
    ctx.fill();
  });

  // ── ANTENAS (plumosas — característica de polilla) ─────────
  ctx.lineWidth = 0.9;
  ctx.strokeStyle = cBody;

  // Tallo izquierdo
  ctx.beginPath();
  ctx.moveTo(-s * 0.045, -s * 0.265);
  ctx.quadraticCurveTo(-s * 0.2, -s * 0.5, -s * 0.38, -s * 0.58);
  ctx.stroke();
  // Tallo derecho
  ctx.beginPath();
  ctx.moveTo(s * 0.045, -s * 0.265);
  ctx.quadraticCurveTo(s * 0.2, -s * 0.5, s * 0.38, -s * 0.58);
  ctx.stroke();

  // Barbas de antena
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = `rgba(42,28,12,0.55)`;
  const steps = 6;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const bl = s * 0.085 * (1 - t * 0.45);

    const lx = -s * 0.045 + t * (-s * 0.335);
    const ly = -s * 0.265 + t * (-s * 0.315);
    ctx.beginPath();
    ctx.moveTo(lx, ly); ctx.lineTo(lx - bl * 0.85, ly - bl * 0.45);
    ctx.moveTo(lx, ly); ctx.lineTo(lx + bl * 0.35, ly + bl * 0.65);
    ctx.stroke();

    const rx = s * 0.045 + t * (s * 0.335);
    const ry = ly;
    ctx.beginPath();
    ctx.moveTo(rx, ry); ctx.lineTo(rx + bl * 0.85, ry - bl * 0.45);
    ctx.moveTo(rx, ry); ctx.lineTo(rx - bl * 0.35, ry + bl * 0.65);
    ctx.stroke();
  }

  ctx.restore();
}

// ── Componente ────────────────────────────────────────────────
export default function JuegoPolilla() {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const stateRef     = useRef({
    x: 0, y: 0,
    targetX: 0, targetY: 0,
    wingPhase: 0,
    phase: 'still',
    stillMs: STILL_MIN,
    lastTime: null,
    wallCanvas: null,
    speed: SPEED_BASE,
  });
  const rafRef = useRef(null);
  const [isFS, setIsFS] = useState(false);
  const [isCssFS, setIsCssFS] = useState(false); // fullscreen por CSS (fallback iOS)

  const runLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const st  = stateRef.current;

    function pickTarget() {
      const m = MOTH_SIZE + 12;
      const W = canvas.width  - m * 2;
      const H = canvas.height - m * 2;

      // Distancia aleatoria: 30% corta, 40% media, 30% cruzando toda la pantalla
      const roll = Math.random();
      let tx, ty;

      if (roll < 0.30) {
        // Movimiento corto: radio pequeño alrededor de la posición actual
        const r = 60 + Math.random() * 100;
        const a = Math.random() * Math.PI * 2;
        tx = st.x + Math.cos(a) * r;
        ty = st.y + Math.sin(a) * r;
      } else if (roll < 0.70) {
        // Movimiento medio: cualquier punto del canvas
        tx = m + Math.random() * W;
        ty = m + Math.random() * H;
      } else {
        // Movimiento largo: esquina o lado opuesto de donde está
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { tx = m;     ty = m + Math.random() * H; }       // borde izq
        else if (side === 1) { tx = m + W; ty = m + Math.random() * H; }  // borde der
        else if (side === 2) { tx = m + Math.random() * W; ty = m; }      // borde top
        else                 { tx = m + Math.random() * W; ty = m + H; }  // borde bot
      }

      // Clamp dentro del canvas
      st.targetX = Math.max(m, Math.min(m + W, tx));
      st.targetY = Math.max(m, Math.min(m + H, ty));

      // Velocidad también varía: vuelos largos = más rápido
      const dist = Math.hypot(st.targetX - st.x, st.targetY - st.y);
      st.speed = SPEED_BASE * (0.7 + Math.min(dist / 300, 1.0) * 0.9);
    }

    function frame(now) {
      if (!st.lastTime) st.lastTime = now;
      const dt = Math.min((now - st.lastTime) / 1000, 0.08);
      st.lastTime = now;

      // Fondo de muralla
      if (st.wallCanvas) {
        ctx.drawImage(st.wallCanvas, 0, 0);
      } else {
        ctx.fillStyle = '#ddd6cb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (st.phase === 'still') {
        st.stillMs    -= dt * 1000;
        st.wingPhase  += dt * 3;     // aleteo lento suave
        const wa = Math.sin(st.wingPhase * 2) * 0.1;
        drawMoth(ctx, st.x, st.y, wa, MOTH_SIZE);

        if (st.stillMs <= 0) {
          st.phase = 'moving';
          pickTarget();
        }
      } else {
        st.wingPhase += dt * 18;     // aleteo rápido al volar

        const dx   = st.targetX - st.x;
        const dy   = st.targetY - st.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 8) {
          st.x      = st.targetX;
          st.y      = st.targetY;
          st.phase  = 'still';
          st.stillMs = STILL_MIN + Math.random() * (STILL_MAX - STILL_MIN);
        } else {
          // Movimiento errático: ángulo con ruido aleatorio
          const baseAngle = Math.atan2(dy, dx);
          const wobble    = (Math.random() - 0.5) * 0.45;
          const step      = Math.min(st.speed * dt, dist);

          st.x += Math.cos(baseAngle + wobble) * step;
          st.y += Math.sin(baseAngle + wobble) * step;

          // Limitar al canvas
          const m = MOTH_SIZE + 4;
          st.x = Math.max(m, Math.min(canvas.width  - m, st.x));
          st.y = Math.max(m, Math.min(canvas.height - m, st.y));
        }

        const wa = Math.sin(st.wingPhase * 9) * 0.8;
        drawMoth(ctx, st.x, st.y, wa, MOTH_SIZE);
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
  }, []);

  // Init canvas + ResizeObserver
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const st = stateRef.current;

    const resize = () => {
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
      st.wallCanvas = buildWall(canvas.width, canvas.height);
    };

    resize();
    if (st.x === 0) {
      st.x = canvas.width / 2;
      st.y = canvas.height / 2;
    }

    runLoop();

    const ro = new ResizeObserver(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resize();
      st.lastTime = null;
      runLoop();
    });
    ro.observe(container);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [runLoop]);

  // Detectar soporte nativo de fullscreen
  const nativeFSSupported = !!(
    document.documentElement.requestFullscreen ||
    document.documentElement.webkitRequestFullscreen
  );

  const enterFS = () => {
    const el = containerRef.current;
    if (!el) return;
    if (el.requestFullscreen)            el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else                                 setIsCssFS(true);  // fallback iOS
  };

  const exitFS = () => {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen)            document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else {
      setIsCssFS(false); // salir del CSS fullscreen
    }
  };

  const inFullscreen = isFS || isCssFS;

  useEffect(() => {
    const handler = () =>
      setIsFS(!!(document.fullscreenElement || document.webkitFullscreenElement));
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
    return () => {
      document.removeEventListener('fullscreenchange', handler);
      document.removeEventListener('webkitfullscreenchange', handler);
    };
  }, []);

  return (
    <section className="juego-polilla" id="juego">
      <h2 className="section-title">
        <span className="icon">🦋</span>
        Juego para Gatos
      </h2>

      <div ref={containerRef} className={`juego-container${isCssFS ? ' juego-cssfs' : ''}`}>
        <canvas ref={canvasRef} className="juego-canvas" />

        <button
          className="juego-fs-btn"
          onClick={inFullscreen ? exitFS : enterFS}
          title={inFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {inFullscreen ? '✕ Salir' : '⛶ Pantalla completa'}
        </button>

        <div className="juego-hint">
          🐱 {inFullscreen ? '' : 'Pon a tu gato frente a la pantalla'}
        </div>
      </div>
    </section>
  );
}
