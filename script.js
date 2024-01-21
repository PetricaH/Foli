function toggleMenu(element) {
    element.classList.toggle("change");
    var menuLinks = document.querySelector('.menu-links');
    menuLinks.classList.toggle("show");

    document.body.style.overflow = (menuLinks.classList.contains("show")) ? "hidden" : "auto";
}

// evemt listener to close the menu when a link is clicked
document.querySelectorAll('.menu-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        var menuButton = document.querySelector('.menu');
        toggleMenu(menuButton); // closing the menu by toggling the menu button
    });
});