import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ShoppingCart, KeyRound } from "lucide-react";
import type { OrderBump } from "@/data/membraliaData";

interface BumpPopupProps {
  bump: OrderBump;
  isUnlocked: boolean;
  onClose: () => void;
  onUnlock: (bumpId: string) => void;
}

const BumpPopup = ({ bump, isUnlocked, onClose, onUnlock }: BumpPopupProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toUpperCase() === bump.password) {
      localStorage.setItem(`membralia_bump_${bump.id}`, "true");
      onUnlock(bump.id);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="popup-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 28, stiffness: 340 }}
          className="popup-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle (mobile) */}
          <div className="flex justify-center pt-3 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="relative p-6 pb-0">
            <div className="flex items-center justify-center">
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-secondary border border-border/40 p-2">
                <img
                  src={bump.image}
                  alt={bump.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="font-bold text-lg text-foreground text-center tracking-tight leading-snug">
              {bump.title}
            </h2>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed whitespace-pre-line">
              {bump.description}
            </p>

            {isUnlocked ? (
              <a
                href={bump.productLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2 mt-6 py-4"
              >
                <Download className="w-5 h-5" />
                Acessar Conteúdo
              </a>
            ) : (
              <div className="mt-6 space-y-4">
                {/* Buy CTA */}
                <a
                  href={bump.buyLink || bump.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium w-full flex items-center justify-center gap-2 py-4 text-base"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Comprar Agora
                </a>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">ou</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Password unlock */}
                <div className="rounded-2xl border border-border bg-secondary/40 p-5">
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5 font-medium">
                    <KeyRound className="w-3.5 h-3.5" />
                    Já comprou? Insira sua senha:
                  </p>
                  <form onSubmit={handleUnlock} className="flex gap-2">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(false);
                      }}
                      placeholder="Senha do produto"
                      maxLength={20}
                      className="flex-1 py-3.5 px-4 rounded-xl bg-card text-foreground text-sm font-medium border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground/50"
                    />
                    <button type="submit" className="btn-primary px-5 py-3.5">
                      Validar
                    </button>
                  </form>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-xs mt-2 font-medium"
                    >
                      Senha incorreta. Verifique e tente novamente.
                    </motion.p>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BumpPopup;
