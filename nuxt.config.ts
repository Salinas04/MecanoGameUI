// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    preset: 'vercel'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt'
  ],
  app: {
    head: {
      title: 'TypingRush - Improve Your Typing Speed',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description', 
          content: 'TypingRush is a fun and interactive typing game to improve your typing speed and accuracy.'
        }
      ],
      link: [
        // Standard favicons with larger sizes
        { rel: 'icon', type: 'image/png', href: '/TypingRushLogo.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/TypingRushLogo.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/png', href: '/TypingRushLogo.png', sizes: '192x192' },
        
        // Apple Touch Icon (for iOS devices)
        { rel: 'apple-touch-icon', href: '/TypingRushLogo.png', sizes: '180x180' },
        
        // Microsoft Tile Icon (for Windows devices)
        { rel: 'msapplication-TileImage', href: '/TypingRushLogo.png' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://mecanogameback.onrender.com'
    }
  }
})
