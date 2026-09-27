export type BodyCondition = "abaixo" | "ideal" | "sobrepeso";
export type CoatType = "curto" | "longo" | "fino" | "denso";
export type ActivityLevel = "sedentario" | "moderado" | "atleta";
export type ReproductiveStatus = "castrado" | "inteiro";
export type PetSex = "macho" | "femea";
export type StoolConsistency = "duras" | "normais" | "pastosas" | "diarreia";
export type ItchLevel = "nenhuma" | "leve" | "moderada" | "severa";

export type HealthRestriction =
  | "alergia_frango"
  | "alergia_bovina"
  | "sensibilidade_gastrica"
  | "problema_renal"
  | "problema_articular";

export interface PetProfile {
  name: string;
  sex: PetSex;
  ageYears: number;
  ageMonths: number;
  avatarEmoji: string;
  avatarPhoto?: string; // base64 compressed photo
  weight: number;
  bodyCondition: BodyCondition;
  coatType: CoatType;
  breed: string;
  activityLevel: ActivityLevel;
  healthRestrictions: HealthRestriction[];
  reproductiveStatus: ReproductiveStatus;
  stoolConsistency: StoolConsistency;
  itchLevel: ItchLevel;
}

/** Returns gendered article: "o Thor" or "a Luna" */
export function petArticle(profile: PetProfile): string {
  return profile.sex === "macho" ? `o ${profile.name}` : `a ${profile.name}`;
}

export const HEALTH_RESTRICTION_LABELS: Record<HealthRestriction, string> = {
  alergia_frango: "Alergia a Frango",
  alergia_bovina: "Alergia a Carne Bovina",
  sensibilidade_gastrica: "Sensibilidade Gástrica",
  problema_renal: "Problema Renal",
  problema_articular: "Problema Articular",
};

export const STOOL_LABELS: Record<StoolConsistency, { label: string; emoji: string }> = {
  duras: { label: "Duras", emoji: "🟤" },
  normais: { label: "Normais", emoji: "🟢" },
  pastosas: { label: "Pastosas", emoji: "🟡" },
  diarreia: { label: "Diarreia", emoji: "🔴" },
};

export const ITCH_LABELS: Record<ItchLevel, { label: string; emoji: string }> = {
  nenhuma: { label: "Nenhuma", emoji: "✅" },
  leve: { label: "Leve", emoji: "🟡" },
  moderada: { label: "Moderada", emoji: "🟠" },
  severa: { label: "Severa", emoji: "🔴" },
};

export const RESTRICTION_ALLERGEN_MAP: Record<string, string> = {
  alergia_frango: "frango",
  alergia_bovina: "bovina",
};

export const DOG_EMOJIS = ["🐕", "🐶", "🐕‍🦺", "🦮", "🐩", "🐾", "🐺", "🐈"];
