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
// Tinte deliberat vechi. Masurat pe CSS-ul real: fata de Chrome 90 nu mai
// scade nimic (oklab e deja eliminat acolo), costa ~7 KB in plus si acopera
// si telefoane vechi care nu au legatura cu TikTok. Mai jos de atat nu are
// rost: @layer si @property nu se pot converti deloc, iar Tailwind 4 isi
// pune tot CSS-ul in @layer - un browser care nu-l intelege ar ignora tot,
// nu doar cateva culori.
const BROWSERE = [
  'chrome >= 70',
  'safari >= 12',
  'ios_saf >= 12',
  'firefox >= 68',
  'samsung >= 10',
  'android >= 70',
].join(', ')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    transformer: 'lightningcss',
    lightningcss: { targets: browserslistToTargets(browserslist(BROWSERE)) },
  },
  build: {
    cssMinify: 'lightningcss',
    target: ['es2019', 'chrome70', 'safari12'],
  },
})
