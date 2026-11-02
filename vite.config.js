import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'

// Browserele din aplicatii (TikTok, Instagram, Facebook) folosesc motoare mai
// vechi decat browserul normal al telefonului, iar TikTok s-a dovedit cel mai
// in urma. Implicit, Tailwind 4 genereaza culori in oklab()/oklch(), pe care
// un motor vechi nu le intelege: declaratia e aruncata si elementul ramane
// fara culoare - de aici "unele culori buguite" raportate din TikTok.
// (Functiile color-mix() nu sunt o problema: Tailwind le pune in spatele unui
// @supports si lasa o rezerva in hex pentru fiecare. oklab() nu avea rezerva.)
//
// Cu tintele de mai jos, lightningcss converteste oklab/oklch in culori
// clasice la compilare, iar esbuild coboara sintaxa JS moderna. Costa ~3 KB.
const BROWSERE = [
  'chrome >= 90',
  'safari >= 14',
  'ios_saf >= 14',
  'firefox >= 90',
  'samsung >= 14',
  'android >= 90',
].join(', ')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    transformer: 'lightningcss',
    lightningcss: { targets: browserslistToTargets(browserslist(BROWSERE)) },
  },
  build: {
    cssMinify: 'lightningcss',
    target: ['es2020', 'chrome90', 'safari14'],
  },
})
