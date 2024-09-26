(function() {
    var playlistBtn = document.getElementById('playlistBtn');
    var mobileHeaderBtn = document.getElementById('mobileHeaderBtn');
    var desktopHeaderBtn = document.getElementById('desktopHeaderBtn');

    var imageContainer = document.getElementById('imageContainer');
    var zoomControls = document.getElementById('zoomControls');
    var zoomSlider = document.getElementById('zoomSlider');

    var currentOverlayType = null;
    var overlay = null;

    function createOverlay(aspectRatio) {
        // Remove existing overlay if any
        if (overlay) {
            imageContainer.removeChild(overlay);
            overlay = null;
        }

        // Create overlay div
        overlay = document.createElement('div');
        overlay.className = 'overlay';

        // Set window size percentages
        var windowWidthPercent = 60; // Window width as a percentage
        var windowHeightPercent = windowWidthPercent / aspectRatio;

        // Calculate positions
        var leftWidthPercent = (100 - windowWidthPercent) / 2;
        var rightWidthPercent = leftWidthPercent;
        var topHeightPercent = (100 - windowHeightPercent) / 2;
        var bottomHeightPercent = topHeightPercent;

        // Create the four walls
        var topWall = document.createElement('div');
        topWall.className = 'wall';
        topWall.style.top = '0';
        topWall.style.left = '0';
        topWall.style.width = '100%';
        topWall.style.height = topHeightPercent + '%';

        var bottomWall = document.createElement('div');
        bottomWall.className = 'wall';
        bottomWall.style.bottom = '0';
        bottomWall.style.left = '0';
        bottomWall.style.width = '100%';
        bottomWall.style.height = bottomHeightPercent + '%';

        var leftWall = document.createElement('div');
        leftWall.className = 'wall';
        leftWall.style.top = topHeightPercent + '%';
        leftWall.style.left = '0';
        leftWall.style.width = leftWidthPercent + '%';
        leftWall.style.height = windowHeightPercent + '%';

        var rightWall = document.createElement('div');
        rightWall.className = 'wall';
        rightWall.style.top = topHeightPercent + '%';
        rightWall.style.right = '0';
        rightWall.style.width = rightWidthPercent + '%';
        rightWall.style.height = windowHeightPercent + '%';

        // Append walls to overlay
        overlay.appendChild(topWall);
        overlay.appendChild(bottomWall);
        overlay.appendChild(leftWall);
        overlay.appendChild(rightWall);

        // Append overlay to imageContainer
        imageContainer.appendChild(overlay);
    }

    function toggleOverlay(type, button) {
        if (currentOverlayType === type) {
            // If the same overlay is active, remove it
            if (overlay) {
                imageContainer.removeChild(overlay);
                overlay = null;
                currentOverlayType = null;
                // Hide zoom controls
                zoomControls.style.display = 'none';
                // Reset button styles
                button.classList.remove('active');
            }
        } else {
            // Show the zoom slider
            zoomControls.style.display = 'block';
            // Reset zoom slider to 100%
            zoomSlider.value = 100;
            // Trigger input event to update zoom level
            zoomSlider.dispatchEvent(new Event('input'));
            currentOverlayType = type;
            // Reset all buttons
            var buttons = document.querySelectorAll('.btn');
            buttons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            // Activate current button
            button.classList.add('active');
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
        toggleOverlay('playlist', this);
    });

    mobileHeaderBtn.addEventListener('click', function() {
        toggleOverlay('mobileHeader', this);
    });

    desktopHeaderBtn.addEventListener('click', function() {
        toggleOverlay('desktopHeader', this);
    });
})();
