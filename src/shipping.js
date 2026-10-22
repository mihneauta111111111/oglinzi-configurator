// Taxa de livrare, calculata pe zone de distanta fata de sediul din Pitesti
// (Arges). Zonele urmeaza convenția curierilor romani (Fan Courier, Cargus
// etc. preteaza pe tabele de judet, nu pe formule de km) si sunt calibrate
// pe reperele date de client: L + stander + Maramures (zona 4) = 180 RON;
// oras apropiat (zona 2), marime mica fara stander = 20 RON; baby.halo
// aproape gratis, 20 RON departe.
export const JUDET_TIERS = {
  // Zona 1 - local
  arges: 1,
  // Zona 2 - apropiat (~70-160 km)
  bucuresti: 2, ilfov: 2, dambovita: 2, valcea: 2, olt: 2, teleorman: 2,
  dolj: 2, prahova: 2, sibiu: 2, gorj: 2, giurgiu: 2,
  // Zona 3 - mediu (~160-300 km)
  brasov: 3, mehedinti: 3, buzau: 3, alba: 3, hunedoara: 3, ialomita: 3,
  calarasi: 3, covasna: 3, 'caras-severin': 3, mures: 3, vrancea: 3,
  constanta: 3, braila: 3, harghita: 3,
  // Zona 4 - departe (300+ km)
  arad: 4, bacau: 4, bihor: 4, 'bistrita-nasaud': 4, botosani: 4, cluj: 4,
  galati: 4, iasi: 4, maramures: 4, neamt: 4, 'satu-mare': 4, salaj: 4,
  suceava: 4, timis: 4, tulcea: 4, vaslui: 4,
}

// XL extrapolat cu acelasi ritm de crestere M->L aplicat inca o data (L->XL),
// ca sa ramana monoton si proportional cu restul tabelului.
const HALO_SHIPPING_FEES = {
  1: { no: { S: 13, M: 16, L: 21, XL: 28 }, yes: { S: 22, M: 26, L: 34, XL: 44 } },
  2: { no: { S: 20, M: 25, L: 32, XL: 41 }, yes: { S: 34, M: 40, L: 52, XL: 68 } },
  3: { no: { S: 38, M: 48, L: 61, XL: 78 }, yes: { S: 65, M: 76, L: 99, XL: 129 } },
  4: { no: { S: 69, M: 87, L: 111, XL: 142 }, yes: { S: 118, M: 139, L: 180, XL: 233 } },
}

const BABY_SHIPPING_FEES = { 1: 5, 2: 8, 3: 14, 4: 20 }

// Orase in raza de ~100km de Pitesti - tarif fix de transport, indiferent
// de marime/stander/model, mai mic decat ar rezulta din tabelul pe zone de
// mai sus (ex: Bucuresti/Prahova/Dolj sunt zona 2 "normal", dar aceste orase
// anume sunt suficient de apropiate cat sa coste la fel ca zona locala).
const FLAT_RATE_FEE = 13
const FLAT_RATE_LOCALITIES = ['bucuresti', 'ploiesti', 'craiova', 'slatina']

// Compara fara diacritice si fara sensibilitate la majuscule (SIRUTA foloseste
// uneori "ş"/"ţ" cu sedila in loc de "ș"/"ț" cu virgula - normalizam pe ambele).
// Intervalul Unicode "Combining Diacritical Marks" (U+0300-U+036F) - ce
// rezulta dupa normalize('NFD') pentru fiecare litera cu diacritice.
function normalizeLocalitate(str) {
  return (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

// Produsele adaugate in cos inainte de aceasta schimbare nu au inca
// size/stand/isBaby brute (doar etichetele afisate) - default rezonabil in
// loc sa pice pagina cuiva care avea deja ceva in cos.
export function getShippingFeeForItem(item, judetCod, localitate) {
  if (FLAT_RATE_LOCALITIES.includes(normalizeLocalitate(localitate))) return FLAT_RATE_FEE

  const tier = JUDET_TIERS[judetCod]
  if (!tier) return 0

  const isBaby = item.isBaby ?? item.modelName === 'baby.halo'
  if (isBaby) return BABY_SHIPPING_FEES[tier]

  const size = ['S', 'M', 'L', 'XL'].includes(item.size) ? item.size : 'M'
  const stand = item.stand === 'yes' ? 'yes' : 'no'
  return HALO_SHIPPING_FEES[tier][stand][size]
}

export function getCartShippingTotal(items, judetCod, localitate) {
  if (!judetCod) return null
  return items.reduce((sum, item) => sum + getShippingFeeForItem(item, judetCod, localitate) * item.qty, 0)
}

// Cutie de protectie pentru sticla - doar sticla are nevoie, plexi nu.
// Cost separat de pretul oglinzii, vizibil doar in cos/checkout, nu si in
// configurator. "Fara ambalare" la tariful fix de mai sus inseamna ca
// aceste orase apropiate NU scapa si de costul cutiei - doar transportul e
// mai ieftin pentru ele, impachetarea sticlei costa la fel oriunde.
const GLASS_PACKAGING_FEES = { S: 40, M: 50, L: 60, XL: 70 }

export function getGlassPackagingFee(item) {
  if (item.material !== 'sticla') return 0
  const size = ['S', 'M', 'L', 'XL'].includes(item.size) ? item.size : 'M'
  return GLASS_PACKAGING_FEES[size]
}

export function getCartPackagingTotal(items) {
  return items.reduce((sum, item) => sum + getGlassPackagingFee(item) * item.qty, 0)
}
