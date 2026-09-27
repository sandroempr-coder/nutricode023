import { PetProfile, petArticle } from "@/types/pet";
import { Food, NutrientProfile } from "@/data/foodDatabase";

const PETS_KEY = "nutribooster_pets";
const ACTIVE_PET_KEY = "nutribooster_active_pet";
const AUTH_KEY = "membralia_global";
const ONBOARDING_KEY = "nutribooster_onboarded";
const ACTIVE_PROTOCOL_KEY = "nutribooster_active_protocol";

// ── Active Protocol types & storage ──

export interface ActiveProtocol {
  symptoms: string[];
  criticalCondition: string | null;
  startedAt: string; // ISO date string
  petIndex: number;
}

export function loadActiveProtocol(petIndex: number): ActiveProtocol | null {
  try {
    const raw = localStorage.getItem(ACTIVE_PROTOCOL_KEY);
    if (!raw) return null;
    const protocol: ActiveProtocol = JSON.parse(raw);
    if (protocol.petIndex !== petIndex) return null;
    // Check if protocol is still active (max duration based on symptoms)
    return protocol;
  } catch { return null; }
}

export function saveActiveProtocol(protocol: ActiveProtocol) {
  localStorage.setItem(ACTIVE_PROTOCOL_KEY, JSON.stringify(protocol));
}

export function clearActiveProtocol() {
  localStorage.removeItem(ACTIVE_PROTOCOL_KEY);
}

export function getProtocolDaysRemaining(protocol: ActiveProtocol, totalDays: number): number {
  const start = new Date(protocol.startedAt);
  const now = new Date();
  const elapsed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, totalDays - elapsed);
}

export function getProtocolDayNumber(protocol: ActiveProtocol): number {
  const start = new Date(protocol.startedAt);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

// ── Multi-pet storage ──

export function loadAllPets(): PetProfile[] {
  const raw = localStorage.getItem(PETS_KEY);
  if (!raw) {
    // Migrate legacy single pet
    const legacy = localStorage.getItem("nutribooster_pet_profile");
    if (legacy) {
      try {
        const pet = JSON.parse(legacy);
        const pets = [pet];
        localStorage.setItem(PETS_KEY, JSON.stringify(pets));
        localStorage.setItem(ACTIVE_PET_KEY, "0");
        localStorage.removeItem("nutribooster_pet_profile");
        return pets;
      } catch { return []; }
    }
    return [];
  }
  try { return JSON.parse(raw); } catch { return []; }
}

export function getActivePetIndex(): number {
  return parseInt(localStorage.getItem(ACTIVE_PET_KEY) || "0", 10);
}

export function setActivePetIndex(index: number) {
  localStorage.setItem(ACTIVE_PET_KEY, String(index));
}

export function savePetProfile(profile: PetProfile, index?: number) {
  const pets = loadAllPets();
  const i = index ?? getActivePetIndex();
  if (i >= pets.length) {
    pets.push(profile);
  } else {
    pets[i] = profile;
  }
  localStorage.setItem(PETS_KEY, JSON.stringify(pets));
}

export function addNewPet(profile: PetProfile): number {
  const pets = loadAllPets();
  pets.push(profile);
  localStorage.setItem(PETS_KEY, JSON.stringify(pets));
  const newIndex = pets.length - 1;
  setActivePetIndex(newIndex);
  return newIndex;
}

export function loadPetProfile(): PetProfile | null {
  const pets = loadAllPets();
  if (pets.length === 0) return null;
  const idx = getActivePetIndex();
  return pets[Math.min(idx, pets.length - 1)] || null;
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthenticated() {
  localStorage.setItem(AUTH_KEY, "true");
}

export function isOnboarded(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) === "true";
}

export function setOnboarded() {
  localStorage.setItem(ONBOARDING_KEY, "true");
}

/**
 * Calculate Resting Energy Requirement (RER) and Daily Energy Requirement (DER)
 */
export function calculateDailyCalories(profile: PetProfile): number {
  const weight = profile.weight;
  const rer = 70 * Math.pow(weight, 0.75);

  let factor = 1.6;
  if (profile.activityLevel === "sedentario") factor = 1.2;
  else if (profile.activityLevel === "moderado") factor = 1.6;
  else if (profile.activityLevel === "atleta") factor = 2.5;

  if (profile.reproductiveStatus === "castrado") factor *= 0.8;
  if (profile.bodyCondition === "sobrepeso") factor *= 0.85;
  else if (profile.bodyCondition === "abaixo") factor *= 1.15;

  return Math.round(rer * factor);
}

/**
 * Calculate recommended portion for each selected food.
 */
export function calculatePortions(
  foods: Food[],
  dailyCalories: number
): { food: Food; grams: number }[] {
  if (foods.length === 0) return [];

  const categoryWeights: Record<string, number> = {
    racao: 0.50, proteina: 0.25, carboidrato: 0.12,
    vegetal: 0.05, fruta: 0.03, oleo: 0.03, suplemento: 0.02,
  };

  const byCategory: Record<string, Food[]> = {};
  foods.forEach((f) => {
    if (!byCategory[f.category]) byCategory[f.category] = [];
    byCategory[f.category].push(f);
  });

  const presentCategories = Object.keys(byCategory);
  const totalWeight = presentCategories.reduce(
    (sum, cat) => sum + (categoryWeights[cat] || 0.05), 0
  );

  const results: { food: Food; grams: number }[] = [];

  presentCategories.forEach((cat) => {
    const catFoods = byCategory[cat];
    const normalizedWeight = (categoryWeights[cat] || 0.05) / totalWeight;
    const catCalories = dailyCalories * normalizedWeight;
    const caloriesPerFood = catCalories / catFoods.length;

    catFoods.forEach((food) => {
      const grams = food.caloriesPerGram > 0
        ? Math.round(caloriesPerFood / food.caloriesPerGram) : 0;
      results.push({ food, grams: Math.max(1, grams) });
    });
  });

  return results;
}

/**
 * Generate dynamic tips based on the pet profile and selected foods.
 */
export function generateTips(profile: PetProfile, selectedFoods: Food[]): string[] {
  const tips: string[] = [];
  const name = petArticle(profile);

  if (profile.coatType === "longo" || profile.coatType === "denso") {
    const hasOmega = selectedFoods.some((f) => f.nutrients.omega3);
    if (hasOmega) {
      tips.push(`Como ${name} tem pelo ${profile.coatType}, os alimentos ricos em Ômega-3 selecionados vão ajudar muito no brilho e maciez da pelagem! ✨`);
    } else {
      tips.push(`${name} tem pelo ${profile.coatType}. Considere adicionar Sardinha ou Óleo de Peixe para melhorar o brilho da pelagem.`);
    }
  }

  if (profile.healthRestrictions.includes("problema_articular"))
    tips.push(`Para ajudar nas articulações de ${name}, a Cúrcuma (Açafrão) é um anti-inflamatório natural excelente. 🦴`);
  if (profile.healthRestrictions.includes("sensibilidade_gastrica"))
    tips.push(`${name} tem sensibilidade gástrica. Prefira alimentos cozidos e em porções menores, divididas em 3-4 refeições ao dia. 🩺`);
  if (profile.healthRestrictions.includes("problema_renal"))
    tips.push(`Para cães com problemas renais, controle a quantidade de proteína e priorize fontes magras como Peito de Frango ou Tilápia.`);
  if (profile.ageYears >= 7)
    tips.push(`${name} é um cão sênior. Antioxidantes como Mirtilo e Espinafre ajudam na saúde cognitiva. 🧠`);
  if (profile.ageYears === 0 && profile.ageMonths < 12)
    tips.push(`${name} ainda é filhote! Garanta alimentos ricos em Cálcio para o desenvolvimento ósseo. 🦴`);
  if (profile.bodyCondition === "sobrepeso")
    tips.push(`${name} está acima do peso. As porções foram reduzidas em 15%. Vegetais como Abobrinha e Pepino ajudam a dar saciedade com menos calorias. 🥒`);

  if (tips.length === 0)
    tips.push(`A refeição de ${name} está equilibrada! Varie os ingredientes ao longo da semana para garantir todos os nutrientes. 🐾`);

  return tips;
}

/**
 * Check for nutrient excess warnings
 */
export function checkNutrientExcess(
  selectedFoods: Food[]
): { nutrient: string; foods: string[]; message: string }[] {
  const warnings: { nutrient: string; foods: string[]; message: string }[] = [];
  const nutrientFoods: Record<string, string[]> = {};

  selectedFoods.forEach((f) => {
    Object.entries(f.nutrients).forEach(([key, val]) => {
      if (val) {
        if (!nutrientFoods[key]) nutrientFoods[key] = [];
        nutrientFoods[key].push(f.name);
      }
    });
  });

  if (nutrientFoods.vitaminaA && nutrientFoods.vitaminaA.length > 2) {
    warnings.push({
      nutrient: "Vitamina A",
      foods: nutrientFoods.vitaminaA,
      message: `Excesso de Vitamina A detectado: ${nutrientFoods.vitaminaA.join(", ")}. Escolha no máximo 2 destes ingredientes por refeição.`,
    });
  }

  return warnings;
}
