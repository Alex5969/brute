import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, ArrowRight, MapPin } from 'lucide-react';
import { CraftProduct } from '../types/craft';
import { CraftIllustration } from './CraftIllustration';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: CraftProduct[];
  onSelectProduct: (product: CraftProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return products.slice(0, 4);
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.materialBadge.toLowerCase().includes(q) ||
        p.artisan.name.toLowerCase().includes(q) ||
        p.artisan.location.toLowerCase().includes(q) ||
        p.artisan.workshop.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-12 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-theme-surface text-theme-main border border-theme-main rounded-[2px] shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in slide-in-from-top-6 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-theme-main">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <Search className="w-5 h-5 text-theme-secondary shrink-0 stroke-[1.5]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Chercher un gobelet en grès, du chêne, moins de 15 €..."
              className="w-full text-base sm:text-lg bg-transparent font-sans placeholder:text-theme-secondary text-theme-main focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-theme-main text-theme-main hover:bg-theme-main hover:text-white transition-colors cursor-pointer rounded-[2px]"
            aria-label="Fermer la recherche"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="pt-3 pb-4 flex flex-wrap items-center gap-1.5 text-xs text-theme-secondary font-sans">
          <span className="type-caption text-[11px]">Suggestions :</span>
          {['Grès chamotté', 'Chêne recyclé', '< 15 €', 'Cuir végétal', 'Dieulefit', 'Couteau'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-0.5 border border-theme-subtle hover:border-theme-main text-[11px] text-theme-main transition-colors cursor-pointer rounded-[2px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="divide-y divide-theme-subtle max-h-[60vh] overflow-y-auto font-sans">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                onSelectProduct(product);
                onClose();
              }}
              className="group py-3.5 flex items-center justify-between gap-4 hover:bg-theme-muted px-2 -mx-2 transition-colors cursor-pointer rounded-[2px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-theme-muted border border-theme-subtle rounded-[2px] flex items-center justify-center p-1 shrink-0">
                  <CraftIllustration type={product.illustrationType} />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-theme-main group-hover:text-[#8F4D32] transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-theme-secondary font-normal">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5]" />
                      {product.artisan.location}
                    </span>
                    <span>·</span>
                    <span className="text-[#8F4D32] font-medium">{product.materialBadge}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="type-price text-base font-bold text-theme-main tabular-nums">
                  {product.priceEUR} €
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-theme-secondary group-hover:text-theme-main transition-transform group-hover:translate-x-1 stroke-[1.5]" />
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center text-theme-secondary space-y-3 font-sans">
              <p className="font-serif text-2xl text-theme-main font-normal">
                Aucun objet trouvé pour « {query} »
              </p>
              <p className="text-sm font-normal max-w-sm mx-auto">
                Découvrez les créations céramiques à moins de 25 € ou explorez nos objets en bois brut local.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setQuery('grès')}
                  className="px-3 py-1 border border-[#8F4D32] text-[#8F4D32] bg-[#8F4D32]/8 text-xs font-semibold rounded-[2px]"
                >
                  Céramique & Grès
                </button>
                <button
                  onClick={() => setQuery('chêne')}
                  className="px-3 py-1 border border-theme-subtle hover:border-theme-main text-xs font-medium text-theme-main rounded-[2px]"
                >
                  Chêne de réemploi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
