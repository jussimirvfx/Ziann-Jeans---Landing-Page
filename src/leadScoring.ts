export type LeadFormData = {
  nomeCompleto: string;
  nomeFantasia: string;
  whatsapp: string;
  emailCorporativo: string;
  cnpj: string;
  instagram: string;
  cidade: string;
  estado: string;
  tempoCnpj: string;
  tipoLoja: string;
  possuiLojaFisica: string;
  principaisMarcas: string;
};

export type LeadScoreBreakdownItem = {
  field: string;
  question: string;
  answer: string;
  points: number;
  maxPoints: number;
  disqualifies: boolean;
  reason: string;
};

export type LeadScoreResult = {
  score: number;
  value: number;
  qualified: boolean;
  qualification_status: 'qualificado' | 'desqualificado';
  qualification_threshold: number;
  disqualification_reasons: string[];
  score_breakdown: LeadScoreBreakdownItem[];
  lead_score_config_version: string;
};

const LEAD_SCORE_CONFIG_VERSION = 'ziann-2026-08-05';
const QUALIFICATION_THRESHOLD = 50;

export const BRAZILIAN_PRIORITY_STATES = [
  'SP',
  'RJ',
  'MG',
  'RS',
  'PR',
  'SC',
  'GO',
  'DF',
  'BA',
  'PE',
  'CE',
  'ES',
  'MT',
  'MS',
  'PB',
  'RN',
  'AL',
  'SE',
  'PI',
  'MA',
  'TO',
  'PA',
  'AM',
  'RO',
  'AC',
  'RR',
  'AP',
];

export const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapa' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceara' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espirito Santo' },
  { value: 'GO', label: 'Goias' },
  { value: 'MA', label: 'Maranhao' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Para' },
  { value: 'PB', label: 'Paraiba' },
  { value: 'PR', label: 'Parana' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piaui' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondonia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'Sao Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export const VALID_DDDS = [
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24, 27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
];

export const STORE_TYPE_OPTIONS = [
  { value: 'boutique', label: 'Boutique', points: 40, disqualifies: false },
  { value: 'multimarcas', label: 'Multimarcas', points: 40, disqualifies: false },
  { value: 'shopping', label: 'Loja de shopping', points: 30, disqualifies: false },
  { value: 'tradicional', label: 'Loja de bairro / tradicional', points: 30, disqualifies: false },
  { value: 'magazine', label: 'Magazine', points: 30, disqualifies: false },
  { value: 'online', label: 'Loja online', points: 5, disqualifies: false },
  { value: 'autonomo', label: 'Revendedor(a) autonomo(a)', points: 1, disqualifies: true },
];

export const CNPJ_TIME_OPTIONS = [
  { value: 'menos_de_1', label: 'Menos de 1 ano', points: 10, disqualifies: false },
  { value: 'de_1_a_2', label: 'De 1 a 2 anos', points: 15, disqualifies: false },
  { value: 'de_3_a_4', label: 'De 3 a 4 anos', points: 20, disqualifies: false },
  { value: 'mais_de_5', label: 'Mais de 5 anos', points: 25, disqualifies: false },
];

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export const onlyDigits = (value: string) => value.replace(/\D/g, '');

export const cnpjMask = (value: string) => {
  const digits = onlyDigits(value).slice(0, 14);

  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
};

export const phoneMask = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export const validarTelefoneCompleto = (telefone: string): { valido: boolean; erro?: string } => {
  const digits = onlyDigits(telefone);

  if (digits.length !== 10 && digits.length !== 11) {
    return { valido: false, erro: 'Informe DDD + 8 ou 9 digitos de telefone.' };
  }

  const ddd = Number(digits.slice(0, 2));
  if (!VALID_DDDS.includes(ddd)) {
    return { valido: false, erro: 'Informe um DDD brasileiro valido.' };
  }

  if (digits.length === 11 && digits[2] !== '9') {
    return { valido: false, erro: 'Celular precisa ter o 9 depois do DDD.' };
  }

  return { valido: true };
};

export const converterParaE164 = (telefone: string) => {
  const digits = onlyDigits(telefone);
  return digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
};

export const validarCnpjCompleto = (cnpj: string) => onlyDigits(cnpj).length === 14;

export const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const findOption = <T extends { value: string; label: string }>(options: T[], selected: string) => {
  const normalizedSelected = normalizeText(selected);
  return options.find(
    (option) =>
      option.value === selected ||
      normalizeText(option.label) === normalizedSelected ||
      normalizeText(option.value) === normalizedSelected,
  );
};

export const getStoreTypeLabel = (value: string) => findOption(STORE_TYPE_OPTIONS, value)?.label ?? value;

export const getCnpjTimeLabel = (value: string) => findOption(CNPJ_TIME_OPTIONS, value)?.label ?? value;

export const getStateLabel = (value: string) => findOption(BRAZILIAN_STATES, value)?.label ?? value;

export const calculateLeadScoreDetails = (formData: LeadFormData): LeadScoreResult => {
  const scoreBreakdown: LeadScoreBreakdownItem[] = [];
  const disqualificationReasons: string[] = [];
  let score = 0;

  const stateUf = formData.estado;
  const statePoints = stateUf && BRAZILIAN_PRIORITY_STATES.includes(stateUf) ? 1 : 0;
  score += statePoints;
  scoreBreakdown.push({
    field: 'estado',
    question: 'Em qual estado esta localizado?',
    answer: stateUf ? `${getStateLabel(stateUf)} (${stateUf})` : '',
    points: statePoints,
    maxPoints: 1,
    disqualifies: false,
    reason: statePoints ? 'Estado selecionado dentro da lista de atuacao.' : 'Estado nao selecionado.',
  });

  const storeType = findOption(STORE_TYPE_OPTIONS, formData.tipoLoja);
  if (storeType) {
    score += storeType.points;
    if (storeType.disqualifies) {
      disqualificationReasons.push(`Tipo de loja desqualificado: ${storeType.label}.`);
    }
    scoreBreakdown.push({
      field: 'tipoLoja',
      question: 'Qual o tipo da loja?',
      answer: storeType.label,
      points: storeType.points,
      maxPoints: 40,
      disqualifies: storeType.disqualifies,
      reason: storeType.disqualifies ? 'Regra de desqualificacao do tipo de loja.' : 'Pontuacao definida pela qualidade do perfil comercial.',
    });
  }

  const hasPhysicalStore = normalizeText(formData.possuiLojaFisica) === 'sim';
  const physicalStorePoints = hasPhysicalStore ? 34 : 5;
  score += physicalStorePoints;
  if (!hasPhysicalStore) {
    disqualificationReasons.push('Lead desqualificado: nao possui loja fisica.');
  }
  scoreBreakdown.push({
    field: 'possuiLojaFisica',
    question: 'Possui loja fisica?',
    answer: hasPhysicalStore ? 'Sim' : 'Nao',
    points: physicalStorePoints,
    maxPoints: 34,
    disqualifies: !hasPhysicalStore,
    reason: hasPhysicalStore ? 'Loja fisica informada.' : 'A regra desqualifica quem nao possui loja fisica.',
  });

  const cnpjTime = findOption(CNPJ_TIME_OPTIONS, formData.tempoCnpj);
  if (cnpjTime) {
    score += cnpjTime.points;
    scoreBreakdown.push({
      field: 'tempoCnpj',
      question: 'Tempo de CNPJ',
      answer: cnpjTime.label,
      points: cnpjTime.points,
      maxPoints: 25,
      disqualifies: cnpjTime.disqualifies,
      reason: 'Pontuacao definida pelo tempo de operacao do CNPJ.',
    });
  }

  const finalScore = Math.min(score, 100);
  if (finalScore < QUALIFICATION_THRESHOLD) {
    disqualificationReasons.push(`Score abaixo do minimo de qualificacao (${finalScore}/${QUALIFICATION_THRESHOLD}).`);
  }

  const qualified = disqualificationReasons.length === 0;

  return {
    score: finalScore,
    value: finalScore,
    qualified,
    qualification_status: qualified ? 'qualificado' : 'desqualificado',
    qualification_threshold: QUALIFICATION_THRESHOLD,
    disqualification_reasons: disqualificationReasons,
    score_breakdown: scoreBreakdown,
    lead_score_config_version: LEAD_SCORE_CONFIG_VERSION,
  };
};
