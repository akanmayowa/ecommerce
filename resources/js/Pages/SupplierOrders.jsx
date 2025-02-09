import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SupplierOrdersTable from "@/Components/SupplierOrdersTable.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SupplierOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/supplier-orders");
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching supplier orders:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Purchase Order History
                </h2>
            }
        >
            <Head title="Purchase Order History" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="my-4">
                            {loading ? (
                                <div className="flex justify-center items-center py-10">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                                    <span className="ml-3 text-blue-500 font-semibold">Fetching orders...</span>
                                </div>
                            ) : (
                                <SupplierOrdersTable data={orders} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
