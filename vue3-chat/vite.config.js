import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue';
import html from 'vite-plugin-html';

export default defineConfig({
    publicDir: resolve(__dirname, 'public'),
    assetsInclude: resolve(__dirname, 'src/assets'),
    resolve: {
        alias: {
            "@": resolve(__dirname, "src")
        }
    },
    plugins: [
        vue(),
        html({
            inject: {
                data: {
                  title: 'vue3-chat-example',
                  injectScript: '<script type="module" src="/src/main.js"></script>',
                },
            },
            minify: true,
        })
    ],
    server: {
        // port: "3000",
        open: true,
        proxy: { // 代理

        }
    }
})