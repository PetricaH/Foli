function toggleMenu(element) {
    element.classList.toggle("change");
    var menuLinks = document.querySelector('.menu-links');
    menuLinks.classList.toggle("show");

    // Dynamically set flex-direction based on menu visibility
    if (menuLinks.classList.contains('show')) {
        menuLinks.style.flexDirection = 'column';
    } else {
        menuLinks.style.flexDirection = 'row';
    }

    // Manage body overflow to prevent scrolling
    document.body.style.overflow = (menuLinks.classList.contains("show")) ? "hidden" : "auto";
}


// event listener to close the menu when a link is clicked
document.querySelectorAll('.menu-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        var menuButton = document.querySelector('.menu');
        toggleMenu(menuButton); // menu toggle button 
    });
});

// featured proucts

document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.products-container').forEach(function(container) {
    container.style.display = 'none';
    });

    function toggleProducts(category) {
        var productsContainer = document.getElementById(category + 'Container');
        var moreButton = document.querySelector('.more-button[data-category="' + category + '"]');
        var categoryTitle = moreButton.closest('.category-container').querySelector('.category-title');

        if (productsContainer && moreButton) {
            if (productsContainer.style.display === 'none' || productsContainer.style.display === '') {
                
                productsContainer.style.display = 'block';
                moreButton.innerHTML = 'Less';
                categoryTitle.style.opacity = 1;
            } else {
                productsContainer.style.display = 'none';
                moreButton.innerHTML = 'More';
                categoryTitle.style.opacity = .5;
            }
        } else {
            console.error("Product container or moreButton not found.");
        }
    }

    // code to make all the more buttons work
    document.querySelectorAll('.more-button').forEach(function(button) {
        button.addEventListener('click', function() {
            var category = this.getAttribute('data-category');
            toggleProducts(category);
        });
    });

});