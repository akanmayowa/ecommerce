import React from "react";

const Table = ({ data, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sku #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={item.id || `row-${index}`}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.sku}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-150 ease-in-out">
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition duration-150 ease-in-out">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No data available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
