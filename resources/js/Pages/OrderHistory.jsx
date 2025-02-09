import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import OrderHistoryTable from "@/Components/OrderHistoryTable.jsx";
export default function OrderHistory({ }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Order History
                </h2>
            }
        >
            <Head title="Order history" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="my-4">
                            <OrderHistoryTable />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
