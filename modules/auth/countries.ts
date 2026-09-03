export interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string; // path to local vector svg in /public/flags/
}

export const COUNTRIES: Country[] = [
  { name: 'Morocco', code: 'MA', dial_code: '+212', flag: '/flags/ma.svg' },
  { name: 'France', code: 'FR', dial_code: '+33', flag: '/flags/fr.svg' },
  { name: 'Spain', code: 'ES', dial_code: '+34', flag: '/flags/es.svg' },
  { name: 'Algeria', code: 'DZ', dial_code: '+213', flag: '/flags/dz.svg' },
  { name: 'Tunisia', code: 'TN', dial_code: '+216', flag: '/flags/tn.svg' },
  { name: 'Saudi Arabia', code: 'SA', dial_code: '+966', flag: '/flags/sa.svg' },
  { name: 'United Arab Emirates', code: 'AE', dial_code: '+971', flag: '/flags/ae.svg' },
  { name: 'Qatar', code: 'QA', dial_code: '+974', flag: '/flags/qa.svg' },
  { name: 'Kuwait', code: 'KW', dial_code: '+965', flag: '/flags/kw.svg' },
  { name: 'Egypt', code: 'EG', dial_code: '+20', flag: '/flags/eg.svg' },
  { name: 'United States', code: 'US', dial_code: '+1', flag: '/flags/us.svg' },
  { name: 'Canada', code: 'CA', dial_code: '+1', flag: '/flags/ca.svg' },
  { name: 'United Kingdom', code: 'GB', dial_code: '+44', flag: '/flags/gb.svg' },
  { name: 'Germany', code: 'DE', dial_code: '+49', flag: '/flags/de.svg' },
  { name: 'Italy', code: 'IT', dial_code: '+39', flag: '/flags/it.svg' },
  { name: 'Belgium', code: 'BE', dial_code: '+32', flag: '/flags/be.svg' },
  { name: 'Netherlands', code: 'NL', dial_code: '+31', flag: '/flags/nl.svg' },
  { name: 'Switzerland', code: 'CH', dial_code: '+41', flag: '/flags/ch.svg' },
  { name: 'Turkey', code: 'TR', dial_code: '+90', flag: '/flags/tr.svg' },
  { name: 'India', code: 'IN', dial_code: '+91', flag: '/flags/in.svg' },
  { name: 'Senegal', code: 'SN', dial_code: '+221', flag: '/flags/sn.svg' },
  { name: 'Ivory Coast', code: 'CI', dial_code: '+225', flag: '/flags/ci.svg' },
  { name: 'Portugal', code: 'PT', dial_code: '+351', flag: '/flags/pt.svg' },
];
