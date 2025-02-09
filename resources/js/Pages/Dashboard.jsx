import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from "react";
import UserProductTable from "@/Components/UserProductTable.jsx";
import Swal from "sweetalert2";
import axios from "axios";

export default function Dashboard({ userRole }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProductsAvailable();
    }, []);

    const getProductsAvailable = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(route('products.available'));
            setProducts(response.data.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleAddToCart = async (product) => {
        if (product.quantity <= 0) {
            await Swal.fire({
                title: 'Sorry, this product is out of stock.',
                icon: 'warning',
                confirmButtonText: 'Okay',
            });
            return;
        }

        try {
            const response = await axios.post(route('cart.add'), {
                product_id: product.id,
                quantity: product.quantity,
            });

            if (response.status === 200) {
                setCart((prevCart) => [...prevCart, product]);
                await Swal.fire({
                    title: `${product.name} added to cart!`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products Available
                </h2>
            }
        >
            <Head title="Products Available" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="my-4">
                            {loading ? (
                                <div className="flex justify-center items-center py-10">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                                    <span className="ml-3 text-blue-500 font-semibold">Loading products...</span>
                                </div>
                            ) : (
                                <UserProductTable
                                    products={products}
                                    onAddToCart={handleAddToCart}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
