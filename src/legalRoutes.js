// Single source of truth for legal page paths/labels, shared by App.jsx (routes)
// and Footer.jsx (links) so the two never drift apart.
export const LEGAL_LINKS = [
  { id: 'terms', label: 'Termeni si conditii', path: '/termeni-si-conditii' },
  { id: 'privacy', label: 'Politica de confidentialitate', path: '/politica-de-confidentialitate' },
  { id: 'cookies', label: 'Politica cookie', path: '/politica-cookie' },
  { id: 'returns', label: 'Politica de retur', path: '/politica-de-retur' },
]
