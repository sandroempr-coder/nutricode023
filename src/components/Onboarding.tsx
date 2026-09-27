import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Camera, X } from "lucide-react";
import { PetProfile, ActivityLevel, ReproductiveStatus, HealthRestriction, HEALTH_RESTRICTION_LABELS, StoolConsistency, ItchLevel, STOOL_LABELS, ITCH_LABELS } from "@/types/pet";
import { savePetProfile, setOnboarded } from "@/lib/petEngine";
import { calculateBodyCondition, getCoatTypeForBreed, BODY_CONDITION_LABELS, COAT_TYPE_LABELS, getBreedInfo } from "@/data/breedData";
import { compressImage } from "@/lib/imageCompressor";
import BreedCombobox from "./BreedCombobox";

interface OnboardingProps {
  onComplete: (profile: PetProfile) => void;
  onCancel?: () => void;
}

const STEPS = ["Básico", "Físico", "Saúde"];

const Onboarding = ({ onComplete, onCancel }: OnboardingProps) => {
  const [step, setStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<PetProfile>({
    name: "",
    sex: "macho",
    ageYears: 1,
    ageMonths: 0,
    avatarEmoji: "🐕",
    avatarPhoto: undefined,
    weight: 10,
    bodyCondition: "ideal",
    coatType: "curto",
    breed: "",
    activityLevel: "moderado",
    healthRestrictions: [],
    reproductiveStatus: "castrado",
    stoolConsistency: "normais",
    itchLevel: "nenhuma",
  });

  const update = useCallback(<K extends keyof PetProfile>(key: K, value: PetProfile[K]) => {
    setProfile((p) => ({ ...p, [key]: value }));
  }, []);

  const handleBreedChange = useCallback((breed: string) => {
    setProfile(p => {
      const coatType = getCoatTypeForBreed(breed);
      const bodyCondition = calculateBodyCondition(breed, p.weight, p.ageYears, p.ageMonths);
      return { ...p, breed, coatType, bodyCondition };
    });
  }, []);

  const handleWeightChange = useCallback((weight: number) => {
    setProfile(p => {
      const bodyCondition = calculateBodyCondition(p.breed, weight, p.ageYears, p.ageMonths);
      return { ...p, weight, bodyCondition };
    });
  }, []);

  const handleAgeChange = useCallback((ageYears: number, ageMonths: number) => {
    setProfile(p => {
      const bodyCondition = calculateBodyCondition(p.breed, p.weight, ageYears, ageMonths);
      return { ...p, ageYears, ageMonths, bodyCondition };
    });
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      update("avatarPhoto", compressed);
    } catch (err) {
      console.error("Error compressing image:", err);
    }
  };

  const toggleRestriction = (r: HealthRestriction) => {
    setProfile((p) => ({
      ...p,
      healthRestrictions: p.healthRestrictions.includes(r)
        ? p.healthRestrictions.filter((x) => x !== r)
        : [...p.healthRestrictions, r],
    }));
  };

  const canNext = step === 0
    ? profile.name.trim().length > 0 && profile.breed.length > 0
    : step === 1
    ? profile.weight > 0
    : true;

  const handleFinish = () => {
    if (!onCancel) {
      savePetProfile(profile);
      setOnboarded();
    }
    onComplete(profile);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => { setDirection(1); setStep((s) => s + 1); };
  const goBack = () => { setDirection(-1); setStep((s) => s - 1); };

  const breedInfo = getBreedInfo(profile.breed);
  const bodyCondInfo = BODY_CONDITION_LABELS[profile.bodyCondition];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "bg-primary" : "bg-border"}`} />
              <p className={`text-[11px] mt-1.5 font-medium transition-colors ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 sm:p-8 relative overflow-hidden min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div key="step0" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h2 className="text-xl font-bold text-foreground tracking-tight mb-1">Vamos conhecer seu pet! 🐾</h2>
                <p className="text-sm text-muted-foreground mb-5">Informações básicas para personalizar tudo.</p>

                {/* Photo upload */}
                <div className="flex items-center gap-4 mb-4">
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-20 h-20 rounded-2xl border-2 border-dashed border-primary/40 bg-secondary flex items-center justify-center overflow-hidden hover:border-primary transition-colors flex-shrink-0"
                  >
                    {profile.avatarPhoto ? (
                      <>
                        <img src={profile.avatarPhoto} alt="Pet" className="w-full h-full object-cover" />
                        <button
                          onClick={(e) => { e.stopPropagation(); update("avatarPhoto", undefined); }}
                          className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-destructive flex items-center justify-center"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <Camera className="w-6 h-6 text-primary/60" />
                        <span className="text-[9px] text-muted-foreground">Foto</span>
                      </div>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1.5">Ou escolha um avatar:</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {["🐕", "🐶", "🐕‍🦺", "🦮", "🐩", "🐾"].map((e) => (
                        <button key={e} onClick={() => update("avatarEmoji", e)}
                          className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border-2 transition-all ${!profile.avatarPhoto && profile.avatarEmoji === e ? "border-primary bg-accent scale-110" : "border-border bg-secondary hover:border-primary/40"}`}>
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name + Sex */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Nome do pet</label>
                    <input value={profile.name} onChange={(e) => update("name", e.target.value)} maxLength={30}
                      placeholder="Ex: Thor, Luna, Bob..."
                      className="w-full py-3 px-4 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground/50" />
                  </div>
                  <div className="w-28 flex-shrink-0">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Sexo</label>
                    <div className="grid grid-cols-2 gap-1.5 h-[46px]">
                      <button onClick={() => update("sex", "macho")}
                        className={`rounded-xl text-xs font-medium border-2 transition-all ${profile.sex === "macho" ? "border-primary bg-accent text-foreground" : "border-border bg-secondary text-muted-foreground"}`}>
                        ♂ Macho
                      </button>
                      <button onClick={() => update("sex", "femea")}
                        className={`rounded-xl text-xs font-medium border-2 transition-all ${profile.sex === "femea" ? "border-primary bg-accent text-foreground" : "border-border bg-secondary text-muted-foreground"}`}>
                        ♀ Fêmea
                      </button>
                    </div>
                  </div>
                </div>

                {/* Age */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Idade (anos)</label>
                    <input type="number" min={0} max={25} value={profile.ageYears} onChange={(e) => handleAgeChange(parseInt(e.target.value) || 0, profile.ageMonths)}
                      className="w-full py-3 px-4 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Meses</label>
                    <input type="number" min={0} max={11} value={profile.ageMonths} onChange={(e) => handleAgeChange(profile.ageYears, parseInt(e.target.value) || 0)}
                      className="w-full py-3 px-4 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
                  </div>
                </div>

                {/* Breed */}
                <BreedCombobox value={profile.breed} onChange={handleBreedChange} />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h2 className="text-xl font-bold text-foreground tracking-tight mb-1">Perfil físico 💪</h2>
                <p className="text-sm text-muted-foreground mb-6">Peso para cálculos precisos. Condição corporal e tipo de pelo são automáticos.</p>

                {/* Weight */}
                <label className="block text-sm font-medium text-foreground mb-1.5">Peso atual (kg)</label>
                <input type="number" min={0.5} max={120} step={0.1} value={profile.weight} onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 0)}
                  className="w-full py-3 px-4 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all mb-5" />

                {/* Auto body condition display */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    Condição corporal
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">Automático</span>
                  </label>
                  <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-primary bg-accent">
                    <span className="text-2xl">{bodyCondInfo.emoji}</span>
                    <div>
                      <span className="text-sm font-semibold text-foreground block">{bodyCondInfo.label}</span>
                      {breedInfo && (
                        <span className="text-[11px] text-muted-foreground">
                          Peso ideal para {profile.breed}: {breedInfo.idealWeightMin}-{breedInfo.idealWeightMax}kg
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Auto coat type display */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    Tipo de pelo
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">Automático</span>
                  </label>
                  <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-primary bg-accent">
                    <span className="text-2xl">✨</span>
                    <div>
                      <span className="text-sm font-semibold text-foreground block">Pelo {COAT_TYPE_LABELS[profile.coatType]}</span>
                      <span className="text-[11px] text-muted-foreground">Baseado nas características da raça {profile.breed}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h2 className="text-xl font-bold text-foreground tracking-tight mb-1">Rotina e saúde 🩺</h2>
                <p className="text-sm text-muted-foreground mb-5">Últimos detalhes para uma refeição perfeita.</p>

                {/* Activity */}
                <label className="block text-sm font-medium text-foreground mb-2">Nível de atividade</label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {([["sedentario", "Sedentário", "🛋️"], ["moderado", "Moderado", "🚶"], ["atleta", "Atleta", "🏃"]] as const).map(([val, label, icon]) => (
                    <button key={val} onClick={() => update("activityLevel", val as ActivityLevel)}
                      className={`py-2.5 px-2 rounded-xl border-2 text-center transition-all text-xs ${profile.activityLevel === val ? "border-primary bg-accent text-foreground font-medium" : "border-border bg-secondary text-muted-foreground hover:border-primary/40"}`}>
                      <span className="text-base block mb-0.5">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Reproductive */}
                <label className="block text-sm font-medium text-foreground mb-2">Status reprodutivo</label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {([["castrado", profile.sex === "macho" ? "Castrado" : "Castrada"], ["inteiro", profile.sex === "macho" ? "Não castrado" : "Não castrada"]] as const).map(([val, label]) => (
                    <button key={val} onClick={() => update("reproductiveStatus", val as ReproductiveStatus)}
                      className={`py-2.5 px-3 rounded-xl border-2 text-center transition-all text-xs ${profile.reproductiveStatus === val ? "border-primary bg-accent text-foreground font-medium" : "border-border bg-secondary text-muted-foreground hover:border-primary/40"}`}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Stool Consistency */}
                <label className="block text-sm font-medium text-foreground mb-2">Consistência das fezes</label>
                <div className="grid grid-cols-4 gap-1.5 mb-4">
                  {(Object.entries(STOOL_LABELS) as [StoolConsistency, { label: string; emoji: string }][]).map(([key, { label, emoji }]) => (
                    <button key={key} onClick={() => update("stoolConsistency", key)}
                      className={`py-2.5 px-1 rounded-xl border-2 text-center transition-all text-[11px] ${profile.stoolConsistency === key ? "border-primary bg-accent text-foreground font-medium" : "border-border bg-secondary text-muted-foreground hover:border-primary/40"}`}>
                      <span className="text-base block mb-0.5">{emoji}</span>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Itch Level */}
                <label className="block text-sm font-medium text-foreground mb-2">Nível de coceira</label>
                <div className="grid grid-cols-4 gap-1.5 mb-4">
                  {(Object.entries(ITCH_LABELS) as [ItchLevel, { label: string; emoji: string }][]).map(([key, { label, emoji }]) => (
                    <button key={key} onClick={() => update("itchLevel", key)}
                      className={`py-2.5 px-1 rounded-xl border-2 text-center transition-all text-[11px] ${profile.itchLevel === key ? "border-primary bg-accent text-foreground font-medium" : "border-border bg-secondary text-muted-foreground hover:border-primary/40"}`}>
                      <span className="text-base block mb-0.5">{emoji}</span>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Health restrictions */}
                <label className="block text-sm font-medium text-foreground mb-2">Restrições de saúde</label>
                <div className="space-y-2">
                  {(Object.entries(HEALTH_RESTRICTION_LABELS) as [HealthRestriction, string][]).map(([key, label]) => (
                    <button key={key} onClick={() => toggleRestriction(key)}
                      className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl border-2 text-left text-sm transition-all ${profile.healthRestrictions.includes(key) ? "border-primary bg-accent text-foreground" : "border-border bg-secondary text-muted-foreground hover:border-primary/40"}`}>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${profile.healthRestrictions.includes(key) ? "border-primary bg-primary" : "border-border"}`}>
                        {profile.healthRestrictions.includes(key) && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 0 ? (
            <button onClick={goBack} className="btn-ghost flex items-center gap-2 flex-1">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          ) : onCancel ? (
            <button onClick={onCancel} className="btn-ghost flex items-center gap-2 flex-1">
              <ArrowLeft className="w-4 h-4" /> Cancelar
            </button>
          ) : null}
          {step < 2 ? (
            <button onClick={goNext} disabled={!canNext}
              className="btn-primary flex items-center justify-center gap-2 flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
              Próximo <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleFinish}
              className="btn-primary flex items-center justify-center gap-2 flex-1">
              Começar! 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
