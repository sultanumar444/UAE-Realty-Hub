import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

const TRANSLATIONS: Dict = {
  // Navbar
  "nav.properties": { en: "Properties", ar: "العقارات" },
  "nav.allProperties": { en: "All Properties", ar: "جميع العقارات" },
  "nav.offPlan": { en: "Off Plan", ar: "على الخارطة" },
  "nav.sale": { en: "Sale", ar: "للبيع" },
  "nav.rent": { en: "Rent", ar: "للإيجار" },
  "nav.communities": { en: "Communities", ar: "المجتمعات" },
  "nav.investment": { en: "Investment", ar: "الاستثمار" },
  "nav.insights": { en: "Insights", ar: "رؤى" },
  "nav.agents": { en: "Agents", ar: "الوكلاء" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.getInTouch": { en: "Get in Touch", ar: "تواصل معنا" },
  "nav.crm": { en: "CRM", ar: "لوحة التحكم" },

  // Hero
  "hero.title1": { en: "Your Key to the", ar: "مفتاحك إلى" },
  "hero.title2": { en: "UAE Skyline", ar: "أفق الإمارات" },
  "hero.subtitle": {
    en: "Ascend into Dubai & Abu Dhabi's most coveted addresses.",
    ar: "ارتقِ إلى أرقى العناوين في دبي وأبوظبي.",
  },
  "hero.searchProperties": { en: "Search Properties", ar: "ابحث عن العقارات" },
  "hero.propertyType": { en: "Property Type", ar: "نوع العقار" },
  "hero.bedrooms": { en: "Bedrooms", ar: "غرف النوم" },
  "hero.priceRange": { en: "Price Range", ar: "نطاق السعر" },
  "hero.community": { en: "Community", ar: "المجتمع" },
  "hero.buy": { en: "Buy", ar: "شراء" },
  "hero.groundFloor": { en: "Ground Floor", ar: "الطابق الأرضي" },

  // Get in Touch dialog
  "git.title": { en: "Get in Touch", ar: "تواصل معنا" },
  "git.fullName": { en: "Full Name", ar: "الاسم الكامل" },
  "git.fullNamePlaceholder": { en: "Enter Full Name", ar: "أدخل الاسم الكامل" },
  "git.email": { en: "Email Address", ar: "البريد الإلكتروني" },
  "git.emailPlaceholder": { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
  "git.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "git.phonePlaceholder": { en: "Enter your phone number", ar: "أدخل رقم هاتفك" },
  "git.optIn": { en: "Keep me updated on news and offers", ar: "أبقني على اطلاع بالأخبار والعروض" },
  "git.privacy": {
    en: "Please review our privacy policy to understand how Your Key handles your personal data.",
    ar: "يرجى مراجعة سياسة الخصوصية لفهم كيفية تعامل Your Key مع بياناتك الشخصية.",
  },
  "git.submit": { en: "Submit", ar: "إرسال" },
  "git.sending": { en: "Sending...", ar: "جارٍ الإرسال..." },

  // FAQ
  "faq.kicker": { en: "Frequently Asked", ar: "الأسئلة" },
  "faq.kickerAccent": { en: "Questions", ar: "الشائعة" },
  "faq.subtitle": {
    en: "Everything you need to know about buying, renting, and investing in the UAE.",
    ar: "كل ما تحتاج معرفته عن الشراء والإيجار والاستثمار في الإمارات.",
  },
};

interface LanguageContextType {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: keyof typeof TRANSLATIONS | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Lang | null;
    if (saved === "en" || saved === "ar") {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("app_lang", l);
  };

  const t = (key: string) => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[lang];
  };

  return (
    <LanguageContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
