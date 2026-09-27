import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ModuleCard from "@/components/ModuleCard";
import BumpCard from "@/components/BumpCard";
import BumpPopup from "@/components/BumpPopup";
import { modules, orderBumps, type OrderBump } from "@/data/membraliaData";
import { BookOpen, Crown } from "lucide-react";


const StudyArea = () => {
  const [unlockedBumps, setUnlockedBumps] = useState<Set<string>>(() => {
    const set = new Set<string>();
    orderBumps.forEach((b) => {
      if (localStorage.getItem(`membralia_bump_${b.id}`) === "true") set.add(b.id);
    });
    return set;
  });
  const [selectedBump, setSelectedBump] = useState<OrderBump | null>(null);

  const handleBumpUnlock = (bumpId: string) => {
    setUnlockedBumps((prev) => new Set(prev).add(bumpId));
  };

  return (
    <div>
      {/* Modules */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-accent-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">Seus Módulos</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{modules.length} módulos disponíveis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
        {modules.map((mod, i) => (
          <ModuleCard key={mod.id} module={mod} index={i} />
        ))}
      </div>

      {/* Order Bumps */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--premium-bg))" }}>
          <Crown className="w-4 h-4" style={{ color: "hsl(var(--premium))" }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">Conteúdos Premium</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Materiais exclusivos para acelerar resultados</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {orderBumps.map((bump, i) => (
          <BumpCard key={bump.id} bump={bump} index={i} isUnlocked={unlockedBumps.has(bump.id)} onOpen={() => setSelectedBump(bump)} />
        ))}
      </div>

      {selectedBump && (
        <BumpPopup bump={selectedBump} isUnlocked={unlockedBumps.has(selectedBump.id)} onClose={() => setSelectedBump(null)} onUnlock={handleBumpUnlock} />
      )}
    </div>
  );
};

export default StudyArea;
