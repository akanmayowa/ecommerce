import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useEffect, useState} from "react";
import Table from "../Components/Table.jsx";
import axios from "axios";
import AddProductModal from "@/Components/AddProductModal.jsx";
import Swal from "sweetalert2";
import EditProductModal from "@/Components/EditProductModal.jsx";
export default function Dashboard({}) {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/products");
            setProducts(response.data.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    const onProductAdded = (newProduct) => {
        fetchProducts();
    };

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsEditModalOpen(true);
    };

    const handleUpdateProduct = (updatedProduct) => {
        axios.put(`/products/${updatedProduct.id}`, updatedProduct)
            .then(() => {
                setProducts(products.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                ));
                setIsEditModalOpen(false);
                Swal.fire({
                    title: "Updated!",
                    text: "Product has been updated successfully.",
                    icon: "success",
                    timer: 1500,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
            })
            .catch(error => {
                console.error("Error updating product:", error);
            });
    };
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/products/${id}`)
                    .then(() => {
                        setProducts(products.filter(product => product.id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "The product has been deleted.",
                            icon: "success",
                            timer: 1500,
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false
                        });
                    })
                    .catch(error => {
                        console.error("Error deleting product:", error);
                    });
              }
        });
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Product
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-150 ease-in-out"
                        >
                            Add Product
                        </button>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Table data={products} onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                </div>

                <AddProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddProduct}
                    onProductAdded={onProductAdded}
                />

                <EditProductModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    product={editingProduct}
                    onUpdate={handleUpdateProduct}
                />

            </div>
        </AuthenticatedLayout>
    );
}
