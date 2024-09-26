(function() {
    var playlistBtn = document.getElementById('playlistBtn');
    var mobileHeaderBtn = document.getElementById('mobileHeaderBtn');
    var desktopHeaderBtn = document.getElementById('desktopHeaderBtn');

    var zoomPanContainer = document.getElementById('zoomPanContainer');
    var zoomControls = document.getElementById('zoomControls');
    var zoomSlider = document.getElementById('zoomSlider');

    var currentOverlayType = null;
    var overlay = null;

    function createOverlay(aspectRatio) {
        // Remove existing overlay if any
        if (overlay) {
            zoomPanContainer.removeChild(overlay);
            overlay = null;
        }

        // Create overlay div
        overlay = document.createElement('div');
        overlay.className = 'overlay';

        // Create overlay-frame div (the transparent window)
        var frame = document.createElement('div');
        frame.className = 'overlay-frame';

        // Set frame size
        var windowWidthPercent = 60; // window width is 60% of viewport width
        var windowWidth = windowWidthPercent + '%';
        var windowHeight = (windowWidthPercent / aspectRatio) + '%';

        frame.style.width = windowWidth;
        frame.style.height = windowHeight;

        // Append frame to overlay
        overlay.appendChild(frame);

        // Append overlay to zoomPanContainer
        zoomPanContainer.appendChild(overlay);

        // Handle window resize
        window.addEventListener('resize', function() {
            // Recalculate frame size
            frame.style.width = windowWidth;
            frame.style.height = (windowWidthPercent / aspectRatio) + '%';
        });
    }

    function toggleOverlay(type) {
        if (currentOverlayType === type) {
            // If the same overlay is active, remove it
            if (overlay) {
                zoomPanContainer.removeChild(overlay);
                overlay = null;
                currentOverlayType = null;
                // Hide zoom controls
                zoomControls.style.display = 'none';
            }
        } else {
            // Show the zoom slider
            zoomControls.style.display = 'block';
            // Reset zoom slider to 100%
            zoomSlider.value = 100;
            // Trigger input event to update zoom level
            zoomSlider.dispatchEvent(new Event('input'));
            currentOverlayType = type;
            if (type === 'playlist') {
                createOverlay(1); // Aspect ratio 1:1
            } else if (type === 'mobileHeader') {
                createOverlay(750 / 760); // Aspect ratio 750:760
            } else if (type === 'desktopHeader') {
                createOverlay(2660 / 1496); // Aspect ratio 2660:1496
            }
        }
    }

    playlistBtn.addEventListener('click', function() {
        toggleOverlay('playlist');
    });

    mobileHeaderBtn.addEventListener('click', function() {
        toggleOverlay('mobileHeader');
    });

    desktopHeaderBtn.addEventListener('click', function() {
        toggleOverlay('desktopHeader');
    });
})();
