document.addEventListener('DOMContentLoaded', function() {
    // Opdater checkbox-status ved indlæsning
    loadCheckboxState();

    // Tilføj event listener til "Dark Mode" checkbox
    let darkModeCheckbox = document.getElementById('darkMode');
    if (darkModeCheckbox) {
        // Check dark mode status
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeCheckbox.checked = true;
        }

        darkModeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');

                // Ryd farverne til standard, hvis dark mode ikke er aktiveret
                document.documentElement.style.setProperty('--text-color', 'inherit');
            }
            // Trigger til at opdatere baggrundsfarven ved skift
            loadCheckboxState();
        });
    }
});
