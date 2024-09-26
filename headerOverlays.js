// Hantera overlay-visning
document.addEventListener('DOMContentLoaded', function () {
    const playlistBtn = document.getElementById('playlistBtn');
    const mobileHeaderBtn = document.getElementById('mobileHeaderBtn');
    const desktopHeaderBtn = document.getElementById('desktopHeaderBtn');
    const overlayWindow = document.getElementById('overlayWindow');

    // Event Listeners for each button
    playlistBtn.addEventListener('click', () => {
        toggleOverlay('playlist');
    });

    mobileHeaderBtn.addEventListener('click', () => {
        toggleOverlay('mobile-header');
    });

    desktopHeaderBtn.addEventListener('click', () => {
        toggleOverlay('desktop-header');
    });

    // Function to toggle overlays
    function toggleOverlay(type) {
        overlayWindow.style.display = 'block';
        overlayWindow.className = `overlay-window ${type}`;
    }
});
