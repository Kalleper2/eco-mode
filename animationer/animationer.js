document.addEventListener("DOMContentLoaded", function() {
    // Tjek om animationer er deaktiveret i localStorage
    const animationsDisabled = localStorage.getItem('disableEffects') === 'true';

    // Vælg alle elementer, der skal have fade-in-effekten
    const fadeElements = document.querySelectorAll('.elementor-heading-title, p, .elementor-icon-list-items, .elementor-icon-list-item, .elementor-button');

    fadeElements.forEach(element => {
        // Spring elementer over med data-id="503a6a7", data-id="dd1da03" eller data-id="fe0b57a"
        if (
            element.closest('[data-id="503a6a7"]') ||
            element.closest('[data-id="dd1da03"]') ||
            element.closest('[data-id="fe0b57a"]')
        ) {
            return; // Gå til næste element
        }

        if (animationsDisabled) {
            // Hvis animationer er deaktiveret, sæt synlighed til 1 med det samme uden animation
            element.style.opacity = 1; // Gør elementerne synlige uden animation
        } else {
            // Hvis effekter ikke er deaktiveret, tilføj observer for fade-in
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in'); // Tilføj fade-in klassen
                        observer.unobserve(entry.target); // Stop observeringen for at spare ressourcer
                    }
                });
            }, { threshold: 0.1 });

            // Gør elementer usynlige først, hvis animationer ikke er deaktiveret
            element.style.opacity = 0;
            observer.observe(element);
        }
    });
});
