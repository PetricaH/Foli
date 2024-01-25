// admin/routes/productRoutes.js
const express = require('express');
const router = express.Router();

// In-memory data store (replace this with your database)
let products = [];

// POST route for adding a product
router.post('/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

// GET route for fetching all products
router.get('/products', (req, res) => {
    res.status(200).json(products);
});

// PUT route for updating a product by ID
router.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    // Find the product by ID and update its details
    const index = products.findIndex(product => product.id === productId);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.status(200).json({ message: 'Product updated successfully', product: products[index] });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// DELETE route for removing a product by ID
router.delete('/products/:id', (req, res) => {
    const productId = req.params.id;

    // Filter out the product with the given ID
    products = products.filter(product => product.id !== productId);

    res.status(200).json({ message: 'Product removed successfully', productId });
});

module.exports = router;
