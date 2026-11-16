import React from 'react';
import { MapPin, Award, CheckCircle2, AlertOctagon, ChevronRight } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

/**
 * CraftCard Component
 * Demonstrates Unit II: Reusable props-driven card component with Tailwind styling
 */
export const CraftCard = ({ craft, onSelect, onVerifyDirect }) => {
  return (
    <Card hoverEffect className="overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Craft Hero Photo */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
          <img
            src={craft.heroImage}
            alt={craft.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <span className="bg-stone-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {craft.category}
            </span>
            <span className="bg-amber-600/90 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
              {craft.giNumber}
            </span>
          </div>

          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
            Est. {craft.registeredYear}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div>
            <div className="flex items-center gap-1 text-xs font-semibold text-orange-700 mb-0.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{craft.district}, {craft.state}</span>
            </div>
            <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-orange-700 transition-colors leading-tight">
              {craft.name}
            </h3>
            <span className="text-xs text-stone-600 block">{craft.vernacularName}</span>
          </div>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {craft.description}
          </p>

          {/* Quick Indicator Tags */}
          <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">
                <strong className="text-stone-900">Texture: </strong>
                {craft.keyIndicators[0].expected}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-700">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">
                <strong className="text-stone-900">Motifs: </strong>
                {craft.keyIndicators[2].expected}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs"
          onClick={() => onSelect(craft)}
        >
          View Specs
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1 text-xs"
          onClick={() => onVerifyDirect(craft)}
        >
          Test with AI
        </Button>
      </div>
    </Card>
  );
};
