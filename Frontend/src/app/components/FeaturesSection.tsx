import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Brain, Shield, BarChart3, FileSearch, Globe2, Bell,
  CheckCircle2, ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Brain,
    tag: "AI Engine",
    title: "AI Legal Explanation Engine",
    description: "Our advanced AI converts complex legal terminology, acts, sections, and provisions into plain language that any citizen can understand. From IPC sections to constitutional rights — simplified instantly.",
    points: [
      "Explains IPC/CrPC sections in plain language",
      "Decodes court orders and legal notices",
      "Answers follow-up questions contextually",
      "Cites relevant case laws and precedents",
    ],
    visual: (
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-[#0F172A] rounded-md flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Legal Analysis</span>
        </div>
        <div className="space-y-3">
          <div className="bg-[#F8FAFC] rounded-xl p-3">
            <p className="text-xs text-[#6B7280] mb-1">Input: Legal Section</p>
            <p className="text-xs text-[#374151]" style={{ fontWeight: 500 }}>Section 420 IPC — Cheating and dishonestly inducing delivery of property</p>
          </div>
          <div className="flex justify-center">
            <div className="w-6 h-6 bg-[#0F172A]/10 rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-[#0F172A]" />
            </div>
          </div>
          <div className="bg-[#0F172A]/5 rounded-xl p-3">
            <p className="text-xs text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>AI Explanation</p>
            <p className="text-xs text-[#374151]">This law protects you from fraud. If someone deceives you to take your money or property, they can be punished with up to 7 years in prison.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Shield,
    tag: "Rights Protection",
    title: "FIR & Rights Assistant",
    description: "Navigate police procedures, understand your FIR, know your rights during interrogation, and get step-by-step guidance on what to do next when you face legal trouble.",
    points: [
      "Explains your rights when detained by police",
      "Decodes every part of your FIR clearly",
      "Guides you through bail procedures",
      "Lists next legal steps you should take",
    ],
    visual: (
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-[#1E3A5F] rounded-md flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Your Rights Dashboard</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {["Right to Silence", "Right to Lawyer", "No Forced Confessions", "Bail Rights"].map((r, i) => (
            <div key={i} className="bg-green-50 border border-green-100 rounded-lg p-2.5 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              <span className="text-[10px] text-green-800" style={{ fontWeight: 500 }}>{r}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#0F172A] rounded-xl p-3 text-white text-xs">
          <p style={{ fontWeight: 600 }} className="mb-1">Key Reminder</p>
          <p className="text-white/80">You have the right to remain silent. Anything you say can be used against you in court.</p>
        </div>
      </div>
    ),
  },
  {
    icon: BarChart3,
    tag: "Case Management",
    title: "Case Tracking Dashboard",
    description: "Monitor all your ongoing legal cases in one unified dashboard. Track hearing dates, case progress, legal milestones, and get timely updates on your case status.",
    points: [
      "Real-time case status updates",
      "Hearing schedule with calendar sync",
      "Document timeline per case",
      "Lawyer communication log",
    ],
    visual: (
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Active Cases</span>
          <span className="text-xs bg-[#0F172A] text-white px-2 py-0.5 rounded-full">3 Active</span>
        </div>
        <div className="space-y-3">
          {[
            { case: "Civil Dispute — Land Ownership", date: "Jun 12, 2025", status: "Hearing", color: "bg-blue-50 text-blue-700 border-blue-100" },
            { case: "Consumer Forum — Defective Product", date: "Jun 18, 2025", status: "Filed", color: "bg-green-50 text-green-700 border-green-100" },
            { case: "RTI Appeal — Information Denied", date: "Jul 3, 2025", status: "Pending", color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 bg-[#F8FAFC] rounded-xl">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#0F172A] truncate" style={{ fontWeight: 500 }}>{c.case}</p>
                <p className="text-[10px] text-[#9CA3AF]">Next: {c.date}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${c.color}`} style={{ fontWeight: 600 }}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: FileSearch,
    tag: "Document AI",
    title: "Document Intelligence",
    description: "Upload any legal document — FIR, court order, property deed, or contract — and receive an AI-generated summary highlighting key points, risks, and next steps.",
    points: [
      "Instant AI-powered document summarization",
      "Highlights key clauses and risks",
      "Identifies missing legal protections",
      "Suggests necessary actions",
    ],
    visual: (
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)" }}>
        <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 text-center mb-4">
          <FileSearch className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
          <p className="text-xs text-[#6B7280]" style={{ fontWeight: 500 }}>Upload Legal Document</p>
          <p className="text-[10px] text-[#9CA3AF]">PDF, DOC, JPG supported</p>
        </div>
        <div className="space-y-2">
          {[
            { label: "Document Type", value: "Court Order — Civil Case" },
            { label: "Key Finding", value: "Injunction granted — 30 days to respond" },
            { label: "Action Required", value: "File written statement urgently" },
          ].map(({ label, value }, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[10px] text-[#9CA3AF] w-24 flex-shrink-0 pt-0.5">{label}</span>
              <span className="text-xs text-[#0F172A]" style={{ fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Globe2,
    tag: "Multilingual",
    title: "Multilingual Legal Assistant",
    description: "Access complete legal guidance in 15+ Indian languages. Our AI understands and responds in Hindi, Tamil, Telugu, Bengali, Marathi, and more — no language barrier.",
    points: [
      "15+ Indian languages supported",
      "Voice input and output available",
      "Regional legal terminology understood",
      "Translates legal documents on demand",
    ],
    visual: (
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)" }}>
        <div className="grid grid-cols-4 gap-2">
          {[
            { lang: "EN", name: "English", active: true },
            { lang: "हि", name: "Hindi", active: false },
            { lang: "বং", name: "Bengali", active: false },
            { lang: "த", name: "Tamil", active: false },
            { lang: "తె", name: "Telugu", active: false },
            { lang: "म", name: "Marathi", active: false },
            { lang: "ক", name: "Kannada", active: false },
            { lang: "മ", name: "Malayalam", active: false },
          ].map(({ lang, name, active }, i) => (
            <div
              key={i}
              className={`rounded-xl p-2 text-center cursor-pointer transition-all ${
                active ? "bg-[#0F172A] text-white" : "bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151] hover:border-[#0F172A]/30"
              }`}
            >
              <p style={{ fontWeight: 700, fontSize: "0.875rem" }}>{lang}</p>
              <p style={{ fontSize: "0.625rem" }} className={active ? "text-white/70" : "text-[#9CA3AF]"}>{name}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Bell,
    tag: "Smart Reminders",
    title: "Smart Court Reminders",
    description: "Never miss a crucial hearing or legal deadline. Set intelligent reminders with case context, get prep checklists, and receive timely notifications across all your devices.",
    points: [
      "Hearing date alerts 3 days in advance",
      "Document submission deadline reminders",
      "Pre-hearing checklist generation",
      "SMS and email notification support",
    ],
    visual: (
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-[#0F172A]" />
          <span className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Upcoming Reminders</span>
        </div>
        <div className="space-y-3">
          {[
            { time: "Tomorrow, 10:00 AM", title: "District Court — Room 4B", type: "Hearing", urgent: true },
            { time: "Jun 14, 2025", title: "Submit Written Statement", type: "Deadline", urgent: false },
            { time: "Jun 20, 2025", title: "High Court — Writ Petition", type: "Hearing", urgent: false },
          ].map((r, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${r.urgent ? "bg-red-50 border border-red-100" : "bg-[#F8FAFC]"}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${r.urgent ? "bg-red-100" : "bg-[#E5E7EB]"}`}>
                <Bell className={`w-4 h-4 ${r.urgent ? "text-red-600" : "text-[#6B7280]"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#0F172A] truncate" style={{ fontWeight: 500 }}>{r.title}</p>
                <p className="text-[10px] text-[#9CA3AF]">{r.time}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${r.urgent ? "bg-red-100 text-red-700" : "bg-[#E5E7EB] text-[#6B7280]"}`} style={{ fontWeight: 600 }}>
                {r.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function FeatureRow({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}
    >
      <div className={isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
        <div className="inline-flex items-center gap-2 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-full px-3 py-1 mb-4">
          <Icon className="w-3.5 h-3.5 text-[#0F172A]" />
          <span className="text-xs text-[#0F172A]" style={{ fontWeight: 600 }}>{feature.tag}</span>
        </div>
        <h3 className="text-[#0F172A] mb-4" style={{ fontWeight: 800, fontSize: "1.875rem", letterSpacing: "-0.02em" }}>
          {feature.title}
        </h3>
        <p className="text-[#6B7280] mb-6" style={{ lineHeight: 1.7 }}>
          {feature.description}
        </p>
        <div className="space-y-3 mb-6">
          {feature.points.map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#0F172A]/5 border border-[#0F172A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-[#0F172A]" />
              </div>
              <span className="text-sm text-[#374151]" style={{ fontWeight: 500 }}>{point}</span>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-2 text-[#0F172A] text-sm group" style={{ fontWeight: 600 }}>
          Learn more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className={isEven ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
        {feature.visual}
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="bg-white pt-24 pb-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="text-xs text-[#0F172A]" style={{ fontWeight: 600 }}>Platform Features</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0F172A] mb-4"
            style={{ fontWeight: 800, fontSize: "2.5rem", letterSpacing: "-0.02em" }}
          >
            Everything You Need for Legal Clarity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#6B7280] max-w-xl mx-auto"
            style={{ fontSize: "1.0625rem" }}
          >
            Powerful AI tools designed specifically to make Indian legal system accessible to every citizen.
          </motion.p>
        </div>
        <div className="space-y-24">
          {features.map((feature, i) => (
            <FeatureRow key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
