import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, Flame, Activity, Scale, Scissors } from "lucide-react";
import { PetProfile } from "@/types/pet";
import { getBreedInfo, BODY_CONDITION_LABELS, COAT_TYPE_LABELS } from "@/data/breedData";

interface CalorieExplainerProps {
  petProfile: PetProfile;
  dailyCalories: number;
}

const CalorieExplainer = ({ petProfile, dailyCalories }: CalorieExplainerProps) => {
  const [open, setOpen] = useState(false);

  const weight = petProfile.weight;
  const rer = Math.round(70 * Math.pow(weight, 0.75));

  let factor = 1.6;
  let factorLabel = "Moderado";
  if (petProfile.activityLevel === "sedentario") { factor = 1.2; factorLabel = "Sedentário"; }
  else if (petProfile.activityLevel === "atleta") { factor = 2.5; factorLabel = "Atleta"; }

  let neuteredAdjust = 1;
  if (petProfile.reproductiveStatus === "castrado") { neuteredAdjust = 0.8; }

  let bodyAdjust = 1;
  if (petProfile.bodyCondition === "sobrepeso") bodyAdjust = 0.85;
  else if (petProfile.bodyCondition === "abaixo") bodyAdjust = 1.15;

  const breedInfo = getBreedInfo(petProfile.breed);

  const essentialNutrients = [
    { name: "Proteína", icon: "🥩", description: "Manutenção muscular e imunidade", min: "18-25% da dieta" },
    { name: "Gorduras (Ômega-3/6)", icon: "🐟", description: "Pele, pelo e cérebro saudáveis", min: "5-15% da dieta" },
    { name: "Cálcio", icon: "🦴", description: "Ossos e dentes fortes", min: petProfile.ageYears < 1 ? "1.2-1.8%" : "0.5-1.0%" },
    { name: "Fibras", icon: "🥦", description: "Digestão saudável e saciedade", min: "2-5% da dieta" },
    { name: "Vitamina A", icon: "🥕", description: "Visão, pele e sistema imune", min: "5000 UI/kg" },
    { name: "Ferro", icon: "🫀", description: "Oxigenação do sangue", min: "40mg/kg" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
        aria-label="Entender a necessidade calórica"
      >
        <Info className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl border border-border p-6 max-w-md w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Flame className="w-5 h-5 text-primary" />
                  Como calculamos {dailyCalories} kcal?
                </h3>
                <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Fórmula */}
              <div className="bg-secondary rounded-xl p-4 mb-4">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Fórmula Veterinária (NRC/FEDIAF)</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary" />
                      RER = 70 × {weight}kg<sup>0.75</sup>
                    </span>
                    <span className="font-bold text-primary">{rer} kcal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      Fator de atividade ({factorLabel})
                    </span>
                    <span className="font-medium text-foreground">× {factor}</span>
                  </div>
                  {petProfile.reproductiveStatus === "castrado" && (
                    <div className="flex items-center justify-between">
                      <span className="text-foreground flex items-center gap-2">
                        <Scissors className="w-4 h-4 text-primary" />
                        Castrado(a) (-20%)
                      </span>
                      <span className="font-medium text-foreground">× {neuteredAdjust}</span>
                    </div>
                  )}
                  {bodyAdjust !== 1 && (
                    <div className="flex items-center justify-between">
                      <span className="text-foreground flex items-center gap-2">
                        {BODY_CONDITION_LABELS[petProfile.bodyCondition].emoji}{" "}
                        {BODY_CONDITION_LABELS[petProfile.bodyCondition].label}
                      </span>
                      <span className="font-medium text-foreground">× {bodyAdjust}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-2 flex items-center justify-between font-bold">
                    <span className="text-foreground">Necessidade Diária (DER)</span>
                    <span className="text-primary text-lg">{dailyCalories} kcal</span>
                  </div>
                </div>
              </div>

              {/* Perfil resumido */}
              {breedInfo && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[11px] px-2 py-1 rounded-full bg-accent text-accent-foreground font-medium">
                    {petProfile.breed}
                  </span>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                    Ideal: {breedInfo.idealWeightMin}-{breedInfo.idealWeightMax}kg
                  </span>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                    Pelo {COAT_TYPE_LABELS[petProfile.coatType]}
                  </span>
                </div>
              )}

              {/* Nutrientes essenciais */}
              <h4 className="text-sm font-semibold text-foreground mb-3">🔬 Nutrientes Essenciais</h4>
              <div className="space-y-2">
                {essentialNutrients.map((n) => (
                  <div key={n.name} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-secondary/50">
                    <span className="text-base mt-0.5">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">{n.name}</span>
                        <span className="text-[10px] text-primary font-medium">{n.min}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{n.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setOpen(false)} className="btn-primary w-full mt-4">
                Entendi!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CalorieExplainer;
