const COUNTRY_TO_LANG = {
  DE: 'de', AT: 'de', LI: 'de',
  ES: 'es', MX: 'es', CO: 'es', AR: 'es', CL: 'es', PE: 'es', VE: 'es',
  EC: 'es', BO: 'es', PY: 'es', UY: 'es', CR: 'es', PA: 'es', GT: 'es',
  HN: 'es', SV: 'es', NI: 'es', DO: 'es', CU: 'es', PR: 'es',
  US: 'en', GB: 'en', IE: 'en', AU: 'en', NZ: 'en', CA: 'en', IN: 'en',
  ZA: 'en', SG: 'en', PH: 'en'
};

/** Formato Node.js (Vercel static). Response.json solo funciona en Edge. */
export default function handler(req, res) {
  const country = String(req.headers['x-vercel-ip-country'] || '').toUpperCase();
  const lang = COUNTRY_TO_LANG[country] || 'es';
  res.setHeader('Cache-Control', 'private, no-store');
  res.status(200).json({ lang, country: country || null });
}
