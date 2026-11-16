import React, { useState, useMemo } from 'react';
import { Search, Filter, Compass, MapPin, Sparkles } from 'lucide-react';
import { ODOP_CRAFTS, getCategories, getStates } from '../../data/odopCrafts';
import { useDebounce } from '../../hooks/useDebounce';
import { CraftCard } from './CraftCard';
import { CraftDetailModal } from './CraftDetailModal';

/**
 * CraftExplorer Component
 * Demonstrates Unit I & III:
 * - Declarative filtering using useMemo
 * - Debounced search with custom hook useDebounce
 * - Array iteration and transformation methods (map, filter)
 * - Lifting state up to parent for direct verification trigger
 */
export const CraftExplorer = ({ onStartVerificationWithCraft }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All States');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCraftForModal, setSelectedCraftForModal] = useState(null);

  // Debounce search query to demonstrate performance optimization
  const debouncedSearch = useDebounce(searchQuery, 250);

  const categories = useMemo(() => getCategories(), []);
  const states = useMemo(() => getStates(), []);

  // Filter crafts based on category, state, and debounced search query
  const filteredCrafts = useMemo(() => {
    return ODOP_CRAFTS.filter((craft) => {
      const matchesCategory =
        selectedCategory === 'All' || craft.category === selectedCategory;
      const matchesState =
        selectedState === 'All States' || craft.state === selectedState;
      const matchesSearch =
        craft.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        craft.district.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        craft.state.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        craft.giNumber.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        craft.category.toLowerCase().includes(debouncedSearch.toLowerCase());

      return matchesCategory && matchesState && matchesSearch;
    });
  }, [selectedCategory, selectedState, debouncedSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>National ODOP Registry Database</span>
          </div>
          <h2 className="text-3xl font-black font-serif text-slate-900 tracking-tight">
            Verified Handicraft Heritage Explorer
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Browse verified Geographical Indication master reference standards across Indian districts.
          </p>
        </div>

        {/* Live Registry Stats */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-center px-3 border-r border-stone-200">
            <span className="block text-xl font-black text-orange-600">
              {ODOP_CRAFTS.length}
            </span>
            <span className="text-[10px] uppercase font-bold text-stone-600">
              GI Tag Crafts
            </span>
          </div>
          <div className="text-center px-3">
            <span className="block text-xl font-black text-slate-800">
              {filteredCrafts.length}
            </span>
            <span className="text-[10px] uppercase font-bold text-stone-600">
              Matching Records
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input (7 cols) */}
          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by craft name, district (e.g. Varanasi, Srinagar), GI code..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* State Filter Dropdown (5 cols) */}
          <div className="sm:col-span-5 relative">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Craft Cards Grid */}
      {filteredCrafts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrafts.map((craft) => (
            <CraftCard
              key={craft.id}
              craft={craft}
              onSelect={(c) => setSelectedCraftForModal(c)}
              onVerifyDirect={(c) => onStartVerificationWithCraft(c)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Compass className="w-10 h-10 text-stone-400 mx-auto" />
          <h4 className="font-bold text-slate-800 text-base">No Matching Crafts Found</h4>
          <p className="text-xs text-stone-500">
            Try adjusting your search terms or clearing the category and state filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedState('All States');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-semibold hover:bg-orange-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Craft Detail Modal */}
      <CraftDetailModal
        craft={selectedCraftForModal}
        isOpen={Boolean(selectedCraftForModal)}
        onClose={() => setSelectedCraftForModal(null)}
        onVerifyThisCraft={(c) => onStartVerificationWithCraft(c)}
      />
    </div>
  );
};
