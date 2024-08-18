import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../../../target/classes/resources',
        emptyOutDir: true,

        rollupOptions: {
            input: {
                app: './index.html', // entry point for the app
            },
        },
    },
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        ],
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080/', // Replace with your Spring backend URL
                changeOrigin: true,
                //      rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove '/api' prefix from requests
                configure: (proxy, _options) => {
                    proxy.on("error", (err, _req, _res) => {
                        console.log("proxy error", err);
                    });
                    proxy.on("proxyReq", (proxyReq, req, _res) => {
                        // console.log(
                        //     "Sending Request:",
                        //     req.method,
                        //     req.url,
                        //     " => TO THE TARGET =>  ",
                        //     proxyReq.method,
                        //     proxyReq.protocol,
                        //     proxyReq.host,
                        //     proxyReq.path,
                        //     JSON.stringify(proxyReq.getHeaders()),
                        // );
                    });
                    proxy.on("proxyRes", (proxyRes, req, _res) => {
                        // console.log(
                        //     "Received Response from the Target:",
                        //     proxyRes.statusCode,
                        //     req.url,
                        //     JSON.stringify(proxyRes.headers),
                        // );
                    });
                },
            },
        },
    },
})
