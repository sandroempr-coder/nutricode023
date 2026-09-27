import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Check, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { PetProfile } from "@/types/pet";
import { SYMPTOMS, SymptomId, CriticalCondition, CRITICAL_CONDITIONS, generateProtocolTitle } from "@/data/protocolDatabase";
import ProtocolDashboard from "./ProtocolDashboard";
import { loadActiveProtocol, saveActiveProtocol, getActivePetIndex, ActiveProtocol } from "@/lib/petEngine";

interface ClinicalProtocolProps {
  petProfile: PetProfile;
  onSymptomsChange?: (symptoms: SymptomId[]) => void;
}

const ClinicalProtocol = ({ petProfile, onSymptomsChange }: ClinicalProtocolProps) => {
  const petIndex = getActivePetIndex();
  const savedProtocol = loadActiveProtocol(petIndex);

  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomId[]>(
    savedProtocol ? (savedProtocol.symptoms as SymptomId[]) : []
  );
  const [criticalCondition, setCriticalCondition] = useState<CriticalCondition>(
    savedProtocol ? (savedProtocol.criticalCondition as CriticalCondition) : null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDashboard, setShowDashboard] = useState(!!savedProtocol);

  // Notify parent of symptoms from saved protocol
  useEffect(() => {
    if (savedProtocol) {
      onSymptomsChange?.(savedProtocol.symptoms as SymptomId[]);
    }
  }, []);

  const toggleSymptom = (id: SymptomId) => {
    setSelectedSymptoms(prev => {
      const next = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
      onSymptomsChange?.(next);
      return next;
    });
  };

  const handleGenerate = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Save protocol with current timestamp
      const protocol: ActiveProtocol = {
        symptoms: selectedSymptoms,
        criticalCondition,
        startedAt: new Date().toISOString(),
        petIndex,
      };
      saveActiveProtocol(protocol);
      setIsAnalyzing(false);
      setShowDashboard(true);
    }, 2200);
  };

  const handleChangeProtocol = () => {
    setShowDashboard(false);
    setSelectedSymptoms([]);
    setCriticalCondition(null);
    onSymptomsChange?.([]);
  };

  const canGenerate = selectedSymptoms.length > 0 || criticalCondition !== null;

  if (showDashboard) {
    return (
      <ProtocolDashboard
        petProfile={petProfile}
        symptoms={selectedSymptoms}
        criticalCondition={criticalCondition}
        onBack={handleChangeProtocol}
        savedProtocol={savedProtocol}
      />
    );
  }

  // Analyzing animation
  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
        >
          <Stethoscope className="w-8 h-8 text-primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-foreground text-center mb-2">Analisando perfil...</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Cruzando dados de {petProfile.name} ({petProfile.breed}, {petProfile.weight}kg) com os sintomas selecionados
          </p>
        </motion.div>
        <motion.div
          className="mt-6 flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Stethoscope className="w-7 h-7 text-primary" /> Como {petProfile.name} está hoje?
        </h1>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Selecione os sintomas ou condições atuais para gerar um plano personalizado.
        </p>
      </div>

      {/* Symptoms */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Sintomas Observados</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SYMPTOMS.map((symptom) => {
            const active = selectedSymptoms.includes(symptom.id);
            return (
              <motion.button
                key={symptom.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleSymptom(symptom.id)}
                className={`relative flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  active
                    ? "border-primary bg-accent"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <span className="text-2xl mt-0.5">{symptom.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground block">{symptom.label}</span>
                  <span className="text-[11px] text-muted-foreground leading-tight">{symptom.description}</span>
                </div>
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Critical condition */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-premium" /> Condição Corporal Crítica
        </h3>
        <p className="text-[11px] text-muted-foreground mb-3">Selecione apenas se aplicável (exclusivo)</p>
        <div className="grid grid-cols-2 gap-2.5">
          {(Object.entries(CRITICAL_CONDITIONS) as [CriticalCondition & string, typeof CRITICAL_CONDITIONS.sobrepeso][]).map(([key, cond]) => {
            const active = criticalCondition === key;
            return (
              <motion.button
                key={key}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCriticalCondition(active ? null : key as CriticalCondition)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  active
                    ? "border-premium bg-premium/5"
                    : "border-border bg-card hover:border-premium/40"
                }`}
              >
                <span className="text-2xl">{cond.emoji}</span>
                <div>
                  <span className="text-sm font-semibold text-foreground block">{cond.label}</span>
                  <span className="text-[11px] text-muted-foreground">{cond.description}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Generate button */}
      {canGenerate && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-auto sm:w-full sm:max-w-5xl sm:mx-auto sm:px-8 z-30 pb-safe-nav">
          <button onClick={handleGenerate}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base shadow-lg shadow-primary/25">
            <Stethoscope className="w-5 h-5" />
            Gerar Plano Personalizado
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ClinicalProtocol;
