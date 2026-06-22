# Boot Sequence Glitch — Extraction

## JavaScript Function
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

## CSS Classes Used By This Function
```css
.glitch-overlay-red {
    position: fixed;
    inset: 0;
    background: rgba(255, 0, 60, 0.08);
    transform: translateX(-4px);
    mix-blend-mode: screen;
    animation: glitch-red 400ms steps(1) forwards;
    z-index: 99999;
    pointer-events: none;
}

.glitch-overlay-blue {
    position: fixed;
    inset: 0;
    background: rgba(0, 170, 255, 0.08);
    transform: translateX(4px);
    mix-blend-mode: screen;
    animation: glitch-blue 400ms steps(1) forwards;
    z-index: 99999;
    pointer-events: none;
}

.screen-tear {
    animation: screen-tear-anim 400ms steps(1) forwards;
}

.glitch-1 {
    animation: glitch-on 0.4s ease-in-out !important;
}
```

## Where It Is Called During Boot
```javascript
// At 12% progress:
triggerGlitch();
setTimeout(() => {
    document.body.classList.remove('glitch-critical-1');
    // Resume progress bar after glitch duration (400ms)
    percent++;
    if (progressFill) progressFill.style.width = percent + '%';
    if (progressPercent) progressPercent.textContent = percent + '%';
    setTimeout(updateProgress, 60);
}, 400); // 400ms duration

// At 60% progress:
triggerGlitch();
setTimeout(() => {
    document.body.classList.remove('glitch-critical-2');
    // Resume progress bar after glitch duration (700ms)
    percent++;
    if (progressFill) progressFill.style.width = percent + '%';
    if (progressPercent) progressPercent.textContent = percent + '%';
    setTimeout(updateProgress, 60);
}, 700); // 700ms duration
```
