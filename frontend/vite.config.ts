import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
    define: {
        'import.meta.env.REACT_APP_API_URL': JSON.stringify('http://localhost:8080'),
    },
})
