import React, { useState } from 'react';
import { Eye, ChevronUp, ChevronDown, X } from 'lucide-react';
import { CraftProduct } from '../types/craft';
import { CraftIllustration } from './CraftIllustration';

interface RecentlyViewedBarProps {
  products: CraftProduct[];
  onOpenProduct: (product: CraftProduct) => void;
  onClear: () => void;
}

export const RecentlyViewedBar: React.FC<RecentlyViewedBarProps> = ({
  products,
  onOpenProduct,
  onClear,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  if (products.length === 0) return null;

  return (
    <aside
      aria-label="Articles récemment consultés"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-30 max-w-2xl w-[92%] sm:w-auto bg-theme-surface/98 backdrop-blur-md border-t border-x border-theme-main shadow-lg text-theme-main transition-all duration-200 rounded-t-[2px]"
    >
      {/* Header bar toggle */}
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-theme-subtle bg-theme-muted type-caption text-[10px] text-theme-secondary">
        <span className="flex items-center gap-1.5 font-semibold text-theme-main">
          <Eye className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5]" />
          Vu récemment ({products.length})
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:text-theme-main cursor-pointer p-0.5 rounded-[2px]"
            title={collapsed ? 'Déplier' : 'Replier'}
          >
            {collapsed ? <ChevronUp className="w-3.5 h-3.5 stroke-[1.5]" /> : <ChevronDown className="w-3.5 h-3.5 stroke-[1.5]" />}
          </button>
          <button
            onClick={onClear}
            className="hover:text-theme-main cursor-pointer p-0.5 ml-1 rounded-[2px]"
            title="Effacer l'historique"
          >
            <X className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Items Strip */}
      {!collapsed && (
        <div className="p-2 sm:p-2.5 flex items-center gap-3 overflow-x-auto font-sans">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => onOpenProduct(product)}
              className="group flex items-center gap-2.5 p-1.5 border border-theme-subtle hover:border-theme-main bg-theme-surface transition-all cursor-pointer shrink-0 rounded-[2px]"
            >
              <div className="w-9 h-9 bg-theme-muted border border-theme-subtle shrink-0 flex items-center justify-center p-0.5 rounded-[2px]">
                <CraftIllustration type={product.illustrationType} />
              </div>
              <div className="pr-1 text-left">
                <p className="font-sans text-xs font-semibold text-theme-main group-hover:text-[#8F4D32] transition-colors truncate max-w-[120px]">
                  {product.name}
                </p>
                <span className="type-price text-[11px] text-theme-secondary font-bold tabular-nums">
                  {product.priceEUR} €
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};
