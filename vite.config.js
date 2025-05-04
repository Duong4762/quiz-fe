import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), svgr()],
    server: {
        host: true,
    },
    define: {
        // By default, Vite doesn't include shims for NodeJS/
        // necessary for segment analytics lib to work
        global: {},
    },
});
