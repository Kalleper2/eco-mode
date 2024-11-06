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

    // Indlæs de korrekte billeder og baggrundsbilleder baseret på checkbox-status
    if (localStorage.getItem('lowResolution') === 'true') {
        showLowResolutionImages();
        switchCottonbroToLowRes();
        switchSingkhamToLowRes();
        switchCookiecutterToLowRes();
        switchPixabayToLowRes();
        switchPokRieToLowRes();
    } else {
        showHighResolutionImages();
        switchCottonbroToHighRes();
        switchSingkhamToHighRes();
        switchCookiecutterToHighRes();
        switchPixabayToHighRes();
        switchPokRieToHighRes();
    }

    // Kontroller og deaktiver animationer, hvis de er slået fra
    toggleAnimations();
}

// Funktion til at aktivere/deaktivere animationer baseret på "Deaktiverede effekter" checkbox
function toggleAnimations() {
    const fadeElements = document.querySelectorAll('.elementor-heading-title, p, .elementor-icon-list-items, .elementor-icon-list-item, .elementor-button');

    if (localStorage.getItem('disableEffects') === 'true') {
        fadeElements.forEach(element => {
            element.classList.remove('fade-in'); // Fjern fade-in klassen
            element.style.opacity = 1; // Gør synlig uden animation
        });
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

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Opdater checkbox-status ved indlæsning
    loadCheckboxState();

    // Tilføj event listener til "Deaktiverede effekter" checkbox
    let disableEffectsCheckbox = document.getElementById('disableEffects');
    if (disableEffectsCheckbox) {
        // Sæt initial værdi fra localStorage
        disableEffectsCheckbox.checked = localStorage.getItem('disableEffects') === 'true';

        // Håndter ændringer uden at genindlæse
        disableEffectsCheckbox.addEventListener('change', function() {
            localStorage.setItem('disableEffects', disableEffectsCheckbox.checked);
            toggleAnimations(); // Kald funktionen direkte for at anvende ændringen i realtid
        });
    }


    // Tilføj event listener til "Lav opløsning" checkbox
    let lowResCheckbox = document.getElementById('lowResolution');
    if (lowResCheckbox) {
        lowResCheckbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('lowResolution', 'true');
                showLowResolutionImages();
                switchCottonbroToLowRes();
                switchSingkhamToLowRes();
                switchCookiecutterToLowRes();
                switchPixabayToLowRes();
                switchPokRieToLowRes();
            } else {
                localStorage.setItem('lowResolution', 'false');
                showHighResolutionImages();
                switchCottonbroToHighRes();
                switchSingkhamToHighRes();
                switchCookiecutterToHighRes();
                switchPixabayToHighRes();
                switchPokRieToHighRes();
            }
        });
    }
});



// Funktion til at skifte baggrundsbilledet "cottonbro" til lav opløsning
function switchCottonbroToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-d34a5bf');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-cottonbro-4065876-scaled-1-low.jpg)';
    });
}

// Funktion til at skifte baggrundsbilledet "cottonbro" til høj opløsning
function switchCottonbroToHighRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-d34a5bf');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-cottonbro-4065876-scaled-1.jpg)';
    });
}

// Funktion til at skifte baggrundsbilledet "singkham" til lav opløsning
function switchSingkhamToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-a5b6558');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-singkham-178541-1108572-scaled-low.jpg)';
    });
}

// Funktion til at skifte baggrundsbilledet "singkham" til høj opløsning
function switchSingkhamToHighRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-a5b6558');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-singkham-178541-1108572-scaled-1.jpg)';
    });
}

// Funktion til at skifte baggrundsbilledet "cookiecutter" til lav opløsning
function switchCookiecutterToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-feb7617');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-cookiecutter-1148820-scaled-low.jpg)';
    });
}

// Funktion til at skifte baggrundsbilledet "cookiecutter" til høj opløsning
function switchCookiecutterToHighRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-feb7617');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-cookiecutter-1148820-scaled-1.jpg)';
    });
}

// Funktion til at skifte baggrundsbilledet "pixabay" til lav opløsning
function switchPixabayToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-837457b');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-pixabay-433308-scaled-low.jpg)';
    });
}

// Funktion til at skifte baggrundsbilledet "pixabay" til høj opløsning
function switchPixabayToHighRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-837457b');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-pixabay-433308-scaled-1.jpg)';
    });
}

// Funktion til at skifte baggrundsbilledet "pok-rie" til lav opløsning
function switchPokRieToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-6497dba');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-pok-rie-33563-189524-scaled-low.jpg)';
    });
}

// Funktion til at skifte baggrundsbilledet "pok-rie" til høj opløsning
function switchPokRieToHighRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-6497dba');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-pok-rie-33563-189524-scaled-1.jpg)';
    });
}

// Funktion til at vise lavopløsningsbillederne
function showLowResolutionImages() {
    let imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach((container) => {
        container.innerHTML = ''; // Tøm containeren først

        let img = document.createElement('img');
        img.className = 'dynamic-image';
        img.style.borderRadius = '10px'; // Tilføj border radius

        // Tilføj billede med lav opløsning baseret på containerens id
        if (container.id === 'imageContainer1') {
            img.src = '/wp-content/uploads/pexels-minan1398-1230157-scaled-1-low.jpg';
            img.alt = 'Low resolution example 1';
        } else if (container.id === 'imageContainer2') {
            img.src = '/wp-content/uploads/pexels-akilmazumder-1072824-scaled-low.jpg';
            img.alt = 'Low resolution example 2';
        } else if (container.id === 'imageContainer3') {
            img.src = '/wp-content/uploads/pexels-minan1398-1006115-low.jpg';
            img.alt = 'Low resolution example 3';
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
        img.style.borderRadius = '10px'; // Tilføj border radius

        // Tilføj billede med høj opløsning baseret på containerens id
        if (container.id === 'imageContainer1') {
            img.src = '/wp-content/uploads/pexels-minan1398-1230157-scaled-1.jpg';
            img.alt = 'High resolution example 1';
        } else if (container.id === 'imageContainer2') {
            img.src = '/wp-content/uploads/pexels-akilmazumder-1072824-scaled.jpg';
            img.alt = 'High resolution example 2';
        } else if (container.id === 'imageContainer3') {
            img.src = '/wp-content/uploads/pexels-minan1398-1006115.jpg';
            img.alt = 'High resolution example 3';
        }

        container.appendChild(img);
    });
}

