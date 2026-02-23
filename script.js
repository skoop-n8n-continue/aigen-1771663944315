document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');

    // Helper to split text into characters
    const splitText = (element) => {
        const text = element.textContent;
        element.innerHTML = '';
        return [...text].map(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
            span.className = 'char';
            element.appendChild(span);
            return span;
        });
    };

    const titleChars = splitText(title);
    const subtitleChars = splitText(subtitle);

    // Initial state: hide everything
    gsap.set([titleChars, subtitleChars], { opacity: 0, y: 20 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // 1. Initial Appearance
    tl.to(titleChars, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out"
    })
    .to(subtitleChars, {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power2.out"
    }, "-=0.4");

    // 2. Stay for a bit
    tl.addLabel("visible");

    // 3. Float Away (Disperse)
    tl.to(titleChars, {
        x: () => (Math.random() - 0.5) * 400,
        y: () => (Math.random() - 0.5) * 400,
        rotation: () => (Math.random() - 0.5) * 90,
        opacity: 0.6,
        duration: 2.5,
        ease: "power1.inOut",
        stagger: {
            each: 0.05,
            from: "random"
        }
    }, "+=1.5")
    .to(subtitleChars, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power1.in"
    }, "-=2");

    // 4. Bounce Back
    tl.to(titleChars, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        ease: "bounce.out",
        stagger: {
            each: 0.05,
            from: "center"
        }
    })
    .to(subtitleChars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5");

    console.log('GSAP Animation initialized');
});
