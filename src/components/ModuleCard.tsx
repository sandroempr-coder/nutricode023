import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle2, Play, ChevronDown, Video } from "lucide-react";
import type { Module } from "@/data/membraliaData";

interface ModuleCardProps {
  module: Module;
  index: number;
}

const ModuleCard = ({ module, index }: ModuleCardProps) => {
  const [headline, ...rest] = module.description.split("\n");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="card-module group"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
        <img
          src={module.image}
          alt={module.subtitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-card/90 backdrop-blur-sm text-foreground border border-border/40">
            {module.title}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge-unlocked">
            <CheckCircle2 className="w-3 h-3" />
            Liberado
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="font-semibold text-foreground text-[15px] leading-snug tracking-tight">
          {headline}
        </h3>
        <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed" style={{ lineHeight: '1.6' }}>
          {rest.join(" ")}
        </p>

        <a
          href={module.downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-outline w-full flex items-center justify-center gap-2 mt-5"
        >
          <Download className="w-4 h-4" />
          Acessar Material
        </a>

        {/* Videos Section */}
        {module.videos.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-secondary/60 border border-border/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4 text-primary" />
                Vídeos Recomendados ({module.videos.length})
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="mt-2 space-y-0.5">
                    {module.videos.map((video, i) => (
                      <li key={i}>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors group/video"
                        >
                          <Play className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary opacity-70 group-hover/video:opacity-100" />
                          <span className="leading-snug">{video.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ModuleCard;