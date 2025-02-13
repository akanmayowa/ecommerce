import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 fixed top-0 left-0 w-full z-50 shadow-md">
                <div className="relative flex items-center justify-between px-6 py-4">
                    <div className="flex items-center">
                        <img src="/assets/logo.svg" alt="Logo" className="h-8 w-auto" />
                    </div>
                    <nav className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={auth.is_supplier ? route('dashboard-supplier') : route('dashboard')}
                                className="px-3 py-2 text-black dark:text-white hover:text-black/70 dark:hover:text-white/80"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-3 py-2 text-black dark:text-white hover:text-black/70 dark:hover:text-white/80"
                                >
                                    Log in
                                </Link>
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        onBlur={() => setDropdownOpen(false)}
                                        className="px-3 py-2 text-black dark:text-white hover:text-black/70 dark:hover:text-white/80"
                                    >
                                        Register ▼
                                    </button>
                                    {dropdownOpen && (
                                        <div
                                            onMouseDown={(e) => e.preventDefault()}
                                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-black shadow-lg rounded-md overflow-hidden"
                                        >
                                            <Link
                                                href={route('register.supplier')}
                                                className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                Supplier
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                Shopping
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <div className="mt-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24 px-6 text-center">
                <h1 className="text-5xl font-bold">Welcome to Our Marketplace</h1>
                <p className="mt-4 text-lg opacity-90">Shop or supply with ease and efficiency</p>
                <div className="mt-6">
                    <Link
                        href={route('register')}
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-6 bg-gray-100 dark:bg-gray-900">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Why Choose Us?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">The best platform for suppliers and shoppers</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Wide Selection</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Thousands of products available from multiple suppliers.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Easy Management</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your products, sales, and purchases all in one place.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Secure Payments</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">We provide safe and secure transactions for all users.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-6 bg-gray-800 text-white text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Our Marketplace. All rights reserved.</p>
            </footer>
        </>
    );
}
