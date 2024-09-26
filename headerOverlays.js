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
        overlays.forEach(o => o.style.display = 'none'); // Hide all overlays
        overlay.style.display = 'block'; // Show the selected overlay
    }
});
