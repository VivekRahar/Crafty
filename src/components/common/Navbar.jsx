import React, { useState } from 'react';
import { ShieldCheck, Compass, ClipboardCheck, GraduationCap, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { ODOP_CRAFTS } from '../../data/odopCrafts';

/**
 * Navbar Component
 * Demonstrates Unit II: Responsive navigation, active state highlights, semantic navigation
 */
export const Navbar = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'studio',
      label: 'Verify Craft',
      icon: ShieldCheck,
      badge: 'AI Core'
    },
    {
      id: 'registry',
      label: 'ODOP Registry',
      icon: Compass,
      badge: `${ODOP_CRAFTS.length} Crafts`
    },
    {
      id: 'checklist',
      label: 'Inspection Form',
      icon: ClipboardCheck,
      badge: 'Zod'
    },
    {
      id: 'viva',
      label: 'Viva Guide',
      icon: GraduationCap,
      badge: 'Units I-IV'
    }
  ];

  const handleSelectTab = (tabId) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleSelectTab('studio')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-600 via-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-orange-600/20 group-hover:scale-105 transition-transform">
              <span className="font-serif font-black text-2xl tracking-tighter">प्र</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-serif tracking-tight text-slate-900 group-hover:text-orange-700 transition-colors">
                  Pramaan
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                  ODOP AI
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden sm:block">
                AI-Based Handicraft Authenticity & GI Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/80'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
                        isActive
                          ? 'bg-orange-700/60 text-white'
                          : 'bg-stone-200/80 text-stone-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Badge / Quick GI indicator */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-semibold">ODOP India Verified</span>
            </div>
            <button
              onClick={() => handleSelectTab('viva')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Viva Hub</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-orange-600 text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-orange-700 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
