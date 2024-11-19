document.addEventListener("DOMContentLoaded", function() {
    // Tjek om animationer er deaktiveret i localStorage
    const animationsDisabled = localStorage.getItem('disableEffects') === 'true';

    // Vælg alle elementer, der skal have fade-in-effekten
    const fadeElements = document.querySelectorAll('.elementor-heading-title, p, .elementor-icon-list-items, .elementor-icon-list-item, .elementor-button');

    fadeElements.forEach(element => {
        if (
            element.closest('[data-id="503a6a7"]') ||
            element.closest('[data-id="dd1da03"]') ||
            element.closest('[data-id="fe0b57a"]')
        ) {
            return;
        }

        if (animationsDisabled) {
            element.style.opacity = 1;
        } else {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            // Gør elementer usynlige først, hvis animationer ikke er deaktiveret
            element.style.opacity = 0;
            observer.observe(element);
        }
    });
});
