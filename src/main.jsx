import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './styles.css'
import App from './App.jsx'

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

if (!prefersReducedMotion) {
  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    wheelMultiplier: 0.82,
    touchMultiplier: 1,
    syncTouch: false,
    easing: (t) =>
      Math.min(
        1,
        1.001 - Math.pow(2, -10 * t)
      )
  })

  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  window.aurelisLenis = lenis
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
