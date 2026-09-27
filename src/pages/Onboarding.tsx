import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Settings, Search, ChevronDown, X, Check, AlertCircle } from "lucide-react";
import { breedDatabase } from "@/data/breedData";

const SYMPTOMS = [
  { id: "dermatite", icon: "🐾", title: "Dermatite e Coceiras", desc: "Coceira frequente, pele vermelha ou irritada" },
  { id: "lagrima", icon: "👁️", title: "Lágrima Ácida", desc: "Manchas escuras ao redor dos olhos" },
  { id: "apatia", icon: "😴", title: "Baixa Energia e Apatia", desc: "Letargia, pouca disposição para brincar" },
  { id: "halito", icon: "🦷", title: "Mau Hálito e Tártaro", desc: "Odor forte na boca, acúmulo de tártaro" },
  { id: "queda", icon: "✂️", title: "Queda de Pelo Excessiva", desc: "Pelagem caindo mais que o normal" },
  { id: "articular", icon: "🦴", title: "Dores Articulares", desc: "Dificuldade para pular, levantar ou subir escadas" },
];

const BODY_CONDITIONS = [
  { id: "sobrepeso", icon: "⚖️", label: "Sobrepeso / Obesidade" },
  { id: "desnutricao", icon: "🦴", label: "Desnutrição / Abaixo do peso" },
  { id: "ideal", icon: "✅", label: "Peso Ideal" },
];

const FOOD_BASE = ["Só Ração Seca", "Ração + Petiscos", "Comida Natural", "Alimentação Mista"];
const WEEK_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const ACTIVITY_LEVELS = [
  { id: "sedentario", icon: "🛋️", label: "Sedentário" },
  { id: "moderado", icon: "🏃", label: "Moderado" },
  { id: "atleta", icon: "⚡", label: "Atleta" },
];

const REPRODUCTIVE_STATUS = [
  { id: "castrado", label: "Castrado" },
  { id: "nao_castrado", label: "Não castrado" },
];

const STOOL_CONSISTENCY = [
  { id: "duras", color: "bg-amber-700", label: "Duras" },
  { id: "normais", color: "bg-emerald-500", label: "Normais" },
  { id: "pastosas", color: "bg-yellow-400", label: "Pastosas" },
  { id: "diarreia", color: "bg-red-500", label: "Diarreia" },
];

const ITCH_LEVELS = [
  { id: "nenhuma", color: "bg-emerald-500", label: "Nenhuma" },
  { id: "leve", color: "bg-yellow-400", label: "Leve" },
  { id: "moderada", color: "bg-orange-500", label: "Moderada" },
  { id: "severa", color: "bg-red-500", label: "Severa" },
];

const HEALTH_RESTRICTIONS = [
  { id: "frango", label: "Alergia a Frango" },
  { id: "bovina", label: "Alergia a Carne Bovina" },
  { id: "gastrica", label: "Sensibilidade Gástrica" },
  { id: "renal", label: "Problema Renal" },
  { id: "articular", label: "Problema Articular" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [bodyCondition, setBodyCondition] = useState<string>("");
  const [prepTime, setPrepTime] = useState<number[]>([3]);
  const [foodBase, setFoodBase] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [activity, setActivity] = useState<string>("");
  const [reproductive, setReproductive] = useState<string>("");
  const [stool, setStool] = useState<string>("");
  const [itch, setItch] = useState<string>("");
  const [healthRestrictions, setHealthRestrictions] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  const [bodyAutoDetected, setBodyAutoDetected] = useState(false);
  const [bodyManualOverride, setBodyManualOverride] = useState(false);

  const displayName = useMemo(() => dogName.trim() || "seu cão", [dogName]);
  const ctaName = useMemo(() => (dogName.trim() || "SEU CÃO").toUpperCase(), [dogName]);
  const isBreedValid = breed.trim().length > 0;

  // Auto-detecta condição corporal a partir da raça + peso informado
  const suggestedBody = useMemo(() => {
    const breedInfo = breedDatabase.find((b) => b.name === breed);
    const w = parseFloat(weight);
    if (!breedInfo || !w || isNaN(w)) return null;
    if (w < breedInfo.idealWeightMin * 0.9) return "desnutricao";
    if (w > breedInfo.idealWeightMax * 1.1) return "sobrepeso";
    return "ideal";
  }, [breed, weight]);

  useEffect(() => {
    if (suggestedBody && !bodyManualOverride) {
      setBodyCondition(suggestedBody);
      setBodyAutoDetected(true);
    }
  }, [suggestedBody, bodyManualOverride]);

  const toggle = (arr: string[], setArr: (v: string[]) => void, id: string) => {
    setArr(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  };

  const handleSubmit = () => {
    if (!isBreedValid) {
      setShowError(true);
      const el = document.getElementById("breed-field");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    navigate("/oferta");
  };

  return (
    <div className="min-h-screen bg-[#FDF8EE]">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            Montar Protocolo Nutricional
          </h1>
          <p className="text-slate-500 mt-3 text-base md:text-lg">
            Configure o sistema para a biologia do <span className="font-semibold text-slate-700">{displayName}</span>.
          </p>
        </header>

        {/* Sessão 1: Perfil Biológico */}
        <Section
          icon="🧬"
          title="Perfil Biológico"
          description="Informe os dados para o cálculo exato"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nome do Cão">
              <Input
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="Ex: Bob"
                className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-emerald-500"
              />
            </Field>
            <div id="breed-field">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Raça <span className="text-red-500">*</span>
              </label>
              <BreedPicker
                value={breed}
                onChange={(v) => {
                  setBreed(v);
                  if (v) setShowError(false);
                }}
                hasError={showError && !isBreedValid}
              />
              {showError && !isBreedValid && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Selecione uma raça ou marque "Não sei / SRD" para continuar.
                </p>
              )}
            </div>
            <Field label="Peso Atual (Kg)">
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 12"
                className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-emerald-500"
              />
            </Field>
            <Field label="Idade (Anos)">
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 4"
                className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-emerald-500"
              />
            </Field>
          </div>
        </Section>

        {/* Sessão 2: Sintomas */}
        <Section
          icon="🩺"
          title="Sintomas Observados"
          description={`Selecione o que o ${displayName} apresenta hoje`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SYMPTOMS.map((s) => {
              const active = symptoms.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggle(symptoms, setSymptoms, s.id)}
                  className={`text-left rounded-2xl border p-4 transition-all shadow-sm ${
                    active
                      ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <p className={`font-semibold ${active ? "text-emerald-700" : "text-slate-800"}`}>
                        {s.title}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Sessão 3: Condição Corporal */}
        <Section
          icon="⚖️"
          title="Condição Corporal"
          description="Sugerimos com base na raça e peso. Você pode ajustar se preferir."
        >
          {bodyCondition && bodyAutoDetected && !bodyManualOverride && (
            <div className="mb-3 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-800">
                <strong>Pré-selecionado automaticamente</strong> com base no peso ({weight} kg) e na faixa ideal da raça <strong>{breed}</strong>. Toque em outra opção se quiser alterar.
              </p>
            </div>
          )}
          {bodyManualOverride && suggestedBody && bodyCondition !== suggestedBody && (
            <div className="mb-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800">
                Nossa análise sugeria <strong>{BODY_CONDITIONS.find((b) => b.id === suggestedBody)?.label}</strong> para o peso informado. Você ajustou manualmente — manteremos sua escolha.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BODY_CONDITIONS.map((b) => {
              const active = bodyCondition === b.id;
              const isSuggested = suggestedBody === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setBodyCondition(b.id);
                    setBodyManualOverride(true);
                  }}
                  className={`relative rounded-2xl border p-4 text-center transition-all shadow-sm ${
                    active
                      ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {isSuggested && !active && (
                    <span className="absolute top-1.5 right-1.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                      Sugerido
                    </span>
                  )}
                  <div className="text-2xl mb-1">{b.icon}</div>
                  <p className={`font-medium text-sm ${active ? "text-emerald-700" : "text-slate-800"}`}>
                    {b.label}
                  </p>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Sessão 4: Tempo de Preparo */}
        <Section icon="⏱️" title="Tempo de Preparo Diário" description="Quanto tempo você tem disponível?">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-sm text-slate-500">Tempo selecionado</span>
              <span className="text-2xl font-bold text-emerald-600">
                {prepTime[0]} {prepTime[0] === 1 ? "minuto" : "minutos"}
              </span>
            </div>
            <Slider
              min={1}
              max={15}
              step={1}
              value={prepTime}
              onValueChange={setPrepTime}
              className="[&_[role=slider]]:border-emerald-500 [&_[role=slider]]:bg-white [&_.bg-primary]:bg-emerald-500 [&_.bg-secondary]:bg-slate-200"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>1 min</span>
              <span>15 min</span>
            </div>
          </div>
        </Section>

        {/* Sessão 5: Base Alimentar */}
        <Section icon="🥣" title="Base Alimentar Atual" description="Como é a rotina alimentar dele hoje?">
          <div className="flex flex-wrap gap-2">
            {FOOD_BASE.map((f) => {
              const active = foodBase === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFoodBase(f)}
                  className={`px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                    active
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Sessão 6: Dias de Reforço */}
        <Section
          icon="📅"
          title="Dias de Reforço"
          description="Em que dias tem disponibilidade para preparar o reforço?"
        >
          <div className="flex flex-wrap gap-2">
            {WEEK_DAYS.map((d) => {
              const active = ingredients.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggle(ingredients, setIngredients, d)}
                  className={`min-w-[60px] px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                    active
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Sessão 8: Rotina e Saúde */}
        <Section
          icon="🩹"
          title="Rotina e Saúde"
          description="Últimos detalhes para uma refeição perfeita."
        >
          {/* Nível de atividade */}
          <p className="text-sm font-semibold text-slate-700 mb-2">Nível de atividade</p>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {ACTIVITY_LEVELS.map((a) => {
              const active = activity === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActivity(a.id)}
                  className={`rounded-xl border p-3 text-center transition-all shadow-sm ${
                    active
                      ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="text-xl mb-1">{a.icon}</div>
                  <p className={`text-xs font-medium ${active ? "text-emerald-700" : "text-slate-700"}`}>
                    {a.label}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Status reprodutivo */}
          <p className="text-sm font-semibold text-slate-700 mb-2">Status reprodutivo</p>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {REPRODUCTIVE_STATUS.map((r) => {
              const active = reproductive === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setReproductive(r.id)}
                  className={`rounded-xl border py-3 px-4 text-sm font-medium transition-all shadow-sm ${
                    active
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* Consistência das fezes */}
          <p className="text-sm font-semibold text-slate-700 mb-2">Consistência das fezes</p>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {STOOL_CONSISTENCY.map((s) => {
              const active = stool === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStool(s.id)}
                  className={`rounded-xl border p-3 text-center transition-all shadow-sm ${
                    active
                      ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full mx-auto mb-1 ${s.color}`} />
                  <p className={`text-[11px] font-medium ${active ? "text-emerald-700" : "text-slate-700"}`}>
                    {s.label}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Nível de coceira */}
          <p className="text-sm font-semibold text-slate-700 mb-2">Nível de coceira</p>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {ITCH_LEVELS.map((i) => {
              const active = itch === i.id;
              return (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => setItch(i.id)}
                  className={`rounded-xl border p-3 text-center transition-all shadow-sm ${
                    active
                      ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full mx-auto mb-1 ${i.color}`} />
                  <p className={`text-[11px] font-medium ${active ? "text-emerald-700" : "text-slate-700"}`}>
                    {i.label}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Restrições de saúde */}
          <p className="text-sm font-semibold text-slate-700 mb-2">Restrições de saúde</p>
          <div className="space-y-2">
            {HEALTH_RESTRICTIONS.map((h) => {
              const active = healthRestrictions.includes(h.id);
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => toggle(healthRestrictions, setHealthRestrictions, h.id)}
                  className={`w-full flex items-center gap-3 rounded-xl border py-3 px-4 text-sm font-medium transition-all shadow-sm ${
                    active
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                      active ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-300"
                    }`}
                  >
                    {active && <Check className="w-3.5 h-3.5 text-white" />}
                  </span>
                  {h.label}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Bottom CTA (in-flow) */}
        <div className="mt-10 bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-base md:text-lg py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Settings className="w-5 h-5" />
            GERAR PROTOCOLO DO {ctaName}
          </button>
          {!isBreedValid && (
            <p className="mt-2 text-center text-xs text-slate-500">
              Informe a raça (ou marque "Não sei / SRD") para liberar o protocolo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Section = ({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <section className="mb-8">
    <div className="mb-4">
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h2>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
    {children}
  </section>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    {children}
  </div>
);

const BreedPicker = ({
  value,
  onChange,
  hasError = false,
}: {
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const popular = useMemo(() => breedDatabase.filter((b) => b.popular), []);
  const filtered = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return breedDatabase.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 50);
  }, [search]);
  const list = search.trim() ? filtered : popular;

  const close = () => {
    setOpen(false);
    setSearch("");
  };

  return (
    <>
      {value ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-between h-10 px-3 rounded-md bg-emerald-50 border border-emerald-500 text-slate-800 text-sm transition-all"
        >
          <span className="font-medium truncate">{value}</span>
          <X
            className="w-4 h-4 text-slate-500 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
          />
        </button>
      ) : (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`w-full flex items-center justify-between h-10 px-3 rounded-md bg-white border text-sm text-slate-400 hover:border-slate-300 transition-all ${
              hasError ? "border-red-500 ring-1 ring-red-500" : "border-slate-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Pesquisar raça... (ex: Golden, Pug)
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onChange("SRD / Não sei")}
            className="text-xs text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
          >
            Não sei a raça / SRD
          </button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-[#FDF8EE] flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b border-slate-200 bg-white">
            <button
              type="button"
              onClick={close}
              className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                placeholder="Buscar raça... (ex: Golden, Pug, SRD)"
                className="w-full py-2.5 pl-9 pr-4 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="px-4 py-2.5 border-b border-slate-200 bg-white/60">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {search.trim() ? `${filtered.length} resultado(s)` : "Raças populares"}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto bg-white">
            {list.length > 0 ? (
              list.map((b) => (
                <button
                  key={b.name}
                  type="button"
                  onClick={() => {
                    onChange(b.name);
                    close();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm border-b border-slate-100 transition-colors hover:bg-emerald-50 ${
                    value === b.name ? "bg-emerald-50" : ""
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium text-slate-800">{b.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {b.idealWeightMin}-{b.idealWeightMax}kg
                    </p>
                  </div>
                  {value === b.name && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ))
            ) : (
              <p className="px-4 py-8 text-sm text-slate-500 text-center">Nenhuma raça encontrada 😕</p>
            )}

            {!search.trim() && (
              <div className="px-4 py-3 bg-slate-50">
                <span className="text-[11px] text-slate-500">
                  💡 Digite para buscar entre todas as {breedDatabase.length} raças
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Onboarding;
