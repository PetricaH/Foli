// admin/public/js/admin.js
document.addEventListener('DOMContentLoaded', function () {
    // Function to render products in a category
    function renderProducts(category, products) {
        const container = document.getElementById(`${category}Container`);
        container.innerHTML = ''; // Clear existing products

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            productElement.innerHTML = `
                <div class="goods-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-description">
                    <h2 class="goods-title">${product.name}</h2>
                    <p class="goods-price">$${product.price}</p>
                    <button class="edit-product" data-id="${product.id}">Edit</button>
                    <button class="remove-product" data-id="${product.id}">Remove</button>
                </div>
            `;

            container.appendChild(productElement);
        });
    }

    // Fetch and render products for each category on page load
    const categories = ['backpacks', 'coats', 'pants', 'boots'];

    categories.forEach(category => {
        fetch(`/admin/products?category=${category}`)
            .then(response => response.json())
            .then(products => renderProducts(category, products))
            .catch(error => console.error('Error fetching products:', error));
    });

    // Function to handle product addition, editing, and removal
    function handleProductAction(action, category, productId, productData) {
        const url = `/admin/products/${productId || ''}`;
        const method = action === 'add' ? 'POST' : action === 'edit' ? 'PUT' : 'DELETE';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);

                // After adding, editing, or removing a product, re-render the products in the category
                fetch(`/admin/products?category=${category}`)
                    .then(response => response.json())
                    .then(products => renderProducts(category, products))
                    .catch(error => console.error('Error fetching products:', error));
            })
            .catch(error => console.error('Error:', error));
    }

    // Event delegation for handling product actions
    document.body.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('add-in-basket')) {
            const category = target.closest('.category-container').getAttribute('data-category');
            const productName = target.closest('.product').querySelector('.goods-title').textContent;
            const productPrice = target.closest('.product').querySelector('.goods-price').textContent;
            const productImage = target.closest('.product').querySelector('.goods-container img').src;

            const productData = {
                name: productName,
                price: productPrice,
                image: productImage,
            };

            handleProductAction('add', category, null, productData);
        } else if (target.classList.contains('edit-product')) {
            const productId = target.getAttribute('data-id');
            const category = target.closest('.category-container').getAttribute('data-category');
            const productName = target.closest('.product').querySelector('.goods-title').textContent;
            const productPrice = target.closest('.product').querySelector('.goods-price').textContent;

            const productData = {
                name: prompt('Enter new product name:', productName) || productName,
                price: parseFloat(prompt('Enter new product price:', productPrice.replace('$', ''))) || parseFloat(productPrice.replace('$', '')),
            };

            handleProductAction('edit', category, productId, productData);
        } else if (target.classList.contains('remove-product')) {
            const productId = target.getAttribute('data-id');
            const category = target.closest('.category-container').getAttribute('data-category');

            if (confirm('Are you sure you want to remove this product?')) {
                handleProductAction('remove', category, productId, null);
            }
        }
    });
});
