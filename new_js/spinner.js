// spinner-all-in-one.js - Shows immediately on first visit only
(function () {
    // Check if this is the first visit in this session
    if (sessionStorage.getItem('deLuxeFirstVisit') === 'true') {
        return; // Don't show spinner if already visited
    }

    // Mark first visit
    sessionStorage.setItem('deLuxeFirstVisit', 'true');

    // Inject CSS immediately - this loads before anything else
    const spinnerCSS = `
        #de-luxe-loading-spinner {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.8s ease, visibility 0.8s ease;
        }
        .de-luxe-spinner-container {
            position: relative;
            width: 140px;
            height: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .de-luxe-spinner-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 1px solid transparent;
            border-top: 1px solid #CFB53B;
            border-bottom: 1px solid #CFB53B;
            border-radius: 50%;
            animation: de-luxe-rotate 1.5s linear infinite;
        }
        .de-luxe-logo-container {
            position: relative;
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
        }
        .de-luxe-company-logo {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        @keyframes de-luxe-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Hide body content until spinner is done */
        body.de-luxe-loading {
            overflow: hidden;
        }
        body.de-luxe-loading > *:not(#de-luxe-loading-spinner) {
            opacity: 0;
        }
    `;

    const style = document.createElement('style');
    style.textContent = spinnerCSS;
    document.head.appendChild(style);

    // Create spinner HTML immediately
    const spinnerHTML = `
        <div id="de-luxe-loading-spinner">
            <div class="de-luxe-spinner-container">
                <div class="de-luxe-spinner-ring"></div>
                <div class="de-luxe-logo-container">
                    <img src="wp-content/uploads/sites/1544/2025/07/logo.png" 
                         class="de-luxe-company-logo" alt="DE-LUXE HOMES" />
                </div>
            </div>
        </div>
    `;

    // Add spinner as first element in body
    document.body.insertAdjacentHTML('afterbegin', spinnerHTML);

    // Add loading class to body to hide other content
    document.body.classList.add('de-luxe-loading');

    // Function to hide spinner and show content
    function hideSpinnerAndShowContent() {
        const spinner = document.getElementById('de-luxe-loading-spinner');
        if (spinner) {
            // Fade out spinner
            spinner.style.opacity = '0';
            spinner.style.visibility = 'hidden';

            // Remove loading class to show content
            document.body.classList.remove('de-luxe-loading');

            // Remove spinner from DOM after transition
            setTimeout(() => {
                spinner.remove();
            }, 800);
        }
    }

    // Hide spinner when page is fully loaded
    window.addEventListener('load', function () {
        // Ensure spinner shows for at least 1.5 seconds for brand impact
        setTimeout(hideSpinnerAndShowContent, 1500);
    });

    // Fallback - hide after 4 seconds max (in case page takes too long)
    setTimeout(hideSpinnerAndShowContent, 4000);
})();