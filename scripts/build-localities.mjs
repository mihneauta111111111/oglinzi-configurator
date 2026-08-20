// One-time data-prep script: converts the official SIRUTA registry
// (data.gov.ro, public government open data) into a small judete.json +
// one localitati/<slug>.json per county, used by SearchableSelect in the
// checkout form. NOT run as part of the normal build - re-run manually
// only if the source SIRUTA file changes.
//
// Usage: node scripts/build-localities.mjs
// Expects scripts/siruta_raw.xlsx to already be downloaded (see plan notes).
//
// Verified empirically against the real file (not guessed from memory):
// NIV=1 rows are the 42 judete; NIV=2 rows are exactly the 3180
// municipii/orase/comune (no sate) - matches Romania's known real counts.
// Bucuresti is a special case: its 6 sectors live at NIV=3, not NIV=2, so
// they're added explicitly alongside the generic "Bucuresti" entry.

import XLSX from 'xlsx'
import { writeFileSync, mkdirSync } from 'node:fs'

const LOWERCASE_WORDS = new Set(['de', 'din', 'la', 'sub', 'pe'])

function titleCase(raw) {
  return raw
    .toLowerCase()
    .split(' ')
    .map((word, i) => {
      if (i > 0 && LOWERCASE_WORDS.has(word)) return word
      return word.replace(/(^|-)([a-zăâîșşțţ])/gi, (m, sep, ch) => sep + ch.toUpperCase())
    })
    .join(' ')
}

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const wb = XLSX.readFile(new URL('./siruta_raw.xlsx', import.meta.url))
const sheet = wb.Sheets[wb.SheetNames[0]]
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })
const data = rows.slice(1) // drop header row

// --- judete (NIV=1) ---
const judeteRaw = data.filter((r) => r[6] === 1)
const judete = judeteRaw.map((r) => {
  const [, denloc, , jud] = r
  const nume = denloc.startsWith('JUDEŢUL ')
    ? titleCase(denloc.slice('JUDEŢUL '.length))
    : 'Bucureşti' // "MUNICIPIUL BUCUREŞTI" at NIV=1
  return { jud, cod: slugify(nume), nume }
})

const judByCod = new Map(judete.map((j) => [j.jud, j]))

// --- localitati (NIV=2: municipii + orase + comune, no sate) ---
const localitatiByJudCod = new Map(judete.map((j) => [j.cod, []]))

for (const r of data) {
  if (r[6] !== 2) continue
  const [, denloc, , jud] = r
  const j = judByCod.get(jud)
  if (!j) continue

  let nume = denloc
  if (nume.startsWith('MUNICIPIUL ')) nume = nume.slice('MUNICIPIUL '.length)
  else if (nume.startsWith('ORAŞ ')) nume = nume.slice('ORAŞ '.length)
  nume = titleCase(nume)

  localitatiByJudCod.get(j.cod).push(nume)
}

// Bucuresti sectors live at NIV=3 in SIRUTA, not NIV=2 - add explicitly.
const bucJud = judete.find((j) => j.cod === 'bucuresti')
if (bucJud) {
  for (const r of data) {
    if (r[6] !== 3 || r[3] !== bucJud.jud) continue
    const m = /^BUCUREŞTI SECTORUL (\d)$/.exec(r[1])
    if (m) localitatiByJudCod.get('bucuresti').push('Sector ' + m[1])
  }
}

for (const list of localitatiByJudCod.values()) {
  list.sort((a, b) => a.localeCompare(b, 'ro'))
}

// --- write output ---
const dataDir = new URL('../src/data/', import.meta.url)
const localitatiDir = new URL('../src/data/localitati/', import.meta.url)
mkdirSync(dataDir, { recursive: true })
mkdirSync(localitatiDir, { recursive: true })

const judeteOut = judete
  .map(({ cod, nume }) => ({ cod, nume }))
  .sort((a, b) => a.nume.localeCompare(b.nume, 'ro'))
writeFileSync(new URL('./judete.json', dataDir), JSON.stringify(judeteOut, null, 2))

let totalLocalitati = 0
for (const [cod, list] of localitatiByJudCod) {
  writeFileSync(new URL(`./${cod}.json`, localitatiDir), JSON.stringify(list, null, 2))
  totalLocalitati += list.length
}

console.log(`Written ${judeteOut.length} judete, ${totalLocalitati} localitati across ${localitatiByJudCod.size} files.`)
