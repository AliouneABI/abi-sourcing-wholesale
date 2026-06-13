import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Globe } from "lucide-react";
import { toast } from "sonner";

/**
 * A-B-I Sourcing Landing Page
 * 
 * Design Philosophy: Minimalist All-White with premium typography
 * - Clean, spacious layout with strategic use of whitespace
 * - High contrast for accessibility (WCAG AA compliant)
 * - Smooth micro-interactions and responsive design
 * - Bilingual support (Swahili/English)
 */

type Language = "sw" | "en";
type FormStep = "main" | "oil" | "import";

const translations = {
  sw: {
    title: "A-B-I",
    subtitle: "International Sourcing & Local Distribution",
    contact: "contact@a-b-i.fr | WhatsApp: +33 7 73 72 81 40",
    welcome: "Habari! Karibu A-B-I.",
    selectOption: "Chagua chaguo lako tafadhali:",
    
    // Option 1: Oil
    opt1Title: "🛢️ MAFUTA YA ALIZETI",
    opt1Subtitle: "Zeti Sunflower Oil 1L",
    opt1Price1: "2,000+ Pcs ➔ 6,500 TZS",
    opt1Price2: "1,000+ Pcs ➔ 6,800 TZS",
    opt1Price3: "500+ Pcs (MOQ) ➔ 7,000 TZS (Free Delivery)",
    
    // Option 2: Import
    opt2Title: "📦 IMPORT GROUPAGE PRIVÉ",
    opt2Subtitle: "Conteneur / Semi-conteneur",
    opt2Desc: "Nusu kontena kwa bei bora zaidi ya soko! Pokea bei hapa.",
    opt2Brands: "Jadida • Nutella • Kinder • Monster Energy • Redbull",
    
    // Form 1: Oil
    form1Header: "Zeti Sunflower Oil 1L",
    form1Sub: "Weka taarifa zako ili kukamilisha agizo:",
    labelName: "Jina lako (Jina kamili)",
    labelQty: "Idadi (Kiwango cha chini: 500 Pcs)",
    placeholderName: "Mfano: John Doe",
    placeholderQty: "Min: 500",
    submitOil: "Kamilisha Agizo kwenye WhatsApp ➔",
    
    // Form 2: Import
    form2Header: "Nusu Kontena / Semi-Container",
    form2Sub: "Jaza fomu hii ili kupokea orodha ya bei:",
    labelFullName: "Jina na Ukoo (Jina kamili)",
    labelTIN: "Namba ya TIN (Numéro Fiscal)",
    labelPhone: "Namba ya Simu",
    labelEmail: "Barua Pepe (Email)",
    placeholderFullName: "Mfano: Alioune M'Baye",
    placeholderTIN: "Mfano: 123-456-789",
    placeholderPhone: "Mfano: 0773630492",
    placeholderEmail: "Mfano: contact@a-b-i.fr",
    submitImport: "Pokea Orodha ya Bei kwenye WhatsApp ➔",
    
    // Common
    back: "← Rudi nyuma",
    errorFill: "Tafadhali jaza nafasi zote",
    errorEmail: "Tafadhali ingiza barua pepe sahihi",
    successOil: "Agizo lako limetumwa! Unakuja kwenye WhatsApp...",
    successImport: "Ombi lako limetumwa! Unakuja kwenye WhatsApp...",
  },
  en: {
    title: "A-B-I",
    subtitle: "International Sourcing & Local Distribution",
    contact: "contact@a-b-i.fr | WhatsApp: +33 7 73 72 81 40",
    welcome: "Hello! Welcome to A-B-I.",
    selectOption: "Please select your option:",
    
    // Option 1: Oil
    opt1Title: "🛢️ SUNFLOWER OIL",
    opt1Subtitle: "Zeti Sunflower Oil 1L",
    opt1Price1: "2,000+ Pcs ➔ 6,500 TZS",
    opt1Price2: "1,000+ Pcs ➔ 6,800 TZS",
    opt1Price3: "500+ Pcs (MOQ) ➔ 7,000 TZS (Free Delivery)",
    
    // Option 2: Import
    opt2Title: "📦 PRIVATE GROUPAGE IMPORT",
    opt2Subtitle: "Container / Semi-container",
    opt2Desc: "Your semi-container at the best market rates! Get prices here.",
    opt2Brands: "Jadida • Nutella • Kinder • Monster Energy • Redbull",
    
    // Form 1: Oil
    form1Header: "Zeti Sunflower Oil 1L",
    form1Sub: "Enter your information to complete your order:",
    labelName: "Your Name (Full name)",
    labelQty: "Quantity (MOQ: 500 Pcs)",
    placeholderName: "Example: John Doe",
    placeholderQty: "Min: 500",
    submitOil: "Complete Order on WhatsApp ➔",
    
    // Form 2: Import
    form2Header: "Semi-Container / Shared Bulk",
    form2Sub: "Fill this form to receive the wholesale price list:",
    labelFullName: "Full Name",
    labelTIN: "TIN Number (Tax Registration)",
    labelPhone: "Mobile Number",
    labelEmail: "Email Address",
    placeholderFullName: "Example: Alioune M'Baye",
    placeholderTIN: "Example: 123-456-789",
    placeholderPhone: "Example: 0773630492",
    placeholderEmail: "Example: contact@a-b-i.fr",
    submitImport: "Get Price List on WhatsApp ➔",
    
    // Common
    back: "← Go Back",
    errorFill: "Please fill in all fields",
    errorEmail: "Please enter a valid email address",
    successOil: "Your order has been sent! Redirecting to WhatsApp...",
    successImport: "Your request has been sent! Redirecting to WhatsApp...",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Language>("sw");
  const [step, setStep] = useState<FormStep>("main");
  const [loading, setLoading] = useState(false);

  // Form state - Oil
  const [oilName, setOilName] = useState("");
  const [oilQty, setOilQty] = useState("");

  // Form state - Import
  const [impName, setImpName] = useState("");
  const [impTIN, setImpTIN] = useState("");
  const [impPhone, setImpPhone] = useState("");
  const [impEmail, setImpEmail] = useState("");

  const t = translations[lang];

  // Update HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleOilSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!oilName.trim() || !oilQty.trim()) {
      toast.error(t.errorFill);
      return;
    }

    const qty = parseInt(oilQty, 10);
    if (isNaN(qty) || qty < 500) {
      toast.error("Quantity must be at least 500");
      return;
    }

    setLoading(true);
    
    try {
      // Send to Formspree (replace with your actual ID)
      await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Oil Order",
          name: oilName,
          quantity: qty,
          language: lang,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => null); // Silent fail if Formspree not configured

      toast.success(t.successOil);

      // Redirect to WhatsApp
      const message = `A-B-I Sourcing — New Order:\n• Name: ${oilName}\n• Product: Zeti Oil 1L\n• Quantity: ${qty} Pcs`;
      const whatsappUrl = `https://wa.me/33773728140?text=${encodeURIComponent(message)}`;
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 800);

      // Reset form
      setTimeout(() => {
        setOilName("");
        setOilQty("");
        setStep("main");
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!impName.trim() || !impTIN.trim() || !impPhone.trim() || !impEmail.trim()) {
      toast.error(t.errorFill);
      return;
    }

    if (!validateEmail(impEmail)) {
      toast.error(t.errorEmail);
      return;
    }

    setLoading(true);

    try {
      // Send to Formspree (replace with your actual ID)
      await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Import Request",
          name: impName,
          tin: impTIN,
          phone: impPhone,
          email: impEmail,
          language: lang,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => null); // Silent fail if Formspree not configured

      toast.success(t.successImport);

      // Redirect to WhatsApp
      const message = `A-B-I Sourcing — Import Request:\n• Name: ${impName}\n• TIN: ${impTIN}\n• Phone: ${impPhone}\n• Email: ${impEmail}`;
      const whatsappUrl = `https://wa.me/33773728140?text=${encodeURIComponent(message)}`;
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 800);

      // Reset form
      setTimeout(() => {
        setImpName("");
        setImpTIN("");
        setImpPhone("");
        setImpEmail("");
        setStep("main");
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setLang("sw")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
            lang === "sw"
              ? "bg-black text-white shadow-md"
              : "bg-white text-black border-2 border-black hover:bg-gray-50"
          }`}
        >
          <Globe className="w-4 h-4" />
          SW
        </button>
        <button
          onClick={() => setLang("en")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
            lang === "en"
              ? "bg-black text-white shadow-md"
              : "bg-white text-black border-2 border-black hover:bg-gray-50"
          }`}
        >
          <Globe className="w-4 h-4" />
          EN
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-3">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-light mb-4">
              {t.subtitle}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              {t.contact}
            </p>
          </div>

          {/* Main Menu */}
          {step === "main" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <p className="text-center text-gray-700 font-semibold mb-8">
                {t.welcome}
                <br />
                <span className="text-gray-500 font-normal">{t.selectOption}</span>
              </p>

              {/* Option 1: Oil */}
              <button
                onClick={() => setStep("oil")}
                className="w-full group relative overflow-hidden rounded-xl border-2 border-black bg-white p-6 text-left transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <h3 className="text-lg font-bold mb-2">{t.opt1Title}</h3>
                  <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-300 mb-3">
                    {t.opt1Subtitle}
                  </p>
                  <div className="space-y-1.5 text-sm">
                    <p className="font-medium">{t.opt1Price1}</p>
                    <p className="font-medium">{t.opt1Price2}</p>
                    <p className="font-medium text-green-700 group-hover:text-green-300">
                      {t.opt1Price3}
                    </p>
                  </div>
                </div>
              </button>

              {/* Option 2: Import */}
              <button
                onClick={() => setStep("import")}
                className="w-full group relative overflow-hidden rounded-xl border-2 border-black bg-white p-6 text-left transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <h3 className="text-lg font-bold mb-2">{t.opt2Title}</h3>
                  <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-300 mb-3">
                    {t.opt2Subtitle}
                  </p>
                  <p className="text-sm font-medium mb-3">{t.opt2Desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.opt2Brands.split(" • ").map((brand) => (
                      <span
                        key={brand}
                        className="inline-block px-2.5 py-1 bg-gray-100 group-hover:bg-gray-700 text-gray-700 group-hover:text-gray-200 rounded-md text-xs font-semibold transition-colors"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Oil Form */}
          {step === "oil" && (
            <form
              onSubmit={handleOilSubmit}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">{t.form1Header}</h2>
                <p className="text-gray-600">{t.form1Sub}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="oil-name" className="text-sm font-semibold mb-2 block">
                    {t.labelName}
                  </Label>
                  <Input
                    id="oil-name"
                    type="text"
                    placeholder={t.placeholderName}
                    value={oilName}
                    onChange={(e) => setOilName(e.target.value)}
                    className="h-12 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:ring-offset-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="oil-qty" className="text-sm font-semibold mb-2 block">
                    {t.labelQty}
                  </Label>
                  <Input
                    id="oil-qty"
                    type="number"
                    placeholder={t.placeholderQty}
                    value={oilQty}
                    onChange={(e) => setOilQty(e.target.value)}
                    min="500"
                    className="h-12 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:ring-offset-2"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-black text-white font-bold rounded-lg hover:bg-gray-900 active:scale-95 transition-all duration-200 disabled:opacity-70"
              >
                {loading ? "Processing..." : t.submitOil}
              </Button>

              <button
                type="button"
                onClick={() => setStep("main")}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-black font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.back}
              </button>
            </form>
          )}

          {/* Import Form */}
          {step === "import" && (
            <form
              onSubmit={handleImportSubmit}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">{t.form2Header}</h2>
                <p className="text-gray-600">{t.form2Sub}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="imp-name" className="text-sm font-semibold mb-2 block">
                    {t.labelFullName}
                  </Label>
                  <Input
                    id="imp-name"
                    type="text"
                    placeholder={t.placeholderFullName}
                    value={impName}
                    onChange={(e) => setImpName(e.target.value)}
                    className="h-12 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:ring-offset-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="imp-tin" className="text-sm font-semibold mb-2 block">
                    {t.labelTIN}
                  </Label>
                  <Input
                    id="imp-tin"
                    type="text"
                    placeholder={t.placeholderTIN}
                    value={impTIN}
                    onChange={(e) => setImpTIN(e.target.value)}
                    className="h-12 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:ring-offset-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="imp-phone" className="text-sm font-semibold mb-2 block">
                    {t.labelPhone}
                  </Label>
                  <Input
                    id="imp-phone"
                    type="tel"
                    placeholder={t.placeholderPhone}
                    value={impPhone}
                    onChange={(e) => setImpPhone(e.target.value)}
                    className="h-12 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:ring-offset-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="imp-email" className="text-sm font-semibold mb-2 block">
                    {t.labelEmail}
                  </Label>
                  <Input
                    id="imp-email"
                    type="email"
                    placeholder={t.placeholderEmail}
                    value={impEmail}
                    onChange={(e) => setImpEmail(e.target.value)}
                    className="h-12 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:ring-offset-2"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-black text-white font-bold rounded-lg hover:bg-gray-900 active:scale-95 transition-all duration-200 disabled:opacity-70"
              >
                {loading ? "Processing..." : t.submitImport}
              </Button>

              <button
                type="button"
                onClick={() => setStep("main")}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-black font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.back}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-500">
        <p>© 2026 A-B-I Sourcing & Wholesale. All rights reserved.</p>
      </footer>
    </div>
  );
}
