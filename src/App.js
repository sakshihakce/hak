import './App.css';
import { useEffect, useRef, useState } from 'react';
import qr from './qr.png';

function Typewriter({ text, speed = 80, loop = false, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (loop) {
      setTimeout(() => {
        setDisplayed('');
        setIndex(0);
      }, 1200);
    }
  }, [index, text, speed, loop]);
  return <span className={className}>{displayed}</span>;
}

function MatrixRain() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    const chars = '01';
    function draw() {
      ctx.fillStyle = 'rgba(26,26,46,0.15)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';
      ctx.fillStyle = '#00fff7';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    let anim;
    function animate() {
      draw();
      anim = requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    });
    return () => cancelAnimationFrame(anim);
  }, []);
  return <canvas ref={canvasRef} className="matrix-canvas" />;
}

function App() {
  return (
    <div className="matrix-bg">
      <MatrixRain />
      <header className="event-header">
        <h1 className="event-title">
          <Typewriter text="HACK THE MATRIX" speed={90} loop={true} className="typewriter" />
        </h1>
        <p className="event-subtitle animated-subtitle">Registrations Open</p>
      </header>
      <main className="event-main equal-cards-layout">
        <section className="event-info-card bigger-card">
          <div className="event-details">
            <div className="event-row">
              <span className="event-label">Last Date to Register:</span>
              <span className="event-value">31st May 2025</span>
            </div>
            <div className="event-row">
              <span className="event-label">Event Date:</span>
              <span className="event-value">14th June 2025 (Tentative)</span>
            </div>
            <div className="event-row">
              <span className="event-label">Location:</span>
              <span className="event-value">Super Nova, Greater Noida</span>
            </div>
            <div className="event-row">
              <span className="event-label">Duration:</span>
              <span className="event-value">36 hours</span>
            </div>
            <div className="event-row">
              <span className="event-label">Prize Pool:</span>
              <span className="event-value prize">6.5 Lakhs</span>
            </div>
            <button className="register-btn" disabled>Scan QR to Register</button>
          </div>
        </section>
        <section className="qr-center-card bigger-card">
          <img src={qr} alt="Scan to Register" className="qr-img-fill" />
          <div className="qr-label qr-label-big">Scan to Register Your Team</div>
        </section>
      </main>
      <footer className="event-footer">
        <a className="whatsapp-link" href="https://chat.whatsapp.com/FN4Xq6ohp3q4653QzHKPXF" target="_blank" rel="noopener noreferrer">
          <button className="whatsapp-btn">Join WhatsApp Group</button>
        </a>
      </footer>
    </div>
  );
}

export default App;
