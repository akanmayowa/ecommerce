import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import CheckoutModal from "@/Components/CheckoutModal.jsx";

export default function AddToCart() {
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        phone: '',
        address: '',
        postcode: ''
    });

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get(route('cart.show'));
            setCart(response.data.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart((prevCart) => {
            if (!prevCart || typeof prevCart !== "object") return {};
            const updatedCart = { ...prevCart };
            Object.values(updatedCart).forEach((product) => {
                if (product.product_id === productId) {
                    product.quantity = newQuantity;
                }
            });

            return updatedCart;
        });

        try {
            await axios.put(route('cart.update.quantity'), {
                quantity: newQuantity,
                product_id: productId
            });

            await fetchCart();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete(route('cart.remove', productId));
            await fetchCart();
            await Swal.fire(
                'Removed!',
                'The product has been removed from your cart.',
                'success'
            );
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await axios.post(route('checkout.process'), {
                cart: cart,
                total_amount: Object.values(cart)
                    .reduce((total, product) => total + (Number(product.price) * product.quantity), 0)
                    .toFixed(2),
                billing_details: billingDetails
            });

            console.log(response);
            await Swal.fire({
                title: 'Checkout Successful!',
                text: `Order ID: ${response.data.order_id}`,
                icon: 'success',
                confirmButtonText: 'OK',
            });
            setCart([]);
            setModalOpen(false);
        } catch (error) {
            console.error("Checkout failed:", error);
            if (error.response && error.response.status === 403) {
                Swal.fire({
                    title: 'Unauthorized',
                    text: 'You need to log in to complete the checkout.',
                    icon: 'warning',
                    confirmButtonText: 'Login',
                }).then(() => {
                    window.location.href = route('login');
                });
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Shopping Cart</h2>}
        >
            <Head title="Cart" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                        <div className="my-4 bg-white rounded-lg">
                            {Object.keys(cart).length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.values(cart).map((product) => (
                                        <div key={product.product_id} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md">
                                            <img
                                                className="w-24 h-24 object-cover rounded"
                                                src="https://dummyimage.com/100x100/F3F4F7/000000.jpg"
                                                alt="Product Image"
                                            />
                                            <div className="mt-4 text-center">
                                                <h3 className="text-gray-900 font-semibold">{product.name}</h3>
                                                <p className="text-gray-700 text-sm">SKU: {product.sku}</p>
                                                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                                                <p className="text-gray-900 font-semibold mt-2">${product.price}</p>
                                                <div className="flex items-center justify-center mt-3">
                                                    <button
                                                        onClick={() => handleQuantityChange(product.product_id, product.quantity - 1)}
                                                        className="px-3 py-1 bg-gray-300 rounded-lg"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-4 text-lg">{product.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(product.product_id, product.quantity + 1)}
                                                        className="px-3 py-1 bg-gray-300 rounded-lg"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromCart(product.product_id)}
                                                className="mt-4 p-2 bg-white hover:bg-red-600 text-red-500 rounded-lg"
                                            >
                                                <FaTrash className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-700 py-4">Your cart is empty.</p>
                            )}
                        </div>

                        {Object.keys(cart).length > 0 && (
                            <div className="flex items-center justify-between px-6 py-3 bg-gray-100 mt-6 rounded-lg">
                                <h3 className="text-gray-900 font-semibold">
                                    Total: ${Object.values(cart)
                                    .reduce((total, product) => total + (Number(product.price) * product.quantity || 0), 0)
                                    .toFixed(2)}
                                </h3>
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <CheckoutModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onCheckout={handleCheckout}
                billingDetails={billingDetails}
                setBillingDetails={setBillingDetails}
                cart={cart}
            />
        </AuthenticatedLayout>
    );
}
