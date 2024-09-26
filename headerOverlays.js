(function() {
    var playlistBtn = document.getElementById('playlistBtn');
    var mobileHeaderBtn = document.getElementById('mobileHeaderBtn');
    var desktopHeaderBtn = document.getElementById('desktopHeaderBtn');

    var zoomPanContainer = document.getElementById('zoomPanContainer');

    var currentOverlay = null;

    function createOverlay(aspectRatio) {
        var overlay = document.createElement('div');
        overlay.className = 'overlay';

        var frame = document.createElement('div');
        frame.className = 'overlay-frame';

        var frameWidthPercent = 80;

        frame.style.width = frameWidthPercent + '%';
        frame.style.height = '0';
        frame.style.paddingBottom = (frameWidthPercent / aspectRatio) + '%';

        overlay.appendChild(frame);

        return overlay;
    }

    function showOverlay(type) {
        // Remove existing overlay if any
        if (currentOverlay) {
            zoomPanContainer.removeChild(currentOverlay);
            currentOverlay = null;
        }

        var overlay;
        if (type === 'playlist') {
            overlay = createOverlay(1);
        } else if (type === 'mobileHeader') {
            overlay = createOverlay(750/760);
        } else if (type === 'desktopHeader') {
            overlay = createOverlay(2660/1496);
        }

        // Add overlay to the zoomPanContainer
        currentOverlay = overlay;
        zoomPanContainer.appendChild(overlay);
    }

    playlistBtn.addEventListener('click', function() {
        showOverlay('playlist');
    });

    mobileHeaderBtn.addEventListener('click', function() {
        showOverlay('mobileHeader');
    });

    desktopHeaderBtn.addEventListener('click', function() {
        showOverlay('desktopHeader');
    });

})();
