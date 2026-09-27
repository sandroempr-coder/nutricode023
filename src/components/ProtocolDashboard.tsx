import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, UtensilsCrossed, Home, Leaf, CheckCircle2, XCircle, AlertTriangle, Sparkles, CalendarDays, RefreshCw, Clock, Beaker, BookMarked } from "lucide-react";
import { PetProfile, petArticle } from "@/types/pet";
import { SymptomId, CriticalCondition, PROTOCOL_RULES, CRITICAL_CONDITIONS, generateProtocolTitle } from "@/data/protocolDatabase";
import { foods } from "@/data/foodDatabase";
import { calculateDailyCalories, ActiveProtocol, getProtocolDaysRemaining, getProtocolDayNumber, clearActiveProtocol } from "@/lib/petEngine";
import { recipes, getRecipeRestrictionReason } from "@/data/recipeDatabase";
import DailyChecklist from "./DailyChecklist";

interface ProtocolDashboardProps {
  petProfile: PetProfile;
  symptoms: SymptomId[];
  criticalCondition: CriticalCondition;
  onBack: () => void;
  savedProtocol?: ActiveProtocol | null;
}

const SYMPTOM_DEFICIENCY_MAP: Record<string, { analysis: string; nutrients: string[] }> = {
  dermatite: { analysis: "Coceira e inflamação cutânea indicam deficiência de Ômega-3 (EPA/DHA) e Zinco, além de possível sensibilidade alimentar.", nutrients: ["Ômega-3", "Zinco", "Vitamina E"] },
  lagrima_acida: { analysis: "Lágrima ácida sugere excesso de porfirina oxidada, causada por desequilíbrio no pH corporal e falta de antioxidantes oculares.", nutrients: ["Antocianinas", "Vitamina A", "Probióticos"] },
  baixa_energia: { analysis: "Apatia e baixa energia apontam para deficiência de Ferro heme, Vitamina B12 e proteínas de alta biodisponibilidade.", nutrients: ["Ferro", "Vitamina B12", "Proteína"] },
  mau_halito: { analysis: "Mau hálito crônico indica proliferação bacteriana oral e possível disbiose intestinal.", nutrients: ["Probióticos", "Fibra", "Clorofila"] },
  queda_pelo: { analysis: "Queda excessiva de pelo revela deficiência de Biotina, Ômega-3 e Zinco — nutrientes essenciais para queratina.", nutrients: ["Biotina", "Ômega-3", "Zinco"] },
  dor_articular: { analysis: "Dores articulares indicam inflamação crônica e desgaste de cartilagem por falta de colágeno e anti-inflamatórios naturais.", nutrients: ["Colágeno", "Curcumina", "Ômega-3"] },
};

const STOOL_ANALYSIS: Record<string, string> = {
  pastosas: "Fezes pastosas indicam desequilíbrio na flora intestinal e possível má absorção de nutrientes.",
  diarreia: "Diarreia aponta para irritação intestinal grave — a mucosa precisa ser regenerada com urgência.",
  duras: "Fezes duras sugerem desidratação e falta de fibra solúvel na dieta.",
};

const ITCH_ANALYSIS: Record<string, string> = {
  leve: "Coceira leve pode indicar início de sensibilidade alimentar ou ambiental.",
  moderada: "Coceira moderada sugere resposta inflamatória ativa — é necessário intervir com anti-inflamatórios naturais.",
  severa: "Coceira severa indica reação alérgica significativa que requer eliminação de alérgenos + suporte com Ômega-3.",
};

const ProtocolDashboard = ({ petProfile, symptoms, criticalCondition, onBack, savedProtocol }: ProtocolDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"nutrition" | "routine" | "supplements" | "recipes">("nutrition");

  const protocolTitle = generateProtocolTitle(petProfile.name, symptoms);
  const dailyCalories = useMemo(() => {
    let base = calculateDailyCalories(petProfile);
    if (criticalCondition) {
      const cond = CRITICAL_CONDITIONS[criticalCondition];
      base = Math.round(base * (1 + cond.calorieAdjustment));
    }
    return base;
  }, [petProfile, criticalCondition]);

  const totalDays = useMemo(() => {
    if (symptoms.length === 0) return 14;
    return Math.max(...symptoms.map(s => PROTOCOL_RULES[s].durationDays));
  }, [symptoms]);

  const dayNumber = savedProtocol ? getProtocolDayNumber(savedProtocol) : 1;
  const daysRemaining = savedProtocol ? getProtocolDaysRemaining(savedProtocol, totalDays) : totalDays;
  const isExpired = daysRemaining <= 0;
  const progressPercent = Math.min(100, Math.round(((dayNumber - 1) / totalDays) * 100));

  const handleChangeProtocol = () => {
    clearActiveProtocol();
    onBack();
  };

  // Deficiency analysis
  const deficiencyAnalysis = useMemo(() => {
    const parts: string[] = [];
    symptoms.forEach(s => {
      const info = SYMPTOM_DEFICIENCY_MAP[s];
      if (info) parts.push(info.analysis);
    });
    if (petProfile.stoolConsistency && STOOL_ANALYSIS[petProfile.stoolConsistency]) {
      parts.push(STOOL_ANALYSIS[petProfile.stoolConsistency]);
    }
    if (petProfile.itchLevel && ITCH_ANALYSIS[petProfile.itchLevel]) {
      parts.push(ITCH_ANALYSIS[petProfile.itchLevel]);
    }
    return parts;
  }, [symptoms, petProfile]);

  const deficientNutrients = useMemo(() => {
    const set = new Set<string>();
    symptoms.forEach(s => {
      SYMPTOM_DEFICIENCY_MAP[s]?.nutrients.forEach(n => set.add(n));
    });
    return Array.from(set);
  }, [symptoms]);

  // 10 recommended safe recipes
  const recommendedRecipes = useMemo(() => {
    const symptomCategories: Record<string, string[]> = {
      dermatite: ["estetica", "toppers"],
      lagrima_acida: ["estetica", "toppers"],
      baixa_energia: ["toppers", "petiscos"],
      mau_halito: ["estetica", "petiscos"],
      queda_pelo: ["estetica", "toppers"],
      dor_articular: ["caldos", "petiscos"],
    };

    const relevantCategories = new Set<string>();
    symptoms.forEach(s => {
      symptomCategories[s]?.forEach(c => relevantCategories.add(c));
    });
    // Always include sos and caldos
    relevantCategories.add("sos");
    relevantCategories.add("caldos");

    const safe = recipes
      .filter(r => !getRecipeRestrictionReason(r, petProfile.healthRestrictions))
      .map(r => ({
        recipe: r,
        relevance: relevantCategories.has(r.category) ? 2 : 1,
      }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 10);

    return safe;
  }, [symptoms, petProfile.healthRestrictions]);

  // Aggregate recommendations
  const recommended = useMemo(() => {
    const seen = new Set<string>();
    const items: { foodId: string; reason: string; foodName: string; emoji: string }[] = [];
    symptoms.forEach(s => {
      PROTOCOL_RULES[s].nutrition.recommended.forEach(r => {
        if (!seen.has(r.foodId)) {
          seen.add(r.foodId);
          const food = foods.find(f => f.id === r.foodId);
          if (food) items.push({ ...r, foodName: food.name, emoji: food.emoji || "🍽️" });
        }
      });
    });
    if (criticalCondition) {
      CRITICAL_CONDITIONS[criticalCondition].recommendedFoodIds.forEach(id => {
        if (!seen.has(id)) {
          seen.add(id);
          const food = foods.find(f => f.id === id);
          if (food) items.push({ foodId: id, reason: "Recomendado para a condição corporal", foodName: food.name, emoji: food.emoji || "🍽️" });
        }
      });
    }
    return items;
  }, [symptoms, criticalCondition]);

  const avoid = useMemo(() => {
    const items: { description: string; reason: string }[] = [];
    const seen = new Set<string>();
    symptoms.forEach(s => {
      PROTOCOL_RULES[s].nutrition.avoid.forEach(a => {
        if (!seen.has(a.description)) {
          seen.add(a.description);
          items.push(a);
        }
      });
    });
    if (criticalCondition) {
      CRITICAL_CONDITIONS[criticalCondition].avoidDescriptions.forEach(desc => {
        if (!seen.has(desc)) {
          seen.add(desc);
          items.push({ description: desc, reason: "Condição corporal" });
        }
      });
    }
    return items;
  }, [symptoms, criticalCondition]);

  const routineTips = useMemo(() => {
    const items: { title: string; description: string; icon: string }[] = [];
    const seen = new Set<string>();
    symptoms.forEach(s => {
      PROTOCOL_RULES[s].routine.forEach(r => {
        if (!seen.has(r.title)) { seen.add(r.title); items.push(r); }
      });
    });
    if (criticalCondition) {
      CRITICAL_CONDITIONS[criticalCondition].tips.forEach(tip => {
        if (!seen.has(tip)) { seen.add(tip); items.push({ title: tip, description: "", icon: "💡" }); }
      });
    }
    return items;
  }, [symptoms, criticalCondition]);

  const supplementTips = useMemo(() => {
    const items: { name: string; usage: string; icon: string }[] = [];
    const seen = new Set<string>();
    symptoms.forEach(s => {
      PROTOCOL_RULES[s].supplements.forEach(sup => {
        if (!seen.has(sup.name)) { seen.add(sup.name); items.push(sup); }
      });
    });
    return items;
  }, [symptoms]);

  const essentialNutrients = useMemo(() => {
    const nutrients = new Set<string>();
    symptoms.forEach(s => {
      PROTOCOL_RULES[s].nutrition.essentialNutrients.forEach(n => nutrients.add(n));
    });
    return Array.from(nutrients);
  }, [symptoms]);

  const checklistItems = useMemo(() => {
    const items = new Set<string>();
    symptoms.forEach(s => { PROTOCOL_RULES[s].dailyChecklist.forEach(c => items.add(c)); });
    return Array.from(items);
  }, [symptoms]);

  const tabs = [
    { id: "nutrition" as const, label: "🍽️ Nutrição" },
    { id: "recipes" as const, label: "📖 Receitas" },
    { id: "routine" as const, label: "🏠 Rotina" },
    { id: "supplements" as const, label: "🌿 Supl." },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">
            {isExpired ? "Protocolo Concluído!" : "Protocolo Ativo"}
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          {petProfile.avatarPhoto ? (
            <img src={petProfile.avatarPhoto} alt={petProfile.name} className="w-12 h-12 rounded-xl object-cover" />
          ) : (
            <span className="text-4xl">{petProfile.avatarEmoji}</span>
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">{protocolTitle}</h2>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <CalendarDays className="w-4 h-4" /> Protocolo de {totalDays} dias • {dailyCalories} kcal/dia
            </p>
          </div>
        </div>
      </div>

      {/* Countdown banner */}
      {savedProtocol && (
        <div className={`rounded-2xl border p-4 mb-6 ${isExpired ? "border-primary/30 bg-primary/5" : "border-border bg-card"}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {isExpired ? "🎉 Protocolo concluído!" : `Dia ${dayNumber} de ${totalDays}`}
              </span>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              isExpired ? "bg-primary/10 text-primary" : daysRemaining <= 3 ? "bg-destructive/10 text-destructive" : "bg-accent text-primary"
            }`}>
              {isExpired ? "Completo ✓" : `${daysRemaining} dias restantes`}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }}
              animate={{ width: `${isExpired ? 100 : progressPercent}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
          </div>
          {!isExpired && savedProtocol.startedAt && (
            <p className="text-[10px] text-muted-foreground mt-2">
              Iniciado em {new Date(savedProtocol.startedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          )}
        </div>
      )}

      {/* Deficiency Analysis */}
      {deficiencyAnalysis.length > 0 && (
        <div className="rounded-2xl border border-premium/20 bg-premium/5 p-4 mb-6">
          <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
            <Beaker className="w-4 h-4 text-premium" /> Análise de Deficiências
          </h3>
          <div className="space-y-2 mb-3">
            {deficiencyAnalysis.map((text, i) => (
              <p key={i} className="text-xs text-muted-foreground leading-relaxed">• {text}</p>
            ))}
          </div>
          {deficientNutrients.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {deficientNutrients.map(n => (
                <span key={n} className="text-[10px] px-2 py-0.5 rounded-full bg-premium/15 text-premium font-semibold border border-premium/20">
                  ⚠️ {n}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Essential Nutrients Banner */}
      {essentialNutrients.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center mb-6">
          {essentialNutrients.map(n => (
            <span key={n} className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
              {n}
            </span>
          ))}
        </div>
      )}

      {/* Daily Checklist */}
      <DailyChecklist items={checklistItems} petName={petProfile.name} />

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1 mb-6">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-1 rounded-lg text-[11px] font-medium transition-all text-center ${
              activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "nutrition" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Incluir na Tigela
            </h3>
            <div className="space-y-2">
              {recommended.map((r) => (
                <div key={r.foodId} className="flex items-start gap-3 p-3 rounded-xl bg-accent/30 border border-primary/10">
                  <span className="text-xl mt-0.5">{r.emoji}</span>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-foreground block">{r.foodName}</span>
                    <span className="text-[11px] text-muted-foreground">{r.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" /> Proibir Imediatamente
            </h3>
            <div className="space-y-2">
              {avoid.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                  <span className="text-lg mt-0.5">🚫</span>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-foreground block">{a.description}</span>
                    <span className="text-[11px] text-muted-foreground">{a.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "recipes" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
          <p className="text-xs text-muted-foreground mb-3">
            10 receitas seguras selecionadas para os sintomas de {petProfile.name}:
          </p>
          {recommendedRecipes.map(({ recipe }) => (
            <div key={recipe.id} className="p-3 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{recipe.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground block">{recipe.name}</span>
                  <span className="text-[11px] text-muted-foreground line-clamp-1">{recipe.benefit}</span>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    ✅ Segura para {petProfile.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "routine" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
          {routineTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
              <span className="text-2xl">{tip.icon}</span>
              <div className="flex-1">
                <span className="text-sm font-semibold text-foreground block">{tip.title}</span>
                {tip.description && <span className="text-[11px] text-muted-foreground leading-relaxed">{tip.description}</span>}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "supplements" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
          {supplementTips.map((sup, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-accent/20 border border-primary/10">
              <span className="text-2xl">{sup.icon}</span>
              <div className="flex-1">
                <span className="text-sm font-semibold text-foreground block">{sup.name}</span>
                <span className="text-[11px] text-muted-foreground leading-relaxed">{sup.usage}</span>
              </div>
            </div>
          ))}
          {supplementTips.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">Selecione sintomas para ver suplementos recomendados.</p>
          )}
        </motion.div>
      )}

      {/* Change protocol button */}
      <button onClick={handleChangeProtocol} className="btn-ghost-outline w-full mt-8 flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4" />
        {isExpired ? "Iniciar Novo Protocolo" : "Trocar Protocolo"}
      </button>
    </motion.div>
  );
};

export default ProtocolDashboard;
