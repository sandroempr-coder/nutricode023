export type FoodCategory =
  | "racao"
  | "proteina"
  | "carboidrato"
  | "vegetal"
  | "fruta"
  | "oleo"
  | "suplemento";

export interface NutrientProfile {
  vitaminaA?: boolean;
  omega3?: boolean;
  calcio?: boolean;
  ferro?: boolean;
  fibra?: boolean;
  fosforo?: boolean;
  potassio?: boolean;
  zinco?: boolean;
  vitaminaC?: boolean;
  vitaminaE?: boolean;
  vitaminaB?: boolean;
  proteina?: boolean;
  antioxidante?: boolean;
}

export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  caloriesPerGram: number;
  toxic: boolean;
  toxicReason?: string;
  allergens?: string[];
  nutrients: NutrientProfile;
  emoji?: string;
}

export const CATEGORY_LABELS: Record<FoodCategory, string> = {
  racao: "Ração Base",
  proteina: "Proteínas",
  carboidrato: "Carboidratos & Fibras",
  vegetal: "Vegetais",
  fruta: "Frutas",
  oleo: "Óleos & Gorduras",
  suplemento: "Suplementos Naturais",
};

export const CATEGORY_EMOJI: Record<FoodCategory, string> = {
  racao: "🥣",
  proteina: "🥩",
  carboidrato: "🍚",
  vegetal: "🥦",
  fruta: "🍎",
  oleo: "🫒",
  suplemento: "💊",
};

export const foods: Food[] = [
  // ── RAÇÃO BASE ──
  { id: "r01", name: "Ração Premium Adulto", category: "racao", caloriesPerGram: 3.5, toxic: false, nutrients: { proteina: true }, emoji: "🥣" },
  { id: "r02", name: "Ração Super Premium Adulto", category: "racao", caloriesPerGram: 3.8, toxic: false, nutrients: { proteina: true, omega3: true }, emoji: "🥣" },
  { id: "r03", name: "Ração Filhote", category: "racao", caloriesPerGram: 4.0, toxic: false, nutrients: { proteina: true, calcio: true }, emoji: "🥣" },
  { id: "r04", name: "Ração Senior", category: "racao", caloriesPerGram: 3.2, toxic: false, nutrients: { proteina: true, fibra: true }, emoji: "🥣" },
  { id: "r05", name: "Ração Grain Free", category: "racao", caloriesPerGram: 3.6, toxic: false, nutrients: { proteina: true }, emoji: "🥣" },
  { id: "r06", name: "Ração Hipoalergênica", category: "racao", caloriesPerGram: 3.4, toxic: false, nutrients: { proteina: true }, emoji: "🥣" },
  { id: "r07", name: "Ração Light", category: "racao", caloriesPerGram: 2.8, toxic: false, nutrients: { proteina: true, fibra: true }, emoji: "🥣" },

  // ── PROTEÍNAS ──
  { id: "p01", name: "Peito de Frango (cozido)", category: "proteina", caloriesPerGram: 1.65, toxic: false, allergens: ["frango"], nutrients: { proteina: true, vitaminaB: true }, emoji: "🍗" },
  { id: "p02", name: "Coxa de Frango (cozida, sem osso)", category: "proteina", caloriesPerGram: 2.09, toxic: false, allergens: ["frango"], nutrients: { proteina: true, ferro: true }, emoji: "🍗" },
  { id: "p03", name: "Fígado de Frango (cozido)", category: "proteina", caloriesPerGram: 1.67, toxic: false, allergens: ["frango"], nutrients: { proteina: true, vitaminaA: true, ferro: true }, emoji: "🫀" },
  { id: "p04", name: "Patinho Bovino (cozido)", category: "proteina", caloriesPerGram: 2.19, toxic: false, allergens: ["bovina"], nutrients: { proteina: true, ferro: true, zinco: true }, emoji: "🥩" },
  { id: "p05", name: "Carne Moída Magra (cozida)", category: "proteina", caloriesPerGram: 2.5, toxic: false, allergens: ["bovina"], nutrients: { proteina: true, ferro: true }, emoji: "🥩" },
  { id: "p06", name: "Fígado Bovino (cozido)", category: "proteina", caloriesPerGram: 1.75, toxic: false, allergens: ["bovina"], nutrients: { proteina: true, vitaminaA: true, ferro: true, vitaminaB: true }, emoji: "🫀" },
  { id: "p07", name: "Coração Bovino (cozido)", category: "proteina", caloriesPerGram: 1.65, toxic: false, allergens: ["bovina"], nutrients: { proteina: true, ferro: true, zinco: true }, emoji: "🫀" },
  { id: "p08", name: "Sardinha (cozida/enlatada)", category: "proteina", caloriesPerGram: 2.08, toxic: false, nutrients: { proteina: true, omega3: true, calcio: true, vitaminaB: true }, emoji: "🐟" },
  { id: "p09", name: "Salmão (cozido)", category: "proteina", caloriesPerGram: 2.08, toxic: false, nutrients: { proteina: true, omega3: true, vitaminaE: true }, emoji: "🐟" },
  { id: "p10", name: "Atum (cozido)", category: "proteina", caloriesPerGram: 1.84, toxic: false, nutrients: { proteina: true, omega3: true }, emoji: "🐟" },
  { id: "p11", name: "Tilápia (cozida)", category: "proteina", caloriesPerGram: 1.28, toxic: false, nutrients: { proteina: true }, emoji: "🐟" },
  { id: "p12", name: "Ovo Cozido (inteiro)", category: "proteina", caloriesPerGram: 1.55, toxic: false, nutrients: { proteina: true, vitaminaA: true, vitaminaB: true, ferro: true }, emoji: "🥚" },
  { id: "p13", name: "Ovo de Codorna (cozido)", category: "proteina", caloriesPerGram: 1.58, toxic: false, nutrients: { proteina: true, vitaminaA: true }, emoji: "🥚" },
  { id: "p14", name: "Peito de Peru (cozido)", category: "proteina", caloriesPerGram: 1.35, toxic: false, nutrients: { proteina: true, vitaminaB: true }, emoji: "🦃" },
  { id: "p15", name: "Lombo Suíno (cozido)", category: "proteina", caloriesPerGram: 1.96, toxic: false, nutrients: { proteina: true, vitaminaB: true, zinco: true }, emoji: "🥓" },
  { id: "p16", name: "Carne de Cordeiro (cozida)", category: "proteina", caloriesPerGram: 2.83, toxic: false, nutrients: { proteina: true, ferro: true, zinco: true }, emoji: "🐑" },
  { id: "p17", name: "Carne de Pato (cozida)", category: "proteina", caloriesPerGram: 2.01, toxic: false, nutrients: { proteina: true, ferro: true }, emoji: "🦆" },
  { id: "p18", name: "Moela de Frango (cozida)", category: "proteina", caloriesPerGram: 1.54, toxic: false, allergens: ["frango"], nutrients: { proteina: true, ferro: true, zinco: true }, emoji: "🍖" },
  { id: "p19", name: "Tripa Bovina (cozida)", category: "proteina", caloriesPerGram: 1.0, toxic: false, allergens: ["bovina"], nutrients: { proteina: true }, emoji: "🥩" },
  { id: "p20", name: "Cottage (queijo)", category: "proteina", caloriesPerGram: 0.98, toxic: false, nutrients: { proteina: true, calcio: true }, emoji: "🧀" },
  { id: "p21", name: "Iogurte Natural (sem açúcar)", category: "proteina", caloriesPerGram: 0.59, toxic: false, nutrients: { proteina: true, calcio: true }, emoji: "🥛" },
  { id: "p22", name: "Ricota", category: "proteina", caloriesPerGram: 1.74, toxic: false, nutrients: { proteina: true, calcio: true }, emoji: "🧀" },

  // ── CARBOIDRATOS & FIBRAS ──
  { id: "c01", name: "Arroz Branco (cozido)", category: "carboidrato", caloriesPerGram: 1.3, toxic: false, nutrients: { vitaminaB: true }, emoji: "🍚" },
  { id: "c02", name: "Arroz Integral (cozido)", category: "carboidrato", caloriesPerGram: 1.11, toxic: false, nutrients: { fibra: true, vitaminaB: true }, emoji: "🍚" },
  { id: "c03", name: "Batata Doce (cozida)", category: "carboidrato", caloriesPerGram: 0.86, toxic: false, nutrients: { vitaminaA: true, fibra: true, potassio: true }, emoji: "🍠" },
  { id: "c04", name: "Batata Inglesa (cozida)", category: "carboidrato", caloriesPerGram: 0.77, toxic: false, nutrients: { potassio: true, vitaminaC: true }, emoji: "🥔" },
  { id: "c05", name: "Mandioca (cozida)", category: "carboidrato", caloriesPerGram: 1.25, toxic: false, nutrients: { fibra: true }, emoji: "🥔" },
  { id: "c06", name: "Inhame (cozido)", category: "carboidrato", caloriesPerGram: 1.18, toxic: false, nutrients: { fibra: true, potassio: true }, emoji: "🥔" },
  { id: "c07", name: "Aveia em Flocos", category: "carboidrato", caloriesPerGram: 3.89, toxic: false, nutrients: { fibra: true, ferro: true, vitaminaB: true }, emoji: "🥣" },
  { id: "c08", name: "Macarrão (cozido)", category: "carboidrato", caloriesPerGram: 1.31, toxic: false, nutrients: { vitaminaB: true }, emoji: "🍝" },
  { id: "c09", name: "Quinoa (cozida)", category: "carboidrato", caloriesPerGram: 1.2, toxic: false, nutrients: { proteina: true, fibra: true, ferro: true }, emoji: "🌾" },
  { id: "c10", name: "Cuscuz (cozido)", category: "carboidrato", caloriesPerGram: 1.12, toxic: false, nutrients: { vitaminaB: true }, emoji: "🌽" },
  { id: "c11", name: "Abóbora (cozida)", category: "carboidrato", caloriesPerGram: 0.26, toxic: false, nutrients: { vitaminaA: true, fibra: true, potassio: true }, emoji: "🎃" },
  { id: "c12", name: "Chuchu (cozido)", category: "carboidrato", caloriesPerGram: 0.19, toxic: false, nutrients: { fibra: true, potassio: true }, emoji: "🥒" },
  { id: "c13", name: "Lentilha (cozida)", category: "carboidrato", caloriesPerGram: 1.16, toxic: false, nutrients: { proteina: true, fibra: true, ferro: true }, emoji: "🫘" },
  { id: "c14", name: "Grão de Bico (cozido)", category: "carboidrato", caloriesPerGram: 1.64, toxic: false, nutrients: { proteina: true, fibra: true, ferro: true }, emoji: "🫘" },

  // ── VEGETAIS ──
  { id: "v01", name: "Cenoura (cozida)", category: "vegetal", caloriesPerGram: 0.35, toxic: false, nutrients: { vitaminaA: true, fibra: true, antioxidante: true }, emoji: "🥕" },
  { id: "v02", name: "Cenoura (crua, ralada)", category: "vegetal", caloriesPerGram: 0.41, toxic: false, nutrients: { vitaminaA: true, fibra: true, antioxidante: true }, emoji: "🥕" },
  { id: "v03", name: "Brócolis (cozido)", category: "vegetal", caloriesPerGram: 0.35, toxic: false, nutrients: { vitaminaC: true, fibra: true, calcio: true, antioxidante: true }, emoji: "🥦" },
  { id: "v04", name: "Espinafre (cozido)", category: "vegetal", caloriesPerGram: 0.23, toxic: false, nutrients: { ferro: true, vitaminaA: true, calcio: true }, emoji: "🥬" },
  { id: "v05", name: "Couve (refogada)", category: "vegetal", caloriesPerGram: 0.35, toxic: false, nutrients: { vitaminaA: true, vitaminaC: true, calcio: true, ferro: true }, emoji: "🥬" },
  { id: "v06", name: "Abobrinha (cozida)", category: "vegetal", caloriesPerGram: 0.17, toxic: false, nutrients: { fibra: true, potassio: true }, emoji: "🥒" },
  { id: "v07", name: "Vagem (cozida)", category: "vegetal", caloriesPerGram: 0.31, toxic: false, nutrients: { fibra: true, vitaminaC: true }, emoji: "🫛" },
  { id: "v08", name: "Beterraba (cozida)", category: "vegetal", caloriesPerGram: 0.44, toxic: false, nutrients: { ferro: true, fibra: true, antioxidante: true }, emoji: "🟣" },
  { id: "v09", name: "Pepino (cru)", category: "vegetal", caloriesPerGram: 0.15, toxic: false, nutrients: { fibra: true, potassio: true }, emoji: "🥒" },
  { id: "v10", name: "Alface (cru)", category: "vegetal", caloriesPerGram: 0.15, toxic: false, nutrients: { fibra: true, vitaminaA: true }, emoji: "🥬" },
  { id: "v11", name: "Repolho (cozido)", category: "vegetal", caloriesPerGram: 0.23, toxic: false, nutrients: { fibra: true, vitaminaC: true }, emoji: "🥬" },
  { id: "v12", name: "Couve-flor (cozida)", category: "vegetal", caloriesPerGram: 0.23, toxic: false, nutrients: { vitaminaC: true, fibra: true }, emoji: "🥦" },
  { id: "v13", name: "Tomate (cru, s/ semente)", category: "vegetal", caloriesPerGram: 0.18, toxic: false, nutrients: { vitaminaC: true, antioxidante: true }, emoji: "🍅" },
  { id: "v14", name: "Pimentão (cozido)", category: "vegetal", caloriesPerGram: 0.26, toxic: false, nutrients: { vitaminaC: true, vitaminaA: true }, emoji: "🫑" },

  // ── FRUTAS ──
  { id: "f01", name: "Maçã (sem sementes)", category: "fruta", caloriesPerGram: 0.52, toxic: false, nutrients: { fibra: true, vitaminaC: true }, emoji: "🍎" },
  { id: "f02", name: "Banana", category: "fruta", caloriesPerGram: 0.89, toxic: false, nutrients: { potassio: true, vitaminaB: true, fibra: true }, emoji: "🍌" },
  { id: "f03", name: "Melancia (sem sementes)", category: "fruta", caloriesPerGram: 0.3, toxic: false, nutrients: { vitaminaA: true, vitaminaC: true, antioxidante: true }, emoji: "🍉" },
  { id: "f04", name: "Morango", category: "fruta", caloriesPerGram: 0.32, toxic: false, nutrients: { vitaminaC: true, antioxidante: true }, emoji: "🍓" },
  { id: "f05", name: "Mirtilo (Blueberry)", category: "fruta", caloriesPerGram: 0.57, toxic: false, nutrients: { vitaminaC: true, antioxidante: true, fibra: true }, emoji: "🫐" },
  { id: "f06", name: "Manga", category: "fruta", caloriesPerGram: 0.6, toxic: false, nutrients: { vitaminaA: true, vitaminaC: true }, emoji: "🥭" },
  { id: "f07", name: "Mamão", category: "fruta", caloriesPerGram: 0.43, toxic: false, nutrients: { vitaminaC: true, fibra: true, vitaminaA: true }, emoji: "🍈" },
  { id: "f08", name: "Pera (sem sementes)", category: "fruta", caloriesPerGram: 0.57, toxic: false, nutrients: { fibra: true, vitaminaC: true }, emoji: "🍐" },
  { id: "f09", name: "Melão", category: "fruta", caloriesPerGram: 0.34, toxic: false, nutrients: { vitaminaA: true, vitaminaC: true, potassio: true }, emoji: "🍈" },
  { id: "f10", name: "Kiwi", category: "fruta", caloriesPerGram: 0.61, toxic: false, nutrients: { vitaminaC: true, fibra: true }, emoji: "🥝" },
  { id: "f11", name: "Abacaxi", category: "fruta", caloriesPerGram: 0.5, toxic: false, nutrients: { vitaminaC: true }, emoji: "🍍" },
  { id: "f12", name: "Coco (polpa fresca)", category: "fruta", caloriesPerGram: 3.54, toxic: false, nutrients: { fibra: true }, emoji: "🥥" },
  { id: "f13", name: "Goiaba", category: "fruta", caloriesPerGram: 0.68, toxic: false, nutrients: { vitaminaC: true, fibra: true, antioxidante: true }, emoji: "🍈" },
  { id: "f14", name: "Framboesa", category: "fruta", caloriesPerGram: 0.52, toxic: false, nutrients: { vitaminaC: true, antioxidante: true, fibra: true }, emoji: "🍓" },

  // ── ÓLEOS & GORDURAS ──
  { id: "o01", name: "Azeite de Oliva Extra Virgem", category: "oleo", caloriesPerGram: 8.84, toxic: false, nutrients: { vitaminaE: true, antioxidante: true }, emoji: "🫒" },
  { id: "o02", name: "Óleo de Coco", category: "oleo", caloriesPerGram: 8.62, toxic: false, nutrients: { antioxidante: true }, emoji: "🥥" },
  { id: "o03", name: "Óleo de Peixe (Ômega 3)", category: "oleo", caloriesPerGram: 9.02, toxic: false, nutrients: { omega3: true }, emoji: "🐟" },
  { id: "o04", name: "Óleo de Linhaça", category: "oleo", caloriesPerGram: 8.84, toxic: false, nutrients: { omega3: true, vitaminaE: true }, emoji: "🌿" },
  { id: "o05", name: "Manteiga Ghee", category: "oleo", caloriesPerGram: 7.17, toxic: false, nutrients: { vitaminaA: true, vitaminaE: true }, emoji: "🧈" },
  { id: "o06", name: "Óleo de Salmão", category: "oleo", caloriesPerGram: 9.02, toxic: false, nutrients: { omega3: true }, emoji: "🐟" },

  // ── SUPLEMENTOS NATURAIS ──
  { id: "s01", name: "Cúrcuma (Açafrão)", category: "suplemento", caloriesPerGram: 3.54, toxic: false, nutrients: { antioxidante: true }, emoji: "🟡" },
  { id: "s02", name: "Gengibre (ralado)", category: "suplemento", caloriesPerGram: 0.8, toxic: false, nutrients: { antioxidante: true }, emoji: "🫚" },
  { id: "s03", name: "Semente de Chia", category: "suplemento", caloriesPerGram: 4.86, toxic: false, nutrients: { omega3: true, fibra: true, calcio: true }, emoji: "🌿" },
  { id: "s04", name: "Semente de Linhaça (triturada)", category: "suplemento", caloriesPerGram: 5.34, toxic: false, nutrients: { omega3: true, fibra: true }, emoji: "🌿" },
  { id: "s05", name: "Levedo de Cerveja", category: "suplemento", caloriesPerGram: 3.25, toxic: false, nutrients: { vitaminaB: true, zinco: true }, emoji: "🍺" },
  { id: "s06", name: "Espirulina", category: "suplemento", caloriesPerGram: 2.9, toxic: false, nutrients: { proteina: true, ferro: true, antioxidante: true }, emoji: "🟢" },
  { id: "s07", name: "Casca de Ovo (triturada)", category: "suplemento", caloriesPerGram: 0, toxic: false, nutrients: { calcio: true }, emoji: "🥚" },
  { id: "s08", name: "Psyllium", category: "suplemento", caloriesPerGram: 2.13, toxic: false, nutrients: { fibra: true }, emoji: "🌿" },
  { id: "s09", name: "Probiótico Natural (Kefir)", category: "suplemento", caloriesPerGram: 0.65, toxic: false, nutrients: { calcio: true }, emoji: "🥛" },
  { id: "s10", name: "Mel (pequena quantidade)", category: "suplemento", caloriesPerGram: 3.04, toxic: false, nutrients: { antioxidante: true }, emoji: "🍯" },
  { id: "s11", name: "Vinagre de Maçã (gotas)", category: "suplemento", caloriesPerGram: 0.22, toxic: false, nutrients: { antioxidante: true }, emoji: "🍎" },
  { id: "s12", name: "Alga Nori (triturada)", category: "suplemento", caloriesPerGram: 0.35, toxic: false, nutrients: { ferro: true, calcio: true }, emoji: "🟢" },

  // ── TÓXICOS (bloqueados) ──
  { id: "t01", name: "Uva", category: "fruta", caloriesPerGram: 0.69, toxic: true, toxicReason: "Uvas podem causar insuficiência renal aguda em cães, mesmo em pequenas quantidades. NUNCA ofereça uvas ao seu pet!", nutrients: {}, emoji: "🍇" },
  { id: "t02", name: "Passa / Uva-passa", category: "fruta", caloriesPerGram: 2.99, toxic: true, toxicReason: "Uvas-passa são ainda mais concentradas e perigosas que uvas frescas. Podem ser LETAIS para cães!", nutrients: {}, emoji: "🍇" },
  { id: "t03", name: "Cebola", category: "vegetal", caloriesPerGram: 0.4, toxic: true, toxicReason: "Cebola contém tiossulfato que destrói as hemácias dos cães, causando anemia hemolítica grave.", nutrients: {}, emoji: "🧅" },
  { id: "t04", name: "Alho", category: "vegetal", caloriesPerGram: 1.49, toxic: true, toxicReason: "Alho é tóxico para cães, causando danos aos glóbulos vermelhos. Mesmo em pequenas doses é perigoso.", nutrients: {}, emoji: "🧄" },
  { id: "t05", name: "Chocolate", category: "suplemento", caloriesPerGram: 5.46, toxic: true, toxicReason: "Chocolate contém teobromina, uma substância que cães NÃO conseguem metabolizar. Pode causar convulsões, arritmia e morte.", nutrients: {}, emoji: "🍫" },
  { id: "t06", name: "Macadâmia", category: "suplemento", caloriesPerGram: 7.18, toxic: true, toxicReason: "Nozes de Macadâmia causam fraqueza muscular, tremores, vômitos e hipertermia em cães.", nutrients: {}, emoji: "🥜" },
  { id: "t07", name: "Abacate", category: "fruta", caloriesPerGram: 1.6, toxic: true, toxicReason: "Abacate contém persina, uma toxina que pode causar vômitos, diarreia e problemas cardíacos em cães.", nutrients: {}, emoji: "🥑" },
  { id: "t08", name: "Xilitol / Adoçante", category: "suplemento", caloriesPerGram: 2.4, toxic: true, toxicReason: "Xilitol causa liberação massiva de insulina em cães, levando a hipoglicemia severa e falência hepática. EXTREMAMENTE PERIGOSO!", nutrients: {}, emoji: "🧂" },
  { id: "t09", name: "Café / Cafeína", category: "suplemento", caloriesPerGram: 0.02, toxic: true, toxicReason: "A cafeína é altamente tóxica para cães, causando hiperatividade, taquicardia, convulsões e morte.", nutrients: {}, emoji: "☕" },
  { id: "t10", name: "Nozes", category: "suplemento", caloriesPerGram: 6.54, toxic: true, toxicReason: "Nozes podem causar pancreatite e obstrução intestinal em cães. Especialmente perigosas se mofadas.", nutrients: {}, emoji: "🥜" },
];

// Combination rules
export interface CombinationRule {
  nutrient: keyof NutrientProfile;
  label: string;
  message: string;
  maxPerMeal: number;
}

export const combinationRules: CombinationRule[] = [
  { nutrient: "vitaminaA", label: "Vitamina A", message: "Excesso de Vitamina A na mesma refeição. Escolha apenas um destes ingredientes ricos em Vitamina A para evitar toxicidade.", maxPerMeal: 2 },
  { nutrient: "calcio", label: "Cálcio", message: "Excesso de Cálcio detectado. Em quantidades elevadas pode prejudicar a absorção de outros minerais.", maxPerMeal: 3 },
  { nutrient: "ferro", label: "Ferro", message: "Muitos alimentos ricos em Ferro na mesma refeição. Distribua ao longo da semana para melhor absorção.", maxPerMeal: 3 },
];
