# AXIS IS NOT A TODO APP — Glitch Animation Extract

## Source Files
- HTML/JSX file: `/Users/mayanktripathi/Desktop/about_axis/index.html`
- CSS file: `/Users/mayanktripathi/Desktop/about_axis/style.css`
- JS file: `/Users/mayanktripathi/Desktop/about_axis/script.js`

## The Heading Element
```html
<h2 class="transmission-title text-glitch" id="transmission-header">AXIS is not a todo app.</h2>
```

## CSS Classes Applied
- `transmission-title`
- `text-glitch`
- `glitch-1` (applied dynamically via JavaScript)

## Complete CSS Rules
```css
.transmission-title {
    font-family: var(--font-heading);
    font-size: 32px;
    font-weight: 900;
    color: var(--neon-orange);
    text-shadow: 0 0 10px var(--neon-orange-glow);
    letter-spacing: 4px;
    margin-bottom: 24px;
}

.text-glitch {
    animation: text-glitch-active 6s infinite;
}

.glitch-1 {
    animation: glitch-on 0.4s ease-in-out !important;
}

body.glitch-critical-1 * {
    text-shadow: -2px 0 0 var(--neon-red), 2px 0 0 var(--neon-cyan) !important;
}
body.glitch-critical-2 * {
    text-shadow: -5px 0 0 var(--neon-red), 5px 0 0 var(--neon-cyan) !important;
}
body.glitch-idle * {
    text-shadow: -2px 0 0 var(--neon-red), 2px 0 0 var(--neon-cyan) !important;
}

@keyframes text-glitch-active {
    0%, 100% {
        transform: none;
        text-shadow: none;
    }
    92% {
        transform: none;
        text-shadow: none;
    }
    93% {
        transform: skewX(-10deg) translate(-2px, 1px);
        text-shadow: -2px 0 var(--neon-cyan), 2px 0 var(--neon-red);
    }
    94% {
        transform: skewX(12deg) translate(2px, -1px);
        text-shadow: -2px 0 var(--neon-red), 2px 0 var(--neon-cyan);
    }
    95% {
        transform: none;
        text-shadow: none;
    }
}

@keyframes glitch-on {
    0%   { transform: skewX(0deg)  translateX(0);    letter-spacing: 0.25em; color: var(--neon-cyan); opacity: 1; }
    15%  { transform: skewX(2deg)  translateX(3px);  letter-spacing: 0.4em;  color: var(--neon-cyan); opacity: 0.8; }
    30%  { transform: skewX(-1deg) translateX(-4px); letter-spacing: 0.1em;  color: #7b2fff; opacity: 0.9; }
    45%  { transform: skewX(1deg)  translateX(2px);  letter-spacing: 0.35em; color: var(--neon-cyan); opacity: 0.85; }
    60%  { transform: skewX(-2deg) translateX(-2px); letter-spacing: 0.15em; color: #7b2fff; opacity: 0.7; }
    75%  { transform: skewX(0.5deg) translateX(1px); letter-spacing: 0.3em;  color: var(--neon-cyan); opacity: 0.9; }
    100% { transform: skewX(0deg)  translateX(0);    letter-spacing: 0.25em; color: var(--neon-cyan); opacity: 1; }
}
```

## JavaScript Animation Code
```javascript
    function triggerGlitch() {
        // 1. Create RGB overlays
        const redOverlay = document.createElement('div');
        redOverlay.className = 'glitch-overlay-red';

        const blueOverlay = document.createElement('div');
        blueOverlay.className = 'glitch-overlay-blue';

        document.body.appendChild(redOverlay);
        document.body.appendChild(blueOverlay);

        // 2. Screen tear on body
        document.body.classList.add('screen-tear');

        // 3. Title/text glitch on elements with .text-glitch
        const glitchElements = document.querySelectorAll('.text-glitch');
        glitchElements.forEach(el => {
            el.classList.add('glitch-1');
        });

        // 4. Cleanup
        setTimeout(() => {
            if (document.body.contains(redOverlay)) document.body.removeChild(redOverlay);
            if (document.body.contains(blueOverlay)) document.body.removeChild(blueOverlay);
            document.body.classList.remove('screen-tear');
            glitchElements.forEach(el => {
                el.classList.remove('glitch-1');
            });
        }, 400);
    }
```

## Trigger Mechanism
Describe exactly what triggers the animation:
- **On scroll / IntersectionObserver**: The section has `class="reveal-on-scroll"`, which uses a standard JavaScript `IntersectionObserver` to trigger a one-shot entrance glitch (`skew-glitch`) and materialize effect.
- **On idle timer**: Triggered after exactly **6 seconds** of user inactivity, starting a high-intensity loop repeating `triggerGlitch()` every 2 seconds.
- **On page load**: Checkpoints at 12% and 60% of the simulated progress bar trigger `triggerGlitch()` as well.
- **On hover**: None.
- **Repeating or one-shot**: The passive loop (`text-glitch-active`) repeats infinitely every 6 seconds. The active dynamic glitch triggers as a one-shot on page load/scroll, and repeats every 2 seconds when in the idle state.

## Animation Library
- None. Only vanilla JavaScript (DOM manipulation) and standard CSS animations.

## Timing Values
- **Duration**: Passive loop: `6s` total cycle (glitch active for 180ms from 92% to 95%). Dynamic glitch: `400ms`.
- **Delay**: None.
- **Repeat interval**: Infinite looping. Every 10s for subtle active loop (when not idle), and every 2s for active idle loop.
- **Easing**: `ease-in-out` and `steps(1)` (for overlay alignment).

## Colors Used
- `--neon-cyan`: `#00f0ff` (RGB split cyan)
- `--neon-red`: `#ff1744` (RGB split red)
- `--neon-orange`: `#ff9100` (Title color)
- `#7b2fff` (Purple highlight in dynamic skew)
