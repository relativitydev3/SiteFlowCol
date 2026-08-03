const COUNTRY_TO_LANG = {
  DE: 'de', AT: 'de', LI: 'de',
  ES: 'es', MX: 'es', CO: 'es', AR: 'es', CL: 'es', PE: 'es', VE: 'es',
  EC: 'es', BO: 'es', PY: 'es', UY: 'es', CR: 'es', PA: 'es', GT: 'es',
  HN: 'es', SV: 'es', NI: 'es', DO: 'es', CU: 'es', PR: 'es',
  US: 'en', GB: 'en', IE: 'en', AU: 'en', NZ: 'en', CA: 'en', IN: 'en',
  ZA: 'en', SG: 'en', PH: 'en'
};

const COUNTRY_TO_CURRENCY = {
  CO: 'COP',
  DE: 'EUR', AT: 'EUR', LI: 'EUR'
};

export const config = { runtime: 'edge' };

export default function handler(request) {
  const country = String(request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const lang = COUNTRY_TO_LANG[country] || 'es';
  const currency = COUNTRY_TO_CURRENCY[country] || 'USD';
  return new Response(JSON.stringify({ lang, country: country || null, currency }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-store'
    }
  });
}
