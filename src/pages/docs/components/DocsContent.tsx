import { useState } from 'react';

interface DocsContentProps {
  selectedVerification: string;
  apiSection: 'single' | 'bulk';
}

type ParamSpec = {
  name: string;
  type: string;
  required: boolean;
  description: string;
  nested?: ParamSpec[];
};

type VerifConfig = {
  name: string;
  verificationType: string;
  description: string;
  isLinkMode: boolean;
  params: ParamSpec[];
  directModeParams?: ParamSpec[];
  sampleInputData: Record<string, unknown>;
  directSampleInputData?: Record<string, unknown>;
  linkSampleResponse: Record<string, unknown>;
  directSampleResponse?: Record<string, unknown>;
};

const LINK_PARAMS: ParamSpec[] = [
  { name: 'email', type: 'string', required: true, description: "Customer's email address. Used to send the hosted verification link." },
  { name: 'country', type: 'string', required: false, description: 'ISO 3166-1 alpha-2 country code (e.g., "NG", "ZA", "GH", "KE").' },
  { name: 'language', type: 'string', required: false, description: 'Language for the hosted verification page (e.g., "EN", "FR"). Defaults to "EN".' },
  { name: 'ttl', type: 'number', required: false, description: 'Link expiry time in minutes. Allowed: 30, 60, 180, 360, 720, 1440, 2880. Defaults to 60.' },
  {
    name: 'document', type: 'object', required: false, description: 'Document verification configuration for link mode.',
    nested: [
      { name: 'backside_proof_required', type: 'string', required: false, description: '"1" to require a back image, "0" to skip it. Defaults to "0".' },
      { name: 'allow_online', type: 'string', required: false, description: '"1" to allow online capture, "0" to disable. Defaults to "1".' },
      { name: 'allow_offline', type: 'string', required: false, description: '"1" to allow offline upload, "0" to disable. Defaults to "1".' },
    ],
  },
];

const LINK_SAMPLE_INPUT = { language: 'EN', email: 'customer@example.com', ttl: 60, document: { backside_proof_required: '0', allow_online: '1', allow_offline: '1' } };
const LINK_RESPONSE = { status: 'success', data: { id: 'ver_abc123', verification_type: 'id_document', status: 'completed', created_at: '2025-01-15T10:30:00Z', verification_url: 'https://verify.verifyafrica.com/verification/abc123' } };
const DIRECT_RESPONSE = { status: 'success', data: { id: 'ver_9gjzgc36t', verification_type: '', status: 'verified', created_at: '2026-02-09T08:01:42.891Z', response_data: { first_name: 'John', last_name: 'Doe', date_of_birth: '1990-01-15', gender: 'Male' } } };

const configs: Record<string, VerifConfig> = {
  id_document: { name: 'Document Verification', verificationType: 'id_document', description: 'Verify government-issued identity documents such as passports, national IDs, and driver\'s licenses across 47+ African countries.', isLinkMode: true, params: LINK_PARAMS, sampleInputData: LINK_SAMPLE_INPUT, linkSampleResponse: LINK_RESPONSE },
  face_match: { name: 'Facial Screening', verificationType: 'face_match', description: 'Perform real-time liveness detection and face match verification against a reference document.', isLinkMode: true, params: LINK_PARAMS, sampleInputData: { ...LINK_SAMPLE_INPUT }, linkSampleResponse: { ...LINK_RESPONSE, data: { ...LINK_RESPONSE.data, verification_type: 'face_match' } } },
  aml_screening: { name: 'AML Screening', verificationType: 'aml_screening', description: 'Screen individuals against global sanctions lists, PEP databases, and adverse media sources.', isLinkMode: false, params: [{ name: 'first_name', type: 'string', required: true, description: "Subject's first name." }, { name: 'last_name', type: 'string', required: true, description: "Subject's last name." }, { name: 'date_of_birth', type: 'string', required: false, description: 'Date of birth in YYYY-MM-DD format.' }, { name: 'country', type: 'string', required: false, description: 'ISO 3166-1 alpha-2 country code.' }, { name: 'nationality', type: 'string', required: false, description: "Subject's nationality." }], sampleInputData: { first_name: 'John', last_name: 'Doe', date_of_birth: '1985-06-15', country: 'NG' }, linkSampleResponse: { status: 'success', data: { id: 'ver_aml123', verification_type: 'aml_screening', status: 'clear', created_at: '2026-01-15T10:30:00Z', response_data: { match_found: false, sanctions: [], pep: false } } } },
  business_aml_screening: { name: 'Business AML Screening', verificationType: 'business_aml_screening', description: 'Screen businesses and corporate entities against global sanctions lists and adverse media.', isLinkMode: false, params: [{ name: 'company_name', type: 'string', required: true, description: 'Legal name of the business entity.' }, { name: 'country', type: 'string', required: false, description: 'Country of incorporation (ISO 3166-1 alpha-2).' }, { name: 'rc_number', type: 'string', required: false, description: 'Registration or company number.' }], sampleInputData: { company_name: 'Acme Corp Ltd', country: 'NG', rc_number: 'RC123456' }, linkSampleResponse: { status: 'success', data: { id: 'ver_baml123', verification_type: 'business_aml_screening', status: 'clear', created_at: '2026-01-15T10:30:00Z', response_data: { match_found: false, sanctions: [] } } } },
  kyb_screening: { name: 'KYB - Know Your Business', verificationType: 'kyb_screening', description: 'Perform full Know Your Business checks including ownership structure, beneficial owners, and registry data.', isLinkMode: false, params: [{ name: 'rc_number', type: 'string', required: true, description: 'Company registration number.' }, { name: 'company_name', type: 'string', required: false, description: 'Legal name of the business (used for cross-validation).' }], sampleInputData: { rc_number: 'RC789012', company_name: 'TechStart Nigeria Ltd' }, linkSampleResponse: { status: 'success', data: { id: 'ver_kyb123', verification_type: 'kyb_screening', status: 'verified', created_at: '2026-01-15T10:30:00Z', response_data: { company_name: 'TechStart Nigeria Ltd', status: 'active', directors: ['John Doe', 'Jane Smith'] } } } },
  address_verification: { name: 'Address Verification', verificationType: 'address_verification', description: 'Verify physical address records against government and utility databases across Africa.', isLinkMode: false, params: [{ name: 'address', type: 'string', required: true, description: 'Full street address.' }, { name: 'city', type: 'string', required: true, description: 'City or town name.' }, { name: 'state', type: 'string', required: false, description: 'State or province.' }, { name: 'country', type: 'string', required: true, description: 'ISO 3166-1 alpha-2 country code.' }], sampleInputData: { address: '15 Adeola Odeku Street', city: 'Lagos', state: 'Lagos', country: 'NG' }, linkSampleResponse: { status: 'success', data: { id: 'ver_addr123', verification_type: 'address_verification', status: 'verified', created_at: '2026-01-15T10:30:00Z', response_data: { address_confirmed: true, confidence_score: 0.97 } } } },
  risk_assessment: { name: 'Risk Assessment', verificationType: 'risk_assessment', description: 'Assess the fraud and identity risk score for a given individual based on their identity data.', isLinkMode: false, params: [{ name: 'id_number', type: 'string', required: true, description: 'The identity number to assess.' }, { name: 'id_type', type: 'string', required: true, description: 'Type of ID (e.g., "national_id", "passport", "bvn").' }, { name: 'country', type: 'string', required: true, description: 'ISO 3166-1 alpha-2 country code.' }], sampleInputData: { id_number: '22222222222', id_type: 'bvn', country: 'NG' }, linkSampleResponse: { status: 'success', data: { id: 'ver_risk123', verification_type: 'risk_assessment', status: 'completed', created_at: '2026-01-15T10:30:00Z', response_data: { risk_score: 12, risk_level: 'low', flags: [] } } } },
  crypto_wallet_screening: { name: 'Crypto Wallet Screening', verificationType: 'crypto_wallet_screening', description: 'Screen cryptocurrency wallet addresses for sanctions exposure, darknet activity, and illicit fund sources.', isLinkMode: false, params: [{ name: 'wallet_address', type: 'string', required: true, description: 'The cryptocurrency wallet address to screen.' }, { name: 'blockchain', type: 'string', required: true, description: 'Blockchain network (e.g., "bitcoin", "ethereum", "tron").' }], sampleInputData: { wallet_address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf', blockchain: 'bitcoin' }, linkSampleResponse: { status: 'success', data: { id: 'ver_crypto123', verification_type: 'crypto_wallet_screening', status: 'clear', created_at: '2026-01-15T10:30:00Z', response_data: { risk_score: 5, sanctions_exposure: false, darknet_exposure: false } } } },
  za_said_verification: { name: 'South Africa ID Verification', verificationType: 'za_said_verification', description: 'Verify South African ID numbers against the Department of Home Affairs registry.', isLinkMode: false, params: [{ name: 'id_number', type: 'string', required: true, description: '13-digit South African ID number.' }, { name: 'first_name', type: 'string', required: false, description: "Subject's first name for cross-validation." }, { name: 'last_name', type: 'string', required: false, description: "Subject's last name for cross-validation." }], sampleInputData: { id_number: '9001015001087', first_name: 'John', last_name: 'Doe' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'za_said_verification' } } },
  ng_bvn_verification: { name: 'Nigeria BVN Verification', verificationType: 'ng_bvn_verification', description: 'Verify Nigerian Bank Verification Numbers against the NIBSS database.', isLinkMode: false, params: [{ name: 'bvn', type: 'string', required: true, description: '11-digit Bank Verification Number.' }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }, { name: 'last_name', type: 'string', required: false, description: 'Last name for cross-validation.' }, { name: 'date_of_birth', type: 'string', required: false, description: 'Date of birth (YYYY-MM-DD).' }], sampleInputData: { bvn: '22222222222', first_name: 'John', last_name: 'Doe' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ng_bvn_verification' } } },
  ng_nin_verification: { name: 'Nigeria NIN Verification', verificationType: 'ng_nin_verification', description: 'Verify Nigerian National Identification Numbers against the NIMC database.', isLinkMode: false, params: [{ name: 'nin', type: 'string', required: true, description: '11-digit National Identification Number.' }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }, { name: 'last_name', type: 'string', required: false, description: 'Last name for cross-validation.' }], sampleInputData: { nin: '12345678901' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ng_nin_verification' } } },
  ng_virtual_nin_verification: { name: 'Nigeria Virtual NIN', verificationType: 'ng_virtual_nin_verification', description: 'Verify Nigerian Virtual National Identification Numbers issued by NIMC.', isLinkMode: false, params: [{ name: 'vnin', type: 'string', required: true, description: '16-character Virtual NIN.' }], sampleInputData: { vnin: 'AB123456789012CD' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ng_virtual_nin_verification' } } },
  ng_advanced_phone_number_verification: { name: 'Nigeria Phone Verification', verificationType: 'ng_advanced_phone_number_verification', description: 'Verify Nigerian phone numbers with advanced carrier and identity validation.', isLinkMode: false, params: [{ name: 'phone_number', type: 'string', required: true, description: 'Nigerian phone number (e.g., 08012345678).' }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }, { name: 'last_name', type: 'string', required: false, description: 'Last name for cross-validation.' }], sampleInputData: { phone_number: '08012345678' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ng_advanced_phone_number_verification' } } },
  ng_phone_number_lookup: { name: 'Nigeria Phone Lookup', verificationType: 'ng_phone_number_lookup', description: 'Lookup subscriber information associated with a Nigerian phone number.', isLinkMode: false, params: [{ name: 'phone_number', type: 'string', required: true, description: 'Nigerian phone number to look up.' }], sampleInputData: { phone_number: '08012345678' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ng_phone_number_lookup' } } },
  ng_cac_lookup: { name: 'Nigeria CAC Lookup', verificationType: 'ng_cac_lookup', description: 'Lookup company records from the Nigerian Corporate Affairs Commission (CAC).', isLinkMode: false, params: [{ name: 'rc_number', type: 'string', required: true, description: 'CAC registration number (e.g., RC123456).' }, { name: 'company_name', type: 'string', required: false, description: 'Company name for cross-validation.' }], sampleInputData: { rc_number: 'RC123456' }, linkSampleResponse: { status: 'success', data: { id: 'ver_cac123', verification_type: 'ng_cac_lookup', status: 'verified', created_at: '2026-01-15T10:30:00Z', response_data: { company_name: 'Acme Nigeria Ltd', status: 'active', rc_number: 'RC123456' } } } },
  ng_passport_verification: { name: 'Nigeria Passport Verification', verificationType: 'ng_passport_verification', description: 'Verify Nigerian international passport numbers against NIS records.', isLinkMode: false, params: [{ name: 'passport_number', type: 'string', required: true, description: 'Passport number (e.g., A12345678).' }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }, { name: 'last_name', type: 'string', required: false, description: 'Last name for cross-validation.' }, { name: 'date_of_birth', type: 'string', required: false, description: 'Date of birth (YYYY-MM-DD).' }], sampleInputData: { passport_number: 'A12345678' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ng_passport_verification' } } },
  gh_passport_lookup: { name: 'Ghana Passport Lookup', verificationType: 'gh_passport_lookup', description: 'Lookup Ghanaian international passport records.', isLinkMode: false, params: [{ name: 'passport_number', type: 'string', required: true, description: 'Ghana passport number (e.g., G1234567).' }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }], sampleInputData: { passport_number: 'G1234567' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'gh_passport_lookup' } } },
  gh_voter_card_lookup: { name: 'Ghana Voter Card Lookup', verificationType: 'gh_voter_card_lookup', description: 'Lookup Ghanaian voter identification card records.', isLinkMode: false, params: [{ name: 'voter_id', type: 'string', required: true, description: 'Ghana voter ID number.' }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }], sampleInputData: { voter_id: '1234567890' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'gh_voter_card_lookup' } } },
  gh_ssnit_lookup: { name: 'Ghana SSNIT Lookup', verificationType: 'gh_ssnit_lookup', description: "Lookup Ghana Social Security and National Insurance Trust (SSNIT) records.", isLinkMode: false, params: [{ name: 'ssnit_number', type: 'string', required: true, description: 'SSNIT number.' }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }], sampleInputData: { ssnit_number: 'C123456789012' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'gh_ssnit_lookup' } } },
  gh_drivers_license_lookup: { name: "Ghana Driver's License", verificationType: 'gh_drivers_license_lookup', description: "Lookup Ghanaian driver's license records from the DVLA registry.", isLinkMode: false, params: [{ name: 'license_number', type: 'string', required: true, description: "Driver's license number." }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }], sampleInputData: { license_number: 'DL123456789' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'gh_drivers_license_lookup' } } },
  ke_passport_lookup: { name: 'Kenya Passport Lookup', verificationType: 'ke_passport_lookup', description: 'Lookup Kenyan international passport records from immigration registries.', isLinkMode: false, params: [{ name: 'passport_number', type: 'string', required: true, description: 'Kenya passport number (e.g., A1234567).' }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }], sampleInputData: { passport_number: 'A1234567' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ke_passport_lookup' } } },
  ke_national_id_lookup: { name: 'Kenya National ID Lookup', verificationType: 'ke_national_id_lookup', description: 'Lookup Kenyan national ID records from the National Registration Bureau.', isLinkMode: false, params: [{ name: 'id_number', type: 'string', required: true, description: 'Kenya national ID number.' }, { name: 'first_name', type: 'string', required: false, description: 'First name for cross-validation.' }], sampleInputData: { id_number: '12345678' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ke_national_id_lookup' } } },
  ke_phone_number_lookup: { name: 'Kenya Phone Lookup', verificationType: 'ke_phone_number_lookup', description: 'Lookup subscriber information associated with a Kenyan phone number.', isLinkMode: false, params: [{ name: 'phone_number', type: 'string', required: true, description: 'Kenyan phone number (e.g., 0712345678).' }], sampleInputData: { phone_number: '0712345678' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ke_phone_number_lookup' } } },
  ke_tax_pin_verification: { name: 'Kenya Tax PIN Verification', verificationType: 'ke_tax_pin_verification', description: 'Verify Kenyan KRA Personal Identification Numbers.', isLinkMode: false, params: [{ name: 'tax_pin', type: 'string', required: true, description: 'Kenya Revenue Authority PIN (e.g., A123456789B).' }, { name: 'name', type: 'string', required: false, description: 'Taxpayer name for cross-validation.' }], sampleInputData: { tax_pin: 'A123456789B' }, linkSampleResponse: { ...DIRECT_RESPONSE, data: { ...DIRECT_RESPONSE.data, verification_type: 'ke_tax_pin_verification' } } },
};

const ENDPOINT = 'https://api.verifyafrica.io/api/verifications/requests/';
const CODE_LANGS = ['cURL', 'Node.js', 'Java', 'JavaScript (Fetch)', 'JavaScript (Axios)', 'Python'];

const RESPONSE_CODES = [
  { code: '200', desc: 'Success - Verification completed', isError: false },
  { code: '400', desc: 'Bad Request - Missing or invalid parameters', isError: false },
  { code: '401', desc: 'Unauthorized - Invalid or missing API key', isError: false },
  { code: '403', desc: 'Forbidden - Insufficient credits or inactive key', isError: false },
  { code: '404', desc: 'Not Found - Identity record not found', isError: false },
  { code: '500', desc: 'Internal Server Error - Please try again', isError: true },
];

function buildBody(verificationType: string, methodType: string | null, inputData: Record<string, unknown>): object {
  const base: Record<string, unknown> = { is_test: false, verification_type: verificationType };
  if (methodType) base.method_type = methodType;
  base.input_data = inputData;
  return base;
}

function generateCode(lang: string, verificationType: string, methodType: string | null, inputData: Record<string, unknown>): string {
  const bodyObj = buildBody(verificationType, methodType, inputData);
  const bodyJson = JSON.stringify(bodyObj, null, 2);
  switch (lang) {
    case 'cURL':
      return `curl -X POST ${ENDPOINT} \\
  -H "X-API-KEY: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '${bodyJson}'`;
    case 'Node.js':
      return `const axios = require('axios');

const response = await axios.post('${ENDPOINT}', ${bodyJson}, {
  headers: {
    'X-API-KEY': 'your_api_key_here',
    'Content-Type': 'application/json',
  },
});
console.log(response.data);`;
    case 'Java':
      return `HttpClient client = HttpClient.newHttpClient();

String requestBody = ${JSON.stringify(bodyJson)};

HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("${ENDPOINT}"))
  .header("X-API-KEY", "your_api_key_here")
  .header("Content-Type", "application/json")
  .POST(HttpRequest.BodyPublishers.ofString(requestBody))
  .build();

HttpResponse<String> response = client.send(request,
  HttpResponse.BodyHandlers.ofString());`;
    case 'JavaScript (Fetch)':
      return `const response = await fetch('${ENDPOINT}', {
  method: 'POST',
  headers: {
    'X-API-KEY': 'your_api_key_here',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${bodyJson}),
});
const data = await response.json();
console.log(data);`;
    case 'JavaScript (Axios)':
      return `import axios from 'axios';

const { data } = await axios.post('${ENDPOINT}', ${bodyJson}, {
  headers: {
    'X-API-KEY': 'your_api_key_here',
    'Content-Type': 'application/json',
  },
});
console.log(data);`;
    case 'Python':
      return `import requests

response = requests.post(
    '${ENDPOINT}',
    headers={
        'X-API-KEY': 'your_api_key_here',
        'Content-Type': 'application/json',
    },
    json=${bodyJson.replace(/"/g, "'").replace(/:/g, ':')},
)
print(response.json())`;
    default:
      return '';
  }
}

function ParamRow({ param, depth = 0 }: { param: ParamSpec; depth?: number }) {
  return (
    <>
      <div className={`pb-4 border-b border-gray-100 last:border-0 last:pb-0 ${depth > 0 ? 'ml-4 pl-4 border-l border-gray-200' : ''}`}>
        <div className="flex items-center flex-wrap gap-2 mb-1">
          <span className="font-mono text-sm text-gray-900">{param.name}</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{param.type}</span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${param.required ? 'text-red-600 bg-red-50' : 'text-gray-500 bg-gray-100'}`}>
            {param.required ? 'required' : 'optional'}
          </span>
        </div>
        <p className="text-sm text-gray-600">{param.description}</p>
        {param.nested && (
          <div className="mt-3 space-y-3">
            {param.nested.map((n) => <ParamRow key={n.name} param={n} depth={depth + 1} />)}
          </div>
        )}
      </div>
    </>
  );
}

const BULK_ENDPOINT = 'https://api.verifyafrica.io/api/verifications/bulk/';

const BULK_CODE_LANGS = ['cURL', 'Node.js', 'Java', 'JavaScript (Fetch)', 'JavaScript (Axios)', 'Python'];

const BULK_SAMPLE_PAYLOAD = {
  is_test: false,
  verifications: [
    {
      verification_type: 'ng_bvn_verification',
      input_data: { bvn: '22222222222', first_name: 'John', last_name: 'Doe' },
    },
    {
      verification_type: 'ng_nin_verification',
      input_data: { nin: '12345678901' },
    },
    {
      verification_type: 'za_said_verification',
      input_data: { id_number: '9001015001087', first_name: 'Jane', last_name: 'Smith' },
    },
  ],
};

const BULK_SAMPLE_RESPONSE = {
  status: 'success',
  data: {
    batch_id: 'batch_8a3f9b2c1e',
    total: 3,
    submitted: 3,
    failed: 0,
    results: [
      {
        index: 0,
        id: 'ver_bvn_x1a2b',
        verification_type: 'ng_bvn_verification',
        status: 'verified',
        response_data: { first_name: 'John', last_name: 'Doe', date_of_birth: '1990-01-15', gender: 'Male' },
      },
      {
        index: 1,
        id: 'ver_nin_y3c4d',
        verification_type: 'ng_nin_verification',
        status: 'verified',
        response_data: { first_name: 'Jane', last_name: 'Doe', date_of_birth: '1992-07-20', gender: 'Female' },
      },
      {
        index: 2,
        id: 'ver_za_e5f6g',
        verification_type: 'za_said_verification',
        status: 'not_found',
        response_data: null,
        error: 'Identity record not found',
      },
    ],
    created_at: '2026-01-15T10:30:00Z',
  },
};

const BULK_VERIFICATION_TYPES = [
  { id: 'ng_bvn_verification', name: 'Nigeria BVN Verification', params: [{ name: 'bvn', required: true }, { name: 'first_name', required: false }, { name: 'last_name', required: false }, { name: 'date_of_birth', required: false }] },
  { id: 'ng_nin_verification', name: 'Nigeria NIN Verification', params: [{ name: 'nin', required: true }, { name: 'first_name', required: false }, { name: 'last_name', required: false }] },
  { id: 'ng_virtual_nin_verification', name: 'Nigeria Virtual NIN', params: [{ name: 'vnin', required: true }] },
  { id: 'ng_passport_verification', name: 'Nigeria Passport Verification', params: [{ name: 'passport_number', required: true }, { name: 'first_name', required: false }, { name: 'last_name', required: false }, { name: 'date_of_birth', required: false }] },
  { id: 'ng_advanced_phone_number_verification', name: 'Nigeria Phone Verification', params: [{ name: 'phone_number', required: true }, { name: 'first_name', required: false }, { name: 'last_name', required: false }] },
  { id: 'ng_cac_lookup', name: 'Nigeria CAC Lookup', params: [{ name: 'rc_number', required: true }, { name: 'company_name', required: false }] },
  { id: 'za_said_verification', name: 'South Africa ID Verification', params: [{ name: 'id_number', required: true }, { name: 'first_name', required: false }, { name: 'last_name', required: false }] },
  { id: 'gh_passport_lookup', name: 'Ghana Passport Lookup', params: [{ name: 'passport_number', required: true }, { name: 'first_name', required: false }] },
  { id: 'gh_voter_card_lookup', name: 'Ghana Voter Card Lookup', params: [{ name: 'voter_id', required: true }, { name: 'first_name', required: false }] },
  { id: 'gh_ssnit_lookup', name: 'Ghana SSNIT Lookup', params: [{ name: 'ssnit_number', required: true }, { name: 'first_name', required: false }] },
  { id: 'gh_drivers_license_lookup', name: "Ghana Driver's License", params: [{ name: 'license_number', required: true }, { name: 'first_name', required: false }] },
  { id: 'ke_passport_lookup', name: 'Kenya Passport Lookup', params: [{ name: 'passport_number', required: true }, { name: 'first_name', required: false }] },
  { id: 'ke_national_id_lookup', name: 'Kenya National ID Lookup', params: [{ name: 'id_number', required: true }, { name: 'first_name', required: false }] },
  { id: 'ke_phone_number_lookup', name: 'Kenya Phone Lookup', params: [{ name: 'phone_number', required: true }] },
  { id: 'ke_tax_pin_verification', name: 'Kenya Tax PIN Verification', params: [{ name: 'tax_pin', required: true }, { name: 'name', required: false }] },
  { id: 'aml_screening', name: 'AML Screening', params: [{ name: 'first_name', required: true }, { name: 'last_name', required: true }, { name: 'date_of_birth', required: false }, { name: 'country', required: false }] },
  { id: 'kyb_screening', name: 'KYB - Know Your Business', params: [{ name: 'rc_number', required: true }, { name: 'company_name', required: false }] },
  { id: 'address_verification', name: 'Address Verification', params: [{ name: 'address', required: true }, { name: 'city', required: true }, { name: 'country', required: true }, { name: 'state', required: false }] },
  { id: 'risk_assessment', name: 'Risk Assessment', params: [{ name: 'id_number', required: true }, { name: 'id_type', required: true }, { name: 'country', required: true }] },
];

function generateBulkCode(lang: string): string {
  const bodyJson = JSON.stringify(BULK_SAMPLE_PAYLOAD, null, 2);
  switch (lang) {
    case 'cURL':
      return `curl -X POST ${BULK_ENDPOINT} \\
  -H "X-API-KEY: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '${bodyJson}'`;
    case 'Node.js':
      return `const axios = require('axios');

const response = await axios.post('${BULK_ENDPOINT}', ${bodyJson}, {
  headers: {
    'X-API-KEY': 'your_api_key_here',
    'Content-Type': 'application/json',
  },
});
console.log(response.data);`;
    case 'Java':
      return `HttpClient client = HttpClient.newHttpClient();

String requestBody = ${JSON.stringify(bodyJson)};

HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("${BULK_ENDPOINT}"))
  .header("X-API-KEY", "your_api_key_here")
  .header("Content-Type", "application/json")
  .POST(HttpRequest.BodyPublishers.ofString(requestBody))
  .build();

HttpResponse<String> response = client.send(request,
  HttpResponse.BodyHandlers.ofString());`;
    case 'JavaScript (Fetch)':
      return `const response = await fetch('${BULK_ENDPOINT}', {
  method: 'POST',
  headers: {
    'X-API-KEY': 'your_api_key_here',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${bodyJson}),
});
const data = await response.json();
console.log(data);`;
    case 'JavaScript (Axios)':
      return `import axios from 'axios';

const { data } = await axios.post('${BULK_ENDPOINT}', ${bodyJson}, {
  headers: {
    'X-API-KEY': 'your_api_key_here',
    'Content-Type': 'application/json',
  },
});
console.log(data);`;
    case 'Python':
      return `import requests

payload = {
    "is_test": False,
    "verifications": [
        {
            "verification_type": "ng_bvn_verification",
            "input_data": {"bvn": "22222222222", "first_name": "John", "last_name": "Doe"},
        },
        {
            "verification_type": "ng_nin_verification",
            "input_data": {"nin": "12345678901"},
        },
        {
            "verification_type": "za_said_verification",
            "input_data": {"id_number": "9001015001087", "first_name": "Jane", "last_name": "Smith"},
        },
    ],
}

response = requests.post(
    '${BULK_ENDPOINT}',
    headers={
        'X-API-KEY': 'your_api_key_here',
        'Content-Type': 'application/json',
    },
    json=payload,
)
print(response.json())`;
    default:
      return '';
  }
}

const BULK_RESPONSE_CODES = [
  { code: '200', desc: 'Success - Batch submitted and all results returned', isError: false },
  { code: '207', desc: 'Multi-Status - Batch submitted; some records failed', isError: false },
  { code: '400', desc: 'Bad Request - Missing or invalid batch parameters', isError: false },
  { code: '401', desc: 'Unauthorized - Invalid or missing API key', isError: false },
  { code: '403', desc: 'Forbidden - Insufficient credits for batch size', isError: false },
  { code: '422', desc: 'Unprocessable Entity - Batch size exceeds 100 records', isError: false },
  { code: '500', desc: 'Internal Server Error - Please retry', isError: true },
];

function BulkDocsContent() {
  const [selectedLang, setSelectedLang] = useState('cURL');
  const [copied, setCopied] = useState(false);
  const [expandedType, setExpandedType] = useState<string | null>(null);

  const code = generateBulkCode(selectedLang);
  const responseJson = JSON.stringify(BULK_SAMPLE_RESPONSE, null, 2);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8 space-y-8">

        {/* Header */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Bulk Verification</h2>
          <p className="text-sm text-gray-400 font-mono mb-3">POST /api/verifications/bulk/</p>
          <p className="text-gray-600">
            Submit multiple identity verification requests in a single API call. Bulk verification
            is ideal for batch onboarding, periodic compliance checks, and large-scale KYC workflows.
            You can mix different verification types in one batch — up to <strong>100 records</strong> per request.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-teal-700 mb-1">100</div>
            <div className="text-sm text-teal-600">Max records per batch</div>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-teal-700 mb-1">Mixed</div>
            <div className="text-sm text-teal-600">Verification types per batch</div>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-teal-700 mb-1">Sync</div>
            <div className="text-sm text-teal-600">Synchronous response</div>
          </div>
        </div>

        {/* Endpoint */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Endpoint</h3>
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded whitespace-nowrap">POST</span>
            <code className="text-sm text-gray-700 break-all">{BULK_ENDPOINT}</code>
          </div>
        </div>

        {/* Auth */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-amber-800 mb-1">Authentication Required</h4>
          <p className="text-sm text-amber-700 mb-3">Include your API key in the X-API-KEY header:</p>
          <div className="bg-gray-900 rounded-lg px-4 py-3">
            <code className="text-sm text-green-400">X-API-KEY: your_api_key_here</code>
          </div>
        </div>

        {/* Request Body */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Body Parameters</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-4">
            <div className="pb-4 border-b border-gray-100">
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <span className="font-mono text-sm text-gray-900">is_test</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">boolean</span>
                <span className="text-xs px-1.5 py-0.5 rounded text-gray-500 bg-gray-100">optional</span>
              </div>
              <p className="text-sm text-gray-600">Set to <code className="font-mono text-xs bg-gray-100 px-1 rounded">true</code> to run in test/sandbox mode. Defaults to <code className="font-mono text-xs bg-gray-100 px-1 rounded">false</code>.</p>
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <span className="font-mono text-sm text-gray-900">verifications</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">array</span>
                <span className="text-xs px-1.5 py-0.5 rounded text-red-600 bg-red-50">required</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Array of verification objects. Maximum <strong>100</strong> items per request. Each object must include:
              </p>
              <div className="ml-4 pl-4 border-l border-gray-200 space-y-3">
                <div>
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <span className="font-mono text-sm text-gray-900">verification_type</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">string</span>
                    <span className="text-xs px-1.5 py-0.5 rounded text-red-600 bg-red-50">required</span>
                  </div>
                  <p className="text-sm text-gray-600">The type of verification to perform (see supported types below).</p>
                </div>
                <div>
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <span className="font-mono text-sm text-gray-900">input_data</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">object</span>
                    <span className="text-xs px-1.5 py-0.5 rounded text-red-600 bg-red-50">required</span>
                  </div>
                  <p className="text-sm text-gray-600">Verification-specific data fields. See the supported types table below for per-type parameters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Verification Types */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Verification Types</h3>
          <p className="text-sm text-gray-600 mb-4">
            Note: Identity Verification types that require a hosted page (Document Verification, Facial Screening)
            are not supported in bulk mode. All government registry checks and compliance checks are supported.
          </p>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Required Fields</th>
                  <th className="px-4 py-3 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {BULK_VERIFICATION_TYPES.map((vt) => (
                  <>
                    <tr
                      key={vt.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setExpandedType(expandedType === vt.id ? null : vt.id)}
                    >
                      <td className="px-4 py-3">
                        <code className="text-xs font-mono text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">{vt.id}</code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 hidden sm:table-cell">{vt.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                        {vt.params.filter((p) => p.required).map((p) => p.name).join(', ')}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <i className={`ri-arrow-down-s-line text-gray-400 transition-transform duration-200 ${expandedType === vt.id ? 'rotate-180' : ''}`}></i>
                      </td>
                    </tr>
                    {expandedType === vt.id && (
                      <tr key={`${vt.id}-detail`} className="bg-teal-50">
                        <td colSpan={4} className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-700 mb-2">{vt.name} — Parameters</div>
                          <div className="flex flex-wrap gap-2">
                            {vt.params.map((p) => (
                              <span key={p.name} className={`text-xs px-2 py-1 rounded-full font-mono ${p.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                {p.name} {p.required ? '(required)' : '(optional)'}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sample Request */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Request</h3>
          <div className="flex flex-wrap gap-1 border-b border-gray-200 pb-3 mb-3">
            {BULK_CODE_LANGS.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${selectedLang === lang ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {lang}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={copyCode}
              className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-md cursor-pointer whitespace-nowrap transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 whitespace-pre">{code}</code>
            </pre>
          </div>
        </div>

        {/* Sample Response */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Expected Response Structure</h3>
          <pre className="bg-teal-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-teal-100 whitespace-pre">{responseJson}</code>
          </pre>
        </div>

        {/* Response Fields */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Fields</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3">
            {[
              { name: 'batch_id', type: 'string', desc: 'Unique identifier for the batch submission.' },
              { name: 'total', type: 'number', desc: 'Total number of verification objects submitted.' },
              { name: 'submitted', type: 'number', desc: 'Number of verifications successfully processed.' },
              { name: 'failed', type: 'number', desc: 'Number of verifications that encountered errors.' },
              { name: 'results', type: 'array', desc: 'Array of individual verification results, each with index, id, verification_type, status, and response_data.' },
              { name: 'results[].index', type: 'number', desc: 'Position of this result corresponding to the input array index.' },
              { name: 'results[].id', type: 'string', desc: 'Unique verification ID for this individual record.' },
              { name: 'results[].status', type: 'string', desc: 'Status of the verification: verified, not_found, failed, or error.' },
              { name: 'results[].response_data', type: 'object | null', desc: 'Parsed identity data if verified; null if not found or failed.' },
            ].map((f) => (
              <div key={f.name} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className="font-mono text-sm text-gray-900">{f.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{f.type}</span>
                </div>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Response Codes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Codes</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {BULK_RESPONSE_CODES.map((r) => (
                  <tr key={r.code} className={r.isError ? 'bg-red-50' : ''}>
                    <td className="px-4 py-3">
                      <code className={`text-sm font-mono font-semibold ${r.code === '200' || r.code === '207' ? 'text-green-600' : r.isError ? 'text-red-600' : 'text-gray-700'}`}>
                        {r.code}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Best Practices</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <i className="ri-check-line text-teal-500 mt-0.5 flex-shrink-0 w-4 h-4 flex items-center justify-center"></i>
              <span>Keep batches under 100 records for optimal performance. Split larger datasets across multiple requests.</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-check-line text-teal-500 mt-0.5 flex-shrink-0 w-4 h-4 flex items-center justify-center"></i>
              <span>Use the <code className="font-mono text-xs bg-gray-200 px-1 rounded">index</code> field in results to map responses back to your input records reliably.</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-check-line text-teal-500 mt-0.5 flex-shrink-0 w-4 h-4 flex items-center justify-center"></i>
              <span>Check the <code className="font-mono text-xs bg-gray-200 px-1 rounded">failed</code> count first; handle partial failures gracefully using HTTP 207.</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-check-line text-teal-500 mt-0.5 flex-shrink-0 w-4 h-4 flex items-center justify-center"></i>
              <span>Use <code className="font-mono text-xs bg-gray-200 px-1 rounded">is_test: true</code> to validate your bulk payload structure before going live.</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-check-line text-teal-500 mt-0.5 flex-shrink-0 w-4 h-4 flex items-center justify-center"></i>
              <span>Each verification in a batch consumes the same API credit as a single standalone call.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default function DocsContent({ selectedVerification, apiSection }: DocsContentProps) {
  const [selectedLang, setSelectedLang] = useState('cURL');
  const [verificationMode, setVerificationMode] = useState<'onsite' | 'offsite'>('onsite');
  const [copied, setCopied] = useState(false);

  if (apiSection === 'bulk') {
    return <BulkDocsContent />;
  }

  const config = configs[selectedVerification] || configs.id_document;
  const methodType = config.isLinkMode ? verificationMode : null;
  const inputData = config.sampleInputData;
  const code = generateCode(selectedLang, config.verificationType, methodType, inputData);
  const responseJson = JSON.stringify(config.linkSampleResponse, null, 2).replace(
    /"verification_type": ".*?"/, `"verification_type": "${config.verificationType}"`
  );

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{config.name}</h2>
          <p className="text-sm text-gray-400 font-mono mb-3">{config.verificationType}</p>
          <p className="text-gray-600">{config.description}</p>
        </div>

        {/* Endpoint */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Endpoint</h3>
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded whitespace-nowrap">POST</span>
            <code className="text-sm text-gray-700 break-all">{ENDPOINT}</code>
          </div>
        </div>

        {/* Auth */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-amber-800 mb-1">Authentication Required</h4>
          <p className="text-sm text-amber-700 mb-3">Include your API key in the X-API-KEY header:</p>
          <div className="bg-gray-900 rounded-lg px-4 py-3">
            <code className="text-sm text-green-400">X-API-KEY: your_api_key_here</code>
          </div>
        </div>

        {/* Verification Mode (link mode types only) */}
        {config.isLinkMode && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification Mode</h3>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setVerificationMode('onsite')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${verificationMode === 'onsite' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Link Mode (onsite)
              </button>
              <button
                onClick={() => setVerificationMode('offsite')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${verificationMode === 'offsite' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Direct Mode (offsite)
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {verificationMode === 'onsite'
                ? 'Generates a hosted verification URL to send to the customer. The customer completes verification on the hosted page.'
                : 'Directly initiates verification and returns the result without a hosted page. Suitable for server-side integrations.'}
            </p>
          </div>
        )}

        {/* Parameters */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Parameters (input_data)</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-4">
            {config.params.map((p) => <ParamRow key={p.name} param={p} />)}
          </div>
        </div>

        {/* Sample Request */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Request</h3>
          <div className="flex flex-wrap gap-1 border-b border-gray-200 pb-3 mb-3">
            {CODE_LANGS.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${selectedLang === lang ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {lang}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={copyCode}
              className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-md cursor-pointer whitespace-nowrap transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 whitespace-pre">{code}</code>
            </pre>
          </div>
        </div>

        {/* Response */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Expected Response Structure</h3>
          <pre className="bg-teal-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-teal-100 whitespace-pre">{responseJson}</code>
          </pre>
        </div>

        {/* Response Codes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Codes</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {RESPONSE_CODES.map((r) => (
                  <tr key={r.code} className={r.isError ? 'bg-red-50' : ''}>
                    <td className="px-4 py-3">
                      <code className={`text-sm font-mono font-semibold ${r.code === '200' ? 'text-green-600' : r.isError ? 'text-red-600' : 'text-gray-700'}`}>
                        {r.code}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
