function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var imageUrl = getQueryParam('imageUrl');
if (imageUrl) {
    var imageContainer = document.getElementById('imageContainer');
    var img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Image';
    var versionInfo = document.getElementById('versionInfo');
    var downloadBtn = document.getElementById('downloadBtn');
    var copyBtn = document.getElementById('copyBtn');

    let zoomLevel = 0; // 0 = fit to screen, 1 = 100%, 2 = 200%
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;

    // Update versionInfo with correct zoom level and image size
    function updateInfo() {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        let zoomText = "";

        if (zoomLevel === 1) {
            zoomText = "Zoom: 100%";
        } else if (zoomLevel === 2) {
            zoomText = "Zoom: 200%";
        }

        versionInfo.innerHTML = `
            Double click to zoom<br>
            Click & drag to pan<br>
            ${zoomText}<br>
            Img size: ${width} x ${height} px<br>
            site v2.8
        `;
    }

    // Handle double click to zoom
    img.addEventListener('dblclick', function(e) {
        if (zoomLevel === 0) {
            // Zoom in to 100% of image's natural size
            zoomLevel = 1;
            img.style.transform = `scale(${img.naturalWidth / img.clientWidth}) translate(${translateX}px, ${translateY}px)`;
            img.classList.add('zoomed');
        } else if (zoomLevel === 1) {
            // Zoom in to 200%
            zoomLevel = 2;
            img.style.transform = `scale(${2 * img.naturalWidth / img.clientWidth}) translate(${translateX}px, ${translateY}px)`;
            img.classList.add('zoomed');
        } else {
            // Reset to fit-to-screen size
            zoomLevel = 0;
            img.style.transform = `scale(1) translate(0px, 0px)`;
            img.classList.remove('zoomed');
            translateX = 0;
            translateY = 0;
        }

        updateInfo();
    });

    // Simple pan functionality to drag the image
    img.addEventListener('mousedown', function(e) {
        if (zoomLevel > 0) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            img.style.cursor = 'grabbing';
            e.preventDefault();
        }
    });

    img.addEventListener('mousemove', function(e) {
        if (isDragging) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            img.style.transform = `scale(${zoomLevel === 1 ? img.naturalWidth / img.clientWidth : 2 * img.naturalWidth / img.clientWidth}) translate(${translateX}px, ${translateY}px)`;
        }
    });

    img.addEventListener('mouseup', function() {
        isDragging = false;
        img.style.cursor = 'grab';
    });

    img.addEventListener('mouseleave', function() {
        isDragging = false;
        img.style.cursor = 'grab';
    });

    // When the image is loaded, show dimensions and set the download link
    img.onload = function() {
        updateInfo(); // Display info immediately when the image loads
        downloadBtn.href = img.src; // Set download link to the image source
    };

    // Handle copying the image URL to the clipboard
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(img.src).then(function() {
            alert('Image URL copied to clipboard');
        }).catch(function(err) {
            alert('Failed to copy: ' + err);
        });
    });

    imageContainer.appendChild(img);
} else {
    document.getElementById('versionInfo').innerHTML = 'No image URL provided.';
}
