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

// Funktion til at indlæse checkbox-status fra localStorage og vise det korrekte billede
function loadCheckboxState() {
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        let isChecked = localStorage.getItem(checkbox.id) === 'true';
        checkbox.checked = isChecked;
    });

    // Indlæs det korrekte billede baseret på checkbox-status
    if (localStorage.getItem('lowResolution') === 'true') {
        switchToLowResolutionImage();
    } else {
        switchToHighResolutionImage();
    }
}

// Kald funktionen til at indlæse checkbox-status ved sideindlæsning
document.addEventListener('DOMContentLoaded', function() {
    loadCheckboxState();

    // Tilføj event listener til 'Lav opløsning' checkbox
    let lowResCheckbox = document.getElementById('lowResolution');
    if (lowResCheckbox) {
        lowResCheckbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('lowResolution', 'true');
                switchToLowResolutionImage();
            } else {
                localStorage.setItem('lowResolution', 'false');
                switchToHighResolutionImage();
            }
        });
    }
});

// Funktion til at skifte til lavopløsningsbilledet
function switchToLowResolutionImage() {
    let img = document.getElementById('dynamicImage');
    if (!img) {
        img = document.createElement('img');
        img.id = 'dynamicImage';
        img.className = 'dynamic-image';
        document.getElementById('imageContainer').appendChild(img);
    }
    img.src = '/wp-content/uploads/pexels-minan1398-1230157-scaled-1-low.jpg';
    img.alt = 'Low resolution example';
}

// Funktion til at skifte til højopløsningsbilledet
function switchToHighResolutionImage() {
    let img = document.getElementById('dynamicImage');
    if (!img) {
        img = document.createElement('img');
        img.id = 'dynamicImage';
        img.className = 'dynamic-image';
        document.getElementById('imageContainer').appendChild(img);
    }
    img.src = '/wp-content/uploads/pexels-minan1398-1230157-scaled-1.jpg';
    img.alt = 'High resolution example';
}
