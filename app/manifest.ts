import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '古籍焕新 — AI古籍交互阅读平台',
    short_name: '古籍焕新',
    description: '让千年文字"活"起来。AI翻译山海经、异兽图鉴、诗词沉浸阅读、历史人物对话。',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f0e8',
    theme_color: '#c84032',
    orientation: 'portrait-primary',
    categories: ['education', 'books'],
    lang: 'zh-CN',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
