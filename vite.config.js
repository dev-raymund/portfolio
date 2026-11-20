import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // The build-time server render bundles these instead of loading them from node_modules.
  ssr: { noExternal: ['gsap', 'lenis'] },
})
