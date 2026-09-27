import { CoatType } from "@/types/pet";

export interface BreedInfo {
  name: string;
  size: "mini" | "pequeno" | "medio" | "grande" | "gigante";
  idealWeightMin: number;
  idealWeightMax: number;
  coatType: CoatType;
  popular?: boolean;
}

export const breedDatabase: BreedInfo[] = [
  { name: "SRD / Sem Raça Definida", size: "medio", idealWeightMin: 8, idealWeightMax: 25, coatType: "curto", popular: true },
  { name: "Afghan Hound", size: "grande", idealWeightMin: 23, idealWeightMax: 27, coatType: "longo" },
  { name: "Airedale Terrier", size: "grande", idealWeightMin: 20, idealWeightMax: 30, coatType: "denso" },
  { name: "Akita Inu", size: "grande", idealWeightMin: 32, idealWeightMax: 45, coatType: "denso", popular: true },
  { name: "American Bully", size: "medio", idealWeightMin: 20, idealWeightMax: 40, coatType: "curto", popular: true },
  { name: "American Pit Bull Terrier", size: "medio", idealWeightMin: 16, idealWeightMax: 30, coatType: "curto", popular: true },
  { name: "American Staffordshire Terrier", size: "medio", idealWeightMin: 25, idealWeightMax: 35, coatType: "curto" },
  { name: "Australian Cattle Dog", size: "medio", idealWeightMin: 15, idealWeightMax: 22, coatType: "curto" },
  { name: "Australian Shepherd", size: "medio", idealWeightMin: 18, idealWeightMax: 30, coatType: "longo" },
  { name: "Basenji", size: "pequeno", idealWeightMin: 9, idealWeightMax: 12, coatType: "curto" },
  { name: "Basset Hound", size: "medio", idealWeightMin: 20, idealWeightMax: 29, coatType: "curto" },
  { name: "Beagle", size: "medio", idealWeightMin: 9, idealWeightMax: 16, coatType: "curto", popular: true },
  { name: "Belgian Malinois", size: "grande", idealWeightMin: 25, idealWeightMax: 34, coatType: "curto" },
  { name: "Bernese Mountain Dog", size: "gigante", idealWeightMin: 35, idealWeightMax: 50, coatType: "longo" },
  { name: "Bichon Frisé", size: "pequeno", idealWeightMin: 3, idealWeightMax: 6, coatType: "denso" },
  { name: "Bloodhound", size: "gigante", idealWeightMin: 36, idealWeightMax: 50, coatType: "curto" },
  { name: "Border Collie", size: "medio", idealWeightMin: 14, idealWeightMax: 22, coatType: "longo", popular: true },
  { name: "Border Terrier", size: "pequeno", idealWeightMin: 5, idealWeightMax: 7, coatType: "denso" },
  { name: "Boston Terrier", size: "pequeno", idealWeightMin: 5, idealWeightMax: 11, coatType: "curto" },
  { name: "Boxer", size: "grande", idealWeightMin: 25, idealWeightMax: 32, coatType: "curto", popular: true },
  { name: "Braco Alemão", size: "grande", idealWeightMin: 25, idealWeightMax: 32, coatType: "curto" },
  { name: "Braco Italiano", size: "grande", idealWeightMin: 25, idealWeightMax: 40, coatType: "curto" },
  { name: "Bull Terrier", size: "medio", idealWeightMin: 22, idealWeightMax: 32, coatType: "curto" },
  { name: "Bulldog Americano", size: "grande", idealWeightMin: 27, idealWeightMax: 54, coatType: "curto" },
  { name: "Bulldog Francês", size: "pequeno", idealWeightMin: 8, idealWeightMax: 14, coatType: "curto", popular: true },
  { name: "Bulldog Inglês", size: "medio", idealWeightMin: 18, idealWeightMax: 25, coatType: "curto", popular: true },
  { name: "Bullmastiff", size: "gigante", idealWeightMin: 41, idealWeightMax: 59, coatType: "curto" },
  { name: "Cairn Terrier", size: "pequeno", idealWeightMin: 6, idealWeightMax: 8, coatType: "denso" },
  { name: "Cane Corso", size: "gigante", idealWeightMin: 40, idealWeightMax: 50, coatType: "curto" },
  { name: "Cavalier King Charles Spaniel", size: "pequeno", idealWeightMin: 5, idealWeightMax: 8, coatType: "longo" },
  { name: "Chesapeake Bay Retriever", size: "grande", idealWeightMin: 25, idealWeightMax: 36, coatType: "denso" },
  { name: "Chihuahua", size: "mini", idealWeightMin: 1.5, idealWeightMax: 3, coatType: "curto", popular: true },
  { name: "Chow Chow", size: "grande", idealWeightMin: 20, idealWeightMax: 32, coatType: "denso" },
  { name: "Cocker Spaniel Americano", size: "medio", idealWeightMin: 11, idealWeightMax: 14, coatType: "longo" },
  { name: "Cocker Spaniel Inglês", size: "medio", idealWeightMin: 13, idealWeightMax: 15, coatType: "longo", popular: true },
  { name: "Collie", size: "grande", idealWeightMin: 22, idealWeightMax: 34, coatType: "longo" },
  { name: "Corgi (Pembroke)", size: "pequeno", idealWeightMin: 10, idealWeightMax: 14, coatType: "denso", popular: true },
  { name: "Corgi (Cardigan)", size: "medio", idealWeightMin: 11, idealWeightMax: 17, coatType: "denso" },
  { name: "Dachshund (Teckel)", size: "mini", idealWeightMin: 4, idealWeightMax: 9, coatType: "curto", popular: true },
  { name: "Dálmata", size: "grande", idealWeightMin: 24, idealWeightMax: 32, coatType: "curto" },
  { name: "Doberman", size: "grande", idealWeightMin: 27, idealWeightMax: 45, coatType: "curto", popular: true },
  { name: "Dogo Argentino", size: "gigante", idealWeightMin: 36, idealWeightMax: 45, coatType: "curto" },
  { name: "Dogue Alemão", size: "gigante", idealWeightMin: 50, idealWeightMax: 80, coatType: "curto" },
  { name: "Dogue de Bordeaux", size: "gigante", idealWeightMin: 45, idealWeightMax: 68, coatType: "curto" },
  { name: "English Setter", size: "grande", idealWeightMin: 25, idealWeightMax: 36, coatType: "longo" },
  { name: "Fila Brasileiro", size: "gigante", idealWeightMin: 40, idealWeightMax: 50, coatType: "curto" },
  { name: "Fox Terrier", size: "pequeno", idealWeightMin: 7, idealWeightMax: 9, coatType: "denso" },
  { name: "Galgo Espanhol", size: "grande", idealWeightMin: 20, idealWeightMax: 30, coatType: "fino" },
  { name: "Golden Retriever", size: "grande", idealWeightMin: 25, idealWeightMax: 34, coatType: "longo", popular: true },
  { name: "Gordon Setter", size: "grande", idealWeightMin: 25, idealWeightMax: 36, coatType: "longo" },
  { name: "Greyhound", size: "grande", idealWeightMin: 27, idealWeightMax: 32, coatType: "fino" },
  { name: "Havanese", size: "mini", idealWeightMin: 3, idealWeightMax: 7, coatType: "longo" },
  { name: "Husky Siberiano", size: "grande", idealWeightMin: 16, idealWeightMax: 27, coatType: "denso", popular: true },
  { name: "Irish Setter", size: "grande", idealWeightMin: 25, idealWeightMax: 32, coatType: "longo" },
  { name: "Irish Wolfhound", size: "gigante", idealWeightMin: 48, idealWeightMax: 68, coatType: "denso" },
  { name: "Jack Russell Terrier", size: "pequeno", idealWeightMin: 5, idealWeightMax: 8, coatType: "curto", popular: true },
  { name: "Japanese Chin", size: "mini", idealWeightMin: 2, idealWeightMax: 5, coatType: "longo" },
  { name: "Keeshond", size: "medio", idealWeightMin: 16, idealWeightMax: 20, coatType: "denso" },
  { name: "Komondor", size: "gigante", idealWeightMin: 36, idealWeightMax: 50, coatType: "longo" },
  { name: "Kuvasz", size: "gigante", idealWeightMin: 32, idealWeightMax: 52, coatType: "longo" },
  { name: "Labrador Retriever", size: "grande", idealWeightMin: 25, idealWeightMax: 36, coatType: "curto", popular: true },
  { name: "Lhasa Apso", size: "pequeno", idealWeightMin: 5, idealWeightMax: 8, coatType: "longo", popular: true },
  { name: "Lulu da Pomerânia (Spitz Alemão)", size: "mini", idealWeightMin: 1.5, idealWeightMax: 3.5, coatType: "denso", popular: true },
  { name: "Maltês", size: "mini", idealWeightMin: 2, idealWeightMax: 4, coatType: "longo", popular: true },
  { name: "Maremma Sheepdog", size: "gigante", idealWeightMin: 30, idealWeightMax: 45, coatType: "longo" },
  { name: "Mastiff Inglês", size: "gigante", idealWeightMin: 55, idealWeightMax: 100, coatType: "curto" },
  { name: "Mastim Tibetano", size: "gigante", idealWeightMin: 36, idealWeightMax: 73, coatType: "denso" },
  { name: "Miniature Pinscher", size: "mini", idealWeightMin: 3, idealWeightMax: 5, coatType: "curto" },
  { name: "Miniature Schnauzer", size: "pequeno", idealWeightMin: 5, idealWeightMax: 8, coatType: "denso", popular: true },
  { name: "Newfoundland", size: "gigante", idealWeightMin: 45, idealWeightMax: 70, coatType: "longo" },
  { name: "Norfolk Terrier", size: "pequeno", idealWeightMin: 5, idealWeightMax: 6, coatType: "denso" },
  { name: "Old English Sheepdog", size: "grande", idealWeightMin: 27, idealWeightMax: 45, coatType: "longo" },
  { name: "Papillon", size: "mini", idealWeightMin: 2, idealWeightMax: 5, coatType: "longo" },
  { name: "Pastor Alemão", size: "grande", idealWeightMin: 22, idealWeightMax: 40, coatType: "denso", popular: true },
  { name: "Pastor Australiano", size: "medio", idealWeightMin: 18, idealWeightMax: 30, coatType: "longo" },
  { name: "Pastor Belga", size: "grande", idealWeightMin: 25, idealWeightMax: 34, coatType: "longo" },
  { name: "Pastor de Shetland (Sheltie)", size: "pequeno", idealWeightMin: 6, idealWeightMax: 12, coatType: "longo" },
  { name: "Pastor Maremano", size: "gigante", idealWeightMin: 30, idealWeightMax: 45, coatType: "longo" },
  { name: "Pastor Suíço Branco", size: "grande", idealWeightMin: 25, idealWeightMax: 40, coatType: "longo" },
  { name: "Pekingês", size: "mini", idealWeightMin: 3, idealWeightMax: 6, coatType: "longo" },
  { name: "Pointer Inglês", size: "grande", idealWeightMin: 20, idealWeightMax: 34, coatType: "curto" },
  { name: "Poodle (Toy)", size: "mini", idealWeightMin: 2, idealWeightMax: 4, coatType: "denso", popular: true },
  { name: "Poodle (Miniatura)", size: "pequeno", idealWeightMin: 5, idealWeightMax: 8, coatType: "denso" },
  { name: "Poodle (Standard)", size: "grande", idealWeightMin: 20, idealWeightMax: 32, coatType: "denso" },
  { name: "Pug", size: "pequeno", idealWeightMin: 6, idealWeightMax: 9, coatType: "curto", popular: true },
  { name: "Rat Terrier", size: "pequeno", idealWeightMin: 4.5, idealWeightMax: 11, coatType: "curto" },
  { name: "Rhodesian Ridgeback", size: "grande", idealWeightMin: 30, idealWeightMax: 39, coatType: "curto" },
  { name: "Rottweiler", size: "gigante", idealWeightMin: 35, idealWeightMax: 60, coatType: "curto", popular: true },
  { name: "Samoieda", size: "grande", idealWeightMin: 17, idealWeightMax: 30, coatType: "denso" },
  { name: "São Bernardo", size: "gigante", idealWeightMin: 54, idealWeightMax: 82, coatType: "longo" },
  { name: "Schnauzer Gigante", size: "grande", idealWeightMin: 25, idealWeightMax: 48, coatType: "denso" },
  { name: "Schnauzer Standard", size: "medio", idealWeightMin: 14, idealWeightMax: 20, coatType: "denso" },
  { name: "Scottish Terrier", size: "pequeno", idealWeightMin: 8, idealWeightMax: 10, coatType: "denso" },
  { name: "Shar-Pei", size: "medio", idealWeightMin: 18, idealWeightMax: 25, coatType: "curto" },
  { name: "Shiba Inu", size: "medio", idealWeightMin: 8, idealWeightMax: 14, coatType: "denso", popular: true },
  { name: "Shih Tzu", size: "pequeno", idealWeightMin: 4, idealWeightMax: 7, coatType: "longo", popular: true },
  { name: "Staffordshire Bull Terrier", size: "medio", idealWeightMin: 11, idealWeightMax: 17, coatType: "curto" },
  { name: "Terra Nova", size: "gigante", idealWeightMin: 45, idealWeightMax: 70, coatType: "longo" },
  { name: "Vizsla", size: "grande", idealWeightMin: 18, idealWeightMax: 30, coatType: "curto" },
  { name: "Weimaraner", size: "grande", idealWeightMin: 25, idealWeightMax: 40, coatType: "curto" },
  { name: "Welsh Terrier", size: "pequeno", idealWeightMin: 9, idealWeightMax: 10, coatType: "denso" },
  { name: "West Highland White Terrier", size: "pequeno", idealWeightMin: 6, idealWeightMax: 10, coatType: "denso" },
  { name: "Whippet", size: "medio", idealWeightMin: 9, idealWeightMax: 14, coatType: "fino" },
  { name: "Yorkshire Terrier", size: "mini", idealWeightMin: 2, idealWeightMax: 3.5, coatType: "longo", popular: true },
];

export function getBreedInfo(breedName: string): BreedInfo | null {
  return breedDatabase.find(b => b.name === breedName) || null;
}

export function calculateBodyCondition(breedName: string, weight: number, ageYears: number, ageMonths: number): "abaixo" | "ideal" | "sobrepeso" {
  const breed = getBreedInfo(breedName);
  if (!breed) {
    // Fallback for unknown breeds
    return "ideal";
  }

  let { idealWeightMin, idealWeightMax } = breed;
  const totalMonths = ageYears * 12 + ageMonths;

  // Puppies: adjust ideal weight based on age
  if (totalMonths < 12) {
    const growthFactor = Math.min(totalMonths / 12, 1);
    idealWeightMin *= growthFactor * 0.6;
    idealWeightMax *= growthFactor * 0.85;
  } else if (totalMonths < 18 && (breed.size === "grande" || breed.size === "gigante")) {
    // Large breeds mature slower
    const growthFactor = Math.min(totalMonths / 18, 1);
    idealWeightMin *= growthFactor * 0.8;
    idealWeightMax *= growthFactor;
  }

  // Seniors: slight reduction tolerance
  if (ageYears >= 8) {
    idealWeightMin *= 0.9;
  }

  const margin = (idealWeightMax - idealWeightMin) * 0.15;

  if (weight < idealWeightMin - margin) return "abaixo";
  if (weight > idealWeightMax + margin) return "sobrepeso";
  return "ideal";
}

export function getCoatTypeForBreed(breedName: string): CoatType {
  const breed = getBreedInfo(breedName);
  return breed?.coatType || "curto";
}

export const COAT_TYPE_LABELS: Record<CoatType, string> = {
  curto: "Curto",
  longo: "Longo",
  fino: "Fino",
  denso: "Denso",
};

export const BODY_CONDITION_LABELS = {
  abaixo: { label: "Abaixo do peso", emoji: "🦴", color: "text-premium" },
  ideal: { label: "Peso ideal", emoji: "✅", color: "text-primary" },
  sobrepeso: { label: "Sobrepeso", emoji: "⚖️", color: "text-destructive" },
};
