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
                                href={route('dashboard')}
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
                                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-black shadow-lg rounded-md overflow-hidden">
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
        </>
    );
}
