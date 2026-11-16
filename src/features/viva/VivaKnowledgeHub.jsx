import React, { useState } from 'react';
import {
  GraduationCap, Code, CheckCircle, HelpCircle, FileCode,
  Layers, Terminal, Sparkles, BookOpen, ChevronRight, Copy, Check
} from 'lucide-react';
import { SYLLABUS_SECTIONS, TOP_VIVA_QUESTIONS } from '../../data/vivaSyllabusData';
import { Button } from '../../components/common/Button';

/**
 * VivaKnowledgeHub Component
 * Specially designed to help students ace their academic viva and code defense!
 *
 * Demonstrates:
 * - Unit I-IV syllabus topic mapping
 * - Interactive tabbed code inspection
 * - Copyable code snippets and model answers
 */
export const VivaKnowledgeHub = () => {
  const [activeUnitId, setActiveUnitId] = useState(SYLLABUS_SECTIONS[0].id);
  const [copiedSnippetIdx, setCopiedSnippetIdx] = useState(null);

  const activeSection = SYLLABUS_SECTIONS.find(s => s.id === activeUnitId) || SYLLABUS_SECTIONS[0];

  const handleCopy = (snippet, idx) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetIdx(idx);
    setTimeout(() => setCopiedSnippetIdx(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-orange-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-stone-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-orange-400" />
            <span>Academic Viva & Code Walkthrough Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-white">
            Pramaan Syllabus & Architecture Defense Hub
          </h2>

          <p className="text-sm text-stone-300 leading-relaxed">
            Every concept requested in your curriculum (Units I, II, III, IV, and explainable AI logic) is mapped directly to actual working code in this project. Use this panel to study and explain any question with 100% confidence.
          </p>
        </div>

        {/* Decorative Badge */}
        <div className="absolute right-6 -bottom-10 opacity-10 pointer-events-none select-none text-[180px] font-serif font-black">
          प्र
        </div>
      </div>

      {/* Unit Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 no-scrollbar">
        {SYLLABUS_SECTIONS.map((section) => {
          const isActive = activeUnitId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => setActiveUnitId(section.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-2 ${
                isActive
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span className="font-mono text-xs opacity-80">{section.unit}:</span>
              <span>{section.title.split('&')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Unit Topics */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider block">
              {activeSection.unit} Deep Dive
            </span>
            <h3 className="text-2xl font-black font-serif text-slate-900">
              {activeSection.title}
            </h3>
          </div>
          <span className="text-xs text-stone-500">
            {activeSection.topics.length} Key Concepts Covered
          </span>
        </div>

        {/* Topic Cards */}
        <div className="grid grid-cols-1 gap-6">
          {activeSection.topics.map((topic, idx) => (
            <div
              key={topic.name}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-4 hover:border-orange-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">
                    {topic.name}
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
                  Verified Implementation
                </span>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {topic.summary}
              </p>

              {/* Code Snippet Box */}
              <div className="relative rounded-2xl bg-stone-900 text-stone-100 p-4 font-mono text-xs overflow-x-auto shadow-inner border border-stone-800">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800 text-[10px] text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>Project Code Snippet</span>
                  </span>
                  <button
                    onClick={() => handleCopy(topic.codeSnippet, idx)}
                    className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors"
                  >
                    {copiedSnippetIdx === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-emerald-300 leading-relaxed">{topic.codeSnippet}</pre>
              </div>

              {/* Model Viva Q&A */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-start gap-2 text-amber-950 font-bold text-xs sm:text-sm">
                  <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>Examiner / Viva Question: "{topic.vivaQuestion}"</span>
                </div>
                <div className="pl-6 text-xs text-amber-900 leading-relaxed">
                  <strong className="text-amber-950">Recommended Viva Answer: </strong>
                  {topic.vivaAnswer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 8 Viva Questions & Model Answers Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
          <BookOpen className="w-6 h-6 text-orange-600" />
          <div>
            <h3 className="text-xl font-bold font-serif text-slate-900">
              Essential Top Viva Questions & Answers
            </h3>
            <p className="text-xs text-stone-500">
              Frequently asked questions during React project evaluations and practical exams.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {TOP_VIVA_QUESTIONS.map((qa, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2"
            >
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="text-orange-600">Q:</span>
                <span>{qa.q}</span>
              </h4>
              <p className="text-stone-700 pl-4 leading-relaxed border-l-2 border-orange-500">
                <strong className="text-stone-900">A: </strong>
                {qa.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Flowchart / Component Hierarchy Diagram (Textual / Visual) */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-bold font-serif">
            Project Component Hierarchy & State Data Flow
          </h3>
        </div>

        <div className="font-mono text-xs text-stone-300 bg-black/60 p-4 rounded-2xl border border-stone-800 overflow-x-auto leading-relaxed">
          <pre>{`App.jsx (Root State: activeTab)
 ├── Navbar.jsx (Props: activeTab, onTabChange)
 ├── Main Content Router (Conditional rendering based on activeTab)
 │    ├── VerificationStudio.jsx (Hook: useCraftVerification)
 │    │    ├── ImageUploader.jsx (Zod validation: craftUploadSchema)
 │    │    ├── ScanningAnimation.jsx (SVG radar & laser keyframe scan)
 │    │    └── VerificationResult.jsx (State: isCertificateOpen)
 │    │         ├── SideBySideComparator.jsx (User Specimen vs GI Master Specimen)
 │    │         └── PramaanCertificate.jsx (Printable modal dialog)
 │    │
 │    ├── CraftExplorer.jsx (Hooks: useMemo, useDebounce)
 │    │    ├── CraftCard.jsx (Props: craft, onSelect, onVerifyDirect)
 │    │    └── CraftDetailModal.jsx (GI specifications & counterfeit warnings)
 │    │
 │    ├── ArtisanChecklist.jsx (Zod schema: inspectionChecklistSchema)
 │    │    └── Controlled form elements with real-time error states
 │    │
 │    └── VivaKnowledgeHub.jsx (Interactive Units I-IV syllabus defense guide)
 └── Footer.jsx (Semantic footer & ODOP attribution)`}</pre>
        </div>

        <p className="text-xs text-stone-400">
          This unidirectional data flow (top-down props, bottom-up callback events) preserves the single-responsibility principle and makes state transitions fully predictable.
        </p>
      </div>
    </div>
  );
};
