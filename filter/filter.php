<?php
function simple_link_dropdown_shortcode() {
    ob_start();

    // Hent indstillingerne for at vise eller skjule mulighederne
    $dark_mode_enabled = get_option('eco_mode_dark_mode');
    $low_res_enabled = get_option('eco_mode_low_resolution');
    $disable_effects_enabled = get_option('eco_mode_disable_effects');

    ?>
    <div class="dropdown">
        <div class="dropdown-header" onclick="toggleDropdown()">
            <span>Eco-mode</span>
            <img src="<?php echo MY_PLUGIN_URL; ?>images/Eco-mode-logo-billede-hvid.png" alt="Eco-mode icon" class="eco-mode-icon">
        </div>
        <div id="myDropdown" class="dropdown-content">
            <?php if ($dark_mode_enabled): ?>
                <label>
                    <input type="checkbox" id="darkMode" checked>
                    Dark mode
                </label>
            <?php endif; ?>

            <?php if ($low_res_enabled): ?>
                <label>
                    <input type="checkbox" id="lowResolution" checked>
                    Lav opløsning på billeder
                </label>
            <?php endif; ?>

            <?php if ($disable_effects_enabled): ?>
                <label>
                    <input type="checkbox" id="disableEffects" checked>
                    Deaktiver animationer
                </label>
            <?php endif; ?>
        </div>
    </div>
    <?php

    return ob_get_clean();
}
add_shortcode('simple_link_dropdown', 'simple_link_dropdown_shortcode');
