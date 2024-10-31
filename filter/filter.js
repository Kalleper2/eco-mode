// Funktion til at vise/skjule dropdown
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Luk dropdownen, når der klikkes udenfor
window.onclick = function(event) {
    if (!event.target.closest('.dropdown-header') && !event.target.closest('.dropdown-content')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// Funktion til at gemme checkbox-status i localStorage
function saveCheckboxState() {
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        localStorage.setItem(checkbox.id, checkbox.checked);
    });
}

// Funktion til at indlæse checkbox-status fra localStorage
function loadCheckboxState() {
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        let isChecked = localStorage.getItem(checkbox.id) === 'true';
        checkbox.checked = isChecked;
    });
}

// Kald funktionen til at indlæse checkbox-status ved sideindlæsning
document.addEventListener('DOMContentLoaded', loadCheckboxState);

// Tilføj event listeners til checkboxes for at gemme status ved ændring
document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', saveCheckboxState);
});