(function() {
    var playlistBtn = document.getElementById('playlistBtn');
    var mobileHeaderBtn = document.getElementById('mobileHeaderBtn');
    var desktopHeaderBtn = document.getElementById('desktopHeaderBtn');

    var imageContainer = document.getElementById('imageContainer');

    var currentOverlayType = null;
    var overlay = null;

    function createOverlay(type) {
        // Remove existing overlay if any
        if (overlay) {
            imageContainer.removeChild(overlay);
            overlay = null;
        }

        // Create overlay div
        overlay = document.createElement('div');
        overlay.className = 'overlay';

        // Define fixed window sizes based on type and screen size
        var windowWidth, windowHeight, aspectRatio;

        if (type === 'playlist') {
            aspectRatio = 1; // 1:1
            if (window.innerWidth < 500) {
                windowWidth = 350;
            } else {
                windowWidth = 700;
            }
            windowHeight = windowWidth / aspectRatio;
        } else if (type === 'mobileHeader') {
            aspectRatio = 750 / 760; // 750:760
            if (window.innerWidth < 500) {
                windowWidth = 350;
            } else {
                windowWidth = 700;
            }
            windowHeight = windowWidth / aspectRatio;
        } else if (type === 'desktopHeader') {
            aspectRatio = 2660 / 1496; // 2660:1496
            windowWidth = Math.min(946, window.innerWidth * 0.8);
            windowHeight = windowWidth / aspectRatio;
        }

        // Calculate wall dimensions
        var leftWallWidth = (window.innerWidth - windowWidth) / 2;
        var rightWallWidth = leftWallWidth;
        var topWallHeight = (window.innerHeight - windowHeight) / 3; // More wall at the bottom
        var bottomWallHeight = window.innerHeight - windowHeight - topWallHeight;

        // Create the four walls
        var topWall = document.createElement('div');
        topWall.className = 'wall';
        topWall.style.top = '0';
        topWall.style.left = '0';
        topWall.style.width = '100%';
        topWall.style.height = topWallHeight + 'px';

        var bottomWall = document.createElement('div');
        bottomWall.className = 'wall';
        bottomWall.style.bottom = '0';
        bottomWall.style.left = '0';
        bottomWall.style.width = '100%';
        bottomWall.style.height = bottomWallHeight + 'px';

        var leftWall = document.createElement('div');
        leftWall.className = 'wall';
        leftWall.style.top = topWallHeight + 'px';
        leftWall.style.left = '0';
        leftWall.style.width = leftWallWidth + 'px';
        leftWall.style.height = windowHeight + 'px';

        var rightWall = document.createElement('div');
        rightWall.className = 'wall';
        rightWall.style.top = topWallHeight + 'px';
        rightWall.style.right = '0';
        rightWall.style.width = rightWallWidth + 'px';
        rightWall.style.height = windowHeight + 'px';

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
                // Reset button styles
                button.classList.remove('active');
            }
        } else {
            currentOverlayType = type;
            // Reset all buttons
            var buttons = document.querySelectorAll('.btn');
            buttons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            // Activate current button
            button.classList.add('active');
            createOverlay(type);
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

    // Adjust overlay on window resize
    window.addEventListener('resize', function() {
        if (currentOverlayType) {
            createOverlay(currentOverlayType);
        }
    });
})();
