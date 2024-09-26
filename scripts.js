document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('imageContainer');
    const zoomSlider = document.getElementById('zoomSlider');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const versionInfo = document.getElementById('versionInfo');

    const imageUrl = getQueryParam('imageUrl');
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Image';
        imageContainer.appendChild(img);

        img.onload = function() {
            updateInfo();
            downloadBtn.href = img.src; // Set download link to image source
            downloadBtn.download = img.src.split('/').pop(); // Set the download filename
        };

        // Update version info
        function updateInfo() {
            versionInfo.innerHTML = `Img size: ${img.naturalWidth} x ${img.naturalHeight}px<br>site v3.0`;
        }

        // Zoom slider event
        zoomSlider.addEventListener('input', function() {
            img.style.transform = `scale(${zoomSlider.value})`;
        });

        // Copy URL button
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(img.src).then(function() {
                alert('Image URL copied to clipboard');
            }).catch(function(err) {
                alert('Failed to copy: ' + err);
            });
        });
    } else {
        versionInfo.innerHTML = 'No image URL provided.';
    }
});

function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
