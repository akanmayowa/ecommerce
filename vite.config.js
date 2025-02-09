import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',  // Main entry point for your React app
            refresh: true,                  // Enable hot reloading during development
        }),
        react(),
    ],
    build: {
        // Set the build output directory to the Laravel public directory
        outDir: 'public/build',  // Ensure this path is where Laravel will serve the built files from
        assetsDir: 'assets',     // Optional: You can customize how assets are structured in the build directory
    },
});
