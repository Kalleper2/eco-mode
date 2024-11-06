document.addEventListener("DOMContentLoaded", function() {
    // Vælg alle elementer, der skal have fade-in-effekten
    const fadeElements = document.querySelectorAll('.elementor-heading-title, p, .elementor-icon-list-items, .elementor-icon-list-item, .elementor-button');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Tilføj fade-in klassen
                observer.unobserve(entry.target); // Stop observeringen for at spare ressourcer
            }
        });
    }, { threshold: 0.1 }); // Trigger animation, når 10% af elementet er synligt

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
