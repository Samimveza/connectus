/*!
    * Start Bootstrap - SB Admin Pro v2.0.3 (https://shop.startbootstrap.com/product/sb-admin-pro)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under SEE_LICENSE (https://github.com/StartBootstrap/sb-admin-pro/blob/master/LICENSE)
    */
window.addEventListener('DOMContentLoaded', event => {
    if (typeof feather !== 'undefined') {
        // Activate feather
        feather.replace();
    }

    // Enable tooltips globally
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Enable popovers globally
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

$(function () {
    angular.element(function () {
        angular.bootstrap(document, ['baseModule']);
    });
})

function requestFullscreenAndLockOrientation(orientation) {
    // First, request fullscreen
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
        docEl.requestFullscreen().then(() => {
            // Once in fullscreen, attempt to lock the orientation
            lockOrientation(orientation);
        }).catch((error) => {
            console.warn(`Fullscreen request error: ${error}`);
        });
    } else {
        console.warn("Fullscreen API not supported");
    }
}

// Function to lock the screen orientation
function lockOrientation(orientation) {
    // Check if the screen.orientation and lock method are supported by the browser
    if (screen.orientation && screen.orientation.lock) {
        // Request to lock the screen orientation to the specified orientation
        screen.orientation.lock(orientation).then(() => {
            console.log(`Orientation locked to ${orientation}`);
        }).catch((error) => {
            console.warn(`Orientation lock error: ${error}`);
        });
    } else {
        console.warn("Screen orientation API not supported");
    }
}

//requestFullscreenAndLockOrientation();