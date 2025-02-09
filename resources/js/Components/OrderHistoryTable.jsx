import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function OrderHistoryTable() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(route('order.show'));
            setOrders(response.data.data.data);
            console.log(orders);
        } catch (error) {
            console.error("Error fetching order history:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {loading ? (
                <p>Loading...</p>
            ) : orders.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Order #</th>
                        <th className="border p-2">Product Name</th>
                        <th className="border p-2">SKU #</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Unit Price</th>
                        <th className="border p-2">Total Amount</th>
                        <th className="border p-2">Oder Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(orders).map((order) => (
                        order.items.map((item, index) => (
                            <tr key={`${order.order_id}-${index}`} className="text-center">
                                <td className="border p-2">{item.order_id}</td>
                                <td className="border p-2">{item.product_name}</td>
                                <td className="border p-2">{item.sku}</td>
                                <td className="border p-2">{item.quantity}</td>
                                <td className="border p-2">${item.price}</td>
                                <td className="border p-2">${item.total_price}</td>
                                <td className="border p-2">{formatDate(item.order_date)}</td>
                            </tr>
                        ))
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}
