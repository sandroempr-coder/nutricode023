export type SymptomId =
  | "dermatite"
  | "lagrima_acida"
  | "baixa_energia"
  | "mau_halito"
  | "queda_pelo"
  | "dor_articular";

export type CriticalCondition = "sobrepeso" | "desnutricao" | null;

export interface SymptomOption {
  id: SymptomId;
  label: string;
  emoji: string;
  description: string;
}

export const SYMPTOMS: SymptomOption[] = [
  { id: "dermatite", label: "Dermatite e Coceiras", emoji: "🐾", description: "Coceira frequente, pele vermelha ou irritada" },
  { id: "lagrima_acida", label: "Lágrima Ácida", emoji: "👁️", description: "Manchas escuras ao redor dos olhos" },
  { id: "baixa_energia", label: "Baixa Energia e Apatia", emoji: "😴", description: "Letargia, pouca disposição para brincar" },
  { id: "mau_halito", label: "Mau Hálito e Tártaro", emoji: "🦷", description: "Odor forte na boca, acúmulo de tártaro" },
  { id: "queda_pelo", label: "Queda de Pelo Excessiva", emoji: "✂️", description: "Pelagem caindo mais que o normal" },
  { id: "dor_articular", label: "Dores Articulares", emoji: "🦴", description: "Dificuldade para pular, levantar ou subir escadas" },
];

export interface ProtocolRule {
  symptomId: SymptomId;
  protocolName: string;
  durationDays: number;
  nutrition: {
    recommended: { foodId: string; reason: string }[];
    avoid: { description: string; reason: string }[];
    essentialNutrients: string[];
  };
  routine: {
    title: string;
    description: string;
    icon: string;
  }[];
  supplements: {
    name: string;
    usage: string;
    icon: string;
  }[];
  dailyChecklist: string[];
}

export const PROTOCOL_RULES: Record<SymptomId, ProtocolRule> = {
  dermatite: {
    symptomId: "dermatite",
    protocolName: "Protocolo Anti-Coceira",
    durationDays: 21,
    nutrition: {
      recommended: [
        { foodId: "p08", reason: "Sardinha é rica em Ômega-3, anti-inflamatório natural para a pele" },
        { foodId: "o03", reason: "Óleo de Peixe fornece EPA e DHA essenciais para pele saudável" },
        { foodId: "p09", reason: "Salmão é fonte premium de ômega-3 para recuperação da derme" },
        { foodId: "c03", reason: "Batata doce é hipoalergênica e rica em vitamina A para a pele" },
        { foodId: "v01", reason: "Cenoura fornece betacaroteno que regenera tecidos cutâneos" },
      ],
      avoid: [
        { description: "Proteínas de Frango e Boi", reason: "São as proteínas mais alergênicas para cães. Teste eliminando por 21 dias." },
        { description: "Ração com corantes artificiais", reason: "Corantes e aditivos químicos podem agravar quadros de dermatite" },
        { description: "Grãos refinados (trigo, milho)", reason: "Podem intensificar a resposta inflamatória na pele" },
      ],
      essentialNutrients: ["Ômega-3 (EPA/DHA)", "Vitamina A", "Zinco", "Vitamina E"],
    },
    routine: [
      { title: "Troque o desinfetante do chão", description: "Use vinagre branco diluído. Desinfetantes químicos irritam as patas e agravam coceiras.", icon: "🧹" },
      { title: "Banho com shampoo neutro hipoalergênico", description: "Banho semanal com produtos sem parabenos. Enxágue muito bem.", icon: "🛁" },
      { title: "Verifique o ambiente", description: "Lave caminhas e cobertores com sabão neutro. Ácaros são gatilhos comuns.", icon: "🛏️" },
      { title: "Passeio em horários frescos", description: "Evite grama recém-cortada e horários quentes que aumentam a coceira.", icon: "🌤️" },
    ],
    supplements: [
      { name: "Chá de Camomila (compressas)", usage: "Aplique compressas mornas de camomila nas áreas irritadas 2x ao dia por 5 min", icon: "🍵" },
      { name: "Óleo de Coco Virgem (tópico)", usage: "Passe uma fina camada nas áreas ressecadas. Hidrata e tem ação antifúngica", icon: "🥥" },
      { name: "Própolis sem álcool", usage: "3 gotas diluídas na água. Anti-inflamatório e imunomodulador natural", icon: "🍯" },
    ],
    dailyChecklist: [
      "Adicionei Ômega-3 (óleo de peixe ou sardinha) na refeição",
      "Verifiquei se não há alérgenos na comida de hoje",
      "Limpei as patas após o passeio",
      "Apliquei compressas de camomila nas áreas irritadas",
    ],
  },

  lagrima_acida: {
    symptomId: "lagrima_acida",
    protocolName: "Protocolo Anti-Lágrima Ácida",
    durationDays: 30,
    nutrition: {
      recommended: [
        { foodId: "f05", reason: "Mirtilo é rico em antocianinas que protegem os vasos oculares" },
        { foodId: "v01", reason: "Cenoura fornece betacaroteno essencial para saúde ocular" },
        { foodId: "c03", reason: "Batata doce é fonte de vitamina A que protege mucosas" },
        { foodId: "s09", reason: "Kefir equilibra a flora intestinal, reduzindo inflamações sistêmicas" },
      ],
      avoid: [
        { description: "Ração com corantes e conservantes", reason: "Corantes artificiais são a causa #1 de lágrima ácida em cães" },
        { description: "Alimentos ultraprocessados", reason: "Aditivos químicos alteram o pH da lágrima" },
        { description: "Excesso de proteínas vermelhas", reason: "Pode aumentar a acidez corporal em cães sensíveis" },
      ],
      essentialNutrients: ["Antocianinas", "Vitamina A", "Probióticos", "Vitamina C"],
    },
    routine: [
      { title: "Limpe os olhos diariamente", description: "Use gaze com soro fisiológico morno. Limpe gentilmente do canto interno para fora.", icon: "👁️" },
      { title: "Ofereça água filtrada", description: "Minerais da água de torneira podem agravar a oxidação da lágrima.", icon: "💧" },
      { title: "Tigela de inox ou cerâmica", description: "Plástico libera BPA que pode causar reações alérgicas e manchar o focinho.", icon: "🥣" },
    ],
    supplements: [
      { name: "Mirtilo desidratado", usage: "5-10 unidades/dia misturadas na ração. Rico em antioxidantes oculares", icon: "🫐" },
      { name: "Chá de camomila (compressas)", usage: "Compressas mornas nos olhos 1x ao dia por 3 min. Ação anti-inflamatória", icon: "🍵" },
    ],
    dailyChecklist: [
      "Limpei os olhos com gaze e soro fisiológico",
      "Ofereci água filtrada fresca",
      "Adicionei mirtilo ou cenoura na refeição",
    ],
  },

  baixa_energia: {
    symptomId: "baixa_energia",
    protocolName: "Protocolo Energia Vital",
    durationDays: 14,
    nutrition: {
      recommended: [
        { foodId: "p12", reason: "Ovo é fonte completa de proteína de alta biodisponibilidade" },
        { foodId: "c03", reason: "Batata doce fornece energia de liberação lenta" },
        { foodId: "p06", reason: "Fígado bovino é superalimento: rico em ferro, B12 e folato" },
        { foodId: "f02", reason: "Banana fornece potássio e energia rápida" },
        { foodId: "s05", reason: "Levedo de cerveja é rico em vitaminas do complexo B" },
      ],
      avoid: [
        { description: "Ração de baixa qualidade", reason: "Rações economy não fornecem nutrientes adequados" },
        { description: "Excesso de carboidratos simples", reason: "Causam picos de glicose seguidos de queda de energia" },
      ],
      essentialNutrients: ["Ferro", "Vitamina B12", "Proteína de alta qualidade", "Potássio"],
    },
    routine: [
      { title: "Passeios curtos e frequentes", description: "3 passeios de 10-15 min são melhores que 1 longo. Estimula sem cansar.", icon: "🚶" },
      { title: "Brincadeiras interativas", description: "Brinquedos de farejar e puzzles estimulam a mente e despertam a disposição.", icon: "🧩" },
      { title: "Rotina de sono adequada", description: "Garanta um local silencioso e escuro para dormir. Cães precisam de 12-14h de sono.", icon: "😴" },
      { title: "Check-up veterinário", description: "Apatia crônica pode indicar anemia ou hipotireoidismo. Consulte o vet.", icon: "🩺" },
    ],
    supplements: [
      { name: "Levedo de cerveja", usage: "1 colher de chá polvilhada na ração. Fonte de vitaminas B que aumentam energia", icon: "🍺" },
      { name: "Espirulina", usage: "1/4 colher de chá misturada na comida. Superalimento energizante", icon: "🟢" },
    ],
    dailyChecklist: [
      "Ofereci uma refeição rica em proteína de qualidade",
      "Fiz pelo menos 2 passeios curtos",
      "Adicionei levedo de cerveja ou espirulina na ração",
    ],
  },

  mau_halito: {
    symptomId: "mau_halito",
    protocolName: "Protocolo Hálito Fresco",
    durationDays: 14,
    nutrition: {
      recommended: [
        { foodId: "f01", reason: "Maçã em cubos limpa os dentes naturalmente e refresca o hálito" },
        { foodId: "v01", reason: "Cenoura crua funciona como escova dental natural" },
        { foodId: "s09", reason: "Kefir equilibra a flora oral e intestinal" },
      ],
      avoid: [
        { description: "Sachês e patês industriais", reason: "Resíduos grudam nos dentes e fermentam, piorando o hálito" },
        { description: "Alimentos muito moles", reason: "Não estimulam a mastigação que limpa naturalmente os dentes" },
        { description: "Restos de comida humana", reason: "Temperos e gordura agravam problemas dentários" },
      ],
      essentialNutrients: ["Fibra (ação mecânica dental)", "Probióticos", "Vitamina C"],
    },
    routine: [
      { title: "Escovação dental 3x por semana", description: "Use escova e pasta dental para cães. Movimentos circulares gentis.", icon: "🪥" },
      { title: "Brinquedos de morder", description: "Ofereça mordedores de borracha ou ossos naturais para limpeza mecânica.", icon: "🦴" },
      { title: "Verifique as gengivas", description: "Gengivas vermelhas ou sangrando indicam gengivite. Procure o vet.", icon: "🩺" },
    ],
    supplements: [
      { name: "Hortelã fresca (poucas folhas)", usage: "2-3 folhas picadas misturadas na ração. Antisséptico natural oral", icon: "🌿" },
      { name: "Salsa fresca picada", usage: "1 colher de chá na comida. Rica em clorofila que neutraliza odores", icon: "🌿" },
      { name: "Óleo de coco", usage: "1/2 colher de chá na ração. Ação antibacteriana oral", icon: "🥥" },
    ],
    dailyChecklist: [
      "Ofereci cenoura crua ou maçã como petisco dental",
      "Escovei os dentes do pet (3x/semana)",
      "Adicionei hortelã ou salsa na refeição",
    ],
  },

  queda_pelo: {
    symptomId: "queda_pelo",
    protocolName: "Protocolo Pelagem Forte",
    durationDays: 30,
    nutrition: {
      recommended: [
        { foodId: "p08", reason: "Sardinha é a melhor fonte de Ômega-3 para pelagem" },
        { foodId: "p12", reason: "Ovo cozido fornece biotina e aminoácidos para pelo saudável" },
        { foodId: "o03", reason: "Óleo de peixe é o suplemento #1 para pelagem brilhante" },
        { foodId: "o04", reason: "Óleo de linhaça é fonte vegetal de ômega-3" },
        { foodId: "s05", reason: "Levedo de cerveja é rico em biotina e zinco para o pelo" },
      ],
      avoid: [
        { description: "Ração com baixo teor de gordura", reason: "Gorduras boas são essenciais para a saúde do pelo" },
        { description: "Dieta pobre em proteínas", reason: "O pelo é feito de queratina (proteína). Deficiência causa queda" },
      ],
      essentialNutrients: ["Ômega-3", "Biotina", "Zinco", "Proteína de qualidade"],
    },
    routine: [
      { title: "Escovação regular", description: "Escove o pelo 3-4x por semana. Remove pelos mortos e estimula circulação.", icon: "🪮" },
      { title: "Banhos a cada 15 dias", description: "Banhos demais removem a oleosidade natural. Use shampoo adequado.", icon: "🛁" },
      { title: "Verifique parasitas", description: "Pulgas e carrapatos causam queda de pelo. Mantenha antiparasitários em dia.", icon: "🔍" },
    ],
    supplements: [
      { name: "Óleo de coco virgem", usage: "1/2 colher de chá na ração + massagear no pelo seco. Hidrata de dentro para fora", icon: "🥥" },
      { name: "Levedo de cerveja", usage: "1 colher de chá diária na ração. Rico em biotina para pelos fortes", icon: "🍺" },
    ],
    dailyChecklist: [
      "Adicionei Ômega-3 na refeição (óleo de peixe ou sardinha)",
      "Escovei o pelo do pet",
      "Verifiquei a pele por irritações ou parasitas",
    ],
  },

  dor_articular: {
    symptomId: "dor_articular",
    protocolName: "Protocolo Mobilidade",
    durationDays: 30,
    nutrition: {
      recommended: [
        { foodId: "s01", reason: "Cúrcuma é anti-inflamatório natural potente para articulações" },
        { foodId: "p08", reason: "Sardinha fornece ômega-3 com ação anti-inflamatória" },
        { foodId: "o03", reason: "Óleo de peixe reduz inflamação articular comprovadamente" },
        { foodId: "c03", reason: "Batata doce fornece betacaroteno anti-inflamatório" },
        { foodId: "f05", reason: "Mirtilo tem antioxidantes que protegem cartilagens" },
      ],
      avoid: [
        { description: "Alimentos pró-inflamatórios", reason: "Óleos vegetais refinados (soja, canola) aumentam inflamação" },
        { description: "Excesso de peso", reason: "Cada kg extra multiplica a pressão sobre as articulações" },
      ],
      essentialNutrients: ["Ômega-3 (anti-inflamatório)", "Cúrcuma", "Vitamina C (colágeno)", "Manganês"],
    },
    routine: [
      { title: "Evite escadas e saltos", description: "Coloque rampas onde possível. Saltos pioram o desgaste articular.", icon: "🚫" },
      { title: "Passeios leves em superfície plana", description: "Caminhadas curtas (10-15 min) em terreno plano. Evite pisos escorregadios.", icon: "🚶" },
      { title: "Cama ortopédica", description: "Invista em uma cama viscoelástica (memory foam). Alivia pressão nas articulações.", icon: "🛏️" },
      { title: "Hidroterapia", description: "Natação é o melhor exercício: fortalece sem impacto. Consulte profissional.", icon: "🏊" },
    ],
    supplements: [
      { name: "Cúrcuma + pimenta preta", usage: "1/4 col. chá de cúrcuma + pitada de pimenta preta na ração. A pimenta aumenta a absorção em 2000%", icon: "🟡" },
      { name: "Colágeno hidrolisado", usage: "1 colher de chá na ração. Ajuda na regeneração de cartilagens", icon: "💊" },
      { name: "Chá de gengibre (morno)", usage: "1 col. sopa de chá na água. Anti-inflamatório natural", icon: "🫚" },
    ],
    dailyChecklist: [
      "Adicionei cúrcuma com pimenta preta na refeição",
      "Adicionei ômega-3 (óleo de peixe ou sardinha)",
      "Fiz um passeio leve em superfície plana (10-15 min)",
      "Evitei que o pet subisse escadas ou saltasse",
    ],
  },
};

export const CRITICAL_CONDITIONS = {
  sobrepeso: {
    label: "Sobrepeso / Obesidade",
    emoji: "⚖️",
    description: "Precisa perder peso de forma saudável",
    calorieAdjustment: -0.20, // 20% deficit
    recommendedFoodIds: ["v06", "c12", "v09", "c11", "r07"],
    avoidDescriptions: [
      "Petiscos industriais e biscoitos",
      "Ração com alto teor calórico",
      "Excesso de carboidratos",
    ],
    tips: [
      "Divida a refeição em 3-4 porções menores ao dia",
      "Substitua petiscos por pepino e abobrinha",
      "Aumente gradualmente o tempo de passeio",
    ],
  },
  desnutricao: {
    label: "Desnutrição / Abaixo do peso",
    emoji: "🦴",
    description: "Precisa ganhar peso com qualidade",
    calorieAdjustment: 0.20, // 20% surplus
    recommendedFoodIds: ["p12", "p01", "c03", "p08", "c07"],
    avoidDescriptions: [
      "Ração de baixa qualidade",
      "Alimentos com fibra em excesso (enchem sem nutrir)",
    ],
    tips: [
      "Ofereça refeições menores mas mais frequentes (4-5x/dia)",
      "Adicione ovo cozido e sardinha para enriquecer",
      "Aqueça levemente a ração para liberar aroma e estimular apetite",
    ],
  },
};

/** Maps symptoms to food IDs that should be avoided in the calculator */
export const SYMPTOM_FOOD_RESTRICTIONS: Record<SymptomId, { avoidFoodIds: string[]; avoidAllergens: string[]; reason: string }> = {
  dermatite: {
    avoidFoodIds: [],
    avoidAllergens: ["frango", "bovina"],
    reason: "Proteínas de frango e boi são as mais alergênicas e podem agravar dermatites. Prefira peixes e outras proteínas.",
  },
  lagrima_acida: {
    avoidFoodIds: ["p04", "p05", "p06", "p07", "p16", "p19"],
    avoidAllergens: [],
    reason: "Excesso de proteínas vermelhas pode aumentar a acidez corporal e agravar a lágrima ácida.",
  },
  baixa_energia: {
    avoidFoodIds: [],
    avoidAllergens: [],
    reason: "",
  },
  mau_halito: {
    avoidFoodIds: [],
    avoidAllergens: [],
    reason: "",
  },
  queda_pelo: {
    avoidFoodIds: [],
    avoidAllergens: [],
    reason: "",
  },
  dor_articular: {
    avoidFoodIds: [],
    avoidAllergens: [],
    reason: "",
  },
};

export function getFoodsToAvoidForSymptoms(symptoms: SymptomId[]): { foodId?: string; allergen?: string; reason: string }[] {
  const results: { foodId?: string; allergen?: string; reason: string }[] = [];
  const seen = new Set<string>();

  symptoms.forEach((s) => {
    const restriction = SYMPTOM_FOOD_RESTRICTIONS[s];
    if (!restriction || !restriction.reason) return;

    restriction.avoidFoodIds.forEach((id) => {
      if (!seen.has(`food_${id}`)) {
        seen.add(`food_${id}`);
        results.push({ foodId: id, reason: restriction.reason });
      }
    });

    restriction.avoidAllergens.forEach((a) => {
      if (!seen.has(`allergen_${a}`)) {
        seen.add(`allergen_${a}`);
        results.push({ allergen: a, reason: restriction.reason });
      }
    });
  });

  return results;
}

export function generateProtocolTitle(petName: string, symptoms: SymptomId[]): string {
  if (symptoms.length === 0) return `Plano de Saúde do ${petName}`;
  if (symptoms.length === 1) {
    const rule = PROTOCOL_RULES[symptoms[0]];
    return `${rule.protocolName} do ${petName}`;
  }
  return `Plano de Recuperação do ${petName}`;
}
