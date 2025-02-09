const CheckoutModal = ({ isOpen, onClose, onCheckout, billingDetails, setBillingDetails, cart }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({ ...billingDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCheckout();
    };

    const calculateTotal = () => {
        return Object.values(cart).reduce((total, product) => total + (Number(product.price) * product.quantity), 0).toFixed(2);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/2 max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-semibold mb-4 text-center">Checkout</h2>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                    <ul className="space-y-2">
                        {Object.values(cart).map((product) => (
                            <li key={product.product_id} className="flex justify-between">
                                <span>{product.name} (x{product.quantity})</span>
                                <span>${(product.price * product.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 pt-6">
                        <h2 className="text-xl font-semibold mb-1">Billing Details</h2>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 flex items-center">
                                Full Name <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={billingDetails.name}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 flex items-center">
                                Phone Number <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={billingDetails.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 flex items-center">
                                Address <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={billingDetails.address}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="postcode" className="block text-gray-700 flex items-center">
                                Postcode <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="postcode"
                                name="postcode"
                                value={billingDetails.postcode}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                        >
                            Buy now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutModal;
