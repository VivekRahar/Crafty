import React from 'react';
import { ShieldCheck, Heart, Award, ExternalLink } from 'lucide-react';

/**
 * Footer Component
 * Demonstrates Unit II: Semantic HTML layout footer
 */
export const Footer = ({ onTabChange }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-serif font-black text-xl">
                प्र
              </div>
              <div>
                <span className="text-xl font-bold font-serif text-white tracking-tight">
                  Pramaan
                </span>
                <p className="text-xs text-stone-400">
                  AI-Based Handicraft Authenticity Assistant for ODOP
                </p>
              </div>
            </div>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              Empowering consumers, connoisseurs, and artisan guilds with computer vision verification against verified Geographical Indication (GI) standards. Protecting India's handloom weavers and master craftspersons from synthetic industrial counterfeits.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-800 text-amber-300 border border-stone-700">
                <Award className="w-3.5 h-3.5" />
                ODOP India Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-800 text-emerald-300 border border-stone-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                GI Tag Registry Chennai Data
              </span>
            </div>
          </div>

          {/* Column 2: Quick Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Verification Engine
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onTabChange('studio')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Weave & Texture Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('studio')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Motif Geometry Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('studio')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Natural Dye Spectrum Test
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('registry')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Verified ODOP Craft Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('checklist')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Zod Physical Inspection Form
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic / Viva */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Academic Viva Defense
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onTabChange('viva')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Unit I: ES6 & React Tooling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('viva')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Unit II: Component Design & Tailwind
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('viva')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Unit III: Hooks & Side Effects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('viva')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Unit IV: Controlled Forms & Zod
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('viva')}
                  className="text-amber-400 font-medium hover:underline text-left"
                >
                  Top 10 Viva Model Answers →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Pramaan — Dedicated to the Traditional Artisans of India.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Built with React 18, Vite & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
