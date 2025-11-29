// spinner.js
function showDELuxeSpinner() {
    // Create spinner HTML
    const spinnerHTML = `
        <div id="loading-spinner">
            <div class="de-luxe-spinner-container">
                <div class="de-luxe-spinner-ring"></div>
                <div class="de-luxe-logo-container">
                    <img src="wp-content/uploads/sites/1544/2025/07/logo.png" 
                         class="de-luxe-company-logo" alt="DE-LUXE HOMES" />
                </div>
            </div>
        </div>
    `;

    // Add spinner to page
    document.body.insertAdjacentHTML('afterbegin', spinnerHTML);
}

function hideDELuxeSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Show spinner immediately when script loads
showDELuxeSpinner();

// Hide spinner when page is fully loaded
window.addEventListener('load', function () {
    setTimeout(hideDELuxeSpinner, 2000);
});

// Fallback: hide after 5 seconds max
setTimeout(hideDELuxeSpinner, 5000);