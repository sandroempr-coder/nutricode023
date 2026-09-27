import { motion } from "framer-motion";
import { Lock, CheckCircle2, Sparkles } from "lucide-react";
import type { OrderBump } from "@/data/membraliaData";

interface BumpCardProps {
  bump: OrderBump;
  index: number;
  isUnlocked: boolean;
  onOpen: () => void;
}

const BumpCard = ({ bump, index, isUnlocked, onOpen }: BumpCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className={`card-bump w-full text-left group ${isUnlocked ? "card-bump--unlocked" : "card-bump--locked"}`}
    >
      {/* Image area */}
      <div className="relative aspect-[2/1] overflow-hidden bg-secondary">
        <img
          src={bump.image}
          alt={bump.name}
          className="w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Lock icon for locked */}
        {!isUnlocked && (
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm border border-border/40 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Unlocked badge */}
        {isUnlocked && (
          <div className="absolute top-3 right-3">
            <span className="badge-unlocked">
              <CheckCircle2 className="w-3 h-3" />
              Liberado
            </span>
          </div>
        )}

        {/* Premium badge */}
        {!isUnlocked && (
          <div className="absolute top-3 left-3">
            <span className="badge-premium">
              <Sparkles className="w-3 h-3" />
              Premium
            </span>
          </div>
        )}

        {/* Hover label for locked */}
        {!isUnlocked && (
          <div className="bump-hover-label absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 transition-all duration-300 pointer-events-none"
            style={{ transform: "translateY(4px)" }}
          >
            <span className="bg-card/95 backdrop-blur-sm text-foreground text-xs font-semibold px-4 py-2 rounded-full border border-border/40">
              Clique para desbloquear
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight tracking-tight">
            {bump.name}
          </h3>
        </div>
        <div className="flex-shrink-0">
          {isUnlocked ? (
            <CheckCircle2 className="w-5 h-5 text-primary" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <span className="text-sm">→</span>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default BumpCard;