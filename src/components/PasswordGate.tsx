import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { GLOBAL_PASSWORD } from "@/data/membraliaData";

interface PasswordGateProps {
  onUnlock: () => void;
}

const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toUpperCase() === GLOBAL_PASSWORD) {
      localStorage.setItem("membralia_global", "true");
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      {/* Frosted glass backdrop */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm text-center"
      >
        <motion.div
          className="mx-auto w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mb-8"
          style={{ boxShadow: "0 4px 20px -6px rgba(0,0,0,0.06)" }}
          animate={shaking ? { x: [-12, 12, -12, 12, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Lock className="w-8 h-8 text-muted-foreground" />
        </motion.div>

        <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
          Área de Membros
        </h1>
        <p className="text-muted-foreground text-sm mb-10 leading-relaxed max-w-xs mx-auto">
          Insira sua senha de acesso para desbloquear todo o conteúdo exclusivo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="••••••••"
            maxLength={20}
            className="w-full py-4 px-5 rounded-xl bg-card text-foreground text-center text-lg tracking-[0.3em] font-medium border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground/40"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-xs font-medium"
            >
              Senha incorreta. Verifique e tente novamente.
            </motion.p>
          )}
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base">
            Entrar
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PasswordGate;