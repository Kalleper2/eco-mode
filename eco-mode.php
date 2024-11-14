<?php
/**
 * Plugin Name: Eco Mode
 * Plugin URI: http://localhost:8888/
 * Description: Eco-mode Plugin
 * Version: 0.1
 * Author: Kasper
 * Author URI: http://localhost:8888/
 */

include 'filter/filter.php';

if ( ! defined( 'MY_PLUGIN_PATH' ) ) {
    define( 'MY_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'MY_PLUGIN_URL' ) ) {
    define( 'MY_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

// Hook til at enqueue scripts og styles
function eco_mode_enqueue_assets() {
    wp_enqueue_style(
        'filter-css',
        plugins_url('filter/index.css', __FILE__),
        array(),
        null
    );

    wp_enqueue_script(
        'filter-js',
        plugins_url('filter/filter.js', __FILE__),
        array(),
        null,
        true
    );

    wp_enqueue_style(
        'animationer-css',
        plugins_url('animationer/index.css', __FILE__),
        array(),
        null
    );

    wp_enqueue_script(
        'animationer-js',
        plugins_url('animationer/animationer.js', __FILE__),
        array(),
        null,
        true
    );

    wp_enqueue_style(
        'dark-mode-css',
        plugins_url('dark-mode/index.css', __FILE__),
        array(),
        null
    );

    wp_enqueue_script(
        'dark-mode-js',
        plugins_url('dark-mode/dark-mode.js', __FILE__),
        array(),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'eco_mode_enqueue_assets');

// Tilføj indstillingsmenuen og registrer indstillinger
add_action('admin_menu', 'eco_mode_add_settings_page');
add_action('admin_init', 'eco_mode_register_settings');

// Tilføj en indstillingsside til pluginet
function eco_mode_add_settings_page() {
    add_options_page(
        'Eco Mode Indstillinger',
        'Eco Mode',
        'read',
        'eco_mode_settings',
        'eco_mode_render_settings_page'
    );
}

// Render indstillingssiden
function eco_mode_render_settings_page() {
    ?>
    <div class="wrap">
        <h1>Eco Mode Indstillinger</h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('eco_mode_settings');
            do_settings_sections('eco_mode_settings');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

// Registrer indstillingerne
function eco_mode_register_settings() {
    register_setting('eco_mode_settings', 'eco_mode_dark_mode');
    register_setting('eco_mode_settings', 'eco_mode_low_resolution');
    register_setting('eco_mode_settings', 'eco_mode_disable_effects');

    add_settings_section(
        'eco_mode_settings_section',
        'Basisindstillinger',
        'eco_mode_settings_section_callback',
        'eco_mode_settings'
    );

    add_settings_field(
        'eco_mode_dark_mode_field',
        'Aktiver Dark Mode',
        'eco_mode_dark_mode_field_callback',
        'eco_mode_settings',
        'eco_mode_settings_section'
    );

    add_settings_field(
        'eco_mode_low_resolution_field',
        'Lav opløsning på billeder',
        'eco_mode_low_resolution_field_callback',
        'eco_mode_settings',
        'eco_mode_settings_section'
    );

    add_settings_field(
        'eco_mode_disable_effects_field',
        'Deaktiver animationer',
        'eco_mode_disable_effects_field_callback',
        'eco_mode_settings',
        'eco_mode_settings_section'
    );
}

// Callback til at vise sektionen
function eco_mode_settings_section_callback() {
    echo '<p>Tilpas Eco Mode indstillingerne her.</p>';
}

// Callback til Dark Mode feltet
function eco_mode_dark_mode_field_callback() {
    $option = get_option('eco_mode_dark_mode');
    echo "<input type='checkbox' name='eco_mode_dark_mode' value='1' " . checked(1, $option, false) . " /> Aktiver Dark Mode";
}

// Callback til Lav opløsning feltet
function eco_mode_low_resolution_field_callback() {
    $option = get_option('eco_mode_low_resolution');
    echo "<input type='checkbox' name='eco_mode_low_resolution' value='1' " . checked(1, $option, false) . " /> Lav opløsning på billeder";
}

// Callback til Deaktiver effekter feltet
function eco_mode_disable_effects_field_callback() {
    $option = get_option('eco_mode_disable_effects');
    echo "<input type='checkbox' name='eco_mode_disable_effects' value='1' " . checked(1, $option, false) . " /> Deaktiver animationer";
}

// Nulstil alle indstillinger, hvis de er blevet deaktiveret
function eco_mode_reset_settings_on_save($option_name, $old_value, $new_value) {
    if (
        !get_option('eco_mode_dark_mode') &&
        !get_option('eco_mode_low_resolution') &&
        !get_option('eco_mode_disable_effects')
    ) {
        // Sæt alle indstillinger til "off" (nulstil)
        update_option('eco_mode_dark_mode', 0);
        update_option('eco_mode_low_resolution', 0);
        update_option('eco_mode_disable_effects', 0);
    }
}

add_action('update_option_eco_mode_dark_mode', 'eco_mode_reset_settings_on_save', 10, 3);
add_action('update_option_eco_mode_low_resolution', 'eco_mode_reset_settings_on_save', 10, 3);
add_action('update_option_eco_mode_disable_effects', 'eco_mode_reset_settings_on_save', 10, 3);

// Tilføj et "Indstillinger"-link til pluginsiden i WordPress
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'eco_mode_settings_link');

function eco_mode_settings_link($links) {
    $settings_link = '<a href="options-general.php?page=eco_mode_settings">Indstillinger</a>';
    array_push($links, $settings_link);
    return $links;
}

// Enqueue admin script til at rydde localStorage
add_action('admin_enqueue_scripts', 'eco_mode_admin_enqueue_script');

function eco_mode_admin_enqueue_script($hook) {
    // Kun indlæs scriptet på vores plugins indstillingsside
    if ($hook != 'settings_page_eco_mode_settings') {
        return;
    }

    // Tilføj JavaScript til at rydde localStorage, når indstillinger ændres
    ?>
    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            const darkModeCheckbox = document.querySelector("input[name='eco_mode_dark_mode']");
            const lowResCheckbox = document.querySelector("input[name='eco_mode_low_resolution']");
            const disableEffectsCheckbox = document.querySelector("input[name='eco_mode_disable_effects']");

            // Lyt på ændringer for hver checkbox og fjern localStorage nøgle, hvis den er slået fra
            darkModeCheckbox.addEventListener('change', function() {
                if (!this.checked) {
                    localStorage.removeItem('darkMode');
                }
            });

            lowResCheckbox.addEventListener('change', function() {
                if (!this.checked) {
                    localStorage.removeItem('lowResolution');
                }
            });

            disableEffectsCheckbox.addEventListener('change', function() {
                if (!this.checked) {
                    localStorage.removeItem('disableEffects');
                }
            });
        });
    </script>
    <?php
}
