import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../../../target/classes/static',
        emptyOutDir: true,

        rollupOptions: {
            input: {
                app: './index.html', // entry point for the app
            },
        },
    },
})
