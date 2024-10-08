function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var imageUrl = getQueryParam('imageUrl');
if (imageUrl) {
    var imageContainer = document.getElementById('imageContainer');
    var zoomPanContainer = document.getElementById('zoomPanContainer');
    var img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Image';
    var errorMessage = document.getElementById('errorMessage');
    var versionInfo = document.getElementById('versionInfo');
    var downloadBtn = document.getElementById('downloadBtn');
    var copyBtn = document.getElementById('copyBtn');
    var zoomSlider = document.getElementById('zoomSlider');
    var currentOverlayType = null;
    var overlayWindowWidth = 0;
    var overlayWindowHeight = 0;
    let zoomLevel = 1; // Default zoom level is 1 (100%)
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;
    let imageHasTransparency = false;

    // Update versionInfo with correct zoom level and image size
    function updateInfo() {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        let zoomText = `Zoom: ${Math.round(zoomLevel * 100)}%`;

        let transparencyText = imageHasTransparency ? "Image has transparency<br>" : "";

        let sizeWarning = getSizeWarning();

        versionInfo.innerHTML = `
            Use zoom slider or Alt + Scroll Wheel to zoom<br>
            Click & drag to pan<br>
            ${zoomText}<br>
            ${transparencyText}
            ${sizeWarning}
            Img size: ${width} x ${height} px<br>
            site v3.1
        `;
    }

    function getSizeWarning() {
        if (!currentOverlayType) return '';
        if (overlayWindowWidth === 0 || overlayWindowHeight === 0) return '';

        let requiredWidth;
        let requiredHeight;
        if (currentOverlayType === 'playlist') {
            requiredWidth = 1280;
            requiredHeight = 1280;
        } else if (currentOverlayType === 'mobileHeader') {
            requiredWidth = 750;
            requiredHeight = 760;
        } else if (currentOverlayType === 'desktopHeader') {
            requiredWidth = 2660;
            requiredHeight = 1496;
        }

        // Calculate effective image size in the window
        let scale = zoomLevel * (overlayWindowWidth / window.innerWidth);
        let effectiveWidth = img.naturalWidth * scale;
        let effectiveHeight = img.naturalHeight * scale;

        if (effectiveWidth < requiredWidth || effectiveHeight < requiredHeight) {
            return `<span style="color: red;">Warning: Image resolution may be too low for this overlay.</span><br>`;
        } else {
            return '';
        }
    }

    // Update the zoom level based on the slider
    zoomSlider.addEventListener('input', function(e) {
        zoomLevel = zoomSlider.value / 100; // Slider value is from 10 to 300
        updateTransform();
        updateInfo();
    });

    function updateTransform() {
        zoomPanContainer.style.transform = `scale(${zoomLevel}) translate(${translateX / zoomLevel}px, ${translateY / zoomLevel}px)`;
    }

    // Pan functionality to drag the image
    zoomPanContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        zoomPanContainer.style.cursor = 'grabbing';
        e.preventDefault();
    });

    zoomPanContainer.addEventListener('mousemove', function(e) {
        if (isDragging) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        }
    });

    zoomPanContainer.addEventListener('mouseup', function() {
        isDragging = false;
        zoomPanContainer.style.cursor = 'grab';
    });

    zoomPanContainer.addEventListener('mouseleave', function() {
        isDragging = false;
        zoomPanContainer.style.cursor = 'grab';
    });

    // Alt + Scroll Wheel zoom functionality
    imageContainer.addEventListener('wheel', function(e) {
        if (e.altKey) {
            e.preventDefault();
            let delta = e.deltaY > 0 ? -5 : 5; // Adjust zoom speed
            let newZoomValue = parseInt(zoomSlider.value) + delta;
            newZoomValue = Math.max(10, Math.min(300, newZoomValue)); // Clamp between 10 and 300
            zoomSlider.value = newZoomValue;
            zoomLevel = newZoomValue / 100;
            updateTransform();
            updateInfo();
        }
    });

    // Detect if image has transparency
    function checkTransparency() {
        let canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        for (let i = 3; i < data.length; i += 4) {
            if (data[i] < 255) {
                imageHasTransparency = true;
                break;
            }
        }
        updateInfo();
    }

    // When the image is loaded, show dimensions and set the download link
    img.onload = function() {
        updateInfo(); // Display info immediately when the image loads
        downloadBtn.href = img.src; // Set download link to the image source
        updateTransform(); // Initialize transform
        checkTransparency(); // Check if image has transparency
    };

    // Handle copying the image URL to the clipboard
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(img.src).then(function() {
            showCopyNotification();
        }).catch(function(err) {
            alert('Failed to copy: ' + err);
        });
    });

    function showCopyNotification() {
        var notification = document.getElementById('copyNotification');
        notification.style.display = 'block';
        setTimeout(function() {
            notification.style.display = 'none';
        }, 2000); // Hide after 2 seconds
    }

    zoomPanContainer.appendChild(img);
} else {
    document.getElementById('versionInfo').innerHTML = 'No image URL provided.';
}
        // Hide any error message
        errorMessage.style.display = 'none';
        img.style.display = 'block';

// Background toggle functionality
(function() {
    var bgButtons = document.querySelectorAll('.bg-btn');

    bgButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            bgButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            // Add active class to the clicked button
            this.classList.add('active');

            var bg = this.getAttribute('data-bg');
            document.body.classList.remove('transparent');
            document.body.style.backgroundColor = '';

            if (bg === 'transparent') {
                document.body.classList.add('transparent');
            } else {
                document.body.style.backgroundColor = bg;
            }
        });
    });
})();
    img.onerror = function() {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Cannot load image preview.\nUnsupported image format or broken link.';
        img.style.display = 'none'; // Hide the broken image icon
    };
