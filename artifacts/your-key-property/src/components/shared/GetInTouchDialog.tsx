import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { useCreateLead } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/language";

interface GetInTouchDialogProps {
  children: ReactNode;
}

export function GetInTouchDialog({ children }: GetInTouchDialogProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [optIn, setOptIn] = useState(false);

  const createLead = useCreateLead({
    mutation: {
      onSuccess: () => {
        toast.success("Thank you. Our team will be in touch shortly.");
        setName("");
        setEmail("");
        setPhone("");
        setOptIn(false);
        setOpen(false);
      },
      onError: (e) =>
        toast.error(e.message || "Could not send your request. Please try again."),
    },
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    createLead.mutate({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: `+971 ${phone.trim()}`,
        message: optIn ? "Opted in to news and offers." : undefined,
        source: "get-in-touch",
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white text-[#0A1628] border-none rounded-xl p-0 max-w-lg [&>button]:hidden">
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-wide text-[#0A1628]">
              {t("git.title")}
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-[#0A1628]/60 hover:text-[#0A1628] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest mb-2">
                {t("git.fullName")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("git.fullNamePlaceholder")}
                className="w-full border border-secondary/70 px-4 py-3 font-mono text-sm outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest mb-2">
                {t("git.email")} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("git.emailPlaceholder")}
                className="w-full border border-[#0A1628]/20 px-4 py-3 font-mono text-sm outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest mb-2">
                {t("git.phone")} <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <div className="w-24 border border-[#0A1628]/20 px-4 py-3 font-mono text-sm text-[#0A1628]/70 bg-[#0A1628]/5">
                  +971
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("git.phonePlaceholder")}
                  className="flex-1 border border-[#0A1628]/20 px-4 py-3 font-mono text-sm outline-none focus:border-secondary"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => setOptIn(e.target.checked)}
                className="w-4 h-4 accent-[#0A1628]"
              />
              <span className="text-sm font-mono text-[#0A1628]/80">{t("git.optIn")}</span>
            </label>

            <p className="text-xs font-mono text-[#0A1628]/50 leading-relaxed">{t("git.privacy")}</p>

            <Button
              type="submit"
              disabled={createLead.isPending}
              className="w-full bg-[#0A1628] hover:bg-[#0A1628]/90 text-white rounded-xl py-6 font-mono uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {createLead.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {createLead.isPending ? t("git.sending") : t("git.submit")}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
