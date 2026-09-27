import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PasswordGate from "@/components/PasswordGate";
import Onboarding from "@/components/Onboarding";
import FoodPantry from "@/components/FoodPantry";
import BowlResult from "@/components/BowlResult";
import StudyArea from "@/components/StudyArea";
import ClinicalProtocol from "@/components/ClinicalProtocol";
import SettingsTab from "@/components/SettingsTab";
import RecipeLibrary from "@/components/RecipeLibrary";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { PetProfile, petArticle } from "@/types/pet";
import { Food } from "@/data/foodDatabase";
import { SymptomId } from "@/data/protocolDatabase";
import { isAuthenticated, isOnboarded, loadPetProfile, loadAllPets, getActivePetIndex, setActivePetIndex, addNewPet, calculateDailyCalories, checkNutrientExcess } from "@/lib/petEngine";
import { Calculator, BookOpen, Settings, ChefHat, AlertTriangle, ArrowRight, Stethoscope, Plus, ChevronDown, Check, BookMarked } from "lucide-react";
import CalorieExplainer from "@/components/CalorieExplainer";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import nutricodeLogo from "@/assets/nutricode-logo.png";

type AppTab = "calculator" | "recipes" | "protocol" | "study" | "settings";
type CalcView = "pantry" | "result";

const Index = () => {
  const [authed, setAuthed] = useState(() => isAuthenticated());
  const [onboarded, setOnboarded] = useState(() => isOnboarded());
  const [petProfile, setPetProfile] = useState<PetProfile | null>(() => loadPetProfile());
  const [allPets, setAllPets] = useState<PetProfile[]>(() => loadAllPets());
  const [activePetIdx, setActivePetIdx] = useState(() => getActivePetIndex());
  const [activeTab, setActiveTab] = useState<AppTab>("calculator");
  const [calcView, setCalcView] = useState<CalcView>("pantry");
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);
  const [showPetSwitcher, setShowPetSwitcher] = useState(false);
  const [addingNewPet, setAddingNewPet] = useState(false);
  const [activeSymptoms, setActiveSymptoms] = useState<SymptomId[]>([]);
  const { deferredPrompt } = usePWAInstall();

  useEffect(() => {
    const saved = localStorage.getItem("nutribooster_theme");
    if (saved === "light") document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, []);

  const toggleFood = useCallback((food: Food) => {
    setSelectedFoods((prev) =>
      prev.some((f) => f.id === food.id) ? prev.filter((f) => f.id !== food.id) : [...prev, food]
    );
  }, []);

  const nutrientWarnings = useMemo(() => checkNutrientExcess(selectedFoods), [selectedFoods]);
  const dailyCalories = useMemo(() => petProfile ? calculateDailyCalories(petProfile) : 0, [petProfile]);

  const handleOnboardingComplete = (p: PetProfile) => {
    if (addingNewPet) {
      const newIdx = addNewPet(p);
      setAllPets(loadAllPets());
      setActivePetIdx(newIdx);
      setPetProfile(p);
      setAddingNewPet(false);
      setSelectedFoods([]);
    } else {
      setPetProfile(p);
      setOnboarded(true);
      setAllPets(loadAllPets());
      setShowPWAPrompt(true);
    }
  };

  const switchPet = (index: number) => {
    setActivePetIndex(index);
    setActivePetIdx(index);
    const pets = loadAllPets();
    setPetProfile(pets[index] || null);
    setSelectedFoods([]);
    setShowPetSwitcher(false);
    setCalcView("pantry");
  };

  const startAddingPet = () => {
    setAddingNewPet(true);
    setShowPetSwitcher(false);
  };

  // Auth gate
  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />;

  // Adding new pet flow
  if (addingNewPet) {
    return <Onboarding onComplete={handleOnboardingComplete} onCancel={() => setAddingNewPet(false)} />;
  }

  // Onboarding
  if (!onboarded || !petProfile) return <Onboarding onComplete={handleOnboardingComplete} />;

  const article = petArticle(petProfile);

  const tabs = [
    { id: "calculator" as const, icon: Calculator, label: "Calcular" },
    { id: "recipes" as const, icon: BookMarked, label: "Receitas" },
    { id: "protocol" as const, icon: Stethoscope, label: "Protocolo" },
    { id: "study" as const, icon: BookOpen, label: "Guias" },
    { id: "settings" as const, icon: Settings, label: "Config" },
  ];

  const PetAvatarImg = ({ photo, emoji, name, className = "w-8 h-8" }: { photo?: string; emoji: string; name: string; className?: string }) => {
    const [broken, setBroken] = useState(false);
    if (photo && !broken) {
      return <img src={photo} alt={name} className={`${className} rounded-lg object-cover`} onError={() => setBroken(true)} />;
    }
    return <span className="text-xl">{emoji}</span>;
  };

  const petAvatar = <PetAvatarImg photo={petProfile.avatarPhoto} emoji={petProfile.avatarEmoji} name={petProfile.name} />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* PWA Install Prompt */}
      <PWAInstallPrompt show={showPWAPrompt} onClose={() => setShowPWAPrompt(false)} deferredPrompt={deferredPrompt} />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border safe-top"
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-8">
          <div className="flex items-center justify-between py-2.5">
            {/* Logo + Pet switcher */}
            <div className="flex items-center gap-2">
              <img src={nutricodeLogo} alt="Protocolo NutriCode" className="w-8 h-8 rounded-lg object-contain" />
              <button onClick={() => setShowPetSwitcher(!showPetSwitcher)} className="flex items-center gap-2 min-w-0 group">
                {petAvatar}
                <div className="min-w-0">
                  <span className="font-semibold text-foreground text-sm tracking-tight block leading-tight truncate flex items-center gap-1">
                    {petProfile.name}
                    {allPets.length > 1 && <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate block">{petProfile.breed} • {petProfile.weight}kg</span>
                </div>
              </button>
            </div>

            {/* Add pet button (header) */}
            <button onClick={startAddingPet} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors mr-1">
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Pet switcher dropdown */}
      <AnimatePresence>
        {showPetSwitcher && allPets.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="fixed top-[56px] left-0 right-0 z-50 bg-card border-b border-border shadow-lg safe-top"
          >
            <div className="max-w-5xl mx-auto px-3 py-2">
              {allPets.map((pet, i) => (
                <button key={i} onClick={() => switchPet(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${i === activePetIdx ? "bg-accent border border-primary/30" : "hover:bg-secondary"}`}>
                  <PetAvatarImg photo={pet.avatarPhoto} emoji={pet.avatarEmoji} name={pet.name} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground block truncate">{pet.name}</span>
                    <span className="text-[10px] text-muted-foreground">{pet.breed} • {pet.weight}kg</span>
                  </div>
                  {i === activePetIdx && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
              <button onClick={startAddingPet}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm text-primary hover:bg-secondary transition-all mt-1">
                <Plus className="w-4 h-4" /> Adicionar outro cão
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for pet switcher */}
      {showPetSwitcher && <div className="fixed inset-0 z-40" onClick={() => setShowPetSwitcher(false)} />}

      <main className="flex-1 max-w-5xl mx-auto w-full px-3 sm:px-8 py-6 pb-24">
        {activeTab === "calculator" ? (
          <div>
            {calcView === "pantry" ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-6">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
                    <ChefHat className="w-6 h-6 text-primary" /> Monte a Tigela
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed flex items-center gap-1.5 flex-wrap">
                    Selecione os alimentos d{article}. Necessidade diária: <strong className="text-primary">{dailyCalories} kcal</strong>
                    <CalorieExplainer petProfile={petProfile} dailyCalories={dailyCalories} />
                  </p>
                </div>

                {nutrientWarnings.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {nutrientWarnings.map((w, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-premium/5 border border-premium/20 text-sm text-foreground">
                        <AlertTriangle className="w-4 h-4 text-premium flex-shrink-0 mt-0.5" /> {w.message}
                      </div>
                    ))}
                  </div>
                )}

                <FoodPantry petProfile={petProfile} selectedFoods={selectedFoods} onToggleFood={toggleFood} activeSymptoms={activeSymptoms} />

                {selectedFoods.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-auto sm:w-full sm:max-w-5xl sm:mx-auto sm:px-8 z-30 pb-safe-nav">
                    <button onClick={() => setCalcView("result")}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base shadow-lg shadow-primary/25">
                      <Calculator className="w-5 h-5" />
                      Calcular Refeição ({selectedFoods.length} itens)
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <BowlResult petProfile={petProfile} selectedFoods={selectedFoods} onBack={() => setCalcView("pantry")} />
            )}
          </div>
        ) : activeTab === "recipes" ? (
          <RecipeLibrary petProfile={petProfile} />
        ) : activeTab === "protocol" ? (
          <ClinicalProtocol petProfile={petProfile} onSymptomsChange={setActiveSymptoms} />
        ) : activeTab === "settings" ? (
          <SettingsTab
            petProfile={petProfile}
            onUpdate={(p) => {
              setPetProfile(p);
              setAllPets(loadAllPets());
            }}
            onInstallPWA={() => setShowPWAPrompt(true)}
          />
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">📚 Aulas e Guias</h1>
              <p className="text-sm text-muted-foreground mt-1">Material didático completo para a saúde do seu pet.</p>
            </div>
            <StudyArea />
          </motion.div>
        )}
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border safe-bottom">
        <div className="max-w-5xl mx-auto flex items-center justify-around px-1 py-1.5">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[48px] ${activeTab === id ? "text-primary" : "text-muted-foreground"}`}>
              <Icon className={`w-5 h-5 ${activeTab === id ? "text-primary" : ""}`} />
              <span className="text-[9px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;
