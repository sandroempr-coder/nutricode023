import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Lock, X, Check, ChevronRight } from "lucide-react";
import { PetProfile, petArticle } from "@/types/pet";
import { recipes, Recipe, RecipeCategory, RECIPE_CATEGORY_LABELS, getRecipeRestrictionReason } from "@/data/recipeDatabase";
import { calculateDailyCalories } from "@/lib/petEngine";
import RecipeModal from "./RecipeModal";

interface RecipeLibraryProps {
  petProfile: PetProfile;
}

type FilterCategory = "all" | RecipeCategory;

const RecipeLibrary = ({ petProfile }: RecipeLibraryProps) => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const dailyCalories = useMemo(() => calculateDailyCalories(petProfile), [petProfile]);

  const filters: { id: FilterCategory; label: string; emoji?: string }[] = [
    { id: "all", label: "Tudo" },
    ...Object.entries(RECIPE_CATEGORY_LABELS).map(([id, { label, emoji }]) => ({
      id: id as RecipeCategory,
      label: `${emoji} ${label.split("(")[0].trim()}`,
    })),
  ];

  const processedRecipes = useMemo(() => {
    let list = activeFilter === "all" ? recipes : recipes.filter(r => r.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.benefit.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(q))
      );
    }
    return list.map(recipe => ({
      recipe,
      restriction: getRecipeRestrictionReason(recipe, petProfile.healthRestrictions),
    }));
  }, [activeFilter, search, petProfile.healthRestrictions]);

  const safeCount = processedRecipes.filter(r => !r.restriction).length;
  const blockedCount = processedRecipes.filter(r => r.restriction).length;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
          📖 Biblioteca Ouro
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Receitas funcionais calculadas para {petArticle(petProfile)} ({petProfile.weight}kg).
          {blockedCount > 0 && (
            <span className="text-destructive"> • {blockedCount} bloqueada{blockedCount > 1 ? "s" : ""} por restrição</span>
          )}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar receita, ingrediente..."
          className="w-full py-3 pl-10 pr-4 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Category chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {filters.map((f) => (
          <button key={f.id} onClick={() => setActiveFilter(f.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === f.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-accent"
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Recipe grid */}
      <div className="space-y-2.5">
        {processedRecipes.map(({ recipe, restriction }) => {
          const isBlocked = !!restriction;
          return (
            <motion.button
              key={recipe.id}
              layout
              onClick={() => !isBlocked && setSelectedRecipe(recipe)}
              disabled={isBlocked}
              className={`relative w-full text-left p-4 rounded-xl border-2 transition-all ${
                isBlocked
                  ? "opacity-40 cursor-not-allowed border-destructive/20 bg-card"
                  : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30 active:scale-[0.98]"
              }`}
            >
              {isBlocked && (
                <div className="absolute inset-0 rounded-xl bg-background/60 flex items-center justify-center z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/30">
                    <Lock className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-[11px] font-semibold text-destructive">
                      Bloqueado: {restriction}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{recipe.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-foreground truncate">{recipe.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {RECIPE_CATEGORY_LABELS[recipe.category].emoji} {RECIPE_CATEGORY_LABELS[recipe.category].label.split("(")[0].trim()}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      ~{Math.round(recipe.caloriesBase * (petProfile.weight / 10))} kcal
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{recipe.benefit}</p>
                </div>
                {!isBlocked && <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-2" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {processedRecipes.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-12">Nenhuma receita encontrada.</p>
      )}

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            petProfile={petProfile}
            dailyCalories={dailyCalories}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecipeLibrary;
