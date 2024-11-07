<?php
/**
 * Plugin Name: Eco Mode
 * Plugin URI: http://localhost:8888/
 * Description: Test.
 * Version: 0.1
 * Author: Kasper
 * Author URI: http://localhost:8888/
 */
// include 'eco-mode/eco-mode.php';
include 'filter/filter.php';
if ( ! defined( 'MY_PLUGIN_PATH' ) ) {
    define( 'MY_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'MY_PLUGIN_URL' ) ) {
    define( 'MY_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

// Hook to enqueue scripts and styles
function eco_mode_enqueue_assets() {
    // Enqueue eco-mode CSS
    // wp_enqueue_style(
    //     'eco-mode-css',
    //     plugins_url('eco-mode/index.css', __FILE__),
    //     array(),
    //     null,
    //     'all'
    // );

    // // Enqueue eco-mode JavaScript
    // wp_enqueue_script(
    //     'eco-mode-js',
    //     plugins_url('eco-mode/eco-mode.js', __FILE__),
    //     array(),
    //     null,
    //     true
    // );

    // Enqueue filter CSS
    wp_enqueue_style(
        'filter-css',
        plugins_url('filter/index.css', __FILE__),
        array(),
        null
    );

    // Enqueue filter JavaScript
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

    // Enqueue filter JavaScript
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

    // Enqueue filter JavaScript
    wp_enqueue_script(
        'dark-mode.js',
        plugins_url('dark-mode/dark-mode.js', __FILE__),
        array(),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'eco_mode_enqueue_assets');

