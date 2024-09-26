// Hantering av header overlays
document.addEventListener('DOMContentLoaded', function () {
    const coverOverlay = document.getElementById('coverOverlay');
    const mobileHeaderOverlay = document.getElementById('mobileHeaderOverlay');
    const desktopHeaderOverlay = document.getElementById('desktopHeaderOverlay');

    document.getElementById('coverBtn').addEventListener('click', () => {
        toggleOverlay(coverOverlay);
    });

    document.getElementById('mobileHeaderBtn').addEventListener('click', () => {
        toggleOverlay(mobileHeaderOverlay);
    });

    document.getElementById('desktopHeaderBtn').addEventListener('click', () => {
        toggleOverlay(desktopHeaderOverlay);
    });

function toggleOverlay(overlay) {
    const overlays = [coverOverlay, mobileHeaderOverlay, desktopHeaderOverlay];

    // If the clicked overlay is already visible, hide it
    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
    } else {
        // Hide all overlays and only show the clicked one
        overlays.forEach(o => o.style.display = 'none');
        overlay.style.display = 'block';
    }
}

});
