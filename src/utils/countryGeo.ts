/**
 * Per-country geo metadata for African markets.
 * Used to inject accurate geo.region, geo.position, and geo.placename
 * meta tags on pages that mention specific countries.
 *
 * ISO 3166-1 alpha-2 codes + approximate geographic centroids.
 */

export interface CountryGeo {
  /** ISO 3166-1 alpha-2 code, e.g. 'NG' */
  code: string;
  /** Human-readable name */
  name: string;
  /** Latitude;Longitude (semicolon-separated for geo.position / ICBM) */
  position: string;
  /** Lowercase name variants and common aliases used for text matching */
  aliases: string[];
}

export const COUNTRY_GEO_MAP: CountryGeo[] = [
  // ── West Africa ──────────────────────────────────────────────────────────
  { code: 'NG', name: 'Nigeria',        position: '9.0820;8.6753',   aliases: ['nigeria', 'nigerian', 'ndpr', 'bvn', 'nin'] },
  { code: 'GH', name: 'Ghana',          position: '7.9465;-1.0232',  aliases: ['ghana', 'ghanaian', 'ghana card'] },
  { code: 'SN', name: 'Senegal',        position: '14.4974;-14.4524',aliases: ['senegal', 'senegalese'] },
  { code: 'CI', name: "Côte d'Ivoire",  position: '7.5400;-5.5471',  aliases: ["côte d'ivoire", 'ivory coast', 'cote d\'ivoire'] },
  { code: 'ML', name: 'Mali',           position: '17.5707;-3.9962', aliases: ['mali', 'malian'] },
  { code: 'BF', name: 'Burkina Faso',   position: '12.3641;-1.5330', aliases: ['burkina faso', 'burkinabe'] },
  { code: 'NE', name: 'Niger',          position: '17.6078;8.0817',  aliases: ['niger', 'nigerien'] },
  { code: 'BJ', name: 'Benin',          position: '9.3077;2.3158',   aliases: ['benin', 'beninese'] },
  { code: 'TG', name: 'Togo',           position: '8.6195;0.8248',   aliases: ['togo', 'togolese'] },
  { code: 'LR', name: 'Liberia',        position: '6.4281;-9.4295',  aliases: ['liberia', 'liberian'] },
  { code: 'SL', name: 'Sierra Leone',   position: '8.4606;-11.7799', aliases: ['sierra leone'] },
  { code: 'GN', name: 'Guinea',         position: '9.9456;-11.2812', aliases: ['guinea', 'guinean'] },
  { code: 'GW', name: 'Guinea-Bissau',  position: '11.8037;-15.1804',aliases: ['guinea-bissau'] },
  { code: 'GM', name: 'Gambia',         position: '13.4432;-15.3101',aliases: ['gambia', 'gambian'] },
  { code: 'CV', name: 'Cape Verde',     position: '16.5388;-23.0418',aliases: ['cape verde'] },
  { code: 'MR', name: 'Mauritania',     position: '21.0079;-10.9408',aliases: ['mauritania', 'mauritanian'] },

  // ── East Africa ──────────────────────────────────────────────────────────
  { code: 'KE', name: 'Kenya',          position: '-0.0236;37.9062', aliases: ['kenya', 'kenyan'] },
  { code: 'TZ', name: 'Tanzania',       position: '-6.3690;34.8888', aliases: ['tanzania', 'tanzanian'] },
  { code: 'UG', name: 'Uganda',         position: '1.3733;32.2903',  aliases: ['uganda', 'ugandan'] },
  { code: 'RW', name: 'Rwanda',         position: '-1.9403;29.8739', aliases: ['rwanda', 'rwandan'] },
  { code: 'ET', name: 'Ethiopia',       position: '9.1450;40.4897',  aliases: ['ethiopia', 'ethiopian'] },
  { code: 'ER', name: 'Eritrea',        position: '15.1794;39.7823', aliases: ['eritrea', 'eritrean'] },
  { code: 'DJ', name: 'Djibouti',       position: '11.8251;42.5903', aliases: ['djibouti'] },
  { code: 'SO', name: 'Somalia',        position: '5.1521;46.1996',  aliases: ['somalia', 'somali'] },
  { code: 'SS', name: 'South Sudan',    position: '6.8770;31.3070',  aliases: ['south sudan'] },
  { code: 'BI', name: 'Burundi',        position: '-3.3731;29.9189', aliases: ['burundi', 'burundian'] },
  { code: 'MU', name: 'Mauritius',      position: '-20.3484;57.5522',aliases: ['mauritius', 'mauritian'] },
  { code: 'SC', name: 'Seychelles',     position: '-4.6796;55.4920', aliases: ['seychelles'] },
  { code: 'KM', name: 'Comoros',        position: '-11.6455;43.3333',aliases: ['comoros', 'comorian'] },
  { code: 'MG', name: 'Madagascar',     position: '-18.7669;46.8691',aliases: ['madagascar', 'malagasy'] },

  // ── Southern Africa ──────────────────────────────────────────────────────
  { code: 'ZA', name: 'South Africa',   position: '-30.5595;22.9375',aliases: ['south africa', 'south african', 'fica', 'popia', 'sars'] },
  { code: 'ZM', name: 'Zambia',         position: '-13.1339;27.8493',aliases: ['zambia', 'zambian'] },
  { code: 'ZW', name: 'Zimbabwe',       position: '-19.0154;29.1549',aliases: ['zimbabwe', 'zimbabwean'] },
  { code: 'BW', name: 'Botswana',       position: '-22.3285;24.6849',aliases: ['botswana', 'motswana'] },
  { code: 'NA', name: 'Namibia',        position: '-22.9576;18.4904',aliases: ['namibia', 'namibian'] },
  { code: 'MZ', name: 'Mozambique',     position: '-18.6657;35.5296',aliases: ['mozambique', 'mozambican'] },
  { code: 'AO', name: 'Angola',         position: '-11.2027;17.8739',aliases: ['angola', 'angolan'] },
  { code: 'MW', name: 'Malawi',         position: '-13.2543;34.3015',aliases: ['malawi', 'malawian'] },
  { code: 'SZ', name: 'Eswatini',       position: '-26.5225;31.4659',aliases: ['eswatini', 'swaziland'] },
  { code: 'LS', name: 'Lesotho',        position: '-29.6100;28.2336',aliases: ['lesotho', 'basotho'] },

  // ── North Africa ─────────────────────────────────────────────────────────
  { code: 'EG', name: 'Egypt',          position: '26.8206;30.8025', aliases: ['egypt', 'egyptian'] },
  { code: 'MA', name: 'Morocco',        position: '31.7917;-7.0926', aliases: ['morocco', 'moroccan'] },
  { code: 'TN', name: 'Tunisia',        position: '33.8869;9.5375',  aliases: ['tunisia', 'tunisian'] },
  { code: 'DZ', name: 'Algeria',        position: '28.0339;1.6596',  aliases: ['algeria', 'algerian'] },
  { code: 'LY', name: 'Libya',          position: '26.3351;17.2283', aliases: ['libya', 'libyan'] },
  { code: 'SD', name: 'Sudan',          position: '12.8628;30.2176', aliases: ['sudan', 'sudanese'] },

  // ── Central Africa ───────────────────────────────────────────────────────
  { code: 'CM', name: 'Cameroon',       position: '3.8480;11.5021',  aliases: ['cameroon', 'cameroonian'] },
  { code: 'CD', name: 'DRC',            position: '-4.0383;21.7587', aliases: ['drc', 'democratic republic of congo', 'congo'] },
  { code: 'CG', name: 'Republic of Congo', position: '-0.2280;15.8277', aliases: ['republic of congo'] },
  { code: 'GA', name: 'Gabon',          position: '-0.8037;11.6094', aliases: ['gabon', 'gabonese'] },
  { code: 'GQ', name: 'Equatorial Guinea', position: '1.6508;10.2679', aliases: ['equatorial guinea'] },
  { code: 'CF', name: 'Central African Republic', position: '6.6111;20.9394', aliases: ['central african republic'] },
  { code: 'TD', name: 'Chad',           position: '15.4542;18.7322', aliases: ['chad', 'chadian'] },
];

/**
 * Detect which country (if any) is most prominently mentioned in the given text.
 * Returns the first match found, prioritising longer/more specific aliases.
 */
export function detectCountryFromText(text: string): CountryGeo | null {
  const lower = text.toLowerCase();

  // Sort by alias length descending so longer matches (e.g. "south africa") win over shorter ones (e.g. "africa")
  const sorted = COUNTRY_GEO_MAP.flatMap((country) =>
    country.aliases.map((alias) => ({ country, alias }))
  ).sort((a, b) => b.alias.length - a.alias.length);

  for (const { country, alias } of sorted) {
    if (lower.includes(alias)) {
      return country;
    }
  }

  return null;
}

/**
 * Detect multiple countries mentioned in the given text.
 * Returns up to `limit` unique countries found.
 */
export function detectCountriesFromText(text: string, limit = 3): CountryGeo[] {
  const lower = text.toLowerCase();
  const found: CountryGeo[] = [];
  const seenCodes = new Set<string>();

  const sorted = COUNTRY_GEO_MAP.flatMap((country) =>
    country.aliases.map((alias) => ({ country, alias }))
  ).sort((a, b) => b.alias.length - a.alias.length);

  for (const { country, alias } of sorted) {
    if (found.length >= limit) break;
    if (!seenCodes.has(country.code) && lower.includes(alias)) {
      found.push(country);
      seenCodes.add(country.code);
    }
  }

  return found;
}
