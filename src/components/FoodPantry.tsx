import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, AlertTriangle, ShieldAlert, Filter, Stethoscope } from "lucide-react";
import { foods, Food, FoodCategory, CATEGORY_LABELS, CATEGORY_EMOJI } from "@/data/foodDatabase";
import { PetProfile, RESTRICTION_ALLERGEN_MAP } from "@/types/pet";
import { SymptomId, getFoodsToAvoidForSymptoms, SYMPTOMS } from "@/data/protocolDatabase";

interface FoodPantryProps {
  petProfile: PetProfile;
  selectedFoods: Food[];
  onToggleFood: (food: Food) => void;
  activeSymptoms?: SymptomId[];
}

const FoodPantry = ({ petProfile, selectedFoods, onToggleFood, activeSymptoms = [] }: FoodPantryProps) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FoodCategory | "all">("all");
  const [toxicAlert, setToxicAlert] = useState<Food | null>(null);
  const [restrictionAlert, setRestrictionAlert] = useState<string | null>(null);
  const [protocolAlert, setProtocolAlert] = useState<string | null>(null);

  const symptomRestrictions = useMemo(() => getFoodsToAvoidForSymptoms(activeSymptoms), [activeSymptoms]);

  const isFoodRestrictedByProtocol = useCallback((food: Food): string | null => {
    for (const r of symptomRestrictions) {
      if (r.foodId && r.foodId === food.id) return r.reason;
      if (r.allergen && food.allergens?.includes(r.allergen)) return r.reason;
    }
    return null;
  }, [symptomRestrictions]);

  const safeFoods = useMemo(() => foods.filter((f) => !f.toxic), []);

  const filteredFoods = useMemo(() => {
    let list = activeCategory === "all" ? safeFoods : safeFoods.filter((f) => f.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      // Check toxic first
      const toxicMatch = foods.find((f) => f.toxic && f.name.toLowerCase().includes(q));
      if (toxicMatch && !toxicAlert) {
        setToxicAlert(toxicMatch);
      }
      list = list.filter((f) => f.name.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeCategory, safeFoods]);

  const handleAdd = useCallback((food: Food) => {
    // Check allergen restrictions from profile
    if (food.allergens) {
      for (const restriction of petProfile.healthRestrictions) {
        const allergen = RESTRICTION_ALLERGEN_MAP[restriction];
        if (allergen && food.allergens.includes(allergen)) {
          setRestrictionAlert(`${petProfile.name} tem restrição: "${restriction === "alergia_frango" ? "Alergia a Frango" : "Alergia a Carne Bovina"}". O alimento "${food.name}" não pode ser adicionado.`);
          return;
        }
      }
    }
    // Check protocol symptom restrictions
    const protocolReason = isFoodRestrictedByProtocol(food);
    if (protocolReason) {
      setProtocolAlert(`⚠️ Protocolo ativo: "${food.name}" não é recomendado.\n\n${protocolReason}`);
      return;
    }
    onToggleFood(food);
  }, [petProfile, onToggleFood, isFoodRestrictedByProtocol]);

  const isSelected = (id: string) => selectedFoods.some((f) => f.id === id);

  const categories: (FoodCategory | "all")[] = ["all", "racao", "proteina", "carboidrato", "vegetal", "fruta", "oleo", "suplemento"];

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setToxicAlert(null); }}
          placeholder="Buscar alimento..."
          className="w-full py-3 pl-10 pr-4 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-accent"}`}>
            {cat === "all" ? "Todos" : `${CATEGORY_EMOJI[cat]} ${CATEGORY_LABELS[cat]}`}
          </button>
        ))}
      </div>

      {/* Protocol active banner */}
      {activeSymptoms.length > 0 && (
        <div className="flex items-start gap-2 mb-4 px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/20">
          <Stethoscope className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-primary block">Protocolo ativo</span>
            <span className="text-[11px] text-muted-foreground">
              Alimentos prejudiciais aos sintomas selecionados ({activeSymptoms.map(s => SYMPTOMS.find(sy => sy.id === s)?.label).filter(Boolean).join(", ")}) serão bloqueados.
            </span>
          </div>
        </div>
      )}

      {/* Selected count */}
      {selectedFoods.length > 0 && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-accent/50 border border-primary/20">
          <span className="text-xs font-medium text-primary">{selectedFoods.length} alimento(s) na tigela</span>
        </div>
      )}

      {/* Food grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {filteredFoods.map((food) => {
          const selected = isSelected(food.id);
          const protocolRestriction = isFoodRestrictedByProtocol(food);
          return (
            <motion.button
              key={food.id}
              layout
              onClick={() => selected ? onToggleFood(food) : handleAdd(food)}
              className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                protocolRestriction
                  ? "border-destructive/30 bg-destructive/5 opacity-60"
                  : selected
                    ? "border-primary bg-accent"
                    : "border-border bg-card hover:border-primary/40 hover:bg-secondary/50"
              }`}
            >
              <div className="text-lg mb-1">{food.emoji}</div>
              <p className="text-xs font-medium text-foreground leading-tight">{food.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{food.caloriesPerGram} kcal/g</p>
              {protocolRestriction && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center">
                  <Stethoscope className="w-3 h-3 text-destructive" />
                </div>
              )}
              {selected && !protocolRestriction && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <X className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {filteredFoods.length === 0 && !toxicAlert && (
        <p className="text-center text-sm text-muted-foreground py-8">Nenhum alimento encontrado.</p>
      )}

      {/* Toxic alert modal */}
      <AnimatePresence>
        {toxicAlert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setToxicAlert(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl border-2 border-destructive/30 p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">⚠️ ALERTA CRÍTICO</h3>
                  <p className="text-xs text-destructive font-medium">Alimento TÓXICO detectado!</p>
                </div>
              </div>
              <p className="text-sm text-foreground mb-1 font-medium">{toxicAlert.emoji} {toxicAlert.name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{toxicAlert.toxicReason}</p>
              <button onClick={() => { setToxicAlert(null); setSearch(""); }} className="btn-primary w-full">
                Entendi, remover busca
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restriction alert */}
      <AnimatePresence>
        {restrictionAlert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setRestrictionAlert(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl border-2 border-premium/30 p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-premium/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-premium" />
                </div>
                <h3 className="font-bold text-foreground">Restrição do Perfil</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{restrictionAlert}</p>
              <button onClick={() => setRestrictionAlert(null)} className="btn-primary w-full">Entendi</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Protocol alert */}
      <AnimatePresence>
        {protocolAlert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setProtocolAlert(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl border-2 border-primary/30 p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Bloqueado pelo Protocolo</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">{protocolAlert}</p>
              <button onClick={() => setProtocolAlert(null)} className="btn-primary w-full">Entendi</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodPantry;
