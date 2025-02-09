import React, { useState, useEffect } from 'react';

const EditProductModal = ({ isOpen, onClose, product, onUpdate }) => {
    const [productName, setProductName] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (product) {
            setProductName(product.name);
            setSku(product.sku);
            setDescription(product.description);
            setPrice(product.price);
            setQuantity(product.quantity);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            id: product.id,
            name: productName,
            sku,
            description,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
        };
        onUpdate(updatedProduct);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">SKU</label>
                        <input
                            type="text"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
