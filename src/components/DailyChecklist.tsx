import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Trophy } from "lucide-react";

interface DailyChecklistProps {
  items: string[];
  petName: string;
}

const DailyChecklist = ({ items, petName }: DailyChecklistProps) => {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const progress = items.length > 0 ? Math.round((checked.size / items.length) * 100) : 0;
  const allDone = checked.size === items.length && items.length > 0;

  if (items.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl border border-border p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          📋 Checklist Diário
        </h3>
        <span className="text-xs font-medium text-muted-foreground">{checked.size}/{items.length}</span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-4">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {allDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-3 rounded-xl bg-accent border border-primary/20 mb-3"
        >
          <Trophy className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-primary">
            Parabéns! Todas as tarefas de {petName} foram concluídas hoje! 🎉
          </span>
        </motion.div>
      )}

      <div className="space-y-2">
        {items.map((item, idx) => {
          const done = checked.has(idx);
          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(idx)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                done
                  ? "border-primary/30 bg-accent/50"
                  : "border-border bg-secondary/50 hover:border-primary/20"
              }`}
            >
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                done ? "border-primary bg-primary" : "border-border"
              }`}>
                {done && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </motion.div>
                )}
              </div>
              <span className={`text-sm transition-colors ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                {item}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default DailyChecklist;
