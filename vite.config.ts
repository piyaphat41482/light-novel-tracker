import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/light-novel-tracker/',
  plugins: [
    react(),
    tailwindcss(),
VitePWA({
  base: '/light-novel-tracker/',
  registerType: 'autoUpdate',
  includeAssets: ['icon-192.png', 'icon-512.png'],
  workbox: {
    runtimeCaching: [
      // Cache รูปภาพจาก Supabase Storage (ปกหนังสือ)
      {
        urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'supabase-storage-cache',
          expiration: {
            maxEntries: 200, // เก็บได้สูงสุด 200 รูป
            maxAgeSeconds: 60 * 60 * 24 * 30, // เก็บไว้นาน 30 วัน
          },
        },
      },
      // Cache ข้อมูล API จาก Supabase (series, wishlist ฯลฯ)
      {
        urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'supabase-api-cache',
          networkTimeoutSeconds: 5, // ถ้า network ไม่ตอบใน 5 วิ ให้ fallback ไป cache เลย
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24, // เก็บไว้ 1 วัน
          },
        },
      },
    ],
  },
manifest: {
  name: 'Light Novel & Manga Tracker',
  short_name: 'LN Tracker',
  description: 'ติดตามคอลเลกชันไลท์โนเวลและมังงะของคุณ',
  theme_color: '#0f172a',
  background_color: '#0f172a',
  display: 'standalone',
  start_url: '/light-novel-tracker/',
  scope: '/light-novel-tracker/',
    icons: [
      {
        src: 'icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
}),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})