import React, { useState } from 'react';
import { Plus, Check, Eye, MapPin, Clock } from 'lucide-react';
import { CraftProduct } from '../types/craft';
import { CraftIllustration } from './CraftIllustration';

interface ProductCardProps {
  product: CraftProduct;
  onOpenQuickView: (product: CraftProduct) => void;
  onAddToCart: (product: CraftProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onOpenQuickView(product)}
      className="group relative flex flex-col justify-between bg-theme-surface hover:bg-theme-alt border-b border-r border-theme-main transition-colors duration-200 cursor-pointer p-6 sm:p-7"
    >
      {/* Top Header: Material Badge & Statut Officiel */}
      <div className="flex items-start justify-between gap-2 z-10">
        <div className="space-y-1.5">
          <span className="type-caption text-[11px] text-theme-secondary block">
            {product.categoryLabel}
          </span>
          <span className="inline-block text-[11px] font-sans font-semibold text-[#8F4D32] bg-[#8F4D32]/8 px-2 py-0.5 border border-[#8F4D32]/30 rounded-[2px]">
            {product.materialBadge}
          </span>
        </div>

        {/* Tag de statut officiel du dossier */}
        <span className="text-[11px] font-sans text-theme-secondary bg-theme-muted px-2 py-0.5 border border-theme-subtle rounded-[2px] shrink-0 font-medium">
          {product.stockStatus === 'in_stock_48h'
            ? 'En stock · expédié sous 48 h'
            : 'Confection à la commande (4 j)'}
        </span>
      </div>

      {/* Center Illustration Area */}
      <div className="relative my-6 flex items-center justify-center min-h-[190px] sm:min-h-[210px]">
        <div className="w-full max-w-[210px] aspect-square transition-transform duration-300 ease-out group-hover:scale-105">
          <CraftIllustration type={product.illustrationType} />
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-theme-surface/98 border border-theme-main text-theme-main text-[11px] uppercase tracking-[0.04em] font-sans font-semibold hover:bg-theme-main hover:text-white transition-colors rounded-[2px] shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Fiche & Coût</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-theme-btn text-theme-btn text-[11px] uppercase tracking-[0.04em] font-sans font-semibold hover:opacity-90 transition-opacity rounded-[2px] shadow-xs"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[1.5]" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Prendre</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Info: Title, Artisan, Time and Price */}
      <div className="space-y-3 pt-3 border-t border-theme-subtle">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-sans text-lg text-theme-main font-semibold leading-snug group-hover:text-[#8F4D32] transition-colors">
            {product.name}
          </h3>
          <span className="type-price text-xl text-theme-main shrink-0 font-bold">
            {product.priceEUR} €
          </span>
        </div>

        <p className="text-sm text-theme-secondary font-normal line-clamp-1 font-sans">
          {product.subtitle}
        </p>

        {/* Artisan Workshop & Labor time footer */}
        <div className="flex items-center justify-between pt-1 text-[12px] text-theme-secondary font-sans font-normal">
          <span className="flex items-center gap-1 truncate max-w-[170px]">
            <MapPin className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5] shrink-0" />
            <span className="truncate">{product.artisan.workshop} ({product.artisan.location})</span>
          </span>

          <span className="flex items-center gap-1 shrink-0 font-mono text-[11px] text-theme-secondary">
            <Clock className="w-3.5 h-3.5 text-theme-secondary stroke-[1.5] shrink-0" />
            <span>{product.costBreakdown.laborTimeMinutes} min</span>
          </span>
        </div>
      </div>
    </article>
  );
};
