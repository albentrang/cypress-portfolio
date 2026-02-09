"use strict";
// Dropdown menu toggle for small screens
document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.getElementById('dropdown-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', () => {
            const isOpen = dropdownMenu.style.display === 'block';
            dropdownMenu.style.display = isOpen ? 'none' : 'block';
            dropdownBtn.setAttribute('aria-expanded', (!isOpen).toString());
        });
        // Optional: close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (dropdownMenu.style.display === 'block' &&
                !dropdownMenu.contains(e.target) &&
                e.target !== dropdownBtn) {
                dropdownMenu.style.display = 'none';
                dropdownBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
//# sourceMappingURL=all_pages.js.map