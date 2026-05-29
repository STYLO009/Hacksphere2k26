import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Scale, MessageSquare, Phone, ShieldAlert, LayoutDashboard,
  FileText, Bell, Settings, LogOut, ChevronRight, User,
  ArrowRight, Mic, Send, X, Calendar, HelpCircle,
  CheckCircle2, Clock, AlertCircle, BookOpen, Mail, ExternalLink,
  Upload, FileUp, ChevronDown, Lock, Eye, EyeOff,
  Plus, FolderOpen, Trash2
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: MessageSquare, label: "AI Agent", id: "agent" },
  { icon: Phone, label: "Teleconsultation", id: "tele" },
  { icon: ShieldAlert, label: "FIR & Rights", id: "fir" },
  { icon: Calendar, label: "Case Tracking", id: "cases" },
  { icon: Bell, label: "Reminders", id: "reminders" },
  { icon: FileText, label: "My Documents", id: "documents" },
  { icon: HelpCircle, label: "Help & Support", id: "help" },
  { icon: Settings, label: "Settings", id: "settings" },
];

// ── Agent Chat Modal ──────────────────────────────────────────────────────────
const initialMessages = [
  { from: "agent", text: "Namaste! I'm your Nyaya Saathi AI Agent. I'm here to help you understand your legal rights, decode documents, or guide you through any legal situation. How can I assist you today?" },
];

function AgentModal({ onClose }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const reply = { from: "agent", text: "Thank you for your question. I'm analyzing the relevant sections of Indian law to provide you with the most accurate guidance. Please give me a moment..." };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl w-full max-w-lg flex flex-col overflow-hidden"
        style={{ height: "560px", boxShadow: "0 24px 64px rgba(15,23,42,0.18)" }}
      >
        <div className="bg-[#0F172A] px-5 py-4 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm" style={{ fontWeight: 700 }}>Nyaya Saathi AI Agent</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <p className="text-white/50 text-xs">Online — Ready to assist</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F8FAFC]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
              {msg.from === "agent" && (
                <div className="w-7 h-7 bg-[#0F172A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Scale className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.from === "agent" ? "bg-white border border-[#E5E7EB] text-[#374151]" : "bg-[#0F172A] text-white"}`}
                style={{ lineHeight: 1.6, boxShadow: msg.from === "agent" ? "0 2px 8px rgba(15,23,42,0.06)" : "none" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-[#E5E7EB] bg-white flex-shrink-0">
          <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-xl px-3 py-2 focus-within:border-[#0F172A] focus-within:ring-2 focus-within:ring-[#0F172A]/10 transition-all">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask your legal question..."
              className="flex-1 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none bg-transparent"
            />
            <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] transition-colors text-[#9CA3AF] hover:text-[#0F172A]">
              <Mic className="w-4 h-4" />
            </button>
            <button onClick={send} className="w-7 h-7 bg-[#0F172A] rounded-lg flex items-center justify-center hover:bg-[#1E3A5F] transition-colors">
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── FIR & Rights Section ──────────────────────────────────────────────────────
function FIRSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = [
    { id: "write", label: "Write an FIR", icon: FileText, desc: "Draft and file a First Information Report with guided AI assistance", color: "text-red-600", bg: "bg-red-50 border-red-100" },
    { id: "complaint", label: "Complaint regarding FIR", icon: ShieldAlert, desc: "File a complaint about an existing FIR — delayed registration, false FIR, or improper investigation", color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
  ];

  const selectedOption = options.find(o => o.id === selected);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>FIR & Legal Rights</h2>

      {/* Dropdown selector */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-5" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <p className="text-sm text-[#6B7280] mb-4">Select what you'd like to do:</p>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 border border-[#E5E7EB] rounded-xl hover:border-[#0F172A] transition-colors bg-white"
          >
            <span className="text-sm text-[#0F172A]" style={{ fontWeight: selectedOption ? 600 : 400 }}>
              {selectedOption ? selectedOption.label : "Choose an option..."}
            </span>
            <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E7EB] rounded-xl overflow-hidden z-20"
                style={{ boxShadow: "0 8px 32px rgba(15,23,42,0.12)" }}
              >
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setSelected(opt.id); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#F8FAFC] transition-colors text-left border-b border-[#F1F5F9] last:border-0"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${opt.bg}`}>
                      <opt.icon className={`w-4 h-4 ${opt.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>{opt.label}</p>
                      <p className="text-xs text-[#9CA3AF]">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action after selection */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[#F1F5F9]"
            >
              {selected === "write" && (
                <div className="space-y-3">
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Write an FIR</p>
                  <p className="text-xs text-[#6B7280]">Our AI will guide you step-by-step through drafting a legally accurate FIR with all required sections under Bharatiya Nagarik Suraksha Sanhita (BNSS).</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Name of complainant", "Date & place of incident", "Description of offence", "Accused details (if known)"].map((field, i) => (
                      <div key={i} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3">
                        <label className="block text-[10px] text-[#9CA3AF] mb-1" style={{ fontWeight: 600 }}>{field.toUpperCase()}</label>
                        <input placeholder={`Enter ${field.toLowerCase()}...`} className="w-full text-sm text-[#0F172A] bg-transparent focus:outline-none placeholder-[#D1D5DB]" />
                      </div>
                    ))}
                  </div>
                  <button className="mt-2 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors flex items-center gap-2" style={{ fontWeight: 600 }}>
                    Generate FIR Draft with AI
                  </button>
                </div>
              )}
              {selected === "complaint" && (
                <div className="space-y-3">
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Complaint regarding FIR</p>
                  <p className="text-xs text-[#6B7280]">File a complaint about an existing FIR — including delayed registration, false FIR, or improper investigation to a Superintendent of Police or Magistrate.</p>
                  <div className="space-y-3">
                    {["FIR Number / Station", "Nature of complaint", "Relief sought"].map((field, i) => (
                      <div key={i} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3">
                        <label className="block text-[10px] text-[#9CA3AF] mb-1" style={{ fontWeight: 600 }}>{field.toUpperCase()}</label>
                        {i === 1 ? (
                          <textarea rows={2} placeholder={`Enter ${field.toLowerCase()}...`} className="w-full text-sm text-[#0F172A] bg-transparent focus:outline-none placeholder-[#D1D5DB] resize-none" />
                        ) : (
                          <input placeholder={`Enter ${field.toLowerCase()}...`} className="w-full text-sm text-[#0F172A] bg-transparent focus:outline-none placeholder-[#D1D5DB]" />
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="mt-2 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors flex items-center gap-2" style={{ fontWeight: 600 }}>
                    Draft Complaint with AI
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Decode FIR Sections", desc: "Understand the IPC/BNS sections mentioned in your FIR", color: "text-red-600", bg: "bg-red-50 border-red-100" },
          { title: "Rights During Custody", desc: "Know your fundamental rights when detained by police", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { title: "Bail Guide", desc: "Regular bail, anticipatory bail — understand the process", color: "text-green-600", bg: "bg-green-50 border-green-100" },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#E5E7EB] hover:-translate-y-0.5 transition-all cursor-pointer" style={{ boxShadow: "0 4px 12px rgba(15,23,42,0.06)" }}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${card.bg} mb-3`}>
              <ShieldAlert className={`w-4 h-4 ${card.color}`} />
            </div>
            <p className="text-sm text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>{card.title}</p>
            <p className="text-xs text-[#9CA3AF]" style={{ lineHeight: 1.5 }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Reminders Section ─────────────────────────────────────────────────────────
const upcomingReminders = [
  { title: "District Court Hearing — Room 4B", date: "Tomorrow, 10:00 AM", type: "Hearing", urgent: true },
  { title: "Submit Written Statement", date: "Jun 14, 2026", type: "Deadline", urgent: true },
  { title: "High Court — Writ Petition", date: "Jun 20, 2026", type: "Hearing", urgent: false },
  { title: "Document Submission — Consumer Forum", date: "Jun 25, 2026", type: "Deadline", urgent: false },
  { title: "RTI Response Review", date: "Jul 3, 2026", type: "Task", urgent: false },
];

function RemindersSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const formatDate = (d?: Date) => d ? d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Reminders</h2>

      {/* Add Reminder Form */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-6" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <p className="text-sm text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>Add a New Reminder</p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: form fields */}
          <div className="flex-1 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>TITLE</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Court hearing at District Court"
                className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>DESCRIPTION</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Add any notes or details about this reminder..."
                className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all resize-none"
              />
            </div>

            {/* Date picker */}
            <div>
              <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>DATE</label>
              <div className="relative">
                <button
                  onClick={() => setCalendarOpen(!calendarOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm hover:border-[#0F172A] transition-colors"
                >
                  <span className={selectedDate ? "text-[#0F172A]" : "text-[#9CA3AF]"} style={{ fontWeight: selectedDate ? 500 : 400 }}>
                    {selectedDate ? formatDate(selectedDate) : "Select a date"}
                  </span>
                  <Calendar className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <AnimatePresence>
                  {calendarOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 z-30 bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden"
                      style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.14)" }}
                    >
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={(d) => { setSelectedDate(d); setCalendarOpen(false); }}
                        className="p-3"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors flex items-center gap-2" style={{ fontWeight: 600 }}>
              <Bell className="w-4 h-4" /> Set Reminder
            </button>
          </div>

          {/* Divider */}
          <div className="flex lg:flex-col items-center gap-3 lg:gap-0 justify-center">
            <div className="flex-1 h-px lg:h-full lg:w-px bg-[#E5E7EB]" />
            <span className="text-xs text-[#9CA3AF] bg-white px-2 py-1 rounded-full border border-[#E5E7EB] flex-shrink-0" style={{ fontWeight: 600 }}>OR</span>
            <div className="flex-1 h-px lg:h-full lg:w-px bg-[#E5E7EB]" />
          </div>

          {/* Right: upload */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm text-[#0F172A] mb-2" style={{ fontWeight: 600 }}>Upload Reminders from Document</p>
            <p className="text-xs text-[#9CA3AF] mb-4" style={{ lineHeight: 1.6 }}>Upload a court order, notice, or legal document and our AI will automatically extract and set reminders for all important dates.</p>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" onChange={e => {
              if (e.target.files?.[0]) setUploadedFile(e.target.files[0].name);
            }} />
            {uploadedFile ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <p className="text-xs text-green-700 flex-1 truncate" style={{ fontWeight: 500 }}>{uploadedFile}</p>
                <button onClick={() => setUploadedFile(null)} className="text-[#9CA3AF] hover:text-red-500 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-[#D1D5DB] rounded-2xl hover:border-[#0F172A] hover:bg-[#F8FAFC] transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 bg-[#F1F5F9] group-hover:bg-[#0F172A]/10 rounded-xl flex items-center justify-center transition-colors">
                  <FileUp className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#0F172A] transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Click to upload document</p>
                  <p className="text-xs text-[#9CA3AF]">PDF, DOC, DOCX, JPG, PNG</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Reminders */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#0F172A]" />
          <span className="text-[#0F172A] text-sm" style={{ fontWeight: 700 }}>Upcoming Reminders</span>
          <span className="text-[10px] bg-[#0F172A] text-white px-2 py-0.5 rounded-full ml-1" style={{ fontWeight: 600 }}>{upcomingReminders.length}</span>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {upcomingReminders.map((r, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F8FAFC] transition-colors">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${r.urgent ? "bg-red-50 border border-red-100" : "bg-[#F1F5F9]"}`}>
                <Bell className={`w-4 h-4 ${r.urgent ? "text-red-500" : "text-[#9CA3AF]"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#0F172A] truncate" style={{ fontWeight: 500 }}>{r.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-[#9CA3AF]" />
                  <p className="text-xs text-[#9CA3AF]">{r.date}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${r.urgent ? "bg-red-50 text-red-600 border border-red-100" : "bg-[#F1F5F9] text-[#6B7280]"}`} style={{ fontWeight: 600 }}>
                {r.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Case Tracking Section ─────────────────────────────────────────────────────
const CASE_STAGES = ["Filed", "Admitted", "Evidence", "Arguments", "Judgment"];

const cases = [
  {
    id: "CASE-001",
    title: "Civil Dispute — Land Ownership",
    court: "District Court, Delhi",
    nextDate: "Jun 12, 2026",
    status: "Hearing",
    statusColor: "bg-blue-50 text-blue-600 border-blue-100",
    progress: 60,
  },
  {
    id: "CASE-002",
    title: "Consumer Forum — Defective Product",
    court: "Consumer Forum, Delhi",
    nextDate: "Jun 18, 2026",
    status: "Filed",
    statusColor: "bg-green-50 text-green-600 border-green-100",
    progress: 20,
  },
  {
    id: "CASE-003",
    title: "RTI Appeal — Information Denied",
    court: "State Info. Commission",
    nextDate: "Jul 3, 2026",
    status: "Pending",
    statusColor: "bg-yellow-50 text-yellow-600 border-yellow-100",
    progress: 35,
  },
];

// stageAnswers: Record<caseId, Record<stageIndex, "yes" | "no" | null>>
function CaseTrackingSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAddCase, setShowAddCase] = useState(false);
  const [stageAnswers, setStageAnswers] = useState<Record<string, Record<number, "yes" | "no" | null>>>({});

  const setAnswer = (caseId: string, stageIdx: number, answer: "yes" | "no") => {
    setStageAnswers(prev => ({
      ...prev,
      [caseId]: {
        ...(prev[caseId] || {}),
        [stageIdx]: prev[caseId]?.[stageIdx] === answer ? null : answer,
      },
    }));
  };

  const getAnswer = (caseId: string, stageIdx: number): "yes" | "no" | null =>
    stageAnswers[caseId]?.[stageIdx] ?? null;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#0F172A]" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Case Tracking</h2>
        <button
          onClick={() => setShowAddCase(!showAddCase)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-all active:scale-95"
          style={{ fontWeight: 700, boxShadow: "0 4px 14px rgba(15,23,42,0.25)" }}
        >
          <Plus className="w-4 h-4" />
          Add Case
        </button>
      </div>

      <AnimatePresence>
        {showAddCase && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5"
          >
            <div className="bg-white rounded-2xl border border-[#0F172A] p-5" style={{ boxShadow: "0 4px 20px rgba(15,23,42,0.1)" }}>
              <p className="text-sm text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>Add New Case</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Case Title", "Court Name", "Case Number", "Next Hearing Date"].map((f, i) => (
                  <div key={i}>
                    <label className="block text-[10px] text-[#9CA3AF] mb-1.5" style={{ fontWeight: 600 }}>{f.toUpperCase()}</label>
                    <input placeholder={`Enter ${f.toLowerCase()}...`} className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder-[#D1D5DB] focus:outline-none focus:border-[#0F172A] transition-colors" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-5 py-2 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors" style={{ fontWeight: 600 }}>Save Case</button>
                <button onClick={() => setShowAddCase(false)} className="px-5 py-2 border border-[#E5E7EB] rounded-xl text-sm text-[#6B7280] hover:bg-[#F8FAFC] transition-colors" style={{ fontWeight: 500 }}>Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0F172A]" />
          <span className="text-[#0F172A] text-sm" style={{ fontWeight: 700 }}>Case Tracking</span>
          <span className="text-[10px] bg-[#0F172A] text-white px-2 py-0.5 rounded-full ml-1" style={{ fontWeight: 600 }}>3 Active</span>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {cases.map((c) => (
            <div key={c.id}>
              <div
                className="px-6 py-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 600 }}>{c.id}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${c.statusColor}`} style={{ fontWeight: 600 }}>{c.status}</span>
                    </div>
                    <p className="text-sm text-[#0F172A] mb-0.5" style={{ fontWeight: 600 }}>{c.title}</p>
                    <p className="text-xs text-[#9CA3AF]">{c.court} · Next: {c.nextDate}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#9CA3AF] flex-shrink-0 transition-transform mt-0.5 ${expanded === c.id ? "rotate-90" : ""}`} />
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#9CA3AF]">Progress</span>
                    <span className="text-[10px] text-[#0F172A]" style={{ fontWeight: 600 }}>{c.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#0F172A] rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              </div>

              {/* Expanded: stages with YES / NO */}
              <AnimatePresence>
                {expanded === c.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[#F1F5F9] bg-[#F8FAFC]"
                  >
                    <p className="text-xs text-[#9CA3AF] px-6 pt-4 mb-4" style={{ fontWeight: 600 }}>CASE STAGES</p>
                    <div className="px-6 pb-5 space-y-3">
                      {CASE_STAGES.map((stage, i) => {
                        const answer = getAnswer(c.id, i);
                        return (
                          <div
                            key={i}
                            className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition-all ${
                              answer === "yes"
                                ? "bg-green-50 border-green-200"
                                : answer === "no"
                                ? "bg-red-50 border-red-200"
                                : "bg-white border-[#E5E7EB]"
                            }`}
                          >
                            {/* Stage label + status icon */}
                            <div className="flex items-center gap-3">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                answer === "yes" ? "bg-green-500" : answer === "no" ? "bg-red-500" : "bg-[#F1F5F9]"
                              }`}>
                                {answer === "yes" && (
                                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                                {answer === "no" && (
                                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                )}
                                {answer === null && (
                                  <span className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 700 }}>{i + 1}</span>
                                )}
                              </div>
                              <span className={`text-sm ${
                                answer === "yes" ? "text-green-800" : answer === "no" ? "text-red-800" : "text-[#374151]"
                              }`} style={{ fontWeight: 600 }}>{stage}</span>
                              {answer === "yes" && <span className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>Completed</span>}
                              {answer === "no" && <span className="text-[10px] text-red-600 bg-red-100 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>Pending</span>}
                            </div>

                            {/* YES / NO buttons */}
                            <div className="flex items-center gap-2 flex-shrink-0 ml-4" onClick={e => e.stopPropagation()}>
                              <button
                                onClick={() => setAnswer(c.id, i, "yes")}
                                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                                  answer === "yes"
                                    ? "bg-green-500 text-white shadow-sm"
                                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-green-400 hover:text-green-600 hover:bg-green-50"
                                }`}
                                style={{ fontWeight: 700 }}
                              >
                                YES
                              </button>
                              <button
                                onClick={() => setAnswer(c.id, i, "no")}
                                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                                  answer === "no"
                                    ? "bg-red-500 text-white shadow-sm"
                                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-red-400 hover:text-red-600 hover:bg-red-50"
                                }`}
                                style={{ fontWeight: 700 }}
                              >
                                NO
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── My Documents Section ──────────────────────────────────────────────────────
function MyDocumentsSection() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState([
    { id: 1, name: "FIR_Copy_2026.pdf", size: "1.2 MB", type: "PDF", date: "May 20, 2026", insights: null, loadingInsights: false },
    { id: 2, name: "Land_Registry_Deed.pdf", size: "3.4 MB", type: "PDF", date: "Apr 15, 2026", insights: null, loadingInsights: false },
    { id: 3, name: "Consumer_Forum_Notice.docx", size: "0.8 MB", type: "DOCX", date: "Mar 8, 2026", insights: null, loadingInsights: false },
  ]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newDocs = files.map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      type: f.name.split(".").pop()?.toUpperCase() || "FILE",
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      insights: null,
      loadingInsights: false,
    }));
    setDocuments(prev => [...prev, ...newDocs]);
    e.target.value = "";
  };

  const getInsights = (id: number) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, loadingInsights: true } : d));
    setTimeout(() => {
      const sampleInsights = [
        "This document contains references to Section 420 IPC (Cheating). The complainant may be entitled to file a civil suit in addition to the criminal complaint.",
        "This land registry deed identifies 3 key parties. Ensure stamp duty has been paid as per current state rates. Any transfer post-registration requires fresh registration.",
        "This consumer forum notice requires a response within 30 days. Attach all purchase receipts, warranty cards, and prior complaint records as evidence.",
      ];
      setDocuments(prev => prev.map(d =>
        d.id === id ? { ...d, loadingInsights: false, insights: sampleInsights[Math.floor(Math.random() * sampleInsights.length)] } : d
      ));
    }, 2000);
  };

  const removeDoc = (id: number) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const typeColor: Record<string, string> = {
    PDF: "bg-red-50 text-red-600 border-red-100",
    DOCX: "bg-blue-50 text-blue-600 border-blue-100",
    DOC: "bg-blue-50 text-blue-600 border-blue-100",
    JPG: "bg-purple-50 text-purple-600 border-purple-100",
    PNG: "bg-purple-50 text-purple-600 border-purple-100",
    FILE: "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>My Documents</h2>

      {/* Upload area */}
      <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" onChange={handleUpload} />
      <div
        onClick={() => fileRef.current?.click()}
        className="bg-white rounded-2xl border-2 border-dashed border-[#D1D5DB] p-8 mb-6 flex flex-col items-center justify-center gap-4 hover:border-[#0F172A] hover:bg-[#F8FAFC] transition-all cursor-pointer group"
        style={{ boxShadow: "0 2px 8px rgba(15,23,42,0.04)" }}
      >
        <div className="w-14 h-14 bg-[#F1F5F9] group-hover:bg-[#0F172A]/10 rounded-2xl flex items-center justify-center transition-colors">
          <Upload className="w-7 h-7 text-[#9CA3AF] group-hover:text-[#0F172A] transition-colors" />
        </div>
        <div className="text-center">
          <p className="text-[#0F172A] mb-1" style={{ fontWeight: 700 }}>Upload your Documents</p>
          <p className="text-sm text-[#9CA3AF]">Drag & drop or click to browse — PDF, DOC, DOCX, JPG, PNG supported</p>
        </div>
        <span className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-sm group-hover:bg-[#1E3A5F] transition-colors flex items-center gap-2" style={{ fontWeight: 600 }}>
          <Upload className="w-4 h-4" /> Browse Files
        </span>
      </div>

      {/* Documents list */}
      {documents.length === 0 ? (
        <div className="text-center py-10 text-[#9CA3AF]">
          <FolderOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No documents uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
              style={{ boxShadow: "0 4px 12px rgba(15,23,42,0.06)" }}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border text-xs flex-shrink-0 ${typeColor[doc.type] || typeColor.FILE}`} style={{ fontWeight: 700 }}>
                  {doc.type}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0F172A] truncate" style={{ fontWeight: 600 }}>{doc.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{doc.size} · Uploaded {doc.date}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => getInsights(doc.id)}
                    disabled={doc.loadingInsights}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl text-xs hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontWeight: 600 }}
                  >
                    {doc.loadingInsights ? (
                      <>
                        <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Get AI Insights
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => removeDoc(doc.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#E5E7EB] hover:bg-red-50 hover:border-red-100 transition-colors text-[#9CA3AF] hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* AI Insights Panel */}
              <AnimatePresence>
                {doc.insights && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[#E5E7EB] bg-gradient-to-r from-[#EEF2FF] to-[#F5F3FF] px-5 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      </div>
                      <div>
                        <p className="text-xs text-[#4338CA] mb-1" style={{ fontWeight: 700 }}>AI INSIGHTS</p>
                        <p className="text-sm text-[#374151]" style={{ lineHeight: 1.65 }}>{doc.insights}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Settings Section ──────────────────────────────────────────────────────────
function SettingsSection() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdSaved, setPwdSaved] = useState(false);

  const handleSave = () => {
    if (newPwd && newPwd === confirmPwd) {
      setPwdSaved(true);
      setOldPwd(""); setNewPwd(""); setConfirmPwd("");
      setTimeout(() => setPwdSaved(false), 3000);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Settings</h2>

      <div className="space-y-5 max-w-xl">
        {/* Profile settings */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
          <p className="text-sm text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>Profile Information</p>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-[#0F172A] rounded-2xl flex items-center justify-center">
              <span className="text-white" style={{ fontWeight: 700, fontSize: "1.25rem" }}>RK</span>
            </div>
            <div>
              <p className="text-[#0F172A] text-sm" style={{ fontWeight: 600 }}>Rajesh Kumar</p>
              <p className="text-[#9CA3AF] text-xs">rajesh@email.com</p>
            </div>
          </div>
          <div className="space-y-3">
            {[{ label: "Full Name", val: "Rajesh Kumar" }, { label: "Email Address", val: "rajesh@email.com" }, { label: "Phone Number", val: "+91 98765 43210" }].map((f, i) => (
              <div key={i}>
                <label className="block text-xs text-[#6B7280] mb-1" style={{ fontWeight: 600 }}>{f.label.toUpperCase()}</label>
                <input defaultValue={f.val} className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors" />
              </div>
            ))}
          </div>
          <button className="mt-4 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors" style={{ fontWeight: 600 }}>Save Changes</button>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-[#0F172A]" />
            <p className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>Change Password</p>
          </div>

          {pwdSaved && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-4 p-3 bg-green-50 border border-green-200 rounded-xl"
            >
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-700" style={{ fontWeight: 500 }}>Password updated successfully!</p>
            </motion.div>
          )}

          <div className="space-y-3">
            {[
              { label: "Current Password", val: oldPwd, set: setOldPwd, show: showOld, toggle: () => setShowOld(!showOld) },
              { label: "New Password", val: newPwd, set: setNewPwd, show: showNew, toggle: () => setShowNew(!showNew) },
              { label: "Confirm New Password", val: confirmPwd, set: setConfirmPwd, show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-xs text-[#6B7280] mb-1" style={{ fontWeight: 600 }}>{f.label.toUpperCase()}</label>
                <div className="relative">
                  <input
                    type={f.show ? "text" : "password"}
                    value={f.val}
                    onChange={e => f.set(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                  />
                  <button
                    onClick={f.toggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0F172A] transition-colors"
                  >
                    {f.show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {newPwd && confirmPwd && newPwd !== confirmPwd && (
            <p className="text-xs text-red-500 mt-2" style={{ fontWeight: 500 }}>Passwords do not match</p>
          )}

          <button
            onClick={handleSave}
            disabled={!oldPwd || !newPwd || newPwd !== confirmPwd}
            className="mt-4 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            style={{ fontWeight: 600 }}
          >
            <Lock className="w-4 h-4" /> Update Password
          </button>
        </div>

        {/* Notification preferences */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
          <p className="text-sm text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>Notification Preferences</p>
          <div className="space-y-3">
            {["Email reminders for hearings", "SMS alerts for deadlines", "Push notifications", "Weekly case summary"].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0">
                <span className="text-sm text-[#374151]">{item}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                  <div className="w-9 h-5 bg-[#E5E7EB] peer-checked:bg-[#0F172A] rounded-full transition-colors peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Lawyer Teleconsultation Section ──────────────────────────────────────────
const caseTypes = [
  "Criminal", "Civil", "Family / Matrimonial", "Property / Real Estate",
  "Consumer", "Labour / Employment", "RTI / Public Interest", "Cyber Crime",
  "Tax", "Intellectual Property", "Other",
];

const lawyers = [
  {
    name: "Adv. Priya Sharma",
    initials: "PS",
    avatarColor: "bg-violet-600",
    expertise: ["Criminal Law", "POCSO", "Bail & Anticipatory Bail"],
    experience: 14,
    rating: 4.9,
    reviews: 238,
    languages: ["Hindi", "English"],
    location: "Delhi High Court",
    fee: "₹500 / 30 min",
    available: true,
  },
  {
    name: "Adv. Rajan Mehta",
    initials: "RM",
    avatarColor: "bg-blue-600",
    expertise: ["Civil & Property Law", "Land Disputes", "Consumer Forum"],
    experience: 21,
    rating: 4.7,
    reviews: 315,
    languages: ["Hindi", "English", "Punjabi"],
    location: "District Court, Delhi",
    fee: "₹700 / 30 min",
    available: true,
  },
  {
    name: "Adv. Sunita Nair",
    initials: "SN",
    avatarColor: "bg-emerald-600",
    expertise: ["Family Law", "Divorce & Custody", "Domestic Violence"],
    experience: 9,
    rating: 4.8,
    reviews: 174,
    languages: ["Hindi", "English", "Malayalam"],
    location: "Family Court, Delhi",
    fee: "₹450 / 30 min",
    available: false,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400" : "text-[#E5E7EB]"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TeleconsultationSection() {
  const [selectedCaseType, setSelectedCaseType] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bookedLawyer, setBookedLawyer] = useState<string | null>(null);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Lawyer Teleconsultation</h2>

      {/* Case type question */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-6" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <p className="text-[#0F172A] mb-1" style={{ fontWeight: 700, fontSize: "1rem" }}>What is your case type?</p>
        <p className="text-sm text-[#9CA3AF] mb-4">Select the category that best describes your legal matter to find the most suitable lawyer.</p>

        <div className="relative max-w-sm">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 border border-[#E5E7EB] rounded-xl hover:border-[#0F172A] transition-colors bg-white"
          >
            <span className={selectedCaseType ? "text-sm text-[#0F172A]" : "text-sm text-[#9CA3AF]"} style={{ fontWeight: selectedCaseType ? 600 : 400 }}>
              {selectedCaseType ?? "Select case type..."}
            </span>
            <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden z-20"
                style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.14)" }}
              >
                <div className="max-h-56 overflow-y-auto py-1">
                  {caseTypes.map((ct) => (
                    <button
                      key={ct}
                      onClick={() => { setSelectedCaseType(ct); setDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F8FAFC] transition-colors ${selectedCaseType === ct ? "text-[#0F172A] bg-[#F1F5F9]" : "text-[#374151]"}`}
                      style={{ fontWeight: selectedCaseType === ct ? 600 : 400 }}
                    >
                      {ct}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {selectedCaseType && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-xs text-[#6B7280]"
          >
            Showing lawyers experienced in <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{selectedCaseType}</span> matters.
          </motion.p>
        )}
      </div>

      {/* Lawyer profiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {lawyers.map((lawyer) => (
          <motion.div
            key={lawyer.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col"
            style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}
          >
            {/* Availability badge */}
            <div className={`h-1 w-full ${lawyer.available ? "bg-green-400" : "bg-[#E5E7EB]"}`} />

            <div className="p-5 flex-1 flex flex-col">
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${lawyer.avatarColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm" style={{ fontWeight: 700 }}>{lawyer.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0F172A] truncate" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{lawyer.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${lawyer.available ? "bg-green-400" : "bg-[#D1D5DB]"}`} />
                    <span className={`text-[10px] ${lawyer.available ? "text-green-600" : "text-[#9CA3AF]"}`} style={{ fontWeight: 600 }}>
                      {lawyer.available ? "Available Now" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={lawyer.rating} />
                <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>{lawyer.rating}</span>
                <span className="text-xs text-[#9CA3AF]">({lawyer.reviews} reviews)</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#F8FAFC] rounded-xl p-3">
                  <p className="text-[10px] text-[#9CA3AF] mb-0.5" style={{ fontWeight: 600 }}>EXPERIENCE</p>
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>{lawyer.experience} years</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-3">
                  <p className="text-[10px] text-[#9CA3AF] mb-0.5" style={{ fontWeight: 600 }}>CONSULTATION FEE</p>
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>{lawyer.fee}</p>
                </div>
              </div>

              {/* Expertise */}
              <div className="mb-4">
                <p className="text-[10px] text-[#9CA3AF] mb-2" style={{ fontWeight: 600 }}>EXPERTISE</p>
                <div className="flex flex-wrap gap-1.5">
                  {lawyer.expertise.map((e) => (
                    <span key={e} className="text-[11px] px-2.5 py-1 bg-[#F1F5F9] text-[#374151] rounded-lg" style={{ fontWeight: 500 }}>{e}</span>
                  ))}
                </div>
              </div>

              {/* Languages + location */}
              <div className="space-y-1.5 mb-5">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#9CA3AF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="text-xs text-[#6B7280]">{lawyer.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#9CA3AF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs text-[#6B7280]">{lawyer.location}</span>
                </div>
              </div>

              {/* Book button */}
              <div className="mt-auto">
                {bookedLawyer === lawyer.name ? (
                  <div className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-50 border border-green-200 rounded-xl">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-green-700" style={{ fontWeight: 600 }}>Consultation Booked!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setBookedLawyer(lawyer.name)}
                    disabled={!lawyer.available}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all ${
                      lawyer.available
                        ? "bg-[#0F172A] text-white hover:bg-[#1E3A5F] active:scale-95"
                        : "bg-[#F1F5F9] text-[#9CA3AF] cursor-not-allowed"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    <Phone className="w-4 h-4" />
                    {lawyer.available ? "Book Consultation" : "Currently Unavailable"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Help & Support Section ────────────────────────────────────────────────────
const faqs = [
  { q: "How do I upload a legal document for analysis?", a: "Go to the Documents section, click 'Upload Document', and select your PDF or image. Our AI will analyze it within seconds." },
  { q: "Is the AI legal guidance a substitute for a lawyer?", a: "No. Nyaya Saathi provides general legal information for awareness purposes only. For specific legal matters, always consult a qualified lawyer." },
  { q: "How do I file an FIR complaint?", a: "Visit your nearest police station and submit a written complaint. You can also file an e-FIR on your state police portal. Our AI Agent can guide you step by step." },
];

function HelpSupportSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, title: "AI Chat Support", desc: "Ask the AI agent anything, 24/7", action: "Start Chat", color: "text-[#0F172A]", bg: "bg-[#0F172A]/5" },
          { icon: Mail, title: "Email Support", desc: "help@nyayasaathi.gov.in", action: "Send Email", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: Phone, title: "Helpline", desc: "1800-XXX-XXXX · Toll Free", action: "Call Now", color: "text-green-600", bg: "bg-green-50" },
        ].map(({ icon: Icon, title, desc, action, color, bg }, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-[#E5E7EB]" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}>
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-sm text-[#0F172A] mb-0.5" style={{ fontWeight: 700 }}>{title}</p>
            <p className="text-xs text-[#9CA3AF] mb-3">{desc}</p>
            <button className="text-xs text-[#0F172A] flex items-center gap-1 hover:underline" style={{ fontWeight: 600 }}>
              {action} <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}>
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#0F172A]" />
          <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>Frequently Asked Questions</span>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="text-sm text-[#0F172A] pr-4" style={{ fontWeight: 500 }}>{faq.q}</span>
                <ChevronRight className={`w-4 h-4 text-[#9CA3AF] flex-shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
              </button>
              {openFaq === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-6 pb-4 bg-[#F8FAFC] border-t border-[#F1F5F9]"
                >
                  <p className="text-sm text-[#6B7280] pt-3" style={{ lineHeight: 1.7 }}>{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Home ─────────────────────────────────────────────────────────────
function DashboardHome({ setActiveSection, setAgentOpen }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0F172A] rounded-2xl p-6 mb-5 relative overflow-hidden cursor-pointer group"
        style={{ boxShadow: "0 8px 32px rgba(15,23,42,0.18)" }}
        onClick={() => setAgentOpen(true)}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/3 rounded-full translate-y-12" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 rounded-full px-2.5 py-0.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-[10px]" style={{ fontWeight: 600 }}>Online Now</span>
              </div>
            </div>
            <h2 className="text-white mb-1" style={{ fontWeight: 800, fontSize: "1.375rem", letterSpacing: "-0.01em" }}>
              Talk to our AI Legal Agent
            </h2>
            <p className="text-white/50 text-sm max-w-md" style={{ lineHeight: 1.6 }}>
              Get instant answers to your legal questions. Understand your rights, decode documents, and receive step-by-step guidance.
            </p>
          </div>
          <div className="flex-shrink-0 ml-6 hidden sm:block">
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/20 group-hover:translate-x-1 transition-all duration-200">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main sections grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Lawyer Teleconsultation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl p-5 border border-[#E5E7EB] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04)" }}
          onClick={() => setActiveSection("tele")}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-600 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>Available</span>
          </div>
          <h3 className="text-[#0F172A] mb-1.5" style={{ fontWeight: 700, fontSize: "1rem" }}>Lawyer Teleconsultation</h3>
          <p className="text-[#6B7280] text-sm mb-4" style={{ lineHeight: 1.6 }}>Connect with verified lawyers for a live video or phone consultation at your convenience.</p>
          <div className="space-y-2 mb-4">
            {["Free 15-min initial session", "Verified Bar Council lawyers", "Hindi & regional languages"].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <span className="text-xs text-[#6B7280]">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 border border-[#0F172A] text-[#0F172A] rounded-xl py-2.5 hover:bg-[#0F172A] hover:text-white transition-all duration-200 text-sm" style={{ fontWeight: 600 }}>
            Book a Consultation <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* FIR & Rights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-2xl p-5 border border-[#E5E7EB] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04)" }}
          onClick={() => setActiveSection("fir")}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-[10px] bg-red-50 border border-red-100 text-red-600 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>Know Your Rights</span>
          </div>
          <h3 className="text-[#0F172A] mb-1.5" style={{ fontWeight: 700, fontSize: "1rem" }}>FIR & Legal Rights</h3>
          <p className="text-[#6B7280] text-sm mb-4" style={{ lineHeight: 1.6 }}>Understand your FIR, know your rights when detained, and get step-by-step legal guidance.</p>
          <div className="space-y-2 mb-4">
            {["Write an FIR with AI guidance", "Complaint regarding FIR", "Rights during police custody"].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span className="text-xs text-[#6B7280]">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 border border-[#0F172A] text-[#0F172A] rounded-xl py-2.5 hover:bg-[#0F172A] hover:text-white transition-all duration-200 text-sm" style={{ fontWeight: 600 }}>
            Explore FIR Guide <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Bottom row: Cases + Reminders + Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Active Cases box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
            <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>Active Cases</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSection("cases")}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#0F172A] text-white rounded-lg text-xs hover:bg-[#1E3A5F] transition-colors"
                style={{ fontWeight: 600 }}
              >
                <Plus className="w-3 h-3" /> Add Case
              </button>
            </div>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {cases.map((c, i) => (
              <div key={i} className="px-4 py-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer" onClick={() => setActiveSection("cases")}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs text-[#0F172A] truncate flex-1 pr-2" style={{ fontWeight: 500 }}>{c.title}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border flex-shrink-0 ${c.statusColor}`} style={{ fontWeight: 600 }}>{c.status}</span>
                </div>
                <div className="h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0F172A] rounded-full" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reminders box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
            <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>Upcoming Reminders</span>
            <button onClick={() => setActiveSection("reminders")} className="text-xs text-[#6B7280] hover:text-[#0F172A] flex items-center gap-1 transition-colors" style={{ fontWeight: 500 }}>
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {upcomingReminders.slice(0, 3).map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFC] transition-colors">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${r.urgent ? "bg-red-50" : "bg-[#F1F5F9]"}`}>
                  <Bell className={`w-3.5 h-3.5 ${r.urgent ? "text-red-500" : "text-[#9CA3AF]"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#0F172A] truncate" style={{ fontWeight: 500 }}>{r.title}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* My Documents box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
            <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>My Documents</span>
            <button onClick={() => setActiveSection("documents")} className="text-xs text-[#6B7280] hover:text-[#0F172A] flex items-center gap-1 transition-colors" style={{ fontWeight: 500 }}>
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {[
              { name: "FIR_Copy_2026.pdf", type: "PDF", color: "bg-red-50 text-red-600 border-red-100" },
              { name: "Land_Registry_Deed.pdf", type: "PDF", color: "bg-red-50 text-red-600 border-red-100" },
              { name: "Consumer_Forum_Notice.docx", type: "DOCX", color: "bg-blue-50 text-blue-600 border-blue-100" },
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border text-[10px] flex-shrink-0 ${doc.color}`} style={{ fontWeight: 700 }}>{doc.type}</div>
                <p className="text-xs text-[#0F172A] truncate flex-1" style={{ fontWeight: 500 }}>{doc.name}</p>
              </div>
            ))}
            <button
              onClick={() => setActiveSection("documents")}
              className="w-full flex items-center justify-center gap-2 mt-2 py-2 border border-dashed border-[#D1D5DB] rounded-xl text-xs text-[#9CA3AF] hover:border-[#0F172A] hover:text-[#0F172A] transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Upload className="w-3.5 h-3.5" /> Upload Document
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export function UserDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [agentOpen, setAgentOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "reminders":
        return <RemindersSection />;
      case "cases":
        return <CaseTrackingSection />;
      case "fir":
        return <FIRSection />;
      case "tele":
        return <TeleconsultationSection />;
      case "documents":
        return <MyDocumentsSection />;
      case "settings":
        return <SettingsSection />;
      case "help":
        return (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Help & Support</h2>
            <HelpSupportSection />
          </motion.div>
        );
      default:
        return <DashboardHome setActiveSection={setActiveSection} setAgentOpen={setAgentOpen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-60 bg-[#0F172A] flex flex-col flex-shrink-0 min-h-screen">
        <div className="px-5 h-16 flex items-center gap-2.5 border-b border-white/10">
          <div className="w-7 h-7 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", letterSpacing: "-0.02em" }}>Nyaya Saathi</span>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-1">
          {sidebarItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => { setActiveSection(id); if (id === "agent") setAgentOpen(true); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group ${
                activeSection === id ? "bg-white/15 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/8"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm" style={{ fontWeight: activeSection === id ? 600 : 400 }}>{label}</span>
            </button>
          ))}
        </nav>
        <div className="px-3 pb-5 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white/60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs truncate" style={{ fontWeight: 600 }}>Rajesh Kumar</p>
              <p className="text-white/40 text-[10px] truncate">rajesh@email.com</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all mt-1"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs" style={{ fontWeight: 500 }}>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="h-16 bg-white border-b border-[#E5E7EB] px-8 flex items-center justify-between flex-shrink-0" style={{ boxShadow: "0 1px 4px rgba(15,23,42,0.05)" }}>
          <div>
            <h1 className="text-[#0F172A]" style={{ fontWeight: 700, fontSize: "1.0625rem" }}>Welcome back, Rajesh 👋</h1>
            <p className="text-[#9CA3AF] text-xs">Here's your legal overview for today</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors relative">
              <Bell className="w-4 h-4 text-[#374151]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center">
              <span className="text-white text-xs" style={{ fontWeight: 700 }}>RK</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>

      {agentOpen && <AgentModal onClose={() => { setAgentOpen(false); setActiveSection("dashboard"); }} />}
    </div>
  );
}
