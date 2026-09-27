import { motion, AnimatePresence } from "framer-motion";
import { Download, Share, Plus, X, Smartphone, ArrowDown } from "lucide-react";

interface PWAInstallPromptProps {
  show: boolean;
  onClose: () => void;
  onInstall?: () => void;
  deferredPrompt?: any;
}

const PWAInstallPrompt = ({ show, onClose, onInstall, deferredPrompt }: PWAInstallPromptProps) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") {
        onClose();
      }
    } else {
      onInstall?.();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="bg-card rounded-2xl border border-border w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 pb-0 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Instalar Protocolo NutriCode</h3>
                  <p className="text-xs text-muted-foreground">Acesse rapidamente da tela inicial</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Benefits */}
              <div className="space-y-2.5">
                {[
                  { icon: "⚡", text: "Abre instantaneamente como um app nativo" },
                  { icon: "📱", text: "Ícone na tela inicial do seu celular" },
                  { icon: "🔔", text: "Experiência em tela cheia sem barra do navegador" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="text-lg">{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>

              {/* Install instructions based on platform */}
              {deferredPrompt ? (
                <button onClick={handleInstall}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                  <Download className="w-5 h-5" /> Instalar Agora
                </button>
              ) : isIOS ? (
                <div className="bg-secondary rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold text-foreground">Como instalar no iPhone/iPad:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <span>Toque no botão <Share className="w-4 h-4 inline text-primary" /> <strong>Compartilhar</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <span>Role e toque em <Plus className="w-4 h-4 inline text-primary" /> <strong>Adicionar à Tela de Início</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <span>Toque em <strong>Adicionar</strong></span>
                    </div>
                  </div>
                  <div className="flex justify-center pt-1">
                    <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
                  </div>
                </div>
              ) : isAndroid ? (
                <div className="bg-secondary rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold text-foreground">Como instalar no Android:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <span>Toque no menu <strong>⋮</strong> do navegador</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <span>Toque em <strong>"Adicionar à tela inicial"</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <span>Confirme tocando em <strong>Adicionar</strong></span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-secondary rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">Abra este site no navegador do seu celular para instalar como app.</p>
                </div>
              )}
            </div>

            {/* Skip */}
            <div className="px-5 pb-5">
              <button onClick={onClose} className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                Pular por agora
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
