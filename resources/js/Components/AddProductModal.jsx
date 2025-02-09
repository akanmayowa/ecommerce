import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
    const [productName, setProductName] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newProduct = {
            name: productName,
            sku,
            description,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
        };

        try {
            const response = await axios.post("/products", newProduct);

            if (response.status === 201) {
                await Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product added successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    didClose: () => {
                        onProductAdded(response.data);
                        onClose();
                    }
                });
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl mb-4">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700">
                            SKU <span className="text-red-500">*</span>
                            <span className="ml-1 text-gray-400 cursor-pointer group">
                                ⓘ
                                <span className="absolute bottom-full left-0 w-48 bg-black text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    The SKU must be unique.
                                </span>
                            </span>
                        </label>
                        <input
                            type="text"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Quantity <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
