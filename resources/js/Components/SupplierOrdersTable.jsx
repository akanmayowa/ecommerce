import { useEffect, useState } from "react";
import axios from "axios";

export default function SupplierOrdersTable() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(route('order.supplier.show'));
            console.log(response.data.data)
            setOrders(response.data.data.data);

        } catch (error) {
            console.error("Error fetching supplier orders:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Users Who Bought Your Products</h3>

            {loading ? (
                <p>Loading...</p>
            ) : orders.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">Customer Name</th>
                        <th className="border p-2">Customer Email</th>
                        <th className="border p-2">Product Name</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Total</th>
                        <th className="border p-2">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) =>
                        order.map((item, index) => (
                            <tr key={`${item.order_id}-${index}`} className="text-center">
                                {/* Show Order ID only in the first row of each order */}
                                {index === 0 ? (
                                    <td className="border p-2" rowSpan={order.length}>{item.order_id}</td>
                                ) : null}
                                <td className="border p-2">{item.customer_name}</td>
                                <td className="border p-2">{item.customer_email}</td>
                                <td className="border p-2">{item.product_name}</td>
                                <td className="border p-2">{item.quantity}</td>
                                <td className="border p-2">${item.total_price}</td>
                                <td className="border p-2">{new Date(item.order_date).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            ) : (
                <p>No purchases found.</p>
            )}
        </div>
    );
}
