// Taxa de livrare, calculata pe zone de distanta fata de sediul din Pitesti
// (Arges). Zonele urmeaza convenția curierilor romani (Fan Courier, Cargus
// etc. preteaza pe tabele de judet, nu pe formule de km).
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

// In Pitesti livrarea e gratuita, iar in zonele 1-2 (~150km in jurul
// Pitesti) e un tarif unic mic - in ambele cazuri livreaza direct
// proprietarul, nu curierul, deci nu se factureaza nici cutia de protectie
// (vezi getGlassPackagingFee mai jos).
const HOME_CITY = 'pitesti'
const NEAR_PITESTI_FLAT_FEE = 20

// Zonele 3-4 (peste ~160km, acolo unde intervine curierul) cresc progresiv
// cu distanta, marimea si standerul. Tabelul e cel calibrat pe plafonul de
// 100 RON (cel mai departe colt + marimea cea mai mare + stander), apoi
// redus cu 20% peste tot - deci maximul real e acum 80 RON. Tariful minim
// (NEAR_PITESTI_FLAT_FEE) nu a fost redus, a ramas 20 RON.
const HALO_SHIPPING_FEES = {
  3: { no: { S: 28, M: 32, L: 36, XL: 40 }, yes: { S: 36, M: 42, L: 46, XL: 52 } },
  4: { no: { S: 44, M: 50, L: 56, XL: 64 }, yes: { S: 56, M: 64, L: 72, XL: 80 } },
}

const BABY_SHIPPING_FEES = { 3: 14, 4: 20 }

// Compara numele de localitati fara diacritice si fara sensibilitate la
// majuscule - SIRUTA scrie "Piteşti" cu ş-cedila, nu cu ș-virgula.
// Intervalul Unicode de mai jos e "Combining Diacritical Marks"
// (U+0300-U+036F), ce rezulta din normalize('NFD') pentru fiecare litera
// cu diacritice.
function normalizeLocalitate(str) {
  return (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

// Produsele adaugate in cos inainte de aceasta schimbare nu au inca
// size/stand/isBaby brute (doar etichetele afisate) - default rezonabil in
// loc sa pice pagina cuiva care avea deja ceva in cos.
export function getShippingFeeForItem(item, judetCod, localitate) {
  if (normalizeLocalitate(localitate) === HOME_CITY) return 0

  const tier = JUDET_TIERS[judetCod]
  if (!tier) return 0
  if (tier <= 2) return NEAR_PITESTI_FLAT_FEE

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

// Cutie de protectie, pe marimea oglinzii - doar sticla are nevoie de ea,
// plexi nu. Cost separat de pretul oglinzii si de livrare, vizibil doar in
// cos/checkout, nu si in configurator.
//
// Nu se factureaza in zonele 1-2 (~150km de Pitesti): acolo livreaza direct
// proprietarul, nu curierul, deci oglinda nu are nevoie de cutie. Daca
// judetul nu e inca ales, presupunem varianta "departe" (cost normal) - se
// recalculeaza corect imediat ce clientul alege judetul.
const GLASS_PACKAGING_FEES = { S: 40, M: 50, L: 60, XL: 70 }

export function getGlassPackagingFee(item, judetCod) {
  if (item.material !== 'sticla') return 0

  const tier = JUDET_TIERS[judetCod]
  if (tier != null && tier <= 2) return 0

  const size = ['S', 'M', 'L', 'XL'].includes(item.size) ? item.size : 'M'
  return GLASS_PACKAGING_FEES[size]
}

export function getCartPackagingTotal(items, judetCod) {
  return items.reduce((sum, item) => sum + getGlassPackagingFee(item, judetCod) * item.qty, 0)
}
