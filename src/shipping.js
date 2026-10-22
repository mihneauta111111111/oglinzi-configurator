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

// Zonele 1-2 (~0-160km, practic raza de ~150km in jurul Pitesti) au un
// tarif unic de livrare, indiferent de marime/stander/model, si nu se
// factureaza cutia de protectie pentru sticla (vezi getGlassPackagingFee
// mai jos) - distanta e suficient de mica cat sa nu fie nevoie de ea.
const NEAR_PITESTI_FLAT_FEE = 30

// Zonele 3-4 (peste ~160km) folosesc tabelul variabil pe marime/stander,
// calibrat pe reperul dat de client: L + stander + Maramures (zona 4) =
// 180 RON. XL extrapolat cu acelasi ritm de crestere M->L aplicat inca o
// data (L->XL), ca sa ramana monoton si proportional cu restul tabelului.
const HALO_SHIPPING_FEES = {
  3: { no: { S: 38, M: 48, L: 61, XL: 78 }, yes: { S: 65, M: 76, L: 99, XL: 129 } },
  4: { no: { S: 69, M: 87, L: 111, XL: 142 }, yes: { S: 118, M: 139, L: 180, XL: 233 } },
}

const BABY_SHIPPING_FEES = { 3: 14, 4: 20 }

// Produsele adaugate in cos inainte de aceasta schimbare nu au inca
// size/stand/isBaby brute (doar etichetele afisate) - default rezonabil in
// loc sa pice pagina cuiva care avea deja ceva in cos.
export function getShippingFeeForItem(item, judetCod) {
  const tier = JUDET_TIERS[judetCod]
  if (!tier) return 0
  if (tier <= 2) return NEAR_PITESTI_FLAT_FEE

  const isBaby = item.isBaby ?? item.modelName === 'baby.halo'
  if (isBaby) return BABY_SHIPPING_FEES[tier]

  const size = ['S', 'M', 'L', 'XL'].includes(item.size) ? item.size : 'M'
  const stand = item.stand === 'yes' ? 'yes' : 'no'
  return HALO_SHIPPING_FEES[tier][stand][size]
}

export function getCartShippingTotal(items, judetCod) {
  if (!judetCod) return null
  return items.reduce((sum, item) => sum + getShippingFeeForItem(item, judetCod) * item.qty, 0)
}

// Cutie de protectie pentru sticla - doar sticla are nevoie, plexi nu. Cost
// separat de pretul oglinzii, vizibil doar in cos/checkout, nu si in
// configurator. Nu se factureaza in zonele 1-2 (~150km de Pitesti) - vezi
// NEAR_PITESTI_FLAT_FEE mai sus. Daca judetul nu e inca ales, presupunem
// varianta "departe" (cost normal) - se recalculeaza corect imediat ce
// clientul alege judetul.
const GLASS_PACKAGING_FEES = { S: 40, M: 50, L: 60, XL: 70 }

export function getGlassPackagingFee(item, judetCod) {
  if (item.material !== 'sticla') return 0
  const tier = JUDET_TIERS[judetCod]
  if (tier && tier <= 2) return 0

  const size = ['S', 'M', 'L', 'XL'].includes(item.size) ? item.size : 'M'
  return GLASS_PACKAGING_FEES[size]
}

export function getCartPackagingTotal(items, judetCod) {
  return items.reduce((sum, item) => sum + getGlassPackagingFee(item, judetCod) * item.qty, 0)
}
