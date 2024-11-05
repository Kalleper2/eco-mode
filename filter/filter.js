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

// Funktion til at indlæse checkbox-status fra localStorage og vise de korrekte billeder
function loadCheckboxState() {
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        let isChecked = localStorage.getItem(checkbox.id) === 'true';
        checkbox.checked = isChecked;
    });

    // Indlæs de korrekte billeder baseret på checkbox-status
    if (localStorage.getItem('lowResolution') === 'true') {
        showLowResolutionImages();
    } else {
        showHighResolutionImages();
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
                showLowResolutionImages();
            } else {
                localStorage.setItem('lowResolution', 'false');
                showHighResolutionImages();
            }
        });
    }
});

// Funktion til at vise lavopløsningsbillederne
function showLowResolutionImages() {
    let imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach((container) => {
        container.innerHTML = ''; // Tøm containeren først

        let img = document.createElement('img');
        img.className = 'dynamic-image';
        img.style.borderRadius = '5px'; // Tilføj border radius

        // Tilføj billede med lav opløsning baseret på containerens id
        if (container.id === 'imageContainer1') {
            img.src = '/wp-content/uploads/pexels-minan1398-1230157-scaled-1-low.jpg';
            img.alt = 'Low resolution example 1';
        } else if (container.id === 'imageContainer2') {
            img.src = '/wp-content/uploads/pexels-akilmazumder-1072824-scaled-low.jpg';
            img.alt = 'Low resolution example 2';
        }

        container.appendChild(img);
    });
}

// Funktion til at vise højopløsningsbillederne
function showHighResolutionImages() {
    let imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach((container) => {
        container.innerHTML = ''; // Tøm containeren først

        let img = document.createElement('img');
        img.className = 'dynamic-image';
        img.style.borderRadius = '5px'; // Tilføj border radius

        // Tilføj billede med høj opløsning baseret på containerens id
        if (container.id === 'imageContainer1') {
            img.src = '/wp-content/uploads/pexels-minan1398-1230157-scaled-1.jpg';
            img.alt = 'High resolution example 1';
        } else if (container.id === 'imageContainer2') {
            img.src = '/wp-content/uploads/pexels-akilmazumder-1072824-scaled.jpg';
            img.alt = 'High resolution example 2';
        }

        container.appendChild(img);
    });
}
