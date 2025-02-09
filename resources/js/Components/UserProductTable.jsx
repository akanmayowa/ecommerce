import React from "react";

const UserProductTable = ({ products, onAddToCart }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead>
                <tr>
                    <th className="px-4 py-2 text-left">S/N</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">SKU</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td className="px-4 py-2">{products.indexOf(product) + 1}</td>
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{product.sku}</td>
                        <td className="px-4 py-2">{product.description}</td>
                        <td className="px-4 py-2">${product.price}</td>
                        <td className="px-4 py-2">{product.quantity}</td>
                        <td className="px-4 py-2">
                            <button
                                onClick={() => onAddToCart(product)}
                                className="bg-yellow-400 text-white px-4 py-2 rounded flex items-center space-x-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l3 9h9l3-9h2M7 13h10M9 17a2 2 0 104 0 2 2 0 10-4 0zM16 17a2 2 0 104 0 2 2 0 10-4 0z"
                                    />
                                </svg>
                                <span className="text-sm">Add to Cart</span>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserProductTable;
