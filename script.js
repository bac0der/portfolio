function toggleMode() {
            document.body.classList.toggle("dark-mode");
        }
        // Toggle the navbar
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarLinks = document.querySelector('.navbar ul');

navbarToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    navbarToggle.classList.toggle('active');
});