import { useState } from "react";
import { motion } from "framer-motion";
import { X, Check, Beaker, Sparkles, Gift, Scale } from "lucide-react";
import { PetProfile, petArticle } from "@/types/pet";
import { Recipe, RECIPE_CATEGORY_LABELS } from "@/data/recipeDatabase";

interface RecipeModalProps {
  recipe: Recipe;
  petProfile: PetProfile;
  dailyCalories: number;
  onClose: () => void;
}

const RecipeModal = ({ recipe, petProfile, dailyCalories, onClose }: RecipeModalProps) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  // Calculate dynamic portions based on pet weight
  const weightMultiplier = petProfile.weight / 10;
  const catLabel = RECIPE_CATEGORY_LABELS[recipe.category];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="bg-card w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-5 py-4 z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{recipe.emoji}</span>
                <h2 className="text-lg font-bold text-foreground leading-tight">{recipe.name}</h2>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {catLabel.emoji} {catLabel.label.split("(")[0].trim()}
                </span>
                {recipe.benefit.startsWith("🟢") && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold">
                    {recipe.benefit}
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors flex-shrink-0">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="px-5 py-5 space-y-6">
          {/* Dynamic calculation banner */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/20">
            <Scale className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <span className="text-xs font-bold text-primary block">Doses calculadas dinamicamente</span>
              <span className="text-[11px] text-muted-foreground">
                para {petArticle(petProfile)} ({petProfile.weight}kg • {dailyCalories} kcal/dia)
              </span>
            </div>
          </div>

          {/* Ingredients with checkboxes */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              🥗 Ingredientes
            </h3>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => {
                const grams = Math.round(ing.baseGrams * weightMultiplier);
                const checked = checkedIngredients.has(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-xl border text-left text-sm transition-all ${
                      checked
                        ? "border-primary/30 bg-primary/5 line-through text-muted-foreground"
                        : "border-border bg-secondary/50 text-foreground"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      checked ? "border-primary bg-primary" : "border-border"
                    }`}>
                      {checked && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span className="flex-1">{ing.name}</span>
                    <span className="text-xs font-bold text-primary tabular-nums">{grams}g</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Steps with checkboxes */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              👨‍🍳 Modo de Preparo
            </h3>
            <div className="space-y-2">
              {recipe.steps.map((step, idx) => {
                const checked = checkedSteps.has(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`w-full flex items-start gap-3 py-2.5 px-3 rounded-xl border text-left text-sm transition-all ${
                      checked
                        ? "border-primary/30 bg-primary/5 text-muted-foreground"
                        : "border-border bg-secondary/50 text-foreground"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      checked ? "border-primary bg-primary" : "border-border"
                    }`}>
                      {checked ? <Check className="w-3 h-3 text-primary-foreground" /> : <span className="text-[10px] font-bold text-muted-foreground">{idx + 1}</span>}
                    </div>
                    <span className={`flex-1 leading-relaxed ${checked ? "line-through" : ""}`}>{step}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Why it works */}
          <div className="rounded-xl bg-accent/30 border border-primary/10 p-4">
            <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <Beaker className="w-4 h-4 text-primary" /> Por que funciona? (Bula Natural)
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {recipe.whyItWorks}
            </p>
          </div>

          {/* Benefit badge */}
          {!recipe.benefit.startsWith("🟢") && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/15">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-foreground leading-relaxed">{recipe.benefit}</p>
            </div>
          )}

          {/* Suggested snack */}
          <div className="rounded-xl bg-premium/5 border border-premium/20 p-4">
            <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <Gift className="w-4 h-4 text-premium" /> Combinação Perfeita
            </h3>
            <p className="text-xs text-foreground mb-1">
              <strong>Petisco sugerido:</strong> {recipe.suggestedSnack.name}
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {recipe.suggestedSnack.reason}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecipeModal;
