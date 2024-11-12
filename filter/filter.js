function toggleDropdown() {
    const dropdown = document.getElementById("myDropdown");

    if (dropdown.classList.contains("show")) {
        // Start lukkeanimation
        dropdown.style.opacity = "0";
        dropdown.style.transform = "translateY(-10px)";

        // Vent på, at transitionen afsluttes, før vi skjuler elementet
        setTimeout(() => {
            dropdown.classList.remove("show");
            dropdown.style.visibility = "hidden";
        }, 300); // 300 ms svarer til transition-tiden i CSS
    } else {
        // Åbn dropdown
        dropdown.classList.add("show");
        dropdown.style.opacity = "1";
        dropdown.style.transform = "translateY(0)";
        dropdown.style.visibility = "visible";
    }
}

// Luk dropdownen, når der klikkes udenfor
window.addEventListener('click', function(event) {
    const dropdown = document.getElementById("myDropdown");
    const dropdownHeader = document.querySelector('.dropdown-header');

    // Tjek om klikket ikke er på dropdown-headeren eller dropdown-indholdet
    if (!dropdownHeader.contains(event.target) && !dropdown.contains(event.target)) {
        if (dropdown.classList.contains("show")) {
            // Start lukkeanimation
            dropdown.style.opacity = "0";
            dropdown.style.transform = "translateY(-10px)";

            // Vent på, at transitionen afsluttes, før vi skjuler elementet
            setTimeout(() => {
                dropdown.classList.remove("show");
                dropdown.style.visibility = "hidden";
            }, 300); // 300 ms svarer til transition-tiden i CSS
        }
    }
});





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

    // Anvend Dark Mode, hvis det er slået til
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

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

// Funktion til at aktivere/deaktivere animationer
function toggleAnimations() {
    const fadeElements = document.querySelectorAll('.elementor-heading-title, p, .elementor-icon-list-items, .elementor-icon-list-item, .elementor-button');

    if (localStorage.getItem('disableEffects') === 'true') {
        fadeElements.forEach(element => {
            element.classList.remove('fade-in');
            element.style.opacity = 1;
        });
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
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

    // Event listener til "Deaktiverede effekter" checkbox
    let disableEffectsCheckbox = document.getElementById('disableEffects');
    if (disableEffectsCheckbox) {
        disableEffectsCheckbox.checked = localStorage.getItem('disableEffects') === 'true';
        disableEffectsCheckbox.addEventListener('change', function() {
            localStorage.setItem('disableEffects', disableEffectsCheckbox.checked);
            toggleAnimations();
        });
    }

    // Event listener til "Lav opløsning" checkbox
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

    // Event listener til "Dark Mode" checkbox
    let darkModeCheckbox = document.getElementById('darkMode');
    if (darkModeCheckbox) {
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
            }
            // Opdaterer baggrundsfarven ved skift
            loadCheckboxState();
        });
    }
});

// Funktioner til at skifte billeder afhængigt af opløsning
function switchCottonbroToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-d34a5bf');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-cottonbro-4065876-scaled-1-low.jpg)';
    });
}

function switchCottonbroToHighRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-d34a5bf');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-cottonbro-4065876-scaled-1.jpg)';
    });
}

function switchSingkhamToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-a5b6558');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-singkham-178541-1108572-scaled-low.jpg)';
    });
}

function switchSingkhamToHighRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-a5b6558');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-singkham-178541-1108572-scaled-1.jpg)';
    });
}

function switchCookiecutterToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-feb7617');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-cookiecutter-1148820-scaled-low.jpg)';
    });
}

function switchCookiecutterToHighRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-feb7617');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-cookiecutter-1148820-scaled-1.jpg)';
    });
}

function switchPixabayToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-837457b');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-pixabay-433308-scaled-low.jpg)';
    });
}

function switchPixabayToHighRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-837457b');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-pixabay-433308-scaled-1.jpg)';
    });
}

function switchPokRieToLowRes() {
    let elements = document.querySelectorAll('.elementor-1070 .elementor-element.elementor-element-6497dba');
    elements.forEach((element) => {
        element.style.backgroundImage = 'url(/wp-content/uploads/pexels-pok-rie-33563-189524-scaled-low.jpg)';
    });
}

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
        img.style.borderRadius = '10px';

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
        container.innerHTML = '';

        let img = document.createElement('img');
        img.className = 'dynamic-image';
        img.style.borderRadius = '10px';

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
