/* ==========================================================================
   AXIS SYSTEM ARCHIVE — INTERACTIVE CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 0. SYSTEM DYNAMIC GLITCH CONTROLLER (AXIS STYLE)
    // ----------------------------------------------------------------------
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

    // ----------------------------------------------------------------------
    // 1. BOOT-UP INITIALIZATION SEQUENCE
    // ----------------------------------------------------------------------
    const lines = [
        document.getElementById('line-1'),
        document.getElementById('line-2'),
        document.getElementById('line-3'),
        document.getElementById('line-4'),
        document.getElementById('line-5'),
        document.getElementById('line-6'),
        document.getElementById('line-7')
    ];
    const progressContainer = document.getElementById('boot-progress-container');
    const progressFill = document.getElementById('boot-progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    const enterButtonContainer = document.getElementById('enter-button-container');
    const loaderSection = document.getElementById('loader-section');
    const archiveContent = document.getElementById('archive-content');
    const enterBtn = document.getElementById('btn-enter-system');

    // Sequential log typing simulator
    let delay = 0;
    
    // Reveal lines 1 to 5
    for (let i = 0; i < 5; i++) {
        delay += 250;
        setTimeout(() => {
            if (lines[i]) {
                lines[i].style.display = 'block';
                lines[i].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, delay);
    }

    // Reveal progress bar and run load simulation
    delay += 300;
    setTimeout(() => {
        if (progressContainer) progressContainer.style.display = 'block';
        
        let percent = 0;
        
        function updateProgress() {
            if (percent === 12) {
                // Trigger Critical Glitch Event #1 and AXIS screen tear
                document.body.classList.add('glitch-critical-1');
                triggerGlitch();
                setTimeout(() => {
                    document.body.classList.remove('glitch-critical-1');
                    // Resume progress bar after glitch duration (400ms)
                    percent++;
                    if (progressFill) progressFill.style.width = percent + '%';
                    if (progressPercent) progressPercent.textContent = percent + '%';
                    setTimeout(updateProgress, 60);
                }, 400); // 400ms duration
                return;
            }
            
            if (percent === 60) {
                // Trigger Critical Glitch Event #2 (Stronger) and AXIS screen tear
                document.body.classList.add('glitch-critical-2');
                triggerGlitch();
                setTimeout(() => {
                    document.body.classList.remove('glitch-critical-2');
                    // Resume progress bar after glitch duration (700ms)
                    percent++;
                    if (progressFill) progressFill.style.width = percent + '%';
                    if (progressPercent) progressPercent.textContent = percent + '%';
                    setTimeout(updateProgress, 60);
                }, 700); // 700ms duration
                return;
            }
            
            if (percent >= 100) {
                percent = 100;
                if (progressFill) progressFill.style.width = '100%';
                if (progressPercent) progressPercent.textContent = '100%';
                
                // Final Stabilization: display SYSTEM ONLINE, OPERATOR ACCESS GRANTED
                setTimeout(() => {
                    if (lines[5]) {
                        lines[5].innerHTML = '&gt; SYSTEM ONLINE';
                        lines[5].classList.add('nominal');
                        lines[5].style.display = 'block';
                    }
                    
                    setTimeout(() => {
                        if (lines[6]) {
                            lines[6].innerHTML = '&gt; OPERATOR ACCESS GRANTED';
                            lines[6].classList.add('nominal');
                            lines[6].style.display = 'block';
                        }
                        
                        // Reveal operator button
                        setTimeout(() => {
                            if (enterButtonContainer) {
                                enterButtonContainer.style.display = 'block';
                                enterButtonContainer.classList.add('reveal-on-scroll', 'materialize');
                            }
                        }, 200);
                    }, 250);
                }, 150);
                return;
            }
            
            percent++;
            if (progressFill) progressFill.style.width = percent + '%';
            if (progressPercent) progressPercent.textContent = percent + '%';
            setTimeout(updateProgress, 60);
        }
        
        // Start steady progress bar load
        updateProgress();
    }, delay);

    // Operator Access button click - Transition out of loader
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // Apply a brief screen glitch shake/skew
            document.body.style.animation = 'skew-glitch 0.3s ease-out';
            
            // Play boot out transition
            setTimeout(() => {
                if (loaderSection) loaderSection.style.display = 'none';
                if (archiveContent) {
                    archiveContent.style.display = 'block';
                    window.scrollTo(0, 0);
                    
                    // Initialize scroll reveal observer
                    initScrollReveal();
                    
                    // Run the first AI console query automatically as a welcome indicator
                    runConsoleQuery(1);
                }
            }, 300);
        });
    }

    // ----------------------------------------------------------------------
    // 2. SCROLL REVEAL INTERSECTION OBSERVER
    // ----------------------------------------------------------------------
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('materialize');
                    // Stop observing once animated in
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // ----------------------------------------------------------------------
    // 3. INTERACTIVE DIAGNOSTIC ACCORDION
    // ----------------------------------------------------------------------
    const diagnosticItems = document.querySelectorAll('.diagnostic-item');

    diagnosticItems.forEach(item => {
        item.addEventListener('click', () => {
            const isExpanded = item.classList.contains('revealed');
            
            // Close all open items first for a true single accordion
            diagnosticItems.forEach(otherItem => {
                otherItem.classList.remove('revealed');
                otherItem.setAttribute('aria-expanded', 'false');
                const otherTick = otherItem.querySelector('.expand-tick');
                if (otherTick) otherTick.textContent = '+';
            });

            // Toggle active item
            if (!isExpanded) {
                item.classList.add('revealed');
                item.setAttribute('aria-expanded', 'true');
                const tick = item.querySelector('.expand-tick');
                if (tick) tick.textContent = '×';
            }
        });

        // Add keyboard access support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });



    // ----------------------------------------------------------------------
    // 5. IDLE INTERFERENCE EFFECT & HIGH-INTENSITY GLITCH LOOP
    // ----------------------------------------------------------------------
    const scanlineOverlay = document.getElementById('scanline-overlay');
    let idleTimer = null;
    let idleGlitchInterval = null;
    const IDLE_LIMIT = 6000; // 6 seconds of inactivity to trigger idle state

    function triggerIdleState() {
        if (scanlineOverlay) {
            scanlineOverlay.classList.add('active');
        }
        
        // Start high-intensity glitch loop when idle
        if (!idleGlitchInterval) {
            triggerGlitch();
            idleGlitchInterval = setInterval(() => {
                triggerGlitch();
            }, 2000); // Trigger AXIS glitch every 2 seconds
        }
    }

    function resetIdleTimer() {
        // Remove active scanlines
        if (scanlineOverlay) {
            scanlineOverlay.classList.remove('active');
        }
        
        // Clear high-intensity glitch loop
        if (idleGlitchInterval) {
            clearInterval(idleGlitchInterval);
            idleGlitchInterval = null;
        }
        
        // Clear pending idle timeout
        clearTimeout(idleTimer);
        
        // Start initial idle timer
        idleTimer = setTimeout(triggerIdleState, IDLE_LIMIT);
    }

    // Listen to user interaction triggers
    const interactionEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    interactionEvents.forEach(evtName => {
        window.addEventListener(evtName, resetIdleTimer, { passive: true });
    });

    // Start initial idle timer
    resetIdleTimer();

    // ----------------------------------------------------------------------
    // 6. CONSTANT SYSTEM INTERFERENCE LOOP (SUBTLE GLITCH EVERY 10 SECONDS)
    // ----------------------------------------------------------------------
    setInterval(() => {
        // Do not trigger if in high-intensity idle glitching or during boot sequence
        if (idleGlitchInterval) return;
        if (document.body.classList.contains('glitch-critical-1') || document.body.classList.contains('glitch-critical-2')) return;
        
        // Trigger a subtle periodic glitch
        document.body.classList.add('glitch-idle');
        
        const glitchElements = document.querySelectorAll('.text-glitch');
        glitchElements.forEach(el => {
            el.classList.add('glitch-1');
        });
        
        setTimeout(() => {
            document.body.classList.remove('glitch-idle');
            glitchElements.forEach(el => {
                el.classList.remove('glitch-1');
            });
        }, 180);
    }, 10000);
});
