import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, Star, X, ChevronDown } from "lucide-react";
import { breedDatabase, BreedInfo } from "@/data/breedData";

interface BreedComboboxProps {
  value: string;
  onChange: (breed: string) => void;
}

const SIZE_LABELS: Record<string, string> = {
  mini: "Mini", pequeno: "Pequeno", medio: "Médio", grande: "Grande", gigante: "Gigante",
};

const SIZE_EMOJI: Record<string, string> = {
  mini: "🐾", pequeno: "🐕", medio: "🐕", grande: "🦮", gigante: "🐕‍🦺",
};

const SIZE_COLORS: Record<string, string> = {
  mini: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  pequeno: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  medio: "bg-primary/10 text-primary",
  grande: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  gigante: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const BreedCombobox = ({ value, onChange }: BreedComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const popularBreeds = useMemo(() => breedDatabase.filter(b => b.popular), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return breedDatabase.filter(b => b.name.toLowerCase().includes(q)).slice(0, 30);
  }, [search]);

  const selectedBreed = useMemo(() => breedDatabase.find(b => b.name === value), [value]);

  const handleSelect = (breed: BreedInfo) => {
    onChange(breed.name);
    setSearch("");
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearch("");
    setOpen(true);
  };

  const showList = open;

  const displayBreeds = search.trim() ? filtered : popularBreeds;

  const BreedRow = ({ breed }: { breed: BreedInfo }) => (
    <button
      onClick={() => handleSelect(breed)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-colors hover:bg-accent active:bg-accent/80 border-b border-border/50 last:border-b-0 ${value === breed.name ? "bg-accent" : ""}`}
    >
      <span className="text-xl flex-shrink-0">{SIZE_EMOJI[breed.size]}</span>
      <div className="flex-1 text-left min-w-0">
        <span className="font-medium text-foreground block truncate">{breed.name}</span>
        <span className="text-[11px] text-muted-foreground">{breed.idealWeightMin}-{breed.idealWeightMax}kg</span>
      </div>
      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${SIZE_COLORS[breed.size]}`}>
        {SIZE_LABELS[breed.size]}
      </span>
      {value === breed.name && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
    </button>
  );

  // Full-screen modal approach for mobile
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Raça</label>

        {value && !open ? (
          <button
            onClick={() => setOpen(true)}
            className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-accent border-2 border-primary text-foreground text-sm transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {selectedBreed && <span className="text-lg">{SIZE_EMOJI[selectedBreed.size]}</span>}
              <span className="font-medium truncate">{value}</span>
              {selectedBreed && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${SIZE_COLORS[selectedBreed.size]}`}>
                  {SIZE_LABELS[selectedBreed.size]}
                </span>
              )}
            </div>
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground flex-shrink-0" onClick={handleClear} />
          </button>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-secondary border border-border text-sm text-muted-foreground/50 hover:border-primary/40 transition-all"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Pesquisar raça... (ex: Golden, Pug, SRD)</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Full-screen modal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            {/* Modal header */}
            <div className="flex items-center gap-3 p-4 border-b border-border safe-top">
              <button onClick={() => { setOpen(false); setSearch(""); }}
                className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  placeholder="Buscar raça... (ex: Golden, Pug, SRD)"
                  className="w-full py-2.5 pl-9 pr-4 rounded-xl bg-secondary border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            {/* Section label */}
            <div className="px-4 py-2.5 border-b border-border bg-secondary/50">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                {search.trim() ? (
                  <>{filtered.length} resultado(s)</>
                ) : (
                  <><Star className="w-3 h-3 text-primary" /> Raças Populares</>
                )}
              </span>
            </div>

            {/* Breed list - full scrollable area */}
            <div className="flex-1 overflow-y-auto safe-bottom">
              {displayBreeds.length > 0 ? (
                displayBreeds.map((breed) => (
                  <BreedRow key={breed.name} breed={breed} />
                ))
              ) : (
                <p className="px-4 py-8 text-sm text-muted-foreground text-center">Nenhuma raça encontrada 😕</p>
              )}

              {!search.trim() && (
                <div className="px-4 py-3 bg-secondary/50">
                  <span className="text-[11px] text-muted-foreground">💡 Digite para buscar entre todas as {breedDatabase.length} raças</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BreedCombobox;
