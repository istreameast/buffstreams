// app/manifest.ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Buffstreams',
    short_name: 'Buffstreams',
    description:
      'Live sports streaming hub for NBA, NFL, NHL, MLB, CFB, and UFC/MMA with a fast, clean player.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b0e11',
    theme_color: '#E10601',
    icons: [
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
