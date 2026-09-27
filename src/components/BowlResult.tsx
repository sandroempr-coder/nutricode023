import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, Lightbulb, UtensilsCrossed } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Food, CATEGORY_LABELS } from "@/data/foodDatabase";
import { PetProfile, petArticle } from "@/types/pet";
import { calculateDailyCalories, calculatePortions, generateTips, checkNutrientExcess } from "@/lib/petEngine";

interface BowlResultProps {
  petProfile: PetProfile;
  selectedFoods: Food[];
  onBack: () => void;
}

const COLORS = ["hsl(160,70%,42%)", "hsl(200,80%,50%)", "hsl(280,60%,55%)", "hsl(45,93%,47%)", "hsl(0,72%,51%)", "hsl(120,60%,40%)", "hsl(30,80%,50%)", "hsl(340,70%,55%)"];

const BowlResult = ({ petProfile, selectedFoods, onBack }: BowlResultProps) => {
  const dailyCalories = useMemo(() => calculateDailyCalories(petProfile), [petProfile]);
  const portions = useMemo(() => calculatePortions(selectedFoods, dailyCalories), [selectedFoods, dailyCalories]);
  const tips = useMemo(() => generateTips(petProfile, selectedFoods), [petProfile, selectedFoods]);
  const warnings = useMemo(() => checkNutrientExcess(selectedFoods), [selectedFoods]);

  const chartData = useMemo(() => {
    // Group by category
    const byCat: Record<string, number> = {};
    portions.forEach(({ food, grams }) => {
      const cat = CATEGORY_LABELS[food.category];
      byCat[cat] = (byCat[cat] || 0) + grams;
    });
    return Object.entries(byCat).map(([name, value]) => ({ name, value }));
  }, [portions]);

  const totalGrams = portions.reduce((s, p) => s + p.grams, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Refeição Calculada!</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          A Tigela Perfeita d{petArticle(petProfile)} {petProfile.avatarEmoji}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Necessidade energética diária: <strong className="text-foreground">{dailyCalories} kcal</strong> • Porção total: <strong className="text-foreground">{totalGrams}g</strong>
        </p>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mb-6 space-y-2">
          {warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-premium/5 border border-premium/20">
              <AlertTriangle className="w-5 h-5 text-premium flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{w.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chart + Portions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Donut chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-primary" /> Proporção da Tigela
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value"
                  label={false} labelLine={false}>
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}g`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
            {chartData.map((d, i) => (
              <span key={d.name} className="inline-flex items-center gap-1.5 text-xs text-foreground">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                {d.name}: <strong>{d.value}g</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Portion list */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">📋 Quantidade por Alimento</h3>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {portions.map(({ food, grams }) => (
              <div key={food.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-secondary/50 border border-border/50">
                <span className="flex items-center gap-2 text-sm text-foreground">
                  <span>{food.emoji}</span>
                  <span className="font-medium">{food.name}</span>
                </span>
                <span className="text-sm font-bold text-primary">{grams}g</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-accent/30 rounded-2xl border border-primary/10 p-6 mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" /> Dicas Personalizadas
        </h3>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="text-sm text-foreground/80 leading-relaxed pl-4 border-l-2 border-primary/30">
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={onBack} className="btn-ghost-outline w-full">← Voltar e ajustar ingredientes</button>
    </motion.div>
  );
};

export default BowlResult;
