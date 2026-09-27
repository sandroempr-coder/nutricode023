import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Save, Moon, Sun, Download, Camera, X } from "lucide-react";
import { PetProfile, ActivityLevel, ReproductiveStatus, HealthRestriction, HEALTH_RESTRICTION_LABELS, PetSex, StoolConsistency, ItchLevel, STOOL_LABELS, ITCH_LABELS } from "@/types/pet";
import { savePetProfile } from "@/lib/petEngine";
import { calculateBodyCondition, getCoatTypeForBreed, BODY_CONDITION_LABELS, COAT_TYPE_LABELS, getBreedInfo } from "@/data/breedData";
import { compressImage } from "@/lib/imageCompressor";
import BreedCombobox from "./BreedCombobox";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface SettingsTabProps {
  petProfile: PetProfile;
  onUpdate: (profile: PetProfile) => void;
  onInstallPWA: () => void;
}

const SettingsTab = ({ petProfile, onUpdate, onInstallPWA }: SettingsTabProps) => {
  const [profile, setProfile] = useState<PetProfile>({
    ...petProfile,
    stoolConsistency: petProfile.stoolConsistency || "normais",
    itchLevel: petProfile.itchLevel || "nenhuma",
  });
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("nutribooster_theme", next ? "dark" : "light");
  };

  const handleSave = () => {
    savePetProfile(profile);
    onUpdate(profile);
    toast.success("Perfil atualizado com sucesso! 🐾");
  };

  const breedInfo = getBreedInfo(profile.breed);
  const bodyCondInfo = BODY_CONDITION_LABELS[profile.bodyCondition];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">⚙️ Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Atualize os dados do seu pet ou mude o tema.</p>
      </div>

      {/* Theme + PWA */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={toggleTheme}
          className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all">
          {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
          <div className="text-left">
            <span className="text-sm font-medium text-foreground block">{isDark ? "Modo Claro" : "Modo Escuro"}</span>
            <span className="text-[11px] text-muted-foreground">Alternar tema</span>
          </div>
        </button>
        <button onClick={onInstallPWA}
          className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all">
          <Download className="w-5 h-5 text-primary" />
          <div className="text-left">
            <span className="text-sm font-medium text-foreground block">Instalar App</span>
            <span className="text-[11px] text-muted-foreground">Tela inicial</span>
          </div>
        </button>
      </div>

      {/* Pet profile edit */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Dados do Pet</h3>

        {/* Photo upload */}
        <div className="flex items-center gap-4">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="relative w-16 h-16 rounded-2xl border-2 border-dashed border-primary/40 bg-secondary flex items-center justify-center overflow-hidden hover:border-primary transition-colors flex-shrink-0"
          >
            {profile.avatarPhoto ? (
              <>
                <img src={profile.avatarPhoto} alt="Pet" className="w-full h-full object-cover" />
                <button
                  onClick={(e) => { e.stopPropagation(); update("avatarPhoto", undefined); }}
                  className="absolute top-0 right-0 w-4 h-4 rounded-full bg-destructive flex items-center justify-center"
                >
                  <X className="w-2.5 h-2.5 text-white" />
                </button>
              </>
            ) : (
              <Camera className="w-5 h-5 text-primary/60" />
            )}
          </button>
          <div className="flex gap-1.5 flex-wrap flex-1">
            {["🐕", "🐶", "🐕‍🦺", "🦮", "🐩", "🐾"].map((e) => (
              <button key={e} onClick={() => update("avatarEmoji", e)}
                className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border-2 transition-all ${!profile.avatarPhoto && profile.avatarEmoji === e ? "border-primary bg-accent" : "border-border bg-secondary"}`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Name + Sex */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1">Nome</label>
            <input value={profile.name} onChange={(e) => update("name", e.target.value)} maxLength={30}
              className="w-full py-2.5 px-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
          </div>
          <div className="w-28 flex-shrink-0">
            <label className="block text-xs font-medium text-muted-foreground mb-1">Sexo</label>
            <div className="grid grid-cols-2 gap-1 h-[42px]">
              <button onClick={() => update("sex", "macho" as PetSex)}
                className={`rounded-lg text-xs font-medium border-2 transition-all ${profile.sex === "macho" ? "border-primary bg-accent text-foreground" : "border-border bg-secondary text-muted-foreground"}`}>
                ♂
              </button>
              <button onClick={() => update("sex", "femea" as PetSex)}
                className={`rounded-lg text-xs font-medium border-2 transition-all ${profile.sex === "femea" ? "border-primary bg-accent text-foreground" : "border-border bg-secondary text-muted-foreground"}`}>
                ♀
              </button>
            </div>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Peso (kg)</label>
          <input type="number" min={0.5} max={120} step={0.1} value={profile.weight}
            onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 0)}
            className="w-full py-2.5 px-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
        </div>

        {/* Body condition display */}
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/50">
          <span className="text-xl">{bodyCondInfo.emoji}</span>
          <div>
            <span className="text-xs font-semibold text-foreground">{bodyCondInfo.label}</span>
            {breedInfo && <span className="text-[10px] text-muted-foreground block">Ideal: {breedInfo.idealWeightMin}-{breedInfo.idealWeightMax}kg</span>}
          </div>
        </div>

        {/* Age */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1">Anos</label>
            <input type="number" min={0} max={25} value={profile.ageYears}
              onChange={(e) => {
                const y = parseInt(e.target.value) || 0;
                setProfile(p => ({ ...p, ageYears: y, bodyCondition: calculateBodyCondition(p.breed, p.weight, y, p.ageMonths) }));
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1">Meses</label>
            <input type="number" min={0} max={11} value={profile.ageMonths}
              onChange={(e) => {
                const m = parseInt(e.target.value) || 0;
                setProfile(p => ({ ...p, ageMonths: m, bodyCondition: calculateBodyCondition(p.breed, p.weight, p.ageYears, m) }));
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
          </div>
        </div>

        {/* Breed */}
        <BreedCombobox value={profile.breed} onChange={handleBreedChange} />

        {/* Activity */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Atividade</label>
          <div className="grid grid-cols-3 gap-2">
            {([["sedentario", "Sedentário", "🛋️"], ["moderado", "Moderado", "🚶"], ["atleta", "Atleta", "🏃"]] as const).map(([val, label, icon]) => (
              <button key={val} onClick={() => update("activityLevel", val as ActivityLevel)}
                className={`py-2.5 px-2 rounded-xl border-2 text-center transition-all text-xs ${profile.activityLevel === val ? "border-primary bg-accent text-foreground font-medium" : "border-border bg-secondary text-muted-foreground"}`}>
                <span className="text-base block">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Reproductive */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Status reprodutivo</label>
          <div className="grid grid-cols-2 gap-2">
            {([["castrado", profile.sex === "macho" ? "Castrado" : "Castrada"], ["inteiro", profile.sex === "macho" ? "Não castrado" : "Não castrada"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => update("reproductiveStatus", val as ReproductiveStatus)}
                className={`py-2.5 px-3 rounded-xl border-2 text-center transition-all text-xs ${profile.reproductiveStatus === val ? "border-primary bg-accent text-foreground font-medium" : "border-border bg-secondary text-muted-foreground"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Stool Consistency */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Consistência das fezes</label>
          <div className="grid grid-cols-4 gap-1.5">
            {(Object.entries(STOOL_LABELS) as [StoolConsistency, { label: string; emoji: string }][]).map(([key, { label, emoji }]) => (
              <button key={key} onClick={() => update("stoolConsistency", key)}
                className={`py-2 px-1 rounded-xl border-2 text-center transition-all text-[10px] ${profile.stoolConsistency === key ? "border-primary bg-accent text-foreground font-medium" : "border-border bg-secondary text-muted-foreground"}`}>
                <span className="text-sm block">{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Itch Level */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Nível de coceira</label>
          <div className="grid grid-cols-4 gap-1.5">
            {(Object.entries(ITCH_LABELS) as [ItchLevel, { label: string; emoji: string }][]).map(([key, { label, emoji }]) => (
              <button key={key} onClick={() => update("itchLevel", key)}
                className={`py-2 px-1 rounded-xl border-2 text-center transition-all text-[10px] ${profile.itchLevel === key ? "border-primary bg-accent text-foreground font-medium" : "border-border bg-secondary text-muted-foreground"}`}>
                <span className="text-sm block">{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Health */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Restrições de saúde</label>
          <div className="space-y-1.5">
            {(Object.entries(HEALTH_RESTRICTION_LABELS) as [HealthRestriction, string][]).map(([key, label]) => (
              <button key={key} onClick={() => toggleRestriction(key)}
                className={`w-full flex items-center gap-2.5 py-2.5 px-3 rounded-xl border-2 text-left text-xs transition-all ${profile.healthRestrictions.includes(key) ? "border-primary bg-accent text-foreground" : "border-border bg-secondary text-muted-foreground"}`}>
                <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors flex-shrink-0 ${profile.healthRestrictions.includes(key) ? "bg-primary" : "border border-border"}`}>
                  {profile.healthRestrictions.includes(key) && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                </div>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save */}
      <button onClick={handleSave}
        className="btn-primary w-full flex items-center justify-center gap-2 mt-5 py-3.5">
        <Save className="w-4 h-4" />
        Salvar Alterações
      </button>
    </motion.div>
  );
};

export default SettingsTab;
