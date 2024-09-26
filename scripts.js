// Get elements
const imageContainer = document.getElementById('imageContainer');
const zoomSlider = document.getElementById('zoomSlider');
const versionInfo = document.getElementById('versionInfo');
const overlayWindow = document.getElementById('overlayWindow');

// Image element
let img = null;
let zoomLevel = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX, startY;

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const imageUrl = getQueryParam('imageUrl');
if (imageUrl) {
    img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Image';
    img.style.transformOrigin = 'center';
    img.classList.add('zoomed');
    imageContainer.appendChild(img);

    img.onload = function () {
        updateInfo();
        downloadBtn.href = img.src; // Set download link to image source
    };
} else {
    versionInfo.innerHTML = 'No image URL provided.';
}

// Update version info
function updateInfo() {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    versionInfo.innerHTML = `Img size: ${width} x ${height} px<br>site v3.0`;
}

// Handle zoom slider change
zoomSlider.addEventListener('input', function () {
    zoomLevel = parseFloat(zoomSlider.value);
    img.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
});

// Handle double click zoom
img.addEventListener('dblclick', function () {
    if (zoomLevel === 1) {
        zoomLevel = 2;
    } else {
        zoomLevel = 1;
    }
    zoomSlider.value = zoomLevel;
    img.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
});

// Handle pan
img.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    img.style.cursor = 'grabbing';
});

img.addEventListener('mousemove', function (e) {
    if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        img.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
    }
});

img.addEventListener('mouseup', function () {
    isDragging = false;
    img.style.cursor = 'grab';
});

img.addEventListener('mouseleave', function () {
    isDragging = false;
    img.style.cursor = 'grab';
});
