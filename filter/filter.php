<?php
function simple_link_dropdown_shortcode() {
    ob_start();
    ?>
    <div class="dropdown">
        <div class="dropdown-header" onclick="toggleDropdown()">
            <!-- Tilføj ikon ved siden af teksten -->
            <span>Eco-mode</span>
            <img src="<?php echo MY_PLUGIN_URL; ?>images/Eco-mode-logo-billede-hvid.png" alt="Eco-mode icon" class="eco-mode-icon">
        </div>
        <div id="myDropdown" class="dropdown-content">
            <label>
                <input type="checkbox" id="lowResolution">
                Lav opløsning på billederasfasdf
            </label>
            <label>
                <input type="checkbox" id="adaptiveImages">
                Mindre billedstørrelser
            </label>
            <label>
                <input type="checkbox" id="disableEffects">
                Deaktiverede effekter
            </label>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('simple_link_dropdown', 'simple_link_dropdown_shortcode');
