import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, ClipboardCopy, Check } from "lucide-react";

const REFERRAL_MESSAGE = `Oi! Descobri um App inteligente que cruza o peso e a raça do cachorro e calcula as gramas exatas de alimentos naturais pra colocar na ração. Isso serve pra curar alergias, lágrima ácida e aumentar a vida deles (sem precisar cozinhar). Tô usando e é surreal o resultado. O acesso vitalício custa só o valor de um lanche (R$ 47,00). Dá uma olhada, vale muito a pena salvar a saúde deles: https://sistemanutricaopet.site/`;

const steps = [
  "Recomende o Kibble Boosting para um amigo(a).",
  "Peça o e-mail que ele usou na compra ou o print da tela de aprovação.",
  "Chame nosso Suporte VIP e envie a prova junto com a sua chave Pix. O valor cai em até 24 horas!",
];

const WHATSAPP_URL =
  "https://wa.me/5581988857283?text=Oi!%20Fiz%20uma%20indicação%20do%20Kibble%20Boosting%20e%20vim%20resgatar%20meu%20Pix!";

const ReferralBanner = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(REFERRAL_MESSAGE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl border-2 border-yellow-500/30 bg-gradient-to-br from-emerald-950/40 via-card to-yellow-950/20 p-5 sm:p-7 mb-8 relative overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none" />

      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl leading-none select-none">💸</span>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
            Ajude um AUmigo e Ganhe R$&nbsp;20 no Pix!
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
            Você adquiriu o Kibble Boosting por{" "}
            <span className="font-semibold text-primary">R$&nbsp;47,00</span>.
            Indique nosso sistema e receba{" "}
            <span className="font-semibold text-primary">R$&nbsp;20,00</span> direto no seu PIX por cada indicação salva!
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        A cada amigo que você indicar e que adquirir o acesso ao Sistema, nós fazemos um Pix de{" "}
        <strong className="text-foreground">R$&nbsp;20,00</strong> direto na sua conta.{" "}
        <strong className="text-foreground">Sem limites!</strong> Indicou 5 amigos? Ganhou R$&nbsp;100.
      </p>

      <ol className="space-y-2.5 mb-6">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{step}</span>
          </li>
        ))}
      </ol>

      {/* Copy message section */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-foreground mb-2">
          📩 Copie a mensagem pronta abaixo e mande no WhatsApp:
        </p>
        <div className="rounded-xl border border-border bg-muted/50 p-4 text-xs sm:text-sm text-muted-foreground leading-relaxed select-all">
          {REFERRAL_MESSAGE}
        </div>
        <button
          onClick={handleCopy}
          className={`mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-muted hover:bg-muted/80 text-foreground border border-border"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> COPIADO!
            </>
          ) : (
            <>
              <ClipboardCopy className="w-4 h-4" /> 📋 COPIAR MENSAGEM
            </>
          )}
        </button>
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#25D366] hover:bg-[#1ebe5a] transition-colors shadow-lg shadow-emerald-500/20"
      >
        🟢 RESGATAR MEUS R$ 20 NO SUPORTE
        <ExternalLink className="w-4 h-4" />
      </a>
    </motion.div>
  );
};

export default ReferralBanner;
